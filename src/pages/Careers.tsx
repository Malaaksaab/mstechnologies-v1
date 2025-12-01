import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { MapPin, Clock, Briefcase, ChevronRight, CheckCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const { data: careers, isLoading } = useQuery({
    queryKey: ['careers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('careers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  return (
    <>
      <Helmet>
        <title>Careers | Join Mikky Services Team</title>
        <meta name="description" content="Join our growing team at Mikky Services. Explore exciting career opportunities in software development, digital marketing, and customer success." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-24 pb-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Join Our Team
              </h1>
              <p className="text-lg text-muted-foreground">
                Build your career with a team that values innovation, growth, and work-life balance
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-12 container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Why Work With Us?</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Remote Flexibility', desc: 'Work from anywhere in the world' },
              { title: 'Growth Opportunities', desc: 'Continuous learning and career advancement' },
              { title: 'Competitive Pay', desc: 'Industry-leading compensation packages' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Job Listings */}
        <main className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-semibold text-foreground mb-8">Open Positions</h2>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card p-6 animate-pulse">
                  <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : careers?.length === 0 ? (
            <div className="text-center py-12 glass-card">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No open positions at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {careers?.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 hover:border-primary/50 transition-colors cursor-pointer group"
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {job.salary_range && (
                        <Badge variant="secondary">{job.salary_range}</Badge>
                      )}
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>

        {/* Job Detail Modal */}
        <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedJob && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedJob.title}</DialogTitle>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-2">
                    <Badge variant="outline">{selectedJob.department}</Badge>
                    <Badge variant="outline">{selectedJob.location}</Badge>
                    <Badge variant="outline">{selectedJob.type}</Badge>
                    {selectedJob.salary_range && (
                      <Badge>{selectedJob.salary_range}</Badge>
                    )}
                  </div>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Description</h4>
                    <p className="text-muted-foreground">{selectedJob.description}</p>
                  </div>

                  {selectedJob.requirements?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Requirements</h4>
                      <ul className="space-y-2">
                        {selectedJob.requirements.map((req: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedJob.benefits?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Benefits</h4>
                      <ul className="space-y-2">
                        {selectedJob.benefits.map((benefit: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button className="w-full" size="lg">
                    Apply Now
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        <Footer />
      </div>
    </>
  );
};

export default Careers;
