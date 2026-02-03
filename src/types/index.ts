export type Severity = 'High' | 'Medium' | 'Low';
export type Status = 'Open' | 'Cleared';
export type Category = 'Add checks' | 'Prior-year mismatch' | 'Note reference issues' | 'Formatting hygiene';

export interface Issue {
  id: string;
  severity: Severity;
  category: Category;
  title: string;
  description: string;
  evidence: string;
  suggestedFix: string;
  status: Status;
  comments: string;
}

export interface Metadata {
  reportingStandard: 'IFRS' | 'UK GAAP' | 'Other';
  currency: string;
  rounding: string;
  periodEndDate: string;
  entityType: 'single' | 'group';
  email: string;
  draftStatement: File | null;
  priorYearStatement: File | null;
  trialBalance: File | null;
}

export interface CategoryCount {
  category: Category;
  count: number;
}

export interface SeverityCount {
  severity: Severity;
  count: number;
}
