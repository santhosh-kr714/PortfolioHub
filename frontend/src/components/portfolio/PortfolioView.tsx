import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Globe, Share2, Link as LinkIcon, Mail, ExternalLink, Download, ChevronDown, Calendar, MapPin, Building2, GraduationCap, Award, Trophy, Code2, Phone, Send, Plus, X, ChevronLeft, ChevronRight, Eye, ZoomIn, ZoomOut } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export default function PortfolioView({ previewMode = false }: { previewMode?: boolean }) {
  const { username } = useParams();
  const storeData = usePortfolioStore();
  const [dbData, setDbData] = useState<any>(null);
  const [loading, setLoading] = useState(!previewMode);
  
  // Interactive Certificate Modal & Lightbox states
  const [activeCertIndex, setActiveCertIndex] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (previewMode) {
      setLoading(false);
      return;
    }

    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        // Simulate fetching user portfolio from API or localStorage
        setTimeout(() => {
          setDbData(null); // No DB data, falls back to empty states
          setLoading(false);
        }, 800);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [username, previewMode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-white animate-spin" />
      </div>
    );
  }

  // Bind values from Zustand (for dashboard preview) or dbData (for public)
  const user = previewMode ? storeData.profile : (dbData?.user || storeData.profile);
  const projects = previewMode ? storeData.projects : (dbData?.projects || storeData.projects || []);
  const skills = previewMode ? storeData.skills : (dbData?.skills || storeData.skills || []);
  const experience = previewMode ? storeData.experience : (dbData?.experience || storeData.experience || []);
  const education = previewMode ? storeData.education : (dbData?.education || storeData.education || []);
  const certificates = previewMode ? storeData.certificates : (dbData?.certificates || storeData.certificates || []);
  const achievements = previewMode ? storeData.achievements : (dbData?.achievements || storeData.achievements || []);
  const socialLinks = previewMode ? storeData.socialLinks : (dbData?.socialLinks || storeData.socialLinks || []);
  const theme = previewMode ? storeData.theme : (dbData?.theme || storeData.theme);

  const primaryColor = theme?.primary_color || '#8B5CF6';
  const bgColor = theme?.background_color || '#050505';
  const fontFam = theme?.font_family || 'Inter';

  // Group skills
  const groupedSkills = (skills || []).reduce((acc: any, skill: any) => {
    const cat = skill.category || 'Programming';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const sortedExp = [...(experience || [])].sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
  const sortedEdu = [...(education || [])].sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());

  const isProfileEmpty = !user?.full_name || user.full_name === 'Your Name' || user.full_name === '';

  // Elegant Glassmorphic Empty State Card
  const EmptyStateCard = ({ title, linkPath, linkText }: { title: string, linkPath: string, linkText: string }) => (
    <div className="bg-white/5 border border-white/10 border-dashed rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[200px] backdrop-blur-md">
      <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
      {previewMode && (
        <Link to={linkPath} className="mt-4 flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all">
          <Plus className="w-4 h-4" /> {linkText}
        </Link>
      )}
    </div>
  );

  // Modal browse handlers
  const handlePrevCert = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCertIndex(prev => prev !== null ? (prev === 0 ? certificates.length - 1 : prev - 1) : null);
    setZoomLevel(1);
  };

  const handleNextCert = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCertIndex(prev => prev !== null ? (prev === certificates.length - 1 ? 0 : prev + 1) : null);
    setZoomLevel(1);
  };

  const activeCert = activeCertIndex !== null ? certificates[activeCertIndex] : null;
  const isPdf = activeCert?.image_url?.toLowerCase().endsWith('.pdf') || activeCert?.image_url?.includes('data:application/pdf');

  return (
    <div 
      className="min-h-screen text-gray-200 selection:bg-white/30 overflow-hidden relative w-full"
      style={{ backgroundColor: bgColor, fontFamily: fontFam }}
    >
      <Helmet>
        <title>{user?.full_name || 'Portfolio'} - {user?.headline || 'PortfolioHub'}</title>
        <meta name="description" content={user?.bio} />
      </Helmet>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-50"
        style={{ scaleX, backgroundColor: primaryColor }}
      />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-6 pt-20">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] blur-[120px] rounded-full mix-blend-screen pointer-events-none opacity-20" style={{ backgroundColor: primaryColor }} />
        
        <div className="max-w-5xl mx-auto z-10 w-full flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden p-[3px] mb-8 mx-auto md:mx-0 shadow-2xl relative"
            >
              <motion.div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(to right, ${primaryColor}, #EC4899, #3B82F6)`
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 6 }}
              />
              <div className="w-full h-full rounded-full bg-black relative p-[2px] overflow-hidden flex items-center justify-center">
                {user?.profile_image ? (
                   <img src={user.profile_image} alt="" className="w-full h-full object-cover rounded-full" />
                ) : (
                   <div className="w-full h-full bg-gradient-to-tr from-gray-800 to-gray-900 flex items-center justify-center text-4xl font-bold text-white rounded-full">
                     {user?.full_name?.charAt(0) || 'P'}
                   </div>
                )}
              </div>
            </motion.div>

            {isProfileEmpty ? (
              <div className="max-w-md mx-auto md:mx-0">
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Complete your profile</h1>
                <p className="text-gray-400 mb-6 text-sm">Add your name, professional headline, and location to customize your public hero section.</p>
                {previewMode && (
                  <Link to="/dashboard/profile" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all">
                    Go to Profile
                  </Link>
                )}
              </div>
            ) : (
              <>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-4 text-white"
                >
                  {user.full_name}
                </motion.h1>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-2xl md:text-3xl text-gray-400 font-light mb-8 max-w-2xl leading-tight mx-auto md:mx-0"
                >
                  {user.headline}
                </motion.h2>
              </>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-8"
            >
              <a href="#projects" className="text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 shadow-lg" style={{ backgroundColor: primaryColor }}>
                View Projects
              </a>
              <a href="#about" className="bg-white/5 border border-white/10 px-8 py-4 rounded-full font-medium text-white hover:bg-white/10 transition-all backdrop-blur-md">
                About Me
              </a>
            </motion.div>

            {socialLinks && socialLinks.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-12 flex items-center justify-center md:justify-start gap-4 flex-wrap"
              >
                {socialLinks.map((link: any) => (
                  <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-sm text-gray-300 flex items-center gap-2">
                    <Globe className="w-4 h-4" /> {link.platform}
                  </a>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1, duration: 1 }}
           className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
        >
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-sm font-bold tracking-widest uppercase mb-8 text-gray-500" style={{ color: primaryColor }}>01. About</h3>
          {(!user?.bio && !user?.location) ? (
            <EmptyStateCard title="Complete your profile info" linkPath="/dashboard/profile" linkText="Edit Profile" />
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
              {user.bio && (
                <p className="text-xl md:text-3xl leading-relaxed text-gray-200 font-light mb-8">
                  {user.bio}
                </p>
              )}
              <div className="flex flex-wrap gap-6 text-gray-400 font-medium">
                {user.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" /> {user.location}
                  </div>
                )}
                {user.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5" /> {user.email}
                  </div>
                )}
                {user.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5" /> {user.phone}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-sm font-bold tracking-widest uppercase mb-12 text-gray-500" style={{ color: primaryColor }}>02. Expertise</h3>
          {skills.length === 0 ? (
            <EmptyStateCard title="No skills yet" linkPath="/dashboard/skills" linkText="Add Skills" />
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedSkills).map(([category, catSkills]: [string, any]) => (
                <div key={category}>
                  <h4 className="text-xl font-semibold text-white mb-6">{category}</h4>
                  <div className="flex flex-wrap gap-3">
                    {catSkills.map((skill: any) => (
                      <div key={skill.id} className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-200 font-medium flex items-center gap-3 group hover:border-white/20 hover:bg-white/10 transition-all">
                        <Code2 className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                        {skill.name}
                        {skill.percentage && (
                          <span className="text-xs text-gray-500 group-hover:text-white transition-colors">({skill.percentage}%)</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-sm font-bold tracking-widest uppercase mb-16 text-gray-500" style={{ color: primaryColor }}>03. Selected Works</h3>
          {projects.length === 0 ? (
            <EmptyStateCard title="No projects yet" linkPath="/dashboard/projects" linkText="Add Projects" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project: any) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative flex flex-col bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all"
                >
                  <div className="h-64 relative overflow-hidden bg-black/50">
                    {project.image ? (
                      <img src={project.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-600">No Image</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col">
                    <h4 className="text-2xl font-bold text-white mb-3">{project.title}</h4>
                    <p className="text-gray-400 mb-6 flex-1 text-sm leading-relaxed">{project.description}</p>
                    
                    {project.tech_stack && project.tech_stack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech_stack.map((tech: string) => (
                          <span key={tech} className="px-3 py-1 bg-white/10 rounded-lg text-xs font-medium text-gray-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 mt-auto">
                      {project.live_demo_url && (
                        <a href={project.live_demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white font-medium hover:opacity-80 transition-opacity" style={{ color: primaryColor }}>
                          Live Demo <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                          <Globe className="w-4 h-4" /> Source
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-24 px-6 relative">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-sm font-bold tracking-widest uppercase mb-16 text-gray-500" style={{ color: primaryColor }}>04. Experience</h3>
          {experience.length === 0 ? (
            <EmptyStateCard title="No experience timeline yet" linkPath="/dashboard/experience" linkText="Add Experience" />
          ) : (
            <div className="relative border-l border-white/10 pl-8 space-y-12">
              {sortedExp.map((exp: any) => (
                <div key={exp.id} className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-black bg-white/20" style={{ backgroundColor: primaryColor }} />
                  
                  <h4 className="text-2xl font-bold text-white">{exp.position}</h4>
                  <div className="text-xl text-gray-400 mt-1 mb-2">{exp.company}</div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 font-medium mb-4">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {exp.start_date} — {exp.is_current ? 'Present' : exp.end_date}</span>
                    {exp.location && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {exp.location}</span>}
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Education Timeline */}
      <section id="education" className="py-24 px-6 relative">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-sm font-bold tracking-widest uppercase mb-16 text-gray-500" style={{ color: primaryColor }}>05. Education</h3>
          {education.length === 0 ? (
            <EmptyStateCard title="No education timeline yet" linkPath="/dashboard/education" linkText="Add Education" />
          ) : (
            <div className="relative border-l border-white/10 pl-8 space-y-12">
              {sortedEdu.map((edu: any) => (
                <div key={edu.id} className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-black bg-white/20" />
                  
                  <h4 className="text-2xl font-bold text-white">{edu.degree}</h4>
                  <div className="text-xl text-gray-400 mt-1 mb-2">{edu.institution}</div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 font-medium mb-4">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {edu.start_date} — {edu.end_date || 'Present'}</span>
                    {edu.field_of_study && <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" /> {edu.field_of_study}</span>}
                  </div>
                  
                  {edu.description && <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm">{edu.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Certificates & Achievements */}
      {((certificates && certificates.length > 0) || (achievements && achievements.length > 0)) && (
        <section id="awards" className="py-24 px-6 relative">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-8 text-gray-500" style={{ color: primaryColor }}>Certifications</h3>
              {certificates.length === 0 ? (
                <EmptyStateCard title="Add your first certificate" linkPath="/dashboard/certificates" linkText="Add Certificate" />
              ) : (
                <div className="space-y-6">
                  {certificates.map((cert: any, idx: number) => {
                    const certIsPdf = cert.image_url?.toLowerCase().endsWith('.pdf') || cert.image_url?.includes('data:application/pdf');
                    return (
                      <div 
                        key={cert.id} 
                        onClick={() => setActiveCertIndex(idx)}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4 items-start hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                      >
                        {/* Certificate Thumbnail */}
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10 flex items-center justify-center bg-black/40">
                          {cert.image_url ? (
                            certIsPdf ? (
                              <div className="text-red-400 font-extrabold text-sm uppercase tracking-wide">PDF</div>
                            ) : (
                              <img src={cert.image_url} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" />
                            )
                          ) : (
                            <Award className="w-8 h-8 text-blue-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-bold text-white mb-1 truncate">{cert.title}</h4>
                          <p className="text-blue-400 text-sm mb-2">{cert.issuer} {cert.issue_year ? `(${cert.issue_year})` : ''}</p>
                          {cert.description && <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-3">{cert.description}</p>}
                          
                          <button
                            type="button"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                            style={{ color: primaryColor }}
                          >
                            <Eye className="w-3.5 h-3.5" /> View Certificate
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-8 text-gray-500" style={{ color: primaryColor }}>Achievements</h3>
              {achievements.length === 0 ? (
                <EmptyStateCard title="No achievements yet" linkPath="/dashboard/achievements" linkText="Add Achievements" />
              ) : (
                <div className="space-y-6">
                  {achievements.map((ach: any) => (
                    <div key={ach.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4 items-start hover:bg-white/10 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                        <Trophy className="w-6 h-6 text-orange-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">{ach.title}</h4>
                        {ach.date_achieved && <p className="text-gray-400 text-sm mb-2">{ach.date_achieved}</p>}
                        <p className="text-gray-300 text-sm leading-relaxed">{ach.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative bg-white/[0.02] border-t border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-sm font-bold tracking-widest uppercase mb-8 text-gray-500 text-center" style={{ color: primaryColor }}>Get in Touch</h3>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-12 tracking-tight">Let's Work Together</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-gray-400 text-lg leading-relaxed">
                Have a project in mind, want to collaborate, or just want to say hi? Send a message and let's start something amazing.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <span>{user?.email || "hello@example.com"}</span>
                </div>
                {user?.phone && (
                  <div className="flex items-center gap-4 text-gray-300">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-gray-400" />
                    </div>
                    <span>{user.phone}</span>
                  </div>
                )}
                {user?.location && (
                  <div className="flex items-center gap-4 text-gray-300">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                    <span>{user.location}</span>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={e => e.preventDefault()} className="space-y-4 bg-black/40 border border-white/10 p-6 rounded-2xl">
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 transition-all"
                  style={{ '--tw-ring-color': primaryColor } as any}
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 transition-all"
                  style={{ '--tw-ring-color': primaryColor } as any}
                />
              </div>
              <div>
                <textarea 
                  rows={4}
                  placeholder="Your Message" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 transition-all resize-none"
                  style={{ '--tw-ring-color': primaryColor } as any}
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: primaryColor }}
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center bg-black">
        <p className="text-gray-500 font-medium">© {new Date().getFullYear()} {user?.full_name || 'Portfolio'}. All rights reserved.</p>
        <p className="text-gray-600 text-sm mt-2">Built with PortfolioHub</p>
      </footer>

      {/* ==================================================== */}
      {/* CERTIFICATE DETAILS MODAL WITH BROWSE CONTROLS & LIGHTBOX */}
      {/* ==================================================== */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => { setActiveCertIndex(null); setIsLightboxOpen(false); }}
                className="absolute top-4 right-4 z-50 p-2 bg-black/60 border border-white/10 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Browse Previous/Next Controls */}
              {certificates.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevCert}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-black/60 border border-white/10 hover:bg-white/10 rounded-full transition-colors text-white"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={handleNextCert}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-black/60 border border-white/10 hover:bg-white/10 rounded-full transition-colors text-white"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Left Side: Preview Image or PDF */}
              <div className="flex-1 bg-black/40 flex items-center justify-center p-8 border-r border-white/10 min-h-[300px] md:min-h-[450px]">
                {activeCert.image_url ? (
                  isPdf ? (
                    <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center gap-4">
                      <iframe 
                        src={activeCert.image_url} 
                        className="w-full h-[350px] bg-white border border-white/10 rounded-xl"
                        title={activeCert.title}
                      />
                    </div>
                  ) : (
                    <div className="relative group cursor-zoom-in flex flex-col items-center justify-center max-w-full">
                      <img 
                        src={activeCert.image_url} 
                        alt="" 
                        onClick={() => setIsLightboxOpen(true)}
                        className="max-h-[350px] object-contain rounded-xl border border-white/10 shadow-2xl hover:scale-[1.01] transition-transform duration-300"
                      />
                      <span className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase mt-3 flex items-center gap-1">
                        <ZoomIn className="w-3.5 h-3.5" /> Click image to expand
                      </span>
                    </div>
                  )
                ) : (
                  <Award className="w-24 h-24 text-blue-400 animate-pulse" />
                )}
              </div>

              {/* Right Side: Metadata / Details */}
              <div className="w-full md:w-[380px] p-8 flex flex-col justify-between overflow-y-auto max-h-[90vh]">
                <div className="space-y-6 pt-4">
                  <div>
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-400/10 px-2 py-1 rounded-md">Credential</span>
                    <h2 className="text-2xl font-extrabold text-white mt-3 mb-1.5 leading-tight">{activeCert.title}</h2>
                    <div className="text-blue-400 text-sm font-semibold">{activeCert.issuer}</div>
                    {activeCert.issue_year && (
                      <div className="text-gray-500 text-xs font-medium mt-1">Issued: {activeCert.issue_year}</div>
                    )}
                  </div>

                  {activeCert.description && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description</h4>
                      <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{activeCert.description}</p>
                    </div>
                  )}

                  {activeCert.skills_gained && activeCert.skills_gained.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Skills Gained</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeCert.skills_gained.map((skill: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 hover:border-white/10 rounded-full text-xs text-gray-300 transition-colors">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-8 border-t border-white/5 mt-8 flex flex-col gap-3">
                  {activeCert.image_url && (
                    <a 
                      href={activeCert.image_url} 
                      download={`Certificate-${activeCert.title.replace(/\s+/g, '-')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Download Certificate
                    </a>
                  )}
                  <button
                    onClick={() => setActiveCertIndex(null)}
                    className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold border border-white/5 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox Zoom Modal (For non-PDF images) */}
      <AnimatePresence>
        {isLightboxOpen && activeCert && !isPdf && (
          <div 
            onClick={() => { setIsLightboxOpen(false); setZoomLevel(1); }}
            className="fixed inset-0 bg-black/95 z-[60] flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Lightbox Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-3 z-50">
              <button 
                onClick={(e) => { e.stopPropagation(); setZoomLevel(prev => prev === 1 ? 1.8 : 1); }}
                className="p-2 bg-black/60 border border-white/10 hover:bg-white/10 rounded-full transition-colors text-white"
                title="Toggle Zoom"
              >
                {zoomLevel === 1 ? <ZoomIn className="w-5 h-5" /> : <ZoomOut className="w-5 h-5" />}
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); setZoomLevel(1); }}
                className="p-2 bg-black/60 border border-white/10 hover:bg-white/10 rounded-full transition-colors text-white"
                title="Close Viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-full max-h-full overflow-hidden flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img 
                src={activeCert.image_url} 
                alt="" 
                style={{ scale: zoomLevel }}
                onClick={() => setZoomLevel(prev => prev === 1 ? 1.8 : 1)}
                className={`max-w-[90vw] max-h-[90vh] object-contain rounded-lg border border-white/10 shadow-2xl transition-transform duration-200 ${zoomLevel === 1 ? 'cursor-zoom-in' : 'cursor-zoom-out'}`}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
