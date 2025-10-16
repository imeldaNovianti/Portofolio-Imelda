import { useEffect, useState, useRef } from "react";
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes, 
  FaMoon, FaSun, FaExternalLinkAlt, FaChevronDown,
  FaFigma, FaSketch, FaReact, FaNodeJs, FaDatabase,
  FaPaintBrush, FaCode, FaServer, FaMobileAlt, FaInstagram,
  FaWhatsapp, FaPaperPlane, FaHeart, FaUser, FaGraduationCap,
  FaLaptopCode, FaJava, FaCss3Alt, FaHtml5, FaGitAlt,
  FaMapMarkerAlt, FaDownload, FaAward, FaCertificate,
  FaTimes as FaClose, FaMicrosoft, FaRocket, FaStar
} from "react-icons/fa";
import { 
  SiJavascript, SiSpringboot, SiPostgresql, SiPostman, SiC, 
  SiTailwindcss
} from "react-icons/si";

import { motion, AnimatePresence } from "framer-motion";

// Particle Background yang lebih interaktif
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    particlesRef.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: `rgba(236, 72, 153, ${Math.random() * 0.3 + 0.1})`
    }));

    const handleMouseMove = (event) => {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle, index) => {
        // Mouse interaction
        const dx = particle.x - mouseRef.current.x;
        const dy = particle.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - distance) / 100;
          particle.x += Math.cos(angle) * force * 2;
          particle.y += Math.sin(angle) * force * 2;
        }
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Draw connections
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(236, 72, 153, ${0.2 * (1 - distance / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};

// Floating Elements dengan animasi yang lebih kompleks
const FloatingElements = () => {
  const elements = [
    { icon: <FaReact />, delay: 0, size: "text-xl" },
    { icon: <FaJava />, delay: 0.5, size: "text-lg" },
    { icon: <SiJavascript />, delay: 1, size: "text-lg" },
    { icon: <FaDatabase />, delay: 1.5, size: "text-md" },
    { icon: <FaCode />, delay: 2, size: "text-lg" },
  ];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.size} text-pink-400 opacity-20`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          {element.icon}
        </motion.div>
      ))}
    </div>
  );
};

// Enhanced Scroll Indicator dengan efek glow
const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      
      setScrollProgress(scrolled * 100);
    };
    
    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);
  
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-300 dark:bg-gray-800 bg-opacity-50">
      <motion.div 
        className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 relative"
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute right-0 top-0 w-2 h-full bg-white opacity-70"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
};

// Enhanced Floating Socials dengan efek magnet
const FloatingSocials = () => {
  const socialLinks = [
    { icon: <FaGithub />, href: "https://github.com/imeldaNovianti", label: "GitHub", color: "hover:text-gray-700 dark:hover:text-white" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/imelda-novianty-6b5606308/", label: "LinkedIn", color: "hover:text-blue-600" },
    { icon: <FaInstagram />, href: "https://www.instagram.com/imelda_nvtyy/", label: "Instagram", color: "hover:text-pink-500" },
    { icon: <FaEnvelope />, href: "mailto:noviantyimelda@gmail.com", label: "Email", color: "hover:text-red-500" },
    { icon: <FaWhatsapp />, href: "https://wa.me/6285223284793", label: "WhatsApp", color: "hover:text-green-500" },
  ];

  return (
    <div className="fixed left-2 sm:left-4 bottom-4 z-40 hidden md:flex flex-col gap-3">
      {socialLinks.map((social, index) => (
        <motion.a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300 touch-manipulation relative overflow-hidden group`}
          whileHover={{ y: -5, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={social.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 1.5 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative z-10">{social.icon}</span>
        </motion.a>
      ))}
    </div>
  );
};

// Enhanced Typing Text dengan kursor yang lebih menarik
const TypingText = ({ text, darkMode, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 40);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <motion.p 
      className={`text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 max-w-3xl mx-auto px-4 ${darkMode ? "text-gray-300" : "text-pink-800"} font-medium leading-relaxed`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + 0.4, duration: 0.8 }}
    >
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ 
            opacity: [0, 1, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 0.8,
            ease: "easeInOut"
          }}
          className="ml-1 inline-block w-1 h-6 bg-pink-500 rounded"
        />
      )}
    </motion.p>
  );
};

// Enhanced Certificate Modal dengan animasi yang lebih halus
const CertificateModal = ({ isOpen, onClose, certificate }) => {
  if (!isOpen || !certificate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden mx-2 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
              <h3 className="text-lg md:text-xl font-bold pr-4 truncate">
                {certificate.title}
              </h3>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaClose className="text-white text-xl" />
              </motion.button>
            </div>
            
            <div className="p-4 md:p-6 max-h-[70vh] overflow-y-auto">
              <div className="flex flex-col items-center">
                <motion.img
                  src={certificate.image}
                  alt={certificate.title}
                  className="max-w-full h-auto max-h-[50vh] object-contain rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                  }}
                />
                
                <motion.div 
                  className="mt-6 text-center w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm md:text-base">
                    <strong>Diterbitkan oleh:</strong> {certificate.issuer}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm md:text-base">
                    <strong>Tanggal:</strong> {certificate.date}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <motion.a
                      href={certificate.image}
                      download
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors text-sm md:text-base shadow-lg"
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaDownload /> Unduh Sertifikat
                    </motion.a>
                    
                    <motion.button
                      onClick={onClose}
                      className="px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm md:text-base shadow-lg"
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Tutup
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Animated Section Divider
const AnimatedDivider = ({ darkMode }) => (
  <motion.div
    className="flex justify-center items-center my-12"
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8 }}
  >
    <div className={`w-20 h-1 ${darkMode ? 'bg-pink-500' : 'bg-pink-400'} rounded-full`} />
    <motion.div
      className={`mx-4 ${darkMode ? 'text-pink-500' : 'text-pink-400'}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    >
      <FaStar className="text-sm" />
    </motion.div>
    <div className={`w-20 h-1 ${darkMode ? 'bg-pink-500' : 'bg-pink-400'} rounded-full`} />
  </motion.div>
);

// Hover Card Component untuk skills dan projects
const HoverCard = ({ children, className = "", ...props }) => (
  <motion.div
    className={`relative overflow-hidden rounded-xl shadow-lg ${className}`}
    whileHover={{ y: -8, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    {...props}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 hover:opacity-10"
      initial={{ scale: 0 }}
      whileHover={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    />
    {children}
  </motion.div>
);

function LandingPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [certificateModal, setCertificateModal] = useState({
    isOpen: false,
    certificate: null
  });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Enhanced viewport for mobile
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0';
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Enhanced scroll detection dengan throttle
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPos = window.scrollY + 100;
          const sections = ["about", "skills", "projects", "education", "contact"];
          let current = "home";

          for (const section of sections) {
            const el = document.getElementById(section);
            if (el && el.offsetTop <= scrollPos) {
              current = section;
            }
          }
          setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced smooth scroll untuk mobile
  const handleNavClick = (href) => {
    setNavOpen(false);
    
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        setTimeout(() => {
          const offsetTop = targetElement.offsetTop - 70;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }, 150);
      }
    }
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Harap lengkapi semua field!');
      return;
    }
    
    const mailtoLink = `mailto:noviantyimelda@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Nama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`)}`;
    
    window.location.href = mailtoLink;
    
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    alert('Pesan telah dikirim! Terima kasih telah menghubungi saya.');
  };

  const openCertificateModal = (certificate) => {
    setCertificateModal({
      isOpen: true,
      certificate
    });
  };

  const closeCertificateModal = () => {
    setCertificateModal({
      isOpen: false,
      certificate: null
    });
  };

  const navLinks = [
    { href: "#about", label: "Tentang", icon: <FaUser className="inline mr-2" /> },
    { href: "#education", label: "Pendidikan", icon: <FaGraduationCap className="inline mr-2" /> },
    { href: "#skills", label: "Keahlian", icon: <FaCode className="inline mr-2" /> },
    { href: "#projects", label: "Proyek", icon: <FaLaptopCode className="inline mr-2" /> },
    { href: "#contact", label: "Kontak", icon: <FaPaperPlane className="inline mr-2" /> },
  ];

  const skillsData = [
    { name: "Java", icon: FaJava, level: 100 },
    { name: "C#", icon: FaMicrosoft, level: 100 },
    { name: ".NET", icon: FaMicrosoft, level: 100 },
    { name: "JavaScript", icon: SiJavascript, level: 100 },
    { name: "HTML", icon: FaHtml5, level: 100 },
    { name: "CSS", icon: FaCss3Alt, level: 100 },
    { name: "ReactJS", icon: FaReact, level: 100 },
    { name: "Node.js", icon: FaNodeJs, level: 100 },
    { name: "Spring Boot", icon: SiSpringboot, level: 100 },
    { name: "SQL & Database", icon: FaDatabase, level: 100 },
    { name: "PostgreSQL", icon: SiPostgresql, level: 100 },
    { name: "Postman", icon: SiPostman, level: 100 },
    { name: "DBeaver", icon: FaDatabase, level: 100 },
    { name: "UI/UX Design", icon: FaPaintBrush, level: 100 },
    { name: "Git", icon: FaGitAlt, level: 100 },
    { name: "Tailwind CSS", icon: SiTailwindcss, level: 100 },
    { name: "Bahasa C", icon: SiC, level: 100 },
  ];

  const projectsData = [
    {
      id: 1,
      title: "Aplikasi Manajemen Tugas",
      category: "Aplikasi Desktop Java",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      description: "Aplikasi desktop untuk manajemen tugas dengan fitur reminder, kategori, dan prioritas. Dibangun dengan JavaFX dan SQLite untuk penyimpanan data lokal.",
      technologies: ["Java", "JavaFX", "SQLite", "CSS"],
      githubUrl: "https://github.com/imeldaNovianti/Uas-lanjutan-imell.git",
      liveUrl: "#"
    },
    {
      id: 2,
      title: "Sistem Penerimaan Pegawai Baru",
      category: "Aplikasi Web Full-Stack",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      description: "Sistem untuk mengelola proses penerimaan pegawai baru dengan fitur aplikasi online, seleksi administrasi, dan penilaian. Menerapkan Spring Boot di backend dan ReactJS di frontend.",
      technologies: ["Java", "Spring Boot", "ReactJS", "PostgreSQL"],
      githubUrl: "https://github.com/iqnefo1310/WEB-PENERIMAAN-PEGAWAI-BARU.git",
      liveUrl: "#"
    },
    {
      id: 3,
      title: "Platform Good Teacher",
      category: "Pengembangan Web",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      description: "Platform untuk menghubungkan guru dan siswa dengan fitur pencarian, rating, dan sistem booking. Menggunakan PHP native dan MySQL dengan antarmuka responsif.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      githubUrl: "https://github.com/imeldaNovianti/GOOD-TEACHER-.git",
      liveUrl: "#"
    },
    {
      id: 4,
      title: "Website Lowongan Kerja",
      category: "Pengembangan Frontend",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      description: "Website untuk mempromosikan lowongan kerja dengan filter pencarian dan aplikasi online. Menggunakan ReactJS dengan JSON Server untuk simulasi API.",
      technologies: ["ReactJS", "CSS", "JavaScript", "JSON Server"],
      githubUrl: "https://github.com/imeldaNovianti/web_loker.git",
      liveUrl: "#"
    },
    {
      id: 5,
      title: "Sistem Tata Surya 3D",
      category: "Web 3D Interactive",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      description: "Simulasi interaktif 3D dari sistem tata surya kita dengan pergerakan planet yang realistis dan informasi detail tentang setiap planet. Dibangun dengan Three.js.",
      technologies: ["JavaScript", "Three.js", "HTML", "CSS"],
      githubUrl: "https://github.com/imeldaNovianti/solar-system-3d.git",
      liveUrl: "#"
    }
  ];

  const educationData = [
    {
      degree: "D3 Manajemen Informatika",
      institution: "Universitas Nasional Pasim Bandung",
      period: "2023 - 2025",
      description: "Saya adalah mahasiswi aktif Universitas Nasional Pasim Bandung sekaligus penerima beasiswa Program Pemberdayaan Umat Berkelanjutan (PUB). Melalui program ini, saya mendapatkan pelatihan intensif dan terstruktur mulai dari dasar logika dan algoritma, struktur data, hingga pemrograman lanjutan menggunakan Java Spring Boot dan React.js.",
      achievements: [
        "Penerima Beasiswa Program Pemberdayaan Umat Berkelanjutan (PUB)",
        "Mentor pelatihan Java Spring Boot & React.js Fundamental",
        "Aktif dalam organisasi Himpunan Mahasiswa Informatika (2021-2022)",
        "Magang di Divisi Marketing dan PMB Universitas Nasional Pasim",
        "Anggota Tim Akreditasi Fakultas – Universitas Nasional Pasim",
        "Instruktur bahasa Inggris dan pendamping pelatihan struktur data menggunakan bahasa C",
        "Berpartisipasi dalam berbagai proyek seperti HI Florist!, GOODTEACHER, dan Apply Job"
      ]
    }
  ];

  const certificationsData = [
    {
      title: "Belajar fundamental frontend React programming language",
      issuer: "Program BEASISWA PUB",
      credentialLink: "#",
      image: "/react only.jpg"
    },
    {
      title: "Java Programming Masterclass",
      issuer: "Program BEASISWA PUB",
      date: "September 2025",
      credentialLink: "#",
      image: "/sertifikat react java.jpg"
    },
    {
      title: "Struktur Data",
      issuer: "Program BEASISWA PUB",
      date: "Juni 2024",
      credentialLink: "#",
      image: "/sertifikat struktur data.jpg"
    },
    {
      title: "DataBase",
      issuer: "Program BEASISWA PUB",
      date: "Juni 2024",
      credentialLink: "#",
      image: "/database.jpg"
    },
    {
      title: "Pelatihan Pemrograman Bahasa C",
      issuer: "Program BEASISWA PUB",
      date: "Desember 2023",
      credentialLink: "#",
      image: "/c language training.jpg"
    }
  ];

  const introText = "Lulusan Baru Management Informatika yang bersemangat dalam menciptakan aplikasi yang indah dan fungsional. Terampil dalam pengembangan frontend dan backend dengan dasar yang kuat dalam Java, JavaScript, dan teknologi web modern.";

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-pink-50 via-pink-50 to-pink-100 text-gray-800'} font-['Poppins'] selection:bg-pink-500 selection:text-white overflow-x-hidden transition-colors duration-300`}>
      <ParticleBackground />
      <FloatingElements />
      <ScrollIndicator />
      <FloatingSocials />
      
      {/* Certificate Modal */}
      <CertificateModal 
        isOpen={certificateModal.isOpen}
        onClose={closeCertificateModal}
        certificate={certificateModal.certificate}
      />
      
      {/* Enhanced Header dengan glass morphism effect */}
      <motion.header 
        className={`fixed top-0 w-full ${darkMode ? 'bg-gray-900/80' : 'bg-pink-50/80'} backdrop-blur-md z-50 shadow-lg border-b ${darkMode ? 'border-gray-800' : 'border-pink-200'} transition-colors duration-300`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <nav className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-2 text-pink-500 select-none"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-pink-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <h1 className="text-lg sm:text-xl font-bold tracking-widest uppercase">IMELDA</h1>
          </motion.div>
          
          {/* Enhanced Desktop Nav */}
          <ul className="hidden lg:flex gap-6 text-base font-medium">
            {navLinks.map(({ href, label, icon }) => (
              <motion.li 
                key={label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <motion.a
                  href={href}
                  className={`relative transition-all duration-300 px-3 py-2 rounded-lg ${
                    activeSection === href.substring(1) 
                      ? "text-pink-500 font-bold" 
                      : `${darkMode ? 'text-gray-400 hover:text-pink-400' : 'text-pink-700 hover:text-pink-500'}`
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(href);
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {icon} {label}
                  {activeSection === href.substring(1) && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 rounded-full"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.a>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle dark mode"
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-pink-100 text-purple-600 hover:bg-pink-200'} transition-all`}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </motion.button>
            </motion.li>
          </ul>
          
          {/* Enhanced Mobile Nav Toggle */}
          <motion.button
            className={`lg:hidden ${darkMode ? 'text-gray-400 hover:text-pink-400' : 'text-pink-700 hover:text-pink-500'} transition text-2xl p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-pink-100'}`}
            aria-label="Toggle menu"
            onClick={() => setNavOpen(!navOpen)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileTap={{ scale: 0.9 }}
          >
            {navOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </nav>
        
        {/* Enhanced Mobile Nav */}
        <AnimatePresence>
          {navOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden ${darkMode ? 'bg-gray-800/95' : 'bg-pink-50/95'} backdrop-blur-md px-4 py-4 space-y-2 text-lg font-medium transition-colors duration-300 overflow-hidden`}
            >
              {navLinks.map(({ href, label, icon }, index) => (
                <motion.li 
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <motion.a
                    href={href}
                    className={`block transition py-3 px-4 rounded-lg ${
                      activeSection === href.substring(1) 
                        ? "text-pink-500 font-bold bg-pink-500/10" 
                        : `${darkMode ? 'text-gray-400 hover:text-pink-400 hover:bg-gray-700/50' : 'text-pink-700 hover:text-pink-500 hover:bg-pink-100'}`
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(href);
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {icon} {label}
                  </motion.a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="pt-4 border-t dark:border-gray-700"
              >
                <motion.button
                  onClick={() => {
                    setDarkMode(!darkMode);
                    setNavOpen(false);
                  }}
                  aria-label="Toggle dark mode"
                  className={`w-full text-left py-3 px-4 rounded-lg transition flex items-center gap-2 ${
                    darkMode ? 'text-gray-400 hover:text-pink-400 hover:bg-gray-700/50' : 'text-pink-700 hover:text-pink-500 hover:bg-pink-100'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? "Mode Terang" : "Mode Gelap"}
                </motion.button>
              </motion.li>
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.header>

      <main className="pt-20">
        {/* Enhanced Hero Section dengan animasi yang lebih dinamis */}
        <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900' : 'bg-gradient-to-br from-pink-100 via-pink-100 to-pink-200'} opacity-90 transition-colors duration-300`}></div>
          </div>
          
          <motion.div 
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-2xl">
                <FaRocket className="text-white text-3xl" />
              </div>
            </motion.div>

            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 px-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Hai, Saya <motion.span 
                className="text-pink-500 inline-block"
                animate={{ 
                  scale: [1, 1.05, 1],
                  textShadow: [
                    "0 0 0px rgba(236, 72, 153, 0)",
                    "0 0 20px rgba(236, 72, 153, 0.5)",
                    "0 0 0px rgba(236, 72, 153, 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >Imelda Novianty</motion.span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-8"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 text-xl sm:text-2xl md:text-3xl font-medium">
                 Full Stack Web Developer
              </span>
            </motion.div>
            
            <TypingText text={introText} darkMode={darkMode} delay={0.4} />
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.a
                href="#projects"
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all shadow-lg flex items-center justify-center gap-2 text-base group relative overflow-hidden"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#projects");
                }}
              >
                <motion.span
                  className="absolute inset-0 bg-white opacity-20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <FaLaptopCode className="relative z-10" /> 
                <span className="relative z-10">Lihat Proyek Saya</span>
              </motion.a>
              
              <motion.a
                href="#contact"
                className={`px-8 py-4 rounded-xl font-medium transition-all border-2 shadow-lg flex items-center justify-center gap-2 text-base group relative overflow-hidden ${
                  darkMode 
                    ? 'border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white' 
                    : 'border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white'
                }`}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contact");
                }}
              >
                <FaPaperPlane className="relative z-10" /> 
                <span className="relative z-10">Hubungi Saya</span>
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <motion.a 
                href="#about" 
                className={`block ${darkMode ? 'text-gray-600 hover:text-pink-500' : 'text-pink-400 hover:text-pink-500'} transition-colors`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#about");
                }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaChevronDown size={24} />
              </motion.a>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section dengan layout yang lebih responsif */}
        <section id="about" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-pink-50'} transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-pink-800'} font-['Montserrat']`}>
                <FaUser className="inline mr-3 text-pink-500" /> Tentang Saya
              </h2>
              <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8 }}
                className="flex justify-center order-2 lg:order-1"
              >
                <div className="relative max-w-xs sm:max-w-sm">
                  <motion.div 
                    className="absolute -inset-4 border-2 border-pink-500 rounded-2xl transform rotate-3"
                    whileHover={{ rotate: 6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <motion.img
                    src="/mee.png"
                    alt="Imelda Novianty"
                    className="relative z-10 rounded-2xl shadow-2xl transform -rotate-3 w-64 h-64 sm:w-80 sm:h-80 object-cover"
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
                    }}
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6 order-1 lg:order-2"
              >
                <h3 className="text-2xl font-bold text-pink-500 font-['Montserrat']">Imelda Novianty</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: <FaGraduationCap />, title: "Pendidikan", desc: "Management Informatika - Universitas Nasional Pasim" },
                    { icon: <FaLaptopCode />, title: "Peran", desc: "Junior Programmer" },
                    { icon: <FaMapMarkerAlt />, title: "Lokasi", desc: "Bandung, Jawa Barat" },
                    { icon: <FaHeart />, title: "Minat", desc: "Web Development, UI/UX Design, Database" }
                  ].map((item, index) => (
                    <HoverCard
                      key={index}
                      className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} cursor-default`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-pink-500 text-lg">{item.icon}</div>
                        <div>
                          <div className="font-semibold text-sm">{item.title}</div>
                          <div className={`text-xs ${darkMode ? "text-gray-300" : "text-pink-700"}`}>{item.desc}</div>
                        </div>
                      </div>
                    </HoverCard>
                  ))}
                </div>
                
                <motion.p 
                  className={`${darkMode ? "text-gray-300" : "text-pink-700"} text-base leading-relaxed`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Saya adalah lulusan Management Informatika yang memiliki passion dalam pengembangan perangkat lunak. 
                  Saya memiliki pengalaman dalam mengembangkan aplikasi web dan desktop menggunakan berbagai teknologi seperti Java, PHP, JavaScript, ReactJS, dan Spring Boot. 
                  Saya senang menciptakan solusi yang inovatif dan efisien untuk masalah yang kompleks.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <motion.a
                    href="#contact"
                    className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors shadow-md text-center"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("#contact");
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Hubungi Saya
                  </motion.a>
                  <motion.a
                    href="#projects"
                    className={`px-6 py-3 rounded-lg font-medium transition-colors border shadow-md text-center ${
                      darkMode 
                        ? 'border-gray-700 text-gray-300 hover:bg-gray-700' 
                        : 'border-pink-300 text-pink-800 hover:bg-pink-100'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("#projects");
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Lihat Proyek
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <AnimatedDivider darkMode={darkMode} />

        {/* Education Section yang lebih kompak */}
        <section id="education" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-pink-800'} font-['Montserrat']`}>
                <FaGraduationCap className="inline mr-3 text-pink-500" /> Pendidikan & Sertifikasi
              </h2>
              <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Education Timeline */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-pink-500 mb-8 font-['Montserrat']">Pendidikan Formal</h3>
                
                <div className="space-y-8">
                  {educationData.map((edu, index) => (
                    <motion.div 
                      key={index}
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <HoverCard className={`p-6 ${darkMode ? 'bg-gray-700' : 'bg-pink-50'}`}>
                        <h4 className="text-xl font-bold mb-2">{edu.degree}</h4>
                        <p className={`font-semibold mb-2 ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>{edu.institution}</p>
                        <p className={`mb-3 ${darkMode ? 'text-gray-400' : 'text-pink-700'} text-sm`}>{edu.period}</p>
                        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-pink-800'}`}>{edu.description}</p>
                        
                        <div className="mt-4">
                          <h5 className="font-semibold mb-2 flex items-center gap-2">
                            <FaAward className="text-pink-500" /> Prestasi & Pencapaian
                          </h5>
                          <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-pink-700'} text-sm`}>
                            {edu.achievements.map((achievement, i) => (
                              <motion.li 
                                key={i} 
                                className="flex items-start gap-2"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                              >
                                <span className="text-pink-500 mt-1">•</span>
                                <span>{achievement}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </HoverCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-pink-500 mb-8 font-['Montserrat']">Sertifikasi</h3>
                
                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {certificationsData.map((cert, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <HoverCard 
                        className={`p-6 ${darkMode ? 'bg-gray-700' : 'bg-pink-50'} flex items-start gap-4 cursor-pointer`}
                        onClick={() => openCertificateModal(cert)}
                      >
                        <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-full flex-shrink-0">
                          <FaCertificate className="text-pink-500 text-xl" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-lg font-bold mb-1 truncate">{cert.title}</h4>
                          <p className={`mb-1 ${darkMode ? 'text-gray-400' : 'text-pink-700'} truncate`}>{cert.issuer}</p>
                          <p className={`mb-2 ${darkMode ? 'text-gray-500' : 'text-pink-600'} text-sm`}>{cert.date}</p>
                          <motion.button 
                            className="text-pink-500 hover:text-pink-600 text-sm font-medium flex items-center gap-1"
                            whileHover={{ x: 5 }}
                          >
                            Lihat Sertifikat <FaExternalLinkAlt className="text-xs" />
                          </motion.button>
                        </div>
                      </HoverCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <AnimatedDivider darkMode={darkMode} />

        {/* Skills Section dengan grid yang lebih responsif */}
        <section id="skills" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-pink-50'} transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-pink-800'} font-['Montserrat']`}>
                <FaCode className="inline mr-3 text-pink-500" /> Keahlian Teknis
              </h2>
              <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
            </motion.div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {skillsData.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <HoverCard className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} text-center group cursor-default`}>
                      <div className="flex justify-center mb-4">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                        >
                          <IconComponent className={`text-3xl ${darkMode ? 'text-pink-400' : 'text-pink-600'} group-hover:text-pink-500 transition-colors`} />
                        </motion.div>
                      </div>
                      <h3 className="font-semibold mb-2">{skill.name}</h3>
                      <div className={`w-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-pink-100'} rounded-full overflow-hidden`}>
                        <motion.div 
                          className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full relative"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        >
                          <motion.div
                            className="absolute right-0 top-0 w-1 h-full bg-white opacity-70"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.1 }}
                          />
                        </motion.div>
                      </div>
                      <span className="text-xs mt-1 block">{skill.level}%</span>
                    </HoverCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <AnimatedDivider darkMode={darkMode} />

        {/* Projects Section dengan layout yang lebih baik */}
        <section id="projects" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-pink-800'} font-['Montserrat']`}>
                <FaLaptopCode className="inline mr-3 text-pink-500" /> Proyek Terbaru
              </h2>
              <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
            </motion.div>
            
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {projectsData.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <HoverCard className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-pink-50'} group h-full flex flex-col`}>
                    <div className="relative overflow-hidden">
                      <motion.img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-48 object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <motion.a 
                          href={project.githubUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white rounded-full text-gray-800 hover:bg-pink-500 hover:text-white transition-colors"
                          aria-label="View code on GitHub"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaGithub size={18} />
                        </motion.a>
                        {project.liveUrl !== "#" && (
                          <motion.a 
                            href={project.liveUrl} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white rounded-full text-gray-800 hover:bg-pink-500 hover:text-white transition-colors"
                            aria-label="View live demo"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaExternalLinkAlt size={16} />
                          </motion.a>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${darkMode ? 'bg-pink-900 text-pink-200' : 'bg-pink-200 text-pink-800'}`}>
                          {project.category}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                      <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-pink-700'} flex-1`}>{project.description}</p>
                      
                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <motion.span 
                            key={i}
                            className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-pink-100 text-pink-800'}`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center mt-auto">
                        <motion.a 
                          href={project.githubUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 ${darkMode ? 'text-pink-400 hover:text-pink-300' : 'text-pink-600 hover:text-pink-700'} font-medium`}
                          whileHover={{ x: 5 }}
                        >
                          <FaGithub /> Kode
                        </motion.a>
                        
                        {project.liveUrl !== "#" && (
                          <motion.a 
                            href={project.liveUrl} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 ${darkMode ? 'text-pink-400 hover:text-pink-300' : 'text-pink-600 hover:text-pink-700'} font-medium`}
                            whileHover={{ x: 5 }}
                          >
                            Demo <FaExternalLinkAlt size={12} />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </HoverCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <AnimatedDivider darkMode={darkMode} />

        {/* Contact Section yang lebih interaktif */}
        <section id="contact" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-pink-50'} transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-pink-800'} font-['Montserrat']`}>
                <FaPaperPlane className="inline mr-3 text-pink-500" /> Hubungi Saya
              </h2>
              <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-pink-500 mb-6 font-['Montserrat']">Informasi Kontak</h3>
                
                <div className="space-y-6">
                  {[
                    { icon: <FaEnvelope />, title: "Email", content: "noviantyimelda@gmail.com", href: "mailto:noviantyimelda@gmail.com" },
                    { icon: <FaWhatsapp />, title: "WhatsApp", content: "+62 852 2328 4793", href: "https://wa.me/6285223284793" },
                    { icon: <FaMapMarkerAlt />, title: "Lokasi", content: "Bandung, Jawa Barat, Indonesia", href: null },
                    { icon: <FaLinkedin />, title: "LinkedIn", content: "Imelda Novianty", href: "https://www.linkedin.com/in/imelda-novianty-6b5606308/" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-full flex-shrink-0">
                        <div className="text-pink-500 text-xl">{item.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        {item.href ? (
                          <a 
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : '_self'}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : ''}
                            className={`${darkMode ? 'text-gray-300 hover:text-pink-400' : 'text-pink-700 hover:text-pink-500'} transition-colors break-all`}
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className={`${darkMode ? "text-gray-300" : "text-pink-700"}`}>{item.content}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-pink-500 mb-6 font-['Montserrat']">Kirim Pesan</h3>
                
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <label htmlFor="name" className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-pink-700'}`}>Nama Lengkap</label>
                      <input 
                        type="text" 
                        id="name" 
                        value={formData.name}
                        onChange={handleFormChange}
                        className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-pink-800 border-pink-200'} border focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors`}
                        placeholder="Nama Anda"
                        required
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <label htmlFor="email" className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-pink-700'}`}>Alamat Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={handleFormChange}
                        className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-pink-800 border-pink-200'} border focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors`}
                        placeholder="email@contoh.com"
                        required
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <label htmlFor="subject" className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-pink-700'}`}>Subjek</label>
                    <input 
                      type="text" 
                      id="subject" 
                      value={formData.subject}
                      onChange={handleFormChange}
                      className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-pink-800 border-pink-200'} border focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors`}
                      placeholder="Subjek pesan"
                      required
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <label htmlFor="message" className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-pink-700'}`}>Pesan</label>
                    <textarea 
                      id="message" 
                      rows="4"
                      value={formData.message}
                      onChange={handleFormChange}
                      className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-pink-800 border-pink-200'} border focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors resize-none`}
                      placeholder="Tulis pesan Anda di sini..."
                      required
                    ></textarea>
                  </motion.div>
                  
                  <motion.button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all shadow-lg flex items-center justify-center gap-2 relative overflow-hidden group"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <FaPaperPlane className="relative z-10" /> 
                    <span className="relative z-10">Kirim Pesan</span>
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className={`py-12 ${darkMode ? 'bg-gray-800' : 'bg-pink-100'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.h3 
              className="text-2xl font-bold text-pink-500 mb-4 font-['Montserrat']"
              whileHover={{ scale: 1.05 }}
            >
              Imelda Novianty
            </motion.h3>
            <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-pink-700'} mb-6`}>
              Fullstack Developer yang passionate dalam menciptakan solusi digital yang inovatif dan user-friendly.
            </p>
            
            <div className="flex justify-center gap-4 mb-6">
              {[
                { icon: <FaGithub />, href: "https://github.com/imeldaNovianti", label: "GitHub" },
                { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/imelda-novianty-6b5606308/", label: "LinkedIn" },
                { icon: <FaInstagram />, href: "https://www.instagram.com/imelda_nvtyy/", label: "Instagram" },
                { icon: <FaEnvelope />, href: "mailto:noviantyimelda@gmail.com", label: "Email" },
                { icon: <FaWhatsapp />, href: "https://wa.me/6285223284793", label: "WhatsApp" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-pink-600' : 'bg-pink-200 text-pink-700 hover:bg-pink-300'} rounded-full transition-colors`}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className={`pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-pink-200'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className={`${darkMode ? 'text-gray-400' : 'text-pink-700'}`}>
              &copy; {new Date().getFullYear()} Imelda Novianty.{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block text-pink-500"
              >
                <FaHeart />
              </motion.span>{" "}
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Custom CSS untuk scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${darkMode ? '#374151' : '#fbcfe8'};
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#ec4899' : '#db2777'};
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? '#db2777' : '#be185d'};
        }
      `}</style>
    </div>
  );
}

export default LandingPage;