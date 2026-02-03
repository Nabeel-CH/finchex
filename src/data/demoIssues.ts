import { Issue, Category, Severity } from '@/types';

const generateId = () => Math.random().toString(36).substring(2, 9);

interface IssueTemplate {
  category: Category;
  severity: Severity;
  title: string;
  description: string;
  evidence: string;
  suggestedFix: string;
}

const issueTemplates: IssueTemplate[] = [
  // Add checks - totals don't sum
  {
    category: 'Add checks',
    severity: 'High',
    title: 'Total assets calculation error',
    description: 'The sum of current assets and non-current assets does not equal total assets as stated.',
    evidence: 'Page 5, Balance Sheet: Current assets (£2,450k) + Non-current assets (£8,320k) = £10,770k, but Total assets shows £10,870k',
    suggestedFix: 'Verify individual asset line items and recalculate the total. Check for rounding adjustments or missing items.',
  },
  {
    category: 'Add checks',
    severity: 'High',
    title: 'Income statement subtotal mismatch',
    description: 'Gross profit calculation does not reconcile with revenue minus cost of sales.',
    evidence: 'Page 4, Income Statement: Revenue (£15,420k) - Cost of sales (£9,250k) = £6,170k, but Gross profit shows £6,270k',
    suggestedFix: 'Review revenue and cost of sales line items. Verify no items are double-counted or omitted.',
  },
  {
    category: 'Add checks',
    severity: 'Medium',
    title: 'Cash flow statement does not reconcile to balance sheet',
    description: 'Net change in cash per cash flow statement differs from balance sheet movement.',
    evidence: 'Page 7: CFS shows net increase of £340k, but BS movement in cash is £380k',
    suggestedFix: 'Check for foreign exchange effects on cash, or review cash flow categories for misclassification.',
  },
  {
    category: 'Add checks',
    severity: 'Medium',
    title: 'Retained earnings roll-forward error',
    description: 'Opening retained earnings plus profit less dividends does not equal closing retained earnings.',
    evidence: 'Note 18: Opening (£4,200k) + Profit (£1,850k) - Dividends (£500k) = £5,550k, but closing shows £5,450k',
    suggestedFix: 'Review Statement of Changes in Equity for other comprehensive income items or prior year adjustments.',
  },
  {
    category: 'Add checks',
    severity: 'Low',
    title: 'Minor rounding variance in tax reconciliation',
    description: 'Tax reconciliation percentages do not sum to effective tax rate shown.',
    evidence: 'Note 9: Sum of adjustments is 24.3% but effective rate shown as 24.5%',
    suggestedFix: 'Adjust presentation rounding or add a rounding line item to the reconciliation.',
  },
  // Prior-year mismatch
  {
    category: 'Prior-year mismatch',
    severity: 'High',
    title: 'Comparative trade receivables differ from prior-year statement',
    description: 'The comparative figure for trade receivables does not match the prior-year audited balance.',
    evidence: 'Page 5: 2024 comparative shows £1,250k, but 2024 audited statements show £1,350k',
    suggestedFix: 'Confirm whether a restatement was made. If so, disclose in notes. If not, correct the comparative.',
  },
  {
    category: 'Prior-year mismatch',
    severity: 'High',
    title: 'Revenue comparative inconsistent',
    description: 'Prior-year revenue in current statements differs from signed prior-year accounts.',
    evidence: 'Page 4: 2024 revenue shown as £14,800k, prior-year statements show £14,920k',
    suggestedFix: 'Investigate whether a restatement occurred. Update comparatives or provide disclosure.',
  },
  {
    category: 'Prior-year mismatch',
    severity: 'Medium',
    title: 'Comparative EPS calculation differs',
    description: 'Earnings per share comparative does not match prior-year calculation.',
    evidence: 'Note 12: Prior-year EPS shown as 42.5p, but prior-year statements show 41.8p',
    suggestedFix: 'Recalculate comparative EPS using consistent methodology. Adjust if share count changed.',
  },
  {
    category: 'Prior-year mismatch',
    severity: 'Low',
    title: 'Minor comparative note disclosure variance',
    description: 'Related party transaction comparative has minor difference from prior year.',
    evidence: 'Note 24: 2024 management fees shown as £180k, prior-year note shows £175k',
    suggestedFix: 'Verify source data and correct if necessary. Differences may require explanation.',
  },
  // Note reference issues
  {
    category: 'Note reference issues',
    severity: 'High',
    title: 'Referenced note does not exist',
    description: 'A note reference in the primary statements points to a non-existent note.',
    evidence: 'Page 5: "Investments (Note 15)" referenced, but Note 15 covers Provisions, not Investments',
    suggestedFix: 'Correct the note reference or add the missing Investments note.',
  },
  {
    category: 'Note reference issues',
    severity: 'Medium',
    title: 'Duplicate note reference',
    description: 'Two different line items reference the same note, creating ambiguity.',
    evidence: 'Page 4: Both "Other income" and "Finance income" reference Note 6',
    suggestedFix: 'Create separate notes or expand Note 6 with clear subsections for each item.',
  },
  {
    category: 'Note reference issues',
    severity: 'Medium',
    title: 'Broken cross-reference in notes',
    description: 'A note references another note that does not contain the expected information.',
    evidence: 'Note 8 states "See Note 22 for lease details", but Note 22 covers Contingencies',
    suggestedFix: 'Update cross-reference to correct note number or add lease information to appropriate note.',
  },
  {
    category: 'Note reference issues',
    severity: 'Low',
    title: 'Missing note reference',
    description: 'A material line item in primary statements has no note reference.',
    evidence: 'Page 5: "Deferred tax asset £890k" has no accompanying note reference',
    suggestedFix: 'Add note reference and ensure corresponding disclosure exists.',
  },
  // Formatting hygiene
  {
    category: 'Formatting hygiene',
    severity: 'Medium',
    title: 'Page number sequence error',
    description: 'Page numbers skip from one number to another, missing intermediate pages.',
    evidence: 'PDF pages jump from page 12 to page 14',
    suggestedFix: 'Review document assembly and correct page numbering sequence.',
  },
  {
    category: 'Formatting hygiene',
    severity: 'Low',
    title: 'Inconsistent heading styles',
    description: 'Note headings use different formatting styles throughout the document.',
    evidence: 'Notes 1-10 use bold headings, Notes 11-20 use underlined headings',
    suggestedFix: 'Apply consistent heading style throughout all notes.',
  },
  {
    category: 'Formatting hygiene',
    severity: 'Low',
    title: 'Table column alignment inconsistent',
    description: 'Numerical columns are not consistently right-aligned across tables.',
    evidence: 'Page 8: Note 5 has center-aligned numbers, other notes use right-alignment',
    suggestedFix: 'Standardize table formatting with right-aligned numerical columns.',
  },
  {
    category: 'Formatting hygiene',
    severity: 'Low',
    title: 'Currency symbol inconsistency',
    description: 'Mix of £ and GBP symbols used throughout the document.',
    evidence: 'Balance sheet uses "£000", notes use "GBP thousands"',
    suggestedFix: 'Standardize currency presentation format throughout the document.',
  },
  {
    category: 'Formatting hygiene',
    severity: 'Low',
    title: 'Date format inconsistency',
    description: 'Multiple date formats used in the document.',
    evidence: 'Cover shows "31 December 2025", notes show "31/12/2025" and "December 31, 2025"',
    suggestedFix: 'Use consistent date format throughout, typically "31 December 2025" for UK filings.',
  },
];

export function generateDemoIssues(): Issue[] {
  const shuffled = [...issueTemplates].sort(() => Math.random() - 0.5);
  const count = Math.floor(Math.random() * 9) + 12; // 12-20 issues
  
  return shuffled.slice(0, count).map(template => ({
    id: generateId(),
    ...template,
    status: 'Open' as const,
    comments: '',
  }));
}

export function generateExampleIssues(): Issue[] {
  return issueTemplates.slice(0, 15).map(template => ({
    id: generateId(),
    ...template,
    status: 'Open' as const,
    comments: '',
  }));
}
