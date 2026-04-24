import { NextRequest, NextResponse } from 'next/server';
import { createListing, findListing, submitListing, updateListing } from '@/lib/local-api-store';

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status });
}

function parseBody(req: NextRequest) {
  return req.json().catch(() => null) as Promise<Record<string, any> | null>;
}

function normalizeString(value: unknown) {
  return value === undefined || value === null ? '' : String(value);
}

function normalizeStringArray(value: unknown) {
  return Array.isArray(value) ? value.map((item) => String(item)) : [];
}

function normalizeRoomCategories(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => ({
    id: String(item?.id ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`),
    name: normalizeString(item?.name),
    mealPlan: item?.mealPlan ? normalizeString(item.mealPlan) : undefined,
    sequence: Number(item?.sequence ?? 0),
  }));
}

function normalizeDocuments(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => ({
    id: String(item?.id ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`),
    name: normalizeString(item?.originalFilename || item?.docType || 'document'),
    fileName: normalizeString(item?.originalFilename),
    status: 'uploaded',
    docType: normalizeString(item?.docType),
    filePath: normalizeString(item?.filePath),
  }));
}

export async function POST(req: NextRequest) {
  const body = await parseBody(req);
  if (!body || typeof body !== 'object') {
    return json({ error: 'Invalid request body' }, 400);
  }

  const step = Number(body.step);
  const payload = body.payload ?? {};
  const listingId = body.listingId ? String(body.listingId) : undefined;

  if (!step || step < 1 || step > 10) {
    return json({ error: 'Invalid step. Step must be a number between 1 and 10.' }, 400);
  }

  if (step !== 1 && !listingId) {
    return json({ error: 'listingId is required for steps 2 through 10.' }, 400);
  }

  let listing;

  switch (step) {
    case 1: {
      const listingData = {
        name: normalizeString(payload.name),
        type: normalizeString(payload.type),
        rating: normalizeString(payload.rating),
        address: normalizeString(payload.address),
        description: normalizeString(payload.description),
        ...(payload.user_id && { user_id: payload.user_id }),
      };

      if (listingId) {
        const existing = findListing(listingId);
        if (!existing) {
          return json({ error: 'Listing not found' }, 404);
        }
        listing = updateListing(listingId, listingData);
      } else {
        listing = createListing(listingData);
      }
      break;
    }

    case 2: {
      const existing = findListing(listingId!);
      if (!existing) {
        return json({ error: 'Listing not found' }, 404);
      }
      listing = updateListing(listingId!, {
        roomCategories: normalizeRoomCategories(payload.roomCategories),
      });
      break;
    }

    case 3: {
      listing = updateListing(listingId!, {
        amenities: normalizeStringArray(payload.amenities),
      });
      break;
    }

    case 4: {
      const payloadMenu = payload.menu ?? {};
      const payloadPricing = payload.menuPricing ?? {};
      listing = updateListing(listingId!, {
        menu: {
          breakfast: normalizeStringArray(payloadMenu.breakfast),
          lunch: normalizeStringArray(payloadMenu.lunch),
          dinner: normalizeStringArray(payloadMenu.dinner),
        },
        menuPricing: {
          breakfast: normalizeString(payloadPricing.breakfast),
          lunch: normalizeString(payloadPricing.lunch),
          dinner: normalizeString(payloadPricing.dinner),
        },
        menuIncluded: normalizeStringArray(payload.menuIncluded),
      });
      break;
    }

    case 5: {
      listing = updateListing(listingId!, {
        mainImage: payload.mainImage ? normalizeString(payload.mainImage) : null,
        gallery: normalizeStringArray(payload.gallery),
        roomCategoryPhotos: typeof payload.roomCategoryPhotos === 'object' && payload.roomCategoryPhotos !== null
          ? Object.fromEntries(Object.entries(payload.roomCategoryPhotos).map(([key, value]) => [String(key), normalizeString(value)]))
          : {},
      });
      break;
    }

    case 6: {
      listing = updateListing(listingId!, {
        extraServices: normalizeStringArray(payload.extraServices),
        extraServicePhotos: typeof payload.extraServicePhotos === 'object' && payload.extraServicePhotos !== null
          ? Object.fromEntries(Object.entries(payload.extraServicePhotos).map(([key, value]) => [String(key), normalizeString(value)]))
          : {},
      });
      break;
    }

    case 7: {
      listing = updateListing(listingId!, {
        transferServices: normalizeStringArray(payload.transferServices),
      });
      break;
    }

    case 8: {
      listing = updateListing(listingId!, {
        rooms: Array.isArray(payload.rooms) ? payload.rooms : [],
      });
      break;
    }

    case 9: {
      listing = updateListing(listingId!, {
        documents: normalizeDocuments(payload.documents),
      });
      break;
    }

    case 10: {
      const existing = findListing(listingId!);
      if (!existing) {
        return json({ error: 'Listing not found' }, 404);
      }
      listing = submitListing(listingId!);
      break;
    }

    default:
      return json({ error: 'Unsupported step value' }, 400);
  }

  if (!listing) {
    return json({ error: 'Unable to process listing step' }, 400);
  }

  return json({ listing }, step === 1 && !listingId ? 201 : 200);
}
