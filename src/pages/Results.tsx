import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { SummaryCard } from '@/components/SummaryCard';
import { IssueCard } from '@/components/IssueCard';
import { SeverityBadge } from '@/components/SeverityBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDemo } from '@/context/DemoContext';
import { generateDemoIssues } from '@/data/demoIssues';
import { generateExceptionsPDF } from '@/utils/pdfGenerator';
import { Category, Severity, Status } from '@/types';
import { Download, RefreshCw, Wand2, FileText } from 'lucide-react';

const categories: Category[] = ['Add checks', 'Prior-year mismatch', 'Note reference issues', 'Formatting hygiene'];
const severities: Severity[] = ['High', 'Medium', 'Low'];

export default function Results() {
  const { metadata, issues, setIssues, updateIssueStatus, updateIssueComment, resetDemo } = useDemo();
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');

  const handleGenerateIssues = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIssues(generateDemoIssues());
      setIsGenerating(false);
    }, 800);
  };

  const handleDownloadPDF = () => {
    generateExceptionsPDF(metadata, issues);
  };

  const handleReset = () => {
    resetDemo();
  };

  // Calculate stats
  const stats = useMemo(() => {
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
    
    return { total, open, cleared, byCategory, bySeverity };
  }, [issues]);

  // Filter issues
  const filteredIssues = useMemo(() => {
    if (activeCategory === 'all') return issues;
    return issues.filter(i => i.category === activeCategory);
  }, [issues, activeCategory]);

  // Sort by severity then category
  const sortedIssues = useMemo(() => {
    const severityOrder: Record<Severity, number> = { High: 0, Medium: 1, Low: 2 };
    return [...filteredIssues].sort((a, b) => {
      const sevDiff = severityOrder[a.severity] - severityOrder[b.severity];
      if (sevDiff !== 0) return sevDiff;
      return a.category.localeCompare(b.category);
    });
  }, [filteredIssues]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">Exceptions Pack</h1>
              <p className="text-muted-foreground">
                {issues.length === 0 
                  ? 'Generate demo issues to see the results'
                  : `${stats.total} issues found across ${categories.length} categories`
                }
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleReset}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Demo
              </Button>
              {issues.length === 0 ? (
                <Button onClick={handleGenerateIssues} disabled={isGenerating}>
                  <Wand2 className="h-4 w-4 mr-2" />
                  {isGenerating ? 'Generating...' : 'Generate Demo Exceptions'}
                </Button>
              ) : (
                <Button onClick={handleDownloadPDF}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Exceptions Pack (PDF)
                </Button>
              )}
            </div>
          </div>

          {issues.length === 0 ? (
            /* Empty State */
            <Card className="text-center py-16">
              <CardContent>
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">No issues generated yet</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Click the button above to generate a realistic set of demo exceptions, 
                  or go back to start with the example submission.
                </p>
                <div className="flex justify-center gap-4">
                  <Link to="/start">
                    <Button variant="outline">Back to Start</Button>
                  </Link>
                  <Button onClick={handleGenerateIssues} disabled={isGenerating}>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Demo Exceptions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <SummaryCard title="Total Issues" value={stats.total} />
                <SummaryCard title="Open" value={stats.open} variant="warning" />
                <SummaryCard title="Cleared" value={stats.cleared} variant="success" />
                <Card className="animate-fade-in">
                  <CardContent className="p-6">
                    <p className="text-sm font-medium text-muted-foreground mb-2">By Severity</p>
                    <div className="flex items-center gap-2">
                      {stats.bySeverity.map(({ severity, count }) => (
                        <div key={severity} className="flex items-center gap-1">
                          <SeverityBadge severity={severity} />
                          <span className="text-sm font-medium text-foreground">{count}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Category Breakdown */}
              <Card className="mb-8">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Issues by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.byCategory.map(({ category, count }) => (
                      <div 
                        key={category} 
                        className="bg-muted rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors"
                        onClick={() => setActiveCategory(category)}
                      >
                        <p className="text-sm font-medium text-muted-foreground">{category}</p>
                        <p className="text-2xl font-bold text-foreground">{count}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Issues List */}
              <div className="mb-8">
                <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as Category | 'all')}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
                    {categories.map(cat => (
                      <TabsTrigger key={cat} value={cat}>
                        {cat.split(' ')[0]} ({stats.byCategory.find(c => c.category === cat)?.count || 0})
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  <TabsContent value={activeCategory} className="mt-0">
                    <div className="grid gap-4 md:grid-cols-2">
                      {sortedIssues.map((issue) => (
                        <IssueCard
                          key={issue.id}
                          issue={issue}
                          onStatusChange={updateIssueStatus}
                          onCommentChange={updateIssueComment}
                        />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
