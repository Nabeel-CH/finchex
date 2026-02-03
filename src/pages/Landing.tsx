import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { CheckCircle, FileSearch, History, Link2 } from 'lucide-react';

const features = [
  {
    icon: CheckCircle,
    title: 'Add checks',
    description: 'Verify that totals sum correctly and subtotals match throughout your statements.',
  },
  {
    icon: History,
    title: 'Prior-year consistency',
    description: 'Confirm that comparative figures match your signed prior-year statements.',
  },
  {
    icon: Link2,
    title: 'Note reference integrity',
    description: 'Check that all note references exist and cross-references are accurate.',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <FileSearch className="h-4 w-4" />
            Prototype Demo
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Unit tests for financial statements — delivered as an{' '}
            <span className="text-primary">Exceptions Pack</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Review your draft financial statements for common errors before they become audit issues. 
            Get a structured report highlighting inconsistencies, broken references, and calculation errors.
          </p>
          
          <Link to="/start">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Demo
            </Button>
          </Link>
        </div>
        
        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {features.map((feature) => (
            <Card key={feature.title} className="animate-fade-in">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* How it works */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Upload', description: 'Add your draft statements and supporting documents' },
              { step: '2', title: 'Review', description: 'Our checks identify inconsistencies and errors' },
              { step: '3', title: 'Export', description: 'Download your Exceptions Pack for the audit file' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="h-10 w-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Financials Checker — Demo. This is a concept prototype, not a production tool.</p>
        </div>
      </footer>
    </div>
  );
}
