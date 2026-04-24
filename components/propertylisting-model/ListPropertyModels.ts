import type { ReactElement, SVGProps } from 'react';

export type IconComponent = (props: SVGProps<SVGSVGElement>) => ReactElement | null;

export interface Room {
  name: string;
  type: string;
  capacity: string;
  mealPlanPrices: Record<string, string>;
}

export interface ListPropertyProps {
  onHome: () => void;
  onStartNow: () => void;
}

export interface RoomCategory {
  id: string;
  name: string;
  sequence: number;
  mealPlan?: string;
}

export interface AmenityCategory {
  id: string;
  label: string;
  icon: IconComponent;
  amenities: string[];
}

export interface ExtraService {
  name: string;
  desc: string;
  price: string;
}

export interface ExtraServiceCategory {
  id: string;
  label: string;
  icon: IconComponent;
  services: ExtraService[];
}

export interface TransferOption {
  name: string;
  desc: string;
  price: string;
}

export interface TransferServiceOption {
  id: string;
  label: string;
  icon: IconComponent;
  options: TransferOption[];
}

export interface DocumentUpload {
  id: string;
  name: string;
  desc: string;
}

export interface UploadedDocument {
  id: string;
  name: string;
  fileName?: string;
  status: string;
  progress?: number;
}

export interface Benefit {
  icon: IconComponent;
  title: string;
  desc: string;
  accent: string;
  bg: string;
}

export interface Stat {
  val: string;
  label: string;
}

export interface SetupStep {
  step: number;
  icon: IconComponent;
  title: string;
  desc: string;
}

export interface StepDefinition {
  id: number;
  label: string;
  icon: IconComponent;
}

export interface ListPropertyFormData {
  name: string;
  type: string;
  rating: string;
  address: string;
  description: string;
  amenities: string[];
  mainImage: string | null;
  gallery: string[];
  roomCategories: RoomCategory[];
  menu: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
  };
  menuPricing: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  menuIncluded: string[];
  rooms: Room[];
  extraServices: string[];
  transferServices: string[];
  roomCategoryPhotos: Record<string, string>;
  extraServicePhotos: Record<string, string>;
  documents: UploadedDocument[];
}
