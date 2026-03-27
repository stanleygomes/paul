export interface SearchableItem {
  content: string; // Used as the primary searchable title
  notes?: string; // Used as the secondary content
  tags?: string[]; // Extra searchable content if available
}
