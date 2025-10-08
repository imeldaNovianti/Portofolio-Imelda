import { useEffect, useState, useRef } from "react";
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes, 
  FaMoon, FaSun, FaExternalLinkAlt, FaChevronDown,
  FaFigma, FaSketch, FaReact, FaNodeJs, FaDatabase,
  FaPaintBrush, FaCode, FaServer, FaMobileAlt, FaInstagram,
  FaWhatsapp, FaPaperPlane, FaHeart, FaUser, FaGraduationCap,
  FaLaptopCode, FaJava, FaCss3Alt, FaHtml5, FaGitAlt,
  FaMapMarkerAlt, FaDownload, FaAward, FaCertificate,
  FaTimes as FaClose
} from "react-icons/fa";
import { SiJavascript, SiSpringboot, SiPostgresql, SiPostman, SiC, SiTailwindcss } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

// Komponen-komponen khusus
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
        className="h-full bg-gradient-to-r from-pink-500 to-purple-600"
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

const FloatingSocials = () => {
  const socialLinks = [
    { icon: <FaGithub />, href: "https://github.com/imeldaNovianti", label: "GitHub", color: "hover:text-gray-700 dark:hover:text-white" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/imelda-novianty-6b5606308/", label: "LinkedIn", color: "hover:text-blue-600" },
    { icon: <FaInstagram />, href: "https://www.instagram.com/imelda_nvtyy/", label: "Instagram", color: "hover:text-pink-500" },
    { icon: <FaEnvelope />, href: "mailto:noviantyimelda@gmail.com", label: "Email", color: "hover:text-red-500" },
    { icon: <FaWhatsapp />, href: "https://wa.me/6285223284793", label: "WhatsApp", color: "hover:text-green-500" },
  ];

  return (
    <div className="fixed left-6 bottom-6 z-40 hidden md:flex flex-col gap-4">
      {socialLinks.map((social, index) => (
        <motion.a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300`}
          whileHover={{ y: -5, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={social.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 1.5 }}
        >
          {social.icon}
        </motion.a>
      ))}
    </div>
  );
};

const StarsBackground = () => {
  const stars = useRef([]);

  useEffect(() => {
    stars.current = [...Array(100)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 2
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {stars.current.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full dark:bg-white bg-gray-300"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
          style={{
            top: `${star.y}%`,
            left: `${star.x}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        />
      ))}
    </div>
  );
};

// Komponen Teks Ketikan (Typing Effect)
const TypingText = ({ text, darkMode, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 40); // Kecepatan ketikan (ms per karakter)
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <motion.p 
      className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto ${darkMode ? "text-gray-300" : "text-pink-800"} font-medium`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + 0.4, duration: 0.8 }}
    >
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="ml-1"
        >
          |
        </motion.span>
      )}
    </motion.p>
  );
};

// Komponen Kursor Kustom
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHover, setLinkHover] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    // Menambahkan efek hover pada link dan button
    const handleLinkHoverEvents = () => {
      const links = document.querySelectorAll('a, button, [role="button"]');
      
      links.forEach(link => {
        link.addEventListener('mouseover', () => setLinkHover(true));
        link.addEventListener('mouseout', () => setLinkHover(false));
      });
    };

    addEventListeners();
    handleLinkHoverEvents();
    return () => removeEventListeners();
  }, []);

  return (
    <motion.div
      className={`cursor hidden md:block fixed top-0 left-0 z-50 pointer-events-none transition-opacity duration-300 ${
        hidden ? 'opacity-0' : 'opacity-100'
      }`}
      animate={{
        x: position.x - 10,
        y: position.y - 10,
      }}
      transition={{ type: "spring", mass: 0.1 }}
    >
      <motion.div
        className={`w-4 h-4 rounded-full ${
          clicked ? 'bg-pink-700' : linkHover ? 'bg-pink-500' : 'bg-pink-400'
        }`}
        animate={{
          scale: clicked ? 0.8 : linkHover ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
    </motion.div>
  );
};

// Komponen Modal untuk Sertifikat
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
            className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl max-h-[90vh] w-full overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {certificate.title}
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <FaClose className="text-gray-600 dark:text-gray-400 text-xl" />
              </button>
            </div>
            
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="flex flex-col items-center">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                  }}
                />
                
                <div className="mt-6 text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Diterbitkan oleh:</strong> {certificate.issuer}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    <strong>Tanggal:</strong> {certificate.date}
                  </p>
                  
                  <div className="flex gap-4 justify-center">
                    <a
                      href={certificate.image}
                      download
                      className="flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
                    >
                      <FaDownload /> Unduh Sertifikat
                    </a>
                    
                    <button
                      onClick={onClose}
                      className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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

  // Highlight menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      const sections = ["about", "skills", "projects", "education", "contact"];
      let current = "home";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.offsetTop <= scrollPos) {
          current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fix untuk smooth scroll di mobile
  const handleNavClick = (href) => {
    setNavOpen(false);
    
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Delay sedikit untuk memastikan nav tertutup dulu
        setTimeout(() => {
          const offsetTop = targetElement.offsetTop - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }, 100);
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
    
    // Validasi form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Harap lengkapi semua field!');
      return;
    }
    
    // Simulasi pengiriman form
    const mailtoLink = `mailto:noviantyimelda@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Nama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`)}`;
    
    window.location.href = mailtoLink;
    
    // Reset form
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
      degree: "D3 Management Informatika",
      institution: "Universitas Nasional Pasim",
      period: "2023 - 2025",
      description: "Fokus pada pengembangan perangkat lunak, basis data, dan manajemen proyek TI. Aktif dalam organisasi mahasiswa dan kegiatan kampus.",
      achievements: [
        "Aktif organisasi himpunan Mahasiswa Informatika (2021-2022)",
        "Peserta aktif dalam berbagai pelatihan coding dalam program beasiswa PUB",
        "Magang selama 1 tahun di bagian marketing dan Front office",
        "Berperan sebagai tim pendukung dalam proses akreditasi kampus",
        "instruktur bahasa inggris"
      ]
    }
  ];

  const certificationsData = [
    {
      title: "Belajar Dasar Pemrograman JavaScript",
      issuer: "Program BEASISWA PUB",
      date: "Juni 2023",
      credentialLink: "#",
      image: "/certificates/javascript-basic.jpg" // Ganti dengan path gambar sertifikat Anda
    },
    {
      title: "Belajar Membuat Aplikasi Back-End untuk Pemula",
      issuer: "Program BEASISWA PUB",
      date: "Agustus 2023",
      credentialLink: "#",
      image: "/certificates/backend-basic.jpg"
    },
    {
      title: "Java Programming Masterclass",
      issuer: "Program BEASISWA PUB",
      date: "November 2022",
      credentialLink: "#",
      image: "/certificates/java-masterclass.jpg"
    },
    {
      title: "React JS Frontend Web Development For Beginners",
      issuer: "Program BEASISWA PUB",
      date: "Januari 2023",
      credentialLink: "#",
      image: "/certificates/react-beginner.jpg"
    },
    {
      title: "Pelatihan Pemrograman Bahasa C",
      issuer: "Program BEASISWA PUB",
      date: "Maret 2023",
      credentialLink: "#",
      image: "/certificates/c-programming.jpg"
    },
    {
      title: "React JS Advanced Development",
      issuer: "Program BEASISWA PUB",
      date: "April 2023",
      credentialLink: "#",
      image: "/certificates/react-advanced.jpg"
    },
    {
      title: "Node.js Backend Development",
      issuer: "Program BEASISWA PUB",
      date: "Mei 2023",
      credentialLink: "#",
      image: "/certificates/nodejs.jpg"
    },
    {
      title: "Java Spring Boot Development",
      issuer: "Program BEASISWA PUB",
      date: "Juli 2023",
      credentialLink: "#",
      image: "/certificates/spring-boot.jpg"
    }
  ];

  const introText = "Lulusan Baru Management Informatika yang bersemangat dalam menciptakan aplikasi yang indah dan fungsional. Terampil dalam pengembangan frontend dan backend dengan dasar yang kuat dalam Java, JavaScript, dan teknologi web modern.";

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-pink-50 via-pink-50 to-pink-100 text-gray-800'} font-['Poppins'] selection:bg-pink-500 selection:text-white overflow-x-hidden transition-colors duration-300`}>
      <ScrollIndicator />
      <FloatingSocials />
      <StarsBackground />
      <CustomCursor />
      
      {/* Certificate Modal */}
      <CertificateModal 
        isOpen={certificateModal.isOpen}
        onClose={closeCertificateModal}
        certificate={certificateModal.certificate}
      />
      
      {/* Header */}
      <header className={`fixed top-0 w-full ${darkMode ? 'bg-gray-900' : 'bg-pink-50'} bg-opacity-90 backdrop-blur-md z-50 shadow-lg border-b ${darkMode ? 'border-gray-800' : 'border-pink-200'} transition-colors duration-300`}>
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-2 text-pink-500 select-none"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-3 h-3 rounded-full bg-pink-500 animate-pulse"></div>
            <h1 className="text-xl font-bold tracking-widest uppercase">PORTFOLIO IMELDA</h1>
          </motion.div>
          
          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-8 text-lg font-medium">
            {navLinks.map(({ href, label, icon }) => (
              <motion.li 
                key={label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <a
                  href={href}
                  className={`transition-all duration-300 ${
                    activeSection === href.substring(1) 
                      ? "text-pink-500 font-bold border-b-2 border-pink-500" 
                      : `${darkMode ? 'text-gray-400 hover:text-pink-400' : 'text-pink-700 hover:text-pink-500'}`
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(href);
                  }}
                >
                  {icon} {label}
                </a>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle dark mode"
                className={`${darkMode ? 'text-gray-400 hover:text-pink-400' : 'text-pink-700 hover:text-pink-500'} transition text-xl`}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
            </motion.li>
          </ul>
          
          {/* Mobile Nav Toggle */}
          <motion.button
            className={`md:hidden ${darkMode ? 'text-gray-400 hover:text-pink-400' : 'text-pink-700 hover:text-pink-500'} transition text-2xl`}
            aria-label="Toggle menu"
            onClick={() => setNavOpen(!navOpen)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {navOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </nav>
        
        {/* Mobile Nav */}
        <AnimatePresence>
          {navOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden ${darkMode ? 'bg-gray-800' : 'bg-pink-50'} px-6 py-4 space-y-4 text-lg font-medium transition-colors duration-300 overflow-hidden`}
            >
              {navLinks.map(({ href, label, icon }) => (
                <motion.li 
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <a
                    href={href}
                    className={`block transition ${
                      activeSection === href.substring(1) 
                        ? "text-pink-500 font-bold" 
                        : `${darkMode ? 'text-gray-400 hover:text-pink-400' : 'text-pink-700 hover:text-pink-500'}`
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(href);
                    }}
                  >
                    {icon} {label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <button
                  onClick={() => {
                    setDarkMode(!darkMode);
                    setNavOpen(false);
                  }}
                  aria-label="Toggle dark mode"
                  className={`${darkMode ? 'text-gray-400 hover:text-pink-400' : 'text-pink-700 hover:text-pink-500'} transition text-xl flex items-center gap-2`}
                >
                  {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? "Mode Terang" : "Mode Gelap"}
                </button>
              </motion.li>
            </motion.ul>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-32">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900' : 'bg-gradient-to-br from-pink-100 via-pink-100 to-pink-200'} opacity-90 transition-colors duration-300`}></div>
          </div>
          
          <motion.div 
            className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Hai, Saya <span className="text-pink-500">Imelda Novianty</span>
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 text-xl md:text-2xl font-medium"
              >
                Junior Full Stack Web Developer | React.js,Next.Js, Java, & Basis Data | Problem Solver & Lifelong Learner
              </motion.span>
            </motion.h1>
            
            <TypingText text={introText} darkMode={darkMode} delay={0.4} />
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.a
                href="#projects"
                className="px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors shadow-lg flex items-center justify-center gap-2"
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#projects");
                }}
              >
                <FaLaptopCode /> Lihat Proyek Saya
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <a 
                href="#about" 
                className={`${darkMode ? 'text-gray-600 hover:text-pink-500' : 'text-pink-400 hover:text-pink-500'} transition-colors animate-bounce`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#about");
                }}
              >
                <FaChevronDown size={24} />
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-pink-50'} transition-colors duration-300`}>
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-pink-800'} font-['Montserrat']`}>
                <FaUser className="inline mr-3 text-pink-500" /> Tentang Saya
              </h2>
              <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-pink-700'} max-w-2xl mx-auto text-lg`}>
                Kenali lebih jauh tentang latar belakang, pendidikan, dan minat saya
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex justify-center"
              >
                <div className="relative max-w-xs">
                  <motion.div 
                    className="absolute -inset-3 border-2 border-pink-500 rounded-xl transform rotate-3"
                    whileHover={{ rotate: 6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  ></motion.div>
                  <img
                    src="/mee.png"
                    alt="Imelda Novianty"
                    className="relative z-10 rounded-xl shadow-2xl transform -rotate-3 w-72 h-72 object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
                    }}
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-pink-500 font-['Montserrat']">Imelda Novianty</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    className="flex flex-col p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FaGraduationCap className="text-pink-500" />
                      <span className="font-semibold">Pendidikan:</span>
                    </div>
                    <p className={darkMode ? "text-gray-300" : "text-pink-700"}>Management Informatika - Universitas Nasional Pasim</p>
                  </motion.div>
                  
                  <motion.div 
                    className="flex flex-col p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FaLaptopCode className="text-pink-500" />
                      <span className="font-semibold">Peran:</span>
                    </div>
                    <p className={darkMode ? "text-gray-300" : "text-pink-700"}>junior pragrammer</p>
                  </motion.div>
                  
                  <motion.div 
                    className="flex flex-col p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FaMapMarkerAlt className="text-pink-500" />
                      <span className="font-semibold">Lokasi:</span>
                    </div>
                    <p className={darkMode ? "text-gray-300" : "text-pink-700"}>Bandung, Jawa Barat</p>
                  </motion.div>
                  
                  <motion.div 
                    className="flex flex-col p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FaHeart className="text-pink-500" />
                      <span className="font-semibold">Minat:</span>
                    </div>
                    <p className={darkMode ? "text-gray-300" : "text-pink-700"}>
                      Web Development, UI/UX Design, Manajemen Database,Frontend,Backend,Fullstack
                    </p>
                  </motion.div>
                </div>
                
                <motion.p 
                  className={`${darkMode ? "text-gray-300" : "text-pink-700"} text-lg`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Saya adalah lulusan Management Informatika yang memiliki passion dalam pengembangan perangkat lunak. 
                  Saya memiliki pengalaman dalam mengembangkan aplikasi web dan desktop menggunakan berbagai teknologi seperti Java, PHP,Bahasa C,C++,C#,
                  JavaScript, ReactJS,NodeJS dan Spring Boot. Saya senang menciptakan solusi yang inovatif dan efisien untuk masalah yang kompleks.
                </motion.p>
                
                <motion.div 
                  className="flex gap-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <a
                    href="#contact"
                    className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors shadow-md"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("#contact");
                    }}
                  >
                    Hubungi Saya
                  </a>
                  <a
                    href="#projects"
                    className={`px-6 py-3 ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-white hover:bg-pink-100 text-pink-800'} rounded-lg font-medium transition-colors border ${darkMode ? 'border-gray-700' : 'border-pink-300'} shadow-md`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("#projects");
                    }}
                  >
                    Lihat Proyek
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-pink-800'} font-['Montserrat']`}>
                <FaGraduationCap className="inline mr-3 text-pink-500" /> Pendidikan & Sertifikasi
              </h2>
              <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-pink-700'} max-w-2xl mx-auto text-lg`}>
                Riwayat pendidikan formal dan sertifikasi yang telah saya selesaikan
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Education Timeline */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-pink-500 mb-8 font-['Montserrat']">Pendidikan Formal</h3>
                
                <div className="space-y-8">
                  {educationData.map((edu, index) => (
                    <motion.div 
                      key={index}
                      className={`relative pl-10 pb-8 ${index !== educationData.length - 1 ? 'border-l-2 border-pink-500' : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-pink-500"></div>
                      
                      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-pink-50'} shadow-md`}>
                        <h4 className="text-xl font-bold mb-2">{edu.degree}</h4>
                        <p className={`font-semibold mb-2 ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>{edu.institution}</p>
                        <p className={`mb-3 ${darkMode ? 'text-gray-400' : 'text-pink-700'}`}>{edu.period}</p>
                        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-pink-800'}`}>{edu.description}</p>
                        
                        <div className="mt-4">
                          <h5 className="font-semibold mb-2 flex items-center gap-2">
                            <FaAward className="text-pink-500" /> Prestasi & Pencapaian
                          </h5>
                          <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-pink-700'}`}>
                            {edu.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-pink-500 mt-1">•</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-pink-500 mb-8 font-['Montserrat']">Sertifikasi</h3>
                
                <div className="space-y-6">
                  {certificationsData.map((cert, index) => (
                    <motion.div 
                      key={index}
                      className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-pink-50'} shadow-md flex items-start gap-4 cursor-pointer`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      onClick={() => openCertificateModal(cert)}
                    >
                      <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-full">
                        <FaCertificate className="text-pink-500 text-xl" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">{cert.title}</h4>
                        <p className={`mb-1 ${darkMode ? 'text-gray-400' : 'text-pink-700'}`}>{cert.issuer}</p>
                        <p className={`mb-2 ${darkMode ? 'text-gray-500' : 'text-pink-600'} text-sm`}>{cert.date}</p>
                        <button 
                          className="text-pink-500 hover:text-pink-600 text-sm font-medium flex items-center gap-1"
                        >
                          Lihat Sertifikat <FaExternalLinkAlt className="text-xs" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-pink-100'} shadow-md`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h4 className="text-xl font-bold mb-4 text-pink-500">Keterampilan Tambahan</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'} text-center shadow-sm`}>
                      <p className="font-semibold">Bahasa Inggris</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-pink-700'}`}>Menengah</p>
                    </div>
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'} text-center shadow-sm`}>
                      <p className="font-semibold">Manajemen Proyek</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-pink-700'}`}>Baik</p>
                    </div>
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'} text-center shadow-sm`}>
                      <p className="font-semibold">Komunikasi</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-pink-700'}`}>Ahli</p>
                    </div>
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'} text-center shadow-sm`}>
                      <p className="font-semibold">Kerja Tim</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-pink-700'}`}>Ahli</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-pink-50'} transition-colors duration-300`}>
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-pink-800'} font-['Montserrat']`}>
                <FaCode className="inline mr-3 text-pink-500" /> Keahlian Teknis
              </h2>
              <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-pink-700'} max-w-2xl mx-auto text-lg`}>
                Teknologi и tools yang saya kuasai untuk pengembangan perangkat lunak
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {skillsData.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <motion.div
                    key={index}
                    className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md text-center group cursor-default`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    <div className="flex justify-center mb-4">
                      <IconComponent className={`text-4xl ${darkMode ? 'text-pink-400' : 'text-pink-600'} group-hover:text-pink-500 transition-colors`} />
                    </div>
                    <h3 className="font-semibold mb-2">{skill.name}</h3>
                    <div className={`w-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-pink-100'} rounded-full overflow-hidden`}>
                      <motion.div 
                        className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                    <span className="text-xs mt-1 block">{skill.level}%</span>
                  </motion.div>
                );
              })}
            </div>
            
            <motion.div 
              className={`mt-16 p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-pink-500 mb-6 text-center font-['Montserrat']">Pengalaman Pengembangan</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-pink-50'} text-center`}>
                  <div className="text-4xl text-pink-500 mb-4">🚀</div>
                  <h4 className="font-semibold mb-2">Pengembangan Frontend</h4>
                  <p className={darkMode ? "text-gray-300" : "text-pink-700"}>
                    Membangun antarmuka pengguna yang responsif dan interaktif dengan ReactJS, HTML, CSS, dan JavaScript.
                  </p>
                </div>
                
                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-pink-50'} text-center`}>
                  <div className="text-4xl text-pink-500 mb-4">⚙️</div>
                  <h4 className="font-semibold mb-2">Pengembangan Backend</h4>
                  <p className={darkMode ? "text-gray-300" : "text-pink-700"}>
                    Mengembangkan API dan logika bisnis menggunakan Java, Spring Boot, Node.js, dan database SQL.
                  </p>
                </div>
                
                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-pink-50'} text-center`}>
                  <div className="text-4xl text-pink-500 mb-4">🎨</div>
                  <h4 className="font-semibold mb-2">UI/UX Design</h4>
                  <p className={darkMode ? "text-gray-300" : "text-pink-700"}>
                    Merancang pengalaman pengguna yang intuitif dan antarmuka yang menarik dengan prinsip desain modern.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-pink-800'} font-['Montserrat']`}>
                <FaLaptopCode className="inline mr-3 text-pink-500" /> Proyek Terbaru
              </h2>
              <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-pink-700'} max-w-2xl mx-auto text-lg`}>
                Beberapa proyek yang telah saya kembangkan selama belajar dan berkarier
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-pink-50'} group`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <a 
                        href={project.githubUrl} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white rounded-full text-gray-800 hover:bg-pink-500 hover:text-white transition-colors"
                        aria-label="View code on GitHub"
                      >
                        <FaGithub size={20} />
                      </a>
                      {project.liveUrl !== "#" && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white rounded-full text-gray-800 hover:bg-pink-500 hover:text-white transition-colors"
                          aria-label="View live demo"
                        >
                          <FaExternalLinkAlt size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${darkMode ? 'bg-pink-900 text-pink-200' : 'bg-pink-200 text-pink-800'}`}>
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-pink-700'}`}>{project.description}</p>
                    
                    <div className="mb-5 flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span 
                          key={i}
                          className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-pink-100 text-pink-800'}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <a 
                        href={project.githubUrl} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 ${darkMode ? 'text-pink-400 hover:text-pink-300' : 'text-pink-600 hover:text-pink-700'} font-medium`}
                      >
                        <FaGithub /> Kode Sumber
                      </a>
                      
                      {project.liveUrl !== "#" && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 ${darkMode ? 'text-pink-400 hover:text-pink-300' : 'text-pink-600 hover:text-pink-700'} font-medium`}
                        >
                          Demo <FaExternalLinkAlt size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <a 
                href="https://github.com/imeldaNovianti" 
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-pink-100 hover:bg-pink-200 text-pink-800'} font-medium transition-colors`}
              >
                <FaGithub /> Lihat Lebih Banyak di GitHub
              </a>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-pink-50'} transition-colors duration-300`}>
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-pink-800'} font-['Montserrat']`}>
                <FaPaperPlane className="inline mr-3 text-pink-500" /> Hubungi Saya
              </h2>
              <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-pink-700'} max-w-2xl mx-auto text-lg`}>
                Tertarik untuk berkolaborasi atau memiliki pertanyaan? Jangan ragu untuk menghubungi saya
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-pink-500 mb-6 font-['Montserrat']">Informasi Kontak</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-full">
                      <FaEnvelope className="text-pink-500 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <a 
                        href="mailto:noviantyimelda@gmail.com" 
                        className={`${darkMode ? 'text-gray-300 hover:text-pink-400' : 'text-pink-700 hover:text-pink-500'} transition-colors`}
                      >
                        noviantyimelda@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-full">
                      <FaWhatsapp className="text-pink-500 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold">WhatsApp</h4>
                      <a 
                        href="https://wa.me/6285223284793" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${darkMode ? 'text-gray-300 hover:text-pink-400' : 'text-pink-700 hover:text-pink-500'} transition-colors`}
                      >
                        +62 852 2328 4793
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-full">
                      <FaMapMarkerAlt className="text-pink-500 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Lokasi</h4>
                      <p className={darkMode ? "text-gray-300" : "text-pink-700"}>Bandung, Jawa Barat, Indonesia</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-full">
                      <FaLinkedin className="text-pink-500 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold">LinkedIn</h4>
                      <a 
                        href="https://www.linkedin.com/in/imelda-novianty-6b5606308/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${darkMode ? 'text-gray-300 hover:text-pink-400' : 'text-pink-700 hover:text-pink-500'} transition-colors`}
                      >
                        Imelda Novianty
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-xl font-bold text-pink-500 mb-4 font-['Montserrat']">Media Sosial</h4>
                  <div className="flex gap-4">
                    {[
                      { icon: <FaGithub />, href: "https://github.com/imeldaNovianti", label: "GitHub" },
                      { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/imelda-novianty-6b5606308/", label: "LinkedIn" },
                      { icon: <FaInstagram />, href: "https://www.instagram.com/imelda_nvtyy/", label: "Instagram" },
                      { icon: <FaWhatsapp />, href: "https://wa.me/6285223284793", label: "WhatsApp" },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-pink-600' : 'bg-pink-100 text-pink-700 hover:bg-pink-200'} rounded-full transition-colors`}
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={social.label}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-pink-500 mb-6 font-['Montserrat']">Kirim Pesan</h3>
                
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                  </div>
                  
                  <div>
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
                  </div>
                  
                  <div>
                    <label htmlFor="message" className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-pink-700'}`}>Pesan</label>
                    <textarea 
                      id="message" 
                      rows="5"
                      value={formData.message}
                      onChange={handleFormChange}
                      className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-pink-800 border-pink-200'} border focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors`}
                      placeholder="Tulis pesan Anda di sini..."
                      required
                    ></textarea>
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors shadow-md flex items-center justify-center gap-2"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaPaperPlane /> Kirim Pesan
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`py-12 ${darkMode ? 'bg-gray-800' : 'bg-pink-100'} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold text-pink-500 mb-4 font-['Montserrat']">Imelda Novianty</h3>
            <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-pink-700'} mb-6`}>
              Fullstack Developer yang passionate dalam menciptakan solusi digital yang inovatif dan user-friendly.
            </p>
            
            <div className="flex justify-center gap-6 mb-8">
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
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <div className={`pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-pink-200'}`}>
            <p className={`${darkMode ? 'text-gray-400' : 'text-pink-700'}`}>
              &copy; {new Date().getFullYear()} Imelda Novianty. Dibuat dengan <FaHeart className="inline text-pink-500" /> menggunakan React dan Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;