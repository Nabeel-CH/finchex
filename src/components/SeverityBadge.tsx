import { Severity } from '@/types';
import { cn } from '@/lib/utils';

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
}

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const severityStyles = {
    High: 'bg-severity-high-bg text-severity-high',
    Medium: 'bg-severity-medium-bg text-severity-medium',
    Low: 'bg-severity-low-bg text-severity-low',
  };

  return (
    <span className={cn(baseStyles, severityStyles[severity], className)}>
      {severity}
    </span>
  );
}
