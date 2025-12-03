import { MessageCircle } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { motion } from 'framer-motion';

export const WhatsAppButton = () => {
  const { data: settings } = useSiteSettings();
  
  // Get WhatsApp number from social links or dedicated whatsapp_number setting
  const whatsappNumber = settings?.social_links?.whatsapp || settings?.whatsapp_number || settings?.company_phone || '+923259479471';
  
  // Clean the number (remove spaces, dashes)
  const cleanNumber = whatsappNumber.replace(/[\s\-\(\)]/g, '');
  
  const handleClick = () => {
    const message = encodeURIComponent('Hello! I would like to inquire about your services.');
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
        Chat on WhatsApp
      </span>
    </motion.button>
  );
};