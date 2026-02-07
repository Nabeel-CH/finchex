import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Play, Shield, Mail, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import cambridgeUniversityLogo from '@/assets/cambridge-university-logo.png';
import cambridgeFoundersLogo from '@/assets/cambridge-founders-logo.png';
import { ComparisonTable } from '@/components/ComparisonTable';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// ============================================================
// DEMO SLIDES CONFIGURATION
// Add your demo slide images here
// ============================================================
const DEMO_SLIDES = [
  {
    id: 1,
    title: 'Slide 1',
    image: '', // Add image path here
    description: 'Demo slide 1',
  },
  {
    id: 2,
    title: 'Slide 2',
    image: '', // Add image path here
    description: 'Demo slide 2',
  },
  {
    id: 3,
    title: 'Slide 3',
    image: '', // Add image path here
    description: 'Demo slide 3',
  },
];

export default function MarketingPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    workEmail: '',
  });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.workEmail) {
      toast({
        title: 'Please enter your email address',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('pilot_signups').insert({
        work_email: formData.workEmail,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Thanks — we'll be in touch shortly.",
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
                View demo
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
              The AI end-to-end financial statement checker
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Catch add/check errors, prior-year mismatches, and broken note references in minutes. Prototype for early pilots.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => scrollToSection('demo')}>
                <Play className="h-4 w-4 mr-2" />
                View the demo
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-accent" onClick={() => scrollToSection('pilot')}>
                Join pilot
              </Button>
            </div>
          </div>

          {/* Backed By Section */}
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-xs uppercase tracking-widest text-muted-foreground text-center mb-6">Backed by</p>
            <div className="flex items-center justify-center gap-12 md:gap-20">
              <div className="flex items-center gap-3 transition-opacity">
                <img
                  src={cambridgeUniversityLogo}
                  alt="Cmabridge Founders"
                  className="h-12 md:h-14"
                />
                <span className="text-muted-foreground text-sm font-medium">University of Cambridge</span>
              </div>
              <div className="flex items-center gap-3 transition-opacity">
                <img
                  src={cambridgeFoundersLogo}
                  alt="Cambridge Founders"
                  className="h-10 md:h-12"
                />
                <span className="text-muted-foreground text-sm font-medium">Cambridge Founders</span>
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <ChevronDown className="h-6 w-6 text-muted-foreground animate-bounce" />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">How it works</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Play className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Upload</h3>
                  <p className="text-sm text-muted-foreground">Add your draft statements and supporting files</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Play className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Checks</h3>
                  <p className="text-sm text-muted-foreground">Automated checks run against your documents</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Play className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Exceptions Pack</h3>
                  <p className="text-sm text-muted-foreground">Get a structured report of findings</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Play className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Review & sign-off</h3>
                  <p className="text-sm text-muted-foreground">Clear issues with tracked comments</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Demo Slides Section */}
        <section id="demo" className="py-16 bg-card/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">2-minute demo</h2>

            <Carousel className="w-full mb-8">
              <CarouselContent>
                {DEMO_SLIDES.map((slide) => (
                  <CarouselItem key={slide.id}>
                    <div className="aspect-video bg-card rounded-lg border border-border overflow-hidden">
                      {slide.image ? (
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <div className="text-center">
                            <Play className="h-16 w-16 mx-auto mb-4 opacity-30" />
                            <p className="text-lg font-medium mb-2">{slide.title}</p>
                            <p className="text-sm text-muted-foreground/60">Add demo slide images to DEMO_SLIDES in MarketingPage.tsx</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-primary font-bold mb-2">1</div>
                <p className="text-sm text-muted-foreground">Upload draft FS + prior year + TB export</p>
              </div>
              <div>
                <div className="text-primary font-bold mb-2">2</div>
                <p className="text-sm text-muted-foreground">Generate exceptions pack + issue list</p>
              </div>
              <div>
                <div className="text-primary font-bold mb-2">3</div>
                <p className="text-sm text-muted-foreground">Clear issues with an audit-friendly trail</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">How we compare</h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">See how FincheX stacks up against existing solutions</p>
            <Card className="border-border/50 overflow-hidden">
              <CardContent className="p-0">
                <ComparisonTable />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Built for confidential drafts</h2>
            </div>
            <ul className="space-y-4 max-w-xl mx-auto">
              {[
                "Prototype: we only collect what's needed for the pilot.",
                "Files are handled privately and can be deleted on request.",
                "No claims of full automation or guarantees.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Play className="h-3 w-3 text-primary" />
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
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-2">Join the pilot</h2>
            <p className="text-muted-foreground text-center mb-8">We're looking for finance teams to trial the prototype.</p>

            {isSubmitted ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="h-16 w-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Thanks — we'll be in touch shortly.</h3>
                  <p className="text-muted-foreground">Keep an eye on your inbox for next steps.</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Work email *</label>
                      <Input
                        type="email"
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder="jane@company.com"
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
          <p className="text-sm text-muted-foreground mb-3">Contact: <a href="mailto:hello@example.com" className="underline hover:text-foreground transition-colors">hello@example.com</a></p>
          <p className="text-xs text-muted-foreground">Demo only — not a substitute for professional judgement.</p>
        </div>
      </footer>
    </div>
  );
}
