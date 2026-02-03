import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useDemo } from '@/context/DemoContext';
import { generateExampleIssues } from '@/data/demoIssues';
import { AlertCircle, Upload, FileText, Sparkles } from 'lucide-react';
import { Metadata } from '@/types';

export default function StartDemo() {
  const navigate = useNavigate();
  const { setMetadata, setIssues } = useDemo();
  
  const [formData, setFormData] = useState<Metadata>({
    reportingStandard: 'IFRS',
    currency: 'GBP',
    rounding: 'units',
    periodEndDate: '',
    entityType: 'single',
    email: '',
    draftStatement: null,
    priorYearStatement: null,
    trialBalance: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMetadata(formData);
    navigate('/results');
  };

  const handleLoadExample = () => {
    const exampleData: Metadata = {
      reportingStandard: 'UK GAAP',
      currency: 'GBP',
      rounding: '000',
      periodEndDate: '2025-12-31',
      entityType: 'group',
      email: 'demo@example.com',
      draftStatement: null,
      priorYearStatement: null,
      trialBalance: null,
    };
    setMetadata(exampleData);
    setIssues(generateExampleIssues());
    navigate('/results');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Start your demo review</h1>
            <p className="text-muted-foreground">Enter your financial statement details to generate a sample Exceptions Pack.</p>
          </div>

          {/* Demo Mode Notice */}
          <Card className="mb-8 border-l-4 border-l-severity-medium bg-severity-medium-bg/30">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-severity-medium shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Demo mode</p>
                <p className="text-sm text-muted-foreground">
                  Files are not automatically analysed in this prototype. The app will generate realistic sample issues to demonstrate the workflow.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Load Example */}
          <div className="mb-8">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleLoadExample}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Load Example Submission
            </Button>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Submission details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Reporting Standard */}
                <div className="space-y-2">
                  <Label htmlFor="standard">Reporting standard</Label>
                  <Select 
                    value={formData.reportingStandard} 
                    onValueChange={(value: 'IFRS' | 'UK GAAP' | 'Other') => 
                      setFormData(prev => ({ ...prev, reportingStandard: value }))
                    }
                  >
                    <SelectTrigger id="standard">
                      <SelectValue placeholder="Select standard" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IFRS">IFRS</SelectItem>
                      <SelectItem value="UK GAAP">UK GAAP</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Currency + Rounding */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select 
                      value={formData.currency} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
                    >
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rounding">Rounding</Label>
                    <Select 
                      value={formData.rounding} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, rounding: value }))}
                    >
                      <SelectTrigger id="rounding">
                        <SelectValue placeholder="Select rounding" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="units">Units</SelectItem>
                        <SelectItem value="000">£000 (thousands)</SelectItem>
                        <SelectItem value="m">£m (millions)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Period End Date */}
                <div className="space-y-2">
                  <Label htmlFor="periodEnd">Period end date</Label>
                  <Input
                    id="periodEnd"
                    type="date"
                    value={formData.periodEndDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, periodEndDate: e.target.value }))}
                  />
                </div>

                {/* Entity Type */}
                <div className="space-y-3">
                  <Label>Entity type</Label>
                  <RadioGroup 
                    value={formData.entityType}
                    onValueChange={(value: 'single' | 'group') => 
                      setFormData(prev => ({ ...prev, entityType: value }))
                    }
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="single" id="single" />
                      <Label htmlFor="single" className="font-normal cursor-pointer">Single entity</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="group" id="group" />
                      <Label htmlFor="group" className="font-normal cursor-pointer">Group</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* File Uploads */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Documents (optional for demo)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: 'draft', label: 'Draft statement', accept: '.pdf,.docx', hint: 'PDF or DOCX' },
                  { id: 'prior', label: 'Prior-year statement', accept: '.pdf', hint: 'PDF' },
                  { id: 'trial', label: 'Trial balance export', accept: '.xlsx,.xls', hint: 'Excel' },
                ].map((file) => (
                  <div key={file.id} className="border border-dashed border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center">
                        <Upload className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor={file.id} className="cursor-pointer">
                          <span className="font-medium text-foreground">{file.label}</span>
                          <p className="text-xs text-muted-foreground">{file.hint}</p>
                        </Label>
                        <Input
                          id={file.id}
                          type="file"
                          accept={file.accept}
                          className="hidden"
                          onChange={() => {}}
                        />
                      </div>
                      <Button type="button" variant="outline" size="sm" asChild>
                        <label htmlFor={file.id} className="cursor-pointer">
                          <FileText className="h-4 w-4 mr-1" />
                          Browse
                        </label>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full">
              Continue to Results
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
