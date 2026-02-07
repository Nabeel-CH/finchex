import { Link, useLocation } from 'react-router-dom';
import { FileCheck, Home, Play, ClipboardList } from 'lucide-react';

export function Header() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/start', label: 'Start Demo', icon: Play },
    { path: '/results', label: 'Results', icon: ClipboardList },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-primary" />
            <span className="font-bold text-foreground text-lg">FincheX</span>
            <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">Demo</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
