import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SoftwareService, categoryLabels } from '@/hooks/useSoftwareServices';
import { ArrowRight, Star } from 'lucide-react';

interface ServiceCardProps {
  service: SoftwareService;
  index: number;
  onBook: (service: SoftwareService) => void;
}

export const ServiceCard = ({ service, index, onBook }: ServiceCardProps) => {
  // Dynamic icon lookup
  const IconComponent = (Icons as any)[service.icon_name || 'Code'] || Icons.Code;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="glass-card-hover p-6 group relative"
    >
      {service.is_featured && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </div>
        </div>
      )}

      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <IconComponent className="w-6 h-6 text-primary" />
      </div>

      <div className="mb-2">
        <span className="text-xs px-2 py-1 rounded-full bg-muted/50 text-muted-foreground">
          {categoryLabels[service.category]}
        </span>
      </div>

      <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {service.title}
      </h3>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {service.short_description || service.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {service.features.slice(0, 4).map((feature) => (
          <span
            key={feature}
            className="px-2 py-0.5 text-xs bg-muted/50 text-muted-foreground rounded"
          >
            {feature}
          </span>
        ))}
        {service.features.length > 4 && (
          <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded">
            +{service.features.length - 4} more
          </span>
        )}
      </div>

      {service.price_range && (
        <p className="text-sm font-medium text-primary mb-4">{service.price_range}</p>
      )}

      <div className="flex flex-wrap gap-1.5 mb-4">
        {service.technologies.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 text-xs border border-border/50 text-muted-foreground rounded"
          >
            {tech}
          </span>
        ))}
      </div>

      <Button
        variant="cyber"
        size="sm"
        className="w-full"
        onClick={() => onBook(service)}
      >
        Book Now
        <ArrowRight className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};
