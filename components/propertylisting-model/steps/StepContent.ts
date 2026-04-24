export interface StepContent {
  id: number;
  title: string;
  subtitle: string;
}

export const stepContents: StepContent[] = [
  { id: 1, title: 'Property Details', subtitle: 'Start with the basics.' },
  { id: 2, title: 'Room Categories', subtitle: 'Define your room types.' },
  { id: 3, title: 'Amenities', subtitle: 'Select what applies.' },
  { id: 4, title: 'Daily Menu', subtitle: 'Curated selection for guests.' },
  { id: 5, title: 'Photos', subtitle: 'Showcase your property.' },
  { id: 6, title: 'Extra Services', subtitle: 'Enhance guest stay.' },
  { id: 7, title: 'Transfer Service', subtitle: 'Configure pickup/drop-off.' },
  { id: 8, title: 'Rooms & Pricing', subtitle: 'Inventory and rates.' },
  { id: 9, title: 'Upload Documents', subtitle: 'Verify your property ownership.' },
  { id: 10, title: 'Ready to Launch?', subtitle: 'Your property listing is complete.' }
];
