import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  value: number;
  subtitle?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

export function SummaryCard({ title, value, subtitle, variant = 'default', className }: SummaryCardProps) {
  const variantStyles = {
    default: 'border-border',
    success: 'border-l-4 border-l-severity-low',
    warning: 'border-l-4 border-l-severity-medium',
    danger: 'border-l-4 border-l-severity-high',
  };

  return (
    <Card className={cn('animate-fade-in', variantStyles[variant], className)}>
      <CardContent className="p-6">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}
