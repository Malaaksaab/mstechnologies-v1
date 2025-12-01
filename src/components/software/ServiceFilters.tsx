import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SoftwareCategory, categoryLabels } from '@/hooks/useSoftwareServices';

interface ServiceFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: SoftwareCategory | null;
  onCategoryChange: (category: SoftwareCategory | null) => void;
  resultCount: number;
}

const categories: SoftwareCategory[] = [
  'business_management',
  'education',
  'healthcare',
  'hospitality',
  'retail',
  'ecommerce',
  'web_development',
  'mobile_apps',
  'cloud_solutions',
  'custom_development',
];

export const ServiceFilters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  resultCount,
}: ServiceFiltersProps) => {
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search services... (e.g., POS, Hospital, School, Restaurant)"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 pr-12 py-6 text-lg bg-muted/30 border-border/50 focus:border-primary/50"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        <Button
          variant={selectedCategory === null ? 'neon' : 'ghost'}
          size="sm"
          onClick={() => onCategoryChange(null)}
          className="rounded-full"
        >
          <Filter className="w-4 h-4 mr-1" />
          All Services
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'neon' : 'ghost'}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className="rounded-full"
          >
            {categoryLabels[category]}
          </Button>
        ))}
      </motion.div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between"
      >
        <p className="text-muted-foreground">
          Showing <span className="text-primary font-semibold">{resultCount}</span> services
          {selectedCategory && (
            <span> in <span className="text-foreground">{categoryLabels[selectedCategory]}</span></span>
          )}
          {searchQuery && (
            <span> matching "<span className="text-foreground">{searchQuery}</span>"</span>
          )}
        </p>
        {(selectedCategory || searchQuery) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onCategoryChange(null);
              onSearchChange('');
            }}
          >
            Clear Filters
            <X className="w-4 h-4 ml-1" />
          </Button>
        )}
      </motion.div>
    </div>
  );
};
