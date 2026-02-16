import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const coverageItems = [
  'Adds checks for tables',
  'Reference checks / Internal consistency',
  'Prior year checks',
  'Console check',
  'Disclosure checklist',
  'Grammar / structure / formatting',
];

export function WorkflowCoverage() {
  return (
    <Card className="border-border/50 overflow-hidden max-w-2xl mx-auto">
      <CardContent className="p-6 md:p-8">
        <div className="grid sm:grid-cols-2 gap-4">
          {coverageItems.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
