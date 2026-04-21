import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  Phone, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Menu, 
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import heroImage from './assets/hero.png';
import logoTransparent from './assets/logo_transparent.png';
import aff1 from './assets/aff1.png';
import aff2 from './assets/aff2.png';
import aff3 from './assets/aff3.png';

const campuses = [
  { name: "Campus de Lyon", url: "#hero" },
  { name: "Campus de Saint-Genis-Pouilly", url: "https://wes-sup.fr/" },
  { name: "Campus de Genève", url: "https://wes-sup.ch/" }
];

const programCategories = [
  {
    id: "bts",
    name: "BTS",
    programs: [
      {
        title: "BTS Cybersécurité",
        duration: "2 ans",
        level: "Bac +2",
        description: "Formation spécialisée en sécurité informatique et protection des données."
      }
    ]
  },
  {
    id: "bachelor",
    name: "Bachelor",
    programs: [
      {
        title: "Bachelor in Hospitality & Tourism Management",
        duration: "3 ans",
        level: "Bac +3",
        isEnglish: true,
        description: "Programme anglophone. Acquérez les compétences pour manager dans l'hôtellerie et le tourisme international."
      },
      {
        title: "Bachelor in Digital Business & IT Development",
        duration: "3 ans",
        level: "Bac +3",
        isEnglish: true,
        description: "Programme anglophone. Combinez business digital et développement informatique pour innover."
      },
      {
        title: "Bachelor in Business Administration",
        duration: "3 ans",
        level: "Bac +3",
        isEnglish: true,
        description: "Programme anglophone. Apprenez les fondamentaux de la gestion d'entreprise et de l'administration."
      },
      {
        title: "Bachelor in Marketing & Communication",
        duration: "3 ans",
        level: "Bac +3",
        isEnglish: true,
        description: "Programme anglophone. Développez votre expertise en marketing, communication et stratégies digitales."
      }
    ]
  },
  {
    id: "mastere",
    name: "Mastère",
    programs: [
      {
        title: "Mastère in Business Management & Strategy (MBA)",
        duration: "2 ans",
        level: "Bac +5",
        isEnglish: true,
        description: "Programme anglophone. Développez une expertise en management stratégique et leadership."
      },
      {
        title: "Mastère in Marketing & Communication",
        duration: "2 ans",
        level: "Bac +5",
        isEnglish: true,
        description: "Programme anglophone. Maîtrisez les stratégies marketing et les outils de communication digitale."
      },
      {
        title: "Mastère in Human Resources Management",
        duration: "2 ans",
        level: "Bac +5",
        isEnglish: true,
        description: "Programme anglophone. Formez-vous à la gestion des talents et au développement des ressources humaines."
      }
    ]
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCampusDropdownOpen, setIsCampusDropdownOpen] = useState(false);
  const [isMobileCampusOpen, setIsMobileCampusOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>("bts");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentPoster, setCurrentPoster] = useState(0);
  
  const posters = [aff1, aff2, aff3];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPoster((prev) => (prev + 1) % posters.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [posters.length]);

  const nextPoster = () => setCurrentPoster((prev) => (prev + 1) % posters.length);
  const prevPoster = () => setCurrentPoster((prev) => (prev - 1 + posters.length) % posters.length);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Option B: Google Sheets Webhook URL
      const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyx6XW0wRsXGjKqa9vtB9sVjPTThTMjyvsqdaAcVh6RMgJ9zGhbkfTOimCL79Dkc99G/exec"; 

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors", // Nécessaire pour certains Webhooks Google Scripts
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date: new Date().toLocaleString('fr-FR'),
          source: "Landing Page Lyon JPO"
        }),
      });

      // Avec no-cors, on ne peut pas lire la réponse, on assume que c'est OK
      setIsSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', program: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);

    } catch (error) {
      alert("Une erreur est survenue lors de l'envoi vers Google Sheets.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-3">
              <img src={logoTransparent} alt="Logo Wes'sup Lyon" className="h-16 w-auto" />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#hero" className="text-slate-600 hover:text-orange-600 transition-colors font-medium">Accueil</a>
              
              {/* Campus Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsCampusDropdownOpen(true)}
                onMouseLeave={() => setIsCampusDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 text-slate-600 hover:text-orange-600 transition-colors font-medium cursor-pointer">
                  Nos Campus <ChevronDown size={16} className={`transition-transform duration-200 ${isCampusDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isCampusDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-56 bg-white border border-slate-100 rounded-xl shadow-xl py-2 mt-1"
                    >
                      {campuses.map((campus, idx) => (
                          <a 
                            key={idx}
                            href={campus.url}
                            target={campus.url.startsWith('http') ? "_blank" : "_self"}
                            rel={campus.url.startsWith('http') ? "noopener noreferrer" : ""}
                            className="block px-4 py-2.5 text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors text-sm font-medium"
                          >
                            {campus.name}
                          </a>
                        ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="#programmes" className="text-slate-600 hover:text-orange-600 transition-colors font-medium">Nos Programmes</a>
              <a href="#jpo" className="text-slate-600 hover:text-orange-600 transition-colors font-medium">JPO 6 Mai</a>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 cursor-pointer"
              >
                S'inscrire
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-orange-600"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-4">
                <a href="#hero" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 font-medium">Accueil</a>
                
                {/* Mobile Campus Section */}
                <div className="space-y-2">
                  <button 
                    onClick={() => setIsMobileCampusOpen(!isMobileCampusOpen)}
                    className="flex items-center justify-between w-full text-slate-600 font-medium"
                  >
                    Nos Campus <ChevronDown size={18} className={`transition-transform duration-200 ${isMobileCampusOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isMobileCampusOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 space-y-3 overflow-hidden"
                      >
                        {campuses.map((campus, idx) => (
                          <a 
                            key={idx}
                            href={campus.url}
                            target={campus.url.startsWith('http') ? "_blank" : "_self"}
                            rel={campus.url.startsWith('http') ? "noopener noreferrer" : ""}
                            className="block text-slate-500 text-sm font-medium hover:text-orange-600"
                          >
                            {campus.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a href="#programmes" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 font-medium">Nos Programmes</a>
                <a href="#jpo" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 font-medium">JPO 6 Mai</a>
                <button 
                  onClick={() => { setIsMenuOpen(false); setIsModalOpen(true); }} 
                  className="w-full block bg-orange-600 text-white px-6 py-3 rounded-xl font-bold text-center"
                >
                  S'inscrire
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[80vh] flex items-center">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Campus Wes'sup Lyon" 
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-slate-950/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="lg:flex lg:items-center lg:gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-600/10 text-orange-500 text-sm font-semibold mb-6 border border-orange-600/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                <span>Journée Porte Ouverte - 6 Mai 2026</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                Construisez votre <span className="text-orange-600">avenir</span> à Wes'sup Lyon
              </h1>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Rejoignez un campus dynamique au cœur de Lyon. Découvrez nos programmes d'excellence du Bac+2 au Bac+5, incluant nos <strong>cursus anglophones</strong>.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-orange-600 text-white rounded-xl font-bold text-lg hover:bg-orange-700 transition-all shadow-xl shadow-orange-900/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  S'inscrire à la JPO <ArrowRight size={20} />
                </button>
                <a href="#programmes" className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white border border-slate-800 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                  Nos programmes
                </a>
              </div>
              
              <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="text-orange-600" size={20} /> 6 Mai 2026
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-orange-600" size={20} /> Campus Lyon : 	
73 bis, rue Francis Présensé,
69100 Villeurbanne,
Lyon
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="text-orange-600" size={20} /> Bac+2 à Bac+5
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block lg:w-1/2 relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000" 
                  alt="Étudiants Lyon" 
                  className="w-full h-auto object-cover opacity-80"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-slate-900 p-6 rounded-2xl shadow-xl z-20 flex items-center gap-4 border border-slate-800">
                <div className="w-12 h-12 bg-orange-600/20 rounded-full flex items-center justify-center text-orange-500">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">95%</div>
                  <div className="text-sm text-slate-400 font-medium">Taux de réussite</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Posters Carousel Section */}
      <section className="py-12 bg-slate-50 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative group">
            <div className="relative h-[400px] sm:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentPoster}
                  src={posters[currentPoster]}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full h-full object-contain"
                  alt={`Affiche ${currentPoster + 1}`}
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button 
                onClick={prevPoster}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 shadow-lg hover:bg-orange-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextPoster}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 shadow-lg hover:bg-orange-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {posters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPoster(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentPoster === idx ? 'w-8 bg-orange-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programmes" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-orange-600 font-bold tracking-wider uppercase text-sm mb-4">Nos Formations & Programmes Anglophones</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-6">Explorez nos programmes d'excellence</h3>
            <p className="text-lg text-slate-600">
              Des cursus adaptés aux besoins du marché du travail, incluant nos <strong>programmes anglophones</strong> répartis par niveau d'études.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {programCategories.map((category) => (
              <div 
                key={category.id}
                className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden transition-all hover:border-orange-100"
              >
                <button 
                  onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${activeCategory === category.id ? 'bg-orange-600 text-white' : 'bg-white text-orange-600 shadow-sm group-hover:bg-orange-50'}`}>
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-slate-900">{category.name}</h4>
                      <p className="text-slate-500 text-sm">{category.programs.length} programme{category.programs.length > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <ChevronDown 
                    size={24} 
                    className={`text-slate-400 transition-transform duration-300 ${activeCategory === category.id ? 'rotate-180 text-orange-600' : ''}`} 
                  />
                </button>

                <AnimatePresence>
                  {activeCategory === category.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-8 grid sm:grid-cols-2 gap-6 border-t border-slate-100 pt-8">
                        {category.programs.map((program, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-slate-50 hover:shadow-md transition-all"
                          >
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded uppercase tracking-wide">
                                {program.level}
                              </span>
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wide">
                                {program.duration}
                              </span>
                              {program.isEnglish && (
                                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase tracking-wide flex items-center gap-1.5">
                                  <svg width="14" height="10" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" className="rounded-sm shadow-sm">
                                    <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
                                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="4"/>
                                    <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
                                    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>
                                  </svg>
                                  English
                                </span>
                              )}
                            </div>
                            <h5 className="font-bold text-slate-900 mb-2 leading-tight">{program.title}</h5>
                            <p className="text-slate-600 text-xs leading-relaxed mb-4">
                              {program.description}
                            </p>
                            <button 
                              onClick={() => setIsModalOpen(true)}
                              className="text-orange-600 font-bold text-xs flex items-center gap-1.5 hover:gap-2 transition-all cursor-pointer"
                            >
                              S'inscrire <ArrowRight size={14} />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JPO Info Section */}
      <section id="jpo" className="py-24 overflow-hidden bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-600 rounded-3xl overflow-hidden shadow-2xl lg:flex items-stretch">
            <div className="lg:w-1/2 p-12 lg:p-20 text-white">
              <h3 className="text-4xl font-bold mb-8">Journée Porte Ouverte du 6 Mai 2026</h3>
              <p className="text-orange-50 text-lg mb-12 leading-relaxed">
                Venez découvrir nos locaux, rencontrer nos étudiants et échanger avec nos formateurs. Une occasion unique de poser toutes vos questions et de confirmer votre projet professionnel.
              </p>
              
              <ul className="space-y-6">
                {[
                  "Visite personnalisée du campus",
                  "Ateliers d'orientation",
                  "Rencontres avec des profesionnels du domaine",
                  "Session d'orientation"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-orange-50">
                    <div className="bg-orange-500 p-1 rounded-full">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="font-medium text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden lg:block lg:w-1/2 relative">
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000" 
                alt="Campus Lyon" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="inscription" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-50 rounded-3xl shadow-xl overflow-hidden border border-slate-100">
              <div className="lg:flex">
                <div className="lg:w-1/3 bg-slate-900 p-12 text-white">
                  <h3 className="text-3xl font-bold mb-6">S'inscrire</h3>
                  <p className="text-slate-400 mb-12">
                    Remplissez ce formulaire pour participer à notre JPO ou recevoir des informations sur nos programmes.
                  </p>
                  
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <Mail className="text-orange-500" size={24} />
                      <div>
                        <div className="text-xs uppercase font-bold text-slate-500 tracking-wider">Email</div>
                        <div className="font-medium">administration@wes-sup.fr</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Phone className="text-orange-500" size={24} />
                      <div>
                        <div className="text-xs uppercase font-bold text-slate-500 tracking-wider">Téléphone</div>
                        <div className="font-medium">	+33 (0) 4 78 17 01 16</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <MapPin className="text-orange-500" size={24} />
                      <div>
                        <div className="text-xs uppercase font-bold text-slate-500 tracking-wider">Adresse</div>
                        <div className="font-medium">	
73 bis, rue Francis Présensé,
69100 Villeurbanne,
Lyon</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-2/3 p-12 flex flex-col items-center justify-center text-center">
                  <h3 className="text-3xl font-bold text-slate-900 mb-6">Prêt à nous rejoindre ?</h3>
                  <p className="text-slate-600 mb-10 max-w-md">
                    Inscrivez-vous dès maintenant à notre journée porte ouverte pour découvrir votre futur campus et échanger avec nos experts.
                  </p>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-10 py-4 bg-orange-600 text-white rounded-xl font-bold text-lg hover:bg-orange-700 transition-all shadow-xl shadow-orange-200 flex items-center gap-3 cursor-pointer"
                  >
                    Ouvrir le formulaire <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => !isSubmitting && setIsModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="lg:flex">
                <div className="hidden lg:block lg:w-1/3 bg-orange-600 p-10 text-white">
                  <h3 className="text-2xl font-bold mb-4">S'inscrire</h3>
                  <p className="text-orange-100 text-sm mb-8">
                    Rejoignez-nous pour la JPO du 6 Mai 2026.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Calendar size={20} className="text-orange-300" />
                      <span className="text-xs font-medium">6 Mai 2026</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={20} className="text-orange-300" />
                      <span className="text-xs font-medium">Campus Lyon</span>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-2/3 p-8 sm:p-10">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 lg:hidden">Inscription JPO</h3>
                  
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="py-12 text-center"
                      >
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 size={32} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">Merci !</h4>
                        <p className="text-slate-600 text-sm">
                          Votre demande a bien été envoyée.
                        </p>
                        <button 
                          onClick={() => setIsModalOpen(false)}
                          className="mt-8 px-6 py-2 bg-slate-900 text-white rounded-lg font-bold text-sm"
                        >
                          Fermer
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit} 
                        className="space-y-4"
                      >
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Prénom</label>
                            <input 
                              type="text" 
                              required
                              disabled={isSubmitting}
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all disabled:opacity-50 text-sm"
                              placeholder="Jean"
                              value={formData.firstName}
                              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Nom</label>
                            <input 
                              type="text" 
                              required
                              disabled={isSubmitting}
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all disabled:opacity-50 text-sm"
                              placeholder="Dupont"
                              value={formData.lastName}
                              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email</label>
                            <input 
                              type="email" 
                              required
                              disabled={isSubmitting}
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all disabled:opacity-50 text-sm"
                              placeholder="jean.dupont@example.com"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Téléphone</label>
                            <input 
                              type="tel" 
                              required
                              disabled={isSubmitting}
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all disabled:opacity-50 text-sm"
                              placeholder="06 XX XX XX XX"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Programme / Événement</label>
                          <select 
                            disabled={isSubmitting}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all bg-white disabled:opacity-50 text-sm"
                            value={formData.program}
                            onChange={(e) => setFormData({...formData, program: e.target.value})}
                          >
                            <option value="">Sélectionnez un programme ou événement</option>
                            <optgroup label="Événements">
                              <option value="Journée Porte Ouverte - 6 Mai 2026">Journée Porte Ouverte - 6 Mai 2026</option>
                            </optgroup>
                            {programCategories.map((category) => (
                              <optgroup key={category.id} label={category.name}>
                                {category.programs.map((program, idx) => (
                                  <option key={idx} value={program.title}>
                                    {program.title}
                                  </option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                        </div>
                        
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Message (Optionnel)</label>
                          <textarea 
                            rows={3}
                            disabled={isSubmitting}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all resize-none disabled:opacity-50 text-sm"
                            placeholder="Dites-nous en plus..."
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                          ></textarea>
                        </div>
                        
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 bg-orange-600 text-white rounded-xl font-bold text-base hover:bg-orange-700 transition-all shadow-xl shadow-orange-900/20 disabled:opacity-70 flex items-center justify-center gap-3 cursor-pointer"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Envoi en cours...
                            </>
                          ) : "Confirmer mon inscription"}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12 border-b border-slate-900 pb-12">
            <div className="lg:col-span-2">
              <img src={logoTransparent} alt="Logo Wes'sup Lyon" className="h-12 w-auto mb-6 brightness-0 invert" />
              <p className="text-slate-500 max-w-sm mb-8">
                L'école supérieure de commerce et de management au cœur de Lyon. Formez-vous aux métiers de demain.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-orange-600 transition-all border border-slate-800"><Instagram size={20} /></a>
                <a href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-orange-600 transition-all border border-slate-800"><Facebook size={20} /></a>
                <a href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-orange-600 transition-all border border-slate-800"><Linkedin size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Liens Rapides</h4>
              <ul className="space-y-4 text-slate-500">
                <li><a href="#hero" className="hover:text-orange-500 transition-colors">Accueil</a></li>
                <li><a href="#programmes" className="hover:text-orange-500 transition-colors">Programmes</a></li>
                <li><a href="#jpo" className="hover:text-orange-500 transition-colors">JPO 6 Mai</a></li>
                <li>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="hover:text-orange-500 transition-colors cursor-pointer text-left"
                  >
                    Inscription
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Nos Campus</h4>
              <ul className="space-y-4 text-slate-500">
                {campuses.map((campus, idx) => (
                  <li key={idx}>
                    <a 
                      href={campus.url} 
                      target={campus.url.startsWith('http') ? "_blank" : "_self"}
                      rel={campus.url.startsWith('http') ? "noopener noreferrer" : ""}
                      className="hover:text-orange-500 transition-colors"
                    >
                      {campus.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Contact</h4>
              <ul className="space-y-4 text-slate-500">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="text-orange-600 flex-shrink-0" />
                  <span>73 BIS, Rue Francis Présensé, 69100 Villeurbanne LYON</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={20} className="text-orange-600 flex-shrink-0" />
                  <span>+33(0)4 78 17 01 16</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={20} className="text-orange-600 flex-shrink-0" />
                  <span>administration@wes-sup.fr</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center text-slate-600 text-sm">
            © 2026 Wes'sup Lyon. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
