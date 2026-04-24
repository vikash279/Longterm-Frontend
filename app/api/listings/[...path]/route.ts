import { NextRequest, NextResponse } from 'next/server';
import { createListing, findListing, submitListing, updateListing } from '@/lib/local-api-store';

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status });
}

function parseBody(req: NextRequest) {
  return req.json().catch(() => null) as Promise<Record<string, any> | null>;
}

async function handler(req: NextRequest, context: { params: { path: string[] } }) {
  const path = context.params.path ?? [];

  if (path.length === 0) {
    if (req.method === 'POST') {
      const body = await parseBody(req);
      const listing = createListing({
        name: String(body?.name ?? ''),
        type: String(body?.type ?? ''),
        rating: String(body?.rating ?? ''),
        address: String(body?.address ?? ''),
        description: String(body?.description ?? ''),
      });
      return json({ listing }, 201);
    }

    if (req.method === 'GET') {
      return json({ listings: [] });
    }
  }

  const [id, action] = path;
  const current = findListing(id);
  if (!current) {
    return json({ error: 'Listing not found' }, 404);
  }

  if (path.length === 1) {
    if (req.method === 'GET') {
      return json({ listing: current });
    }
    if (req.method === 'PUT') {
      const body = await parseBody(req);
      const updated = updateListing(id, body || {});
      return updated ? json({ listing: updated }) : json({ error: 'Unable to update listing' }, 400);
    }
  }

  if (path.length === 2) {
    const body = await parseBody(req);
    if (req.method === 'PUT') {
      const payload = body || {};
      switch (action) {
        case 'categories':
          return json({ listing: updateListing(id, { roomCategories: payload.roomCategories || [] }) });
        case 'amenities':
          return json({ listing: updateListing(id, { amenities: payload.amenities || [] }) });
        case 'menu':
          return json({ listing: updateListing(id, {
            menu: payload.menu || current.menu,
            menuPricing: payload.menuPricing || current.menuPricing,
            menuIncluded: payload.menuIncluded || current.menuIncluded,
          }) });
        case 'photos':
          return json({ listing: updateListing(id, {
            mainImage: payload.mainImage ?? current.mainImage,
            gallery: payload.gallery || current.gallery,
            roomCategoryPhotos: payload.roomCategoryPhotos || current.roomCategoryPhotos,
          }) });
        case 'extra-services':
          return json({ listing: updateListing(id, {
            extraServices: payload.extraServices || current.extraServices,
            extraServicePhotos: payload.extraServicePhotos || current.extraServicePhotos,
          }) });
        case 'transfers':
          return json({ listing: updateListing(id, { transferServices: payload.transferServices || [] }) });
        case 'rooms-pricing':
          return json({ listing: updateListing(id, { rooms: payload.rooms || current.rooms }) });
        case 'documents':
          return json({ listing: updateListing(id, { documents: payload.documents || [] }) });
      }
    }

    if (req.method === 'POST' && action === 'submit') {
      const published = submitListing(id);
      return published ? json({ listing: published }) : json({ error: 'Unable to submit listing' }, 400);
    }
  }

  return json({ error: 'Not found' }, 404);
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
