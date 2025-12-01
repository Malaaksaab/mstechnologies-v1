import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ServiceFiltersProps<T extends string> {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: T | null;
  onCategoryChange: (category: T | null) => void;
  categories: Record<T, string>;
  resultCount: number;
}

export function ServiceFilters<T extends string>({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  resultCount
}: ServiceFiltersProps<T>) {
  const categoryEntries = Object.entries(categories) as [T, string][];

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 py-6 text-lg glass-card border-border/50"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant={selectedCategory === null ? "neon" : "ghost"}
          size="sm"
          onClick={() => onCategoryChange(null)}
        >
          All
        </Button>
        {categoryEntries.map(([key, label]) => (
          <Button
            key={key}
            variant={selectedCategory === key ? "neon" : "ghost"}
            size="sm"
            onClick={() => onCategoryChange(key)}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-center text-sm text-muted-foreground">
        {resultCount} service{resultCount !== 1 ? 's' : ''} found
      </p>
    </div>
  );
}
