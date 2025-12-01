import { motion } from 'framer-motion';
import { DollarSign, Clock, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    short_description?: string | null;
    description: string;
    features: string[];
    min_price?: number | null;
    max_price?: number | null;
    price_unit?: string | null;
    delivery_time?: string | null;
    is_featured?: boolean | null;
  };
  index: number;
  onClick: () => void;
}

export const ServiceCard = ({ service, index, onClick }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="glass-card-hover p-6 relative group"
    >
      {service.is_featured && (
        <div className="absolute -top-2 -right-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center gap-1">
          <Star className="w-3 h-3" />
          Featured
        </div>
      )}

      <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {service.title}
      </h3>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {service.short_description || service.description}
      </p>

      {/* Price Range */}
      {(service.min_price || service.max_price) && (
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="w-4 h-4 text-primary" />
          <span className="text-foreground font-semibold">
            ${service.min_price} - ${service.max_price}
          </span>
          {service.price_unit && (
            <span className="text-xs text-muted-foreground">({service.price_unit})</span>
          )}
        </div>
      )}

      {/* Delivery Time */}
      {service.delivery_time && (
        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{service.delivery_time}</span>
        </div>
      )}

      {/* Features Preview */}
      <div className="space-y-1 mb-4">
        {service.features.slice(0, 3).map((feature) => (
          <div key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
            <Check className="w-3 h-3 text-primary" />
            <span>{feature}</span>
          </div>
        ))}
        {service.features.length > 3 && (
          <span className="text-xs text-primary">+{service.features.length - 3} more features</span>
        )}
      </div>

      <Button
        variant="cyber"
        size="sm"
        className="w-full"
        onClick={onClick}
      >
        View Details & Order
      </Button>
    </motion.div>
  );
};
