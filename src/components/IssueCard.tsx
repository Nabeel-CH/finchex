import { Issue, Status } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SeverityBadge } from './SeverityBadge';
import { StatusBadge } from './StatusBadge';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface IssueCardProps {
  issue: Issue;
  onStatusChange: (id: string, status: Status) => void;
  onCommentChange: (id: string, comment: string) => void;
}

export function IssueCard({ issue, onStatusChange, onCommentChange }: IssueCardProps) {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <SeverityBadge severity={issue.severity} />
              <span className="text-xs text-muted-foreground">{issue.category}</span>
            </div>
            <h3 className="font-semibold text-foreground">{issue.title}</h3>
          </div>
          <StatusBadge status={issue.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-foreground">{issue.description}</p>
        </div>
        
        <div className="bg-muted rounded-md p-3">
          <p className="text-xs font-medium text-muted-foreground mb-1">Evidence</p>
          <p className="text-sm text-foreground">{issue.evidence}</p>
        </div>
        
        <div className="border-l-2 border-accent pl-3">
          <p className="text-xs font-medium text-muted-foreground mb-1">Suggested Fix</p>
          <p className="text-sm text-foreground">{issue.suggestedFix}</p>
        </div>
        
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1">
            Comments
          </label>
          <Textarea
            value={issue.comments}
            onChange={(e) => onCommentChange(issue.id, e.target.value)}
            placeholder="Add notes or comments..."
            className="min-h-[60px] text-sm"
          />
        </div>
        
        <div className="flex gap-2">
          {issue.status === 'Open' ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onStatusChange(issue.id, 'Cleared')}
              className="text-severity-low border-severity-low hover:bg-severity-low-bg"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Mark Cleared
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onStatusChange(issue.id, 'Open')}
              className="text-severity-medium border-severity-medium hover:bg-severity-medium-bg"
            >
              <AlertCircle className="h-4 w-4 mr-1" />
              Reopen
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
