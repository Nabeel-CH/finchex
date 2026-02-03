import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Issue, Metadata, Status } from '@/types';

interface DemoContextType {
  metadata: Metadata;
  setMetadata: (metadata: Metadata) => void;
  issues: Issue[];
  setIssues: (issues: Issue[]) => void;
  updateIssueStatus: (id: string, status: Status) => void;
  updateIssueComment: (id: string, comment: string) => void;
  resetDemo: () => void;
}

const defaultMetadata: Metadata = {
  reportingStandard: 'IFRS',
  currency: 'GBP',
  rounding: 'units',
  periodEndDate: '',
  entityType: 'single',
  email: '',
  draftStatement: null,
  priorYearStatement: null,
  trialBalance: null,
};

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [metadata, setMetadata] = useState<Metadata>(defaultMetadata);
  const [issues, setIssues] = useState<Issue[]>([]);

  const updateIssueStatus = (id: string, status: Status) => {
    setIssues(prev => prev.map(issue => 
      issue.id === id ? { ...issue, status } : issue
    ));
  };

  const updateIssueComment = (id: string, comment: string) => {
    setIssues(prev => prev.map(issue => 
      issue.id === id ? { ...issue, comments: comment } : issue
    ));
  };

  const resetDemo = () => {
    setMetadata(defaultMetadata);
    setIssues([]);
  };

  return (
    <DemoContext.Provider value={{
      metadata,
      setMetadata,
      issues,
      setIssues,
      updateIssueStatus,
      updateIssueComment,
      resetDemo,
    }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}
