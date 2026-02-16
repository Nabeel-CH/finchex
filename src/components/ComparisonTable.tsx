import { Check, X } from 'lucide-react';

const competitors = ['KPMG Checker', 'Workiva', 'DataSnipper', 'FincheX'];

const features = [
  { 
    name: 'Legislative disclosure check',
    support: [false, false, false, true]
  },
  { 
    name: 'Consol check',
    support: [false, true, true, true]
  },
  { 
    name: 'No integration software required',
    support: [true, false, true, true]
  },
  { 
    name: 'Confidential & secure',
    support: [true, true, true, true]
  },
  { 
    name: 'Accessible to all users',
    support: [false, false, false, true]
  },
  { 
    name: 'Free to try',
    support: [false, false, false, true]
  },
  { 
    name: 'Ability to make inline changes',
    support: [false, false, false, true]
  },
];

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left py-4 px-4 text-muted-foreground font-medium border-b border-border">
              Feature
            </th>
            {competitors.map((competitor, index) => (
              <th 
                key={competitor} 
                className={`py-4 px-3 text-center font-medium border-b border-border ${
                  index === competitors.length - 1 
                    ? 'text-primary bg-primary/5' 
                    : 'text-muted-foreground'
                }`}
              >
                {competitor}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr key={feature.name} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
              <td className="py-4 px-4 text-foreground text-sm">
                {feature.name}
              </td>
              {feature.support.map((supported, colIndex) => (
                <td 
                  key={colIndex} 
                  className={`py-4 px-3 text-center ${
                    colIndex === competitors.length - 1 ? 'bg-primary/5' : ''
                  }`}
                >
                  {supported ? (
                    <Check className="h-5 w-5 text-emerald-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-red-500/70 mx-auto" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
