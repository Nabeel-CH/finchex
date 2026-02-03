import jsPDF from 'jspdf';
import { Issue, Metadata, Category, Severity } from '@/types';

const categories: Category[] = ['Add checks', 'Prior-year mismatch', 'Note reference issues', 'Formatting hygiene'];
const severities: Severity[] = ['High', 'Medium', 'Low'];

export function generateExceptionsPDF(metadata: Metadata, issues: Issue[]) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Helper functions
  const addNewPage = () => {
    doc.addPage();
    y = margin;
    addFooter();
  };

  const checkPageBreak = (height: number) => {
    if (y + height > pageHeight - 30) {
      addNewPage();
    }
  };

  const addFooter = () => {
    const footerY = pageHeight - 15;
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Demo output — analyst-assisted prototype. Not a substitute for professional judgement.', margin, footerY);
    doc.text(`Page ${doc.getNumberOfPages()}`, pageWidth - margin - 15, footerY);
    doc.setTextColor(0, 0, 0);
  };

  // Calculate stats
  const total = issues.length;
  const open = issues.filter(i => i.status === 'Open').length;
  const cleared = issues.filter(i => i.status === 'Cleared').length;
  
  const byCategory = categories.map(category => ({
    category,
    count: issues.filter(i => i.category === category).length,
  }));
  
  const bySeverity = severities.map(severity => ({
    severity,
    count: issues.filter(i => i.severity === severity).length,
  }));

  // ===== COVER PAGE =====
  addFooter();

  // Title
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Exceptions Pack', margin, y + 20);
  y += 35;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Financial Statement Review', margin, y);
  y += 20;

  // Metadata box
  doc.setDrawColor(200, 200, 200);
  doc.setFillColor(248, 249, 250);
  doc.roundedRect(margin, y, contentWidth, 60, 3, 3, 'F');
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  y += 12;
  
  const metaItems = [
    ['Reporting Standard', metadata.reportingStandard || 'Not specified'],
    ['Currency / Rounding', `${metadata.currency || 'Not specified'} / ${metadata.rounding === '000' ? '£000' : metadata.rounding === 'm' ? '£m' : 'Units'}`],
    ['Period End', metadata.periodEndDate || 'Not specified'],
    ['Entity Type', metadata.entityType === 'group' ? 'Group' : 'Single entity'],
  ];
  
  metaItems.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(label + ':', margin + 8, y);
    doc.setFont('helvetica', 'normal');
    doc.text(String(value), margin + 50, y);
    y += 12;
  });

  y += 25;

  // Summary section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Summary', margin, y);
  y += 12;

  // Stats row
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total Issues: ${total}  |  Open: ${open}  |  Cleared: ${cleared}`, margin, y);
  y += 20;

  // By Severity
  doc.setFont('helvetica', 'bold');
  doc.text('By Severity:', margin, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  bySeverity.forEach(({ severity, count }) => {
    const color = severity === 'High' ? [220, 53, 69] : severity === 'Medium' ? [255, 193, 7] : [40, 167, 69];
    doc.setTextColor(color[0], color[1], color[2]);
    doc.text(`• ${severity}: ${count}`, margin + 5, y);
    y += 7;
  });
  doc.setTextColor(0, 0, 0);
  y += 10;

  // By Category
  doc.setFont('helvetica', 'bold');
  doc.text('By Category:', margin, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  byCategory.forEach(({ category, count }) => {
    doc.text(`• ${category}: ${count}`, margin + 5, y);
    y += 7;
  });
  y += 20;

  // ===== ISSUES TABLE PAGE =====
  addNewPage();
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Issues Summary', margin, y);
  y += 15;

  // Sort issues by severity then category
  const severityOrder: Record<Severity, number> = { High: 0, Medium: 1, Low: 2 };
  const sortedIssues = [...issues].sort((a, b) => {
    const sevDiff = severityOrder[a.severity] - severityOrder[b.severity];
    if (sevDiff !== 0) return sevDiff;
    return a.category.localeCompare(b.category);
  });

  // Table header
  doc.setFillColor(51, 65, 85);
  doc.rect(margin, y, contentWidth, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Severity', margin + 3, y + 7);
  doc.text('Category', margin + 28, y + 7);
  doc.text('Title', margin + 70, y + 7);
  doc.text('Status', pageWidth - margin - 20, y + 7);
  y += 10;
  doc.setTextColor(0, 0, 0);

  // Table rows
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  sortedIssues.forEach((issue, index) => {
    checkPageBreak(10);
    
    if (index % 2 === 0) {
      doc.setFillColor(248, 249, 250);
      doc.rect(margin, y, contentWidth, 9, 'F');
    }
    
    // Severity with color
    const color = issue.severity === 'High' ? [220, 53, 69] : issue.severity === 'Medium' ? [255, 193, 7] : [40, 167, 69];
    doc.setTextColor(color[0], color[1], color[2]);
    doc.text(issue.severity, margin + 3, y + 6);
    
    doc.setTextColor(0, 0, 0);
    doc.text(issue.category.substring(0, 18), margin + 28, y + 6);
    
    // Truncate title if needed
    const maxTitleWidth = 80;
    let title = issue.title;
    if (doc.getTextWidth(title) > maxTitleWidth) {
      while (doc.getTextWidth(title + '...') > maxTitleWidth && title.length > 0) {
        title = title.slice(0, -1);
      }
      title += '...';
    }
    doc.text(title, margin + 70, y + 6);
    
    doc.text(issue.status, pageWidth - margin - 20, y + 6);
    y += 9;
  });

  y += 15;

  // ===== ISSUE DETAILS =====
  addNewPage();
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Issue Details', margin, y);
  y += 15;

  sortedIssues.forEach((issue, index) => {
    checkPageBreak(70);

    // Issue header
    doc.setFillColor(248, 249, 250);
    doc.rect(margin, y, contentWidth, 12, 'F');
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${issue.title}`, margin + 3, y + 8);
    
    const color = issue.severity === 'High' ? [220, 53, 69] : issue.severity === 'Medium' ? [255, 193, 7] : [40, 167, 69];
    doc.setTextColor(color[0], color[1], color[2]);
    doc.text(`[${issue.severity}]`, pageWidth - margin - 20, y + 8);
    doc.setTextColor(0, 0, 0);
    y += 16;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');

    // Category & Status
    doc.setFont('helvetica', 'bold');
    doc.text('Category:', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(issue.category, margin + 25, y);
    doc.setFont('helvetica', 'bold');
    doc.text('Status:', margin + 80, y);
    doc.setFont('helvetica', 'normal');
    doc.text(issue.status, margin + 100, y);
    y += 8;

    // Description
    doc.setFont('helvetica', 'bold');
    doc.text('Description:', margin, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    const descLines = doc.splitTextToSize(issue.description, contentWidth - 5);
    doc.text(descLines, margin + 3, y);
    y += descLines.length * 4 + 5;

    // Evidence
    doc.setFont('helvetica', 'bold');
    doc.text('Evidence:', margin, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    const evidenceLines = doc.splitTextToSize(issue.evidence, contentWidth - 5);
    doc.text(evidenceLines, margin + 3, y);
    y += evidenceLines.length * 4 + 5;

    // Suggested Fix
    doc.setFont('helvetica', 'bold');
    doc.text('Suggested Fix:', margin, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    const fixLines = doc.splitTextToSize(issue.suggestedFix, contentWidth - 5);
    doc.text(fixLines, margin + 3, y);
    y += fixLines.length * 4 + 15;
  });

  // Save the PDF
  doc.save('exceptions-pack.pdf');
}
