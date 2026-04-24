import type { SVGProps } from 'react';
import { LayoutGrid, Star, UtensilsCrossed, Camera, Sparkles, Navigation, DollarSign, FileText, ClipboardList } from 'lucide-react';
import type { StepDefinition } from '../ListPropertyModels';

export function BuildingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M8 10h.01" />
      <path d="M16 10h.01" />
      <path d="M8 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

export const steps: StepDefinition[] = [
  { id: 1, label: 'PROPERTY DETAILS', icon: BuildingIcon },
  { id: 2, label: 'ROOM CATEGORIES', icon: LayoutGrid },
  { id: 3, label: 'AMENITIES', icon: Star },
  { id: 4, label: 'MENU DETAILS', icon: UtensilsCrossed },
  { id: 5, label: 'PHOTOS', icon: Camera },
  { id: 6, label: 'EXTRA SERVICES', icon: Sparkles },
  { id: 7, label: 'TRANSFER SERVICE', icon: Navigation },
  { id: 8, label: 'PRICING & POLICIES', icon: DollarSign },
  { id: 9, label: 'UPLOAD DOCUMENTS', icon: FileText },
  { id: 10, label: 'REVIEW', icon: ClipboardList }
];
