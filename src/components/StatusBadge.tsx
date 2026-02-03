import { Status } from '@/types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const statusStyles = {
    Open: 'bg-status-open-bg text-status-open',
    Cleared: 'bg-status-cleared-bg text-status-cleared',
  };

  return (
    <span className={cn(baseStyles, statusStyles[status], className)}>
      {status}
    </span>
  );
}
