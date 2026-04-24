export type ListingStatus = 'draft' | 'submitted';

export interface RoomCategory {
  id: string;
  name: string;
  sequence: number;
  mealPlan?: string;
}

export interface ListingMenu {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
}

export interface ListingMenuPricing {
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface UploadedDocument {
  id: string;
  name: string;
  fileName?: string;
  status: string;
  progress?: number;
}

export interface Listing {
  id: string;
  user_id?: number | string;
  status: ListingStatus;
  createdAt: string;
  updatedAt: string;
  name: string;
  type: string;
  rating: string;
  address: string;
  description: string;
  amenities: string[];
  mainImage: string | null;
  gallery: string[];
  roomCategories: RoomCategory[];
  menu: ListingMenu;
  menuPricing: ListingMenuPricing;
  menuIncluded: string[];
  rooms: unknown[];
  extraServices: string[];
  transferServices: string[];
  roomCategoryPhotos: Record<string, string>;
  extraServicePhotos: Record<string, string>;
  documents: UploadedDocument[];
}

export interface AuthUser {
  email: string;
  phone?: string;
  name: string;
  password: string;
}

const listings = new Map<string, Listing>();
const users = new Map<string, AuthUser>();
let nextListingId = 1000;

function normalizeUserKey(value: string) {
  return value.trim().toLowerCase();
}

function now() {
  return new Date().toISOString();
}

function createDefaultListing(): Listing {
  return {
    id: '',
    status: 'draft',
    createdAt: now(),
    updatedAt: now(),
    name: '',
    type: '',
    rating: '',
    address: '',
    description: '',
    amenities: [],
    mainImage: null,
    gallery: [],
    roomCategories: [],
    menu: { breakfast: [], lunch: [], dinner: [] },
    menuPricing: { breakfast: '0', lunch: '0', dinner: '0' },
    menuIncluded: [],
    rooms: [],
    extraServices: [],
    transferServices: [],
    roomCategoryPhotos: {},
    extraServicePhotos: {},
    documents: [],
  };
}

function buildUserKey(email?: string, phone?: string) {
  if (email) return normalizeUserKey(email);
  if (phone) return normalizeUserKey(phone);
  return '';
}

function seedDemoUsers() {
  const demo = {
    email: 'demo@wanderwealth.com',
    name: 'Demo Traveler',
    password: 'Password123!',
  } as AuthUser;
  users.set(buildUserKey(demo.email), demo);
}

seedDemoUsers();

export function createListing(initial: Partial<Listing>) {
  const id = String(nextListingId++);
  const listing: Listing = {
    ...createDefaultListing(),
    id,
    createdAt: now(),
    updatedAt: now(),
    ...initial,
  };
  listings.set(id, listing);
  return listing;
}

export function findListing(id: string) {
  return listings.get(id) ?? null;
}

export function updateListing(id: string, payload: Partial<Listing>) {
  const existing = findListing(id);
  if (!existing) return null;
  const updated = {
    ...existing,
    ...payload,
    updatedAt: now(),
  };
  listings.set(id, updated);
  return updated;
}

export function submitListing(id: string) {
  const existing = findListing(id);
  if (!existing) return null;
  return updateListing(id, { status: 'submitted' });
}

export function registerUser(payload: { email?: string; phone?: string; name?: string; password?: string }) {
  const primaryKey = buildUserKey(payload.email, payload.phone);
  if (!primaryKey) return null;
  if (users.has(primaryKey)) return null;

  const user: AuthUser = {
    email: payload.email?.trim() || `${payload.phone?.trim() ?? 'guest'}@wanderwealth.local`,
    phone: payload.phone?.trim(),
    name: payload.name?.trim() || payload.phone?.trim() || 'Guest User',
    password: payload.password?.trim() || 'guest-password',
  };
  users.set(primaryKey, user);
  return user;
}

export function loginUser(payload: { email?: string; phone?: string; password?: string }) {
  const lookupKey = buildUserKey(payload.email, payload.phone);
  if (!lookupKey) return null;
  const existing = users.get(lookupKey);
  if (!existing) return null;
  if (payload.phone && !payload.password) return existing;
  if (payload.password === existing.password) return existing;
  return null;
}

export function verifyOtp(payload: { phone?: string; otp?: string }) {
  if (!payload.phone) return false;
  return true;
}
