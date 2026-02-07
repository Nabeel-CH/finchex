import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Upload, CheckSquare, FileText, ClipboardCheck, Play, Shield, Mail, ChevronDown } from 'lucide-react';
import cambridgeUniversityLogo from '@/assets/cambridge-university-logo.png';
import cambridgeFoundersLogo from '@/assets/cambridge-founders-logo.png';
import { ComparisonTable } from '@/components/ComparisonTable';

// ============================================================
// EDIT THIS URL TO CHANGE THE EMBEDDED VIDEO
// Supports YouTube, Vimeo, or Loom embed URLs
// ============================================================
const VIDEO_EMBED_URL = ''; // e.g., 'https://www.youtube.com/embed/dQw4w9WgXcQ'

const painOptions = [
  { id: 'add_checks', label: 'Add checks' },
  { id: 'prior_year', label: 'Prior-year' },
  { id: 'note_references', label: 'Note references' },
  { id: 'tb_tie_out', label: 'TB-to-FS tie-out' },
  { id: 'disclosure_checklist', label: 'Disclosure checklist' },
  { id: 'formatting_churn', label: 'Formatting/version churn' },
  { id: 'other', label: 'Other' },
];

export default function MarketingPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    role: '',
    companyName: '',
    companySize: '',
    userType: '',
    biggestPains: [] as string[],
    additionalNotes: '',
  });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePainToggle = (painId: string) => {
    setFormData(prev => ({
      ...prev,
      biggestPains: prev.biggestPains.includes(painId)
        ? prev.biggestPains.filter(p => p !== painId)
        : [...prev.biggestPains, painId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.workEmail || !formData.role || 
        !formData.companyName || !formData.companySize || !formData.userType ||
        formData.biggestPains.length === 0) {
      toast({
        title: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('pilot_signups').insert({
        full_name: formData.fullName,
        work_email: formData.workEmail,
        role: formData.role,
        company_name: formData.companyName,
        company_size: formData.companySize,
        user_type: formData.userType,
        biggest_pains: formData.biggestPains,
        additional_notes: formData.additionalNotes || null,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: 'Thanks — we\'ll be in touch shortly.',
      });
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <span className="font-bold text-foreground text-xl">FincheX</span>
            <nav className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={() => scrollToSection('demo')}>
                Watch demo
              </Button>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => scrollToSection('pilot')}>
                Join pilot
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Unit tests for financial statements — delivered as an{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Exceptions Pack</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/30 -z-0"></span>
              </span>.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Catch add/check errors, prior-year mismatches, and broken note references in minutes. 
              Prototype for early pilots.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => scrollToSection('demo')}>
                <Play className="h-4 w-4 mr-2" />
                Watch the demo
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-accent" onClick={() => scrollToSection('pilot')}>
                Join pilot
              </Button>
            </div>
          </div>

          {/* Backed By Section */}
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-xs uppercase tracking-widest text-muted-foreground text-center mb-6">
              Backed by
            </p>
            <div className="flex items-center justify-center gap-12 md:gap-20">
              <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                <img 
                  src={cambridgeUniversityLogo} 
                  alt="University of Cambridge" 
                  className="h-12 md:h-14 text-muted-foreground"
                  style={{ filter: 'invert(0.7)' }}
                />
                <span className="text-muted-foreground text-sm font-medium">University of Cambridge</span>
              </div>
              <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                <img 
                  src={cambridgeFoundersLogo} 
                  alt="Cambridge Founders" 
                  className="h-10 md:h-12"
                  style={{ filter: 'invert(0.7)' }}
                />
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="flex justify-center mt-12">
              <ChevronDown className="h-6 w-6 text-muted-foreground animate-bounce" />
            </div>
          </div>
        </section>

        {/* Demo Video Section */}
        <section id="demo" className="py-16 bg-card/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
              2-minute demo
            </h2>
            
            <div className="aspect-video bg-card rounded-lg border border-border overflow-hidden mb-8">
              {VIDEO_EMBED_URL ? (
                <iframe
                  src={VIDEO_EMBED_URL}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Demo video"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Play className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    <p>Video coming soon</p>
                    <p className="text-sm mt-1 text-muted-foreground/60">Edit VIDEO_EMBED_URL in MarketingPage.tsx</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-primary font-bold mb-2">1</div>
                <p className="text-sm text-muted-foreground">
                  Upload draft FS + prior year + TB export
                </p>
              </div>
              <div>
                <div className="text-primary font-bold mb-2">2</div>
                <p className="text-sm text-muted-foreground">
                  Generate exceptions pack + issue list
                </p>
              </div>
              <div>
                <div className="text-primary font-bold mb-2">3</div>
                <p className="text-sm text-muted-foreground">
                  Clear issues with an audit-friendly trail
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
              How we compare
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              See how FincheX stacks up against existing solutions
            </p>
            <Card className="border-border/50 overflow-hidden">
              <CardContent className="p-0">
                <ComparisonTable />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
              How it works
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Upload, title: 'Upload', desc: 'Add your draft statements and supporting files' },
                { icon: CheckSquare, title: 'Checks', desc: 'Automated checks run against your documents' },
                { icon: FileText, title: 'Exceptions Pack', desc: 'Get a structured report of findings' },
                { icon: ClipboardCheck, title: 'Review & sign-off', desc: 'Clear issues with tracked comments' },
              ].map((item) => (
                <Card key={item.title}>
                  <CardContent className="p-6 text-center">
                    <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Built for confidential drafts
              </h2>
            </div>
            <ul className="space-y-4 max-w-xl mx-auto">
              {[
                "Prototype: we only collect what's needed for the pilot.",
                "Files are handled privately and can be deleted on request.",
                "No claims of full automation or guarantees.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckSquare className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Signup Form */}
        <section id="pilot" className="py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-2">
              Join the pilot
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              We're looking for finance teams to trial the prototype.
            </p>

            {isSubmitted ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="h-16 w-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Thanks — we'll be in touch shortly.
                  </h3>
                  <p className="text-muted-foreground">
                    Keep an eye on your inbox for next steps.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">
                          Full name *
                        </label>
                        <Input
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Jane Smith"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">
                          Work email *
                        </label>
                        <Input
                          type="email"
                          value={formData.workEmail}
                          onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                          placeholder="jane@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">
                          Role *
                        </label>
                        <Select
                          value={formData.role}
                          onValueChange={(value) => setFormData({ ...formData, role: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cfo_finance">CFO/Finance</SelectItem>
                            <SelectItem value="external_audit">External Audit</SelectItem>
                            <SelectItem value="internal_audit">Internal Audit</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">
                          Company name *
                        </label>
                        <Input
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="Acme Corp"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">
                          Company size *
                        </label>
                        <Select
                          value={formData.companySize}
                          onValueChange={(value) => setFormData({ ...formData, companySize: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1–10</SelectItem>
                            <SelectItem value="11-50">11–50</SelectItem>
                            <SelectItem value="51-200">51–200</SelectItem>
                            <SelectItem value="200+">200+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">
                          What best describes you? *
                        </label>
                        <Select
                          value={formData.userType}
                          onValueChange={(value) => setFormData({ ...formData, userType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="preparer">Preparer</SelectItem>
                            <SelectItem value="reviewer">Reviewer</SelectItem>
                            <SelectItem value="auditor">Auditor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-3 block">
                        Biggest pain points * (select all that apply)
                      </label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {painOptions.map((pain) => (
                          <label
                            key={pain.id}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <Checkbox
                              checked={formData.biggestPains.includes(pain.id)}
                              onCheckedChange={() => handlePainToggle(pain.id)}
                            />
                            <span className="text-sm text-foreground">{pain.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Anything else we should know?
                      </label>
                      <Textarea
                        value={formData.additionalNotes}
                        onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                        placeholder="Optional"
                        rows={3}
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Join the pilot'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="font-bold text-foreground mb-1 text-lg">FincheX</p>
          <p className="text-sm text-muted-foreground mb-3">
            Contact: <a href="mailto:hello@example.com" className="underline hover:text-foreground transition-colors">hello@example.com</a>
          </p>
          <p className="text-xs text-muted-foreground">
            Demo only — not a substitute for professional judgement.
          </p>
        </div>
      </footer>
    </div>
  );
}
