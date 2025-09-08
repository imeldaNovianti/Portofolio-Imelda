import { useEffect, useState, useRef } from "react";
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes, 
  FaMoon, FaSun, FaExternalLinkAlt, FaChevronDown,
  FaFigma, FaSketch, FaReact, FaNodeJs, FaDatabase,
  FaPaintBrush, FaCode, FaServer, FaMobileAlt, FaInstagram,
  FaWhatsapp, FaPaperPlane, FaHeart, FaUser, FaGraduationCap,
  FaLaptopCode, FaJava, FaCss3Alt, FaHtml5, FaGitAlt,
  FaMapMarkerAlt, FaDownload
} from "react-icons/fa";
import { SiJavascript, SiSpringboot, SiPostgresql, SiPostman, SiC } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import Typical from "react-typical";

// Komponen-komponen khusus
const InteractiveCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  
  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Deteksi elemen yang bisa diinteraksi
      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a")
      );
    };
    
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);
  
  return (
    <motion.div
      className={`fixed top-0 left-0 z-50 pointer-events-none hidden md:block ${
        isPointer ? "mix-blend-difference" : "mix-blend-normal"
      }`}
      animate={{ x: position.x - 12, y: position.y - 12 }}
      transition={{ type: "spring", damping: 10, stiffness: 150 }}
    >
      <div className={`w-6 h-6 rounded-full ${
        isPointer ? "bg-white scale-150" : "bg-pink-200 scale-100"
      } transition-all duration-150 flex items-center justify-center`}>
        {isPointer && (
          <div className="w-1 h-1 bg-black rounded-full"></div>
        )}
      </div>
    </motion.div>
  );
};

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
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.9 }}
          aria-label={social.label}
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
      const sections = ["about", "skills", "projects", "contact"];
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

  const navLinks = [
    { href: "#about", label: "About", icon: <FaUser className="inline mr-2" /> },
    { href: "#skills", label: "Skills", icon: <FaCode className="inline mr-2" /> },
    { href: "#projects", label: "Projects", icon: <FaLaptopCode className="inline mr-2" /> },
    { href: "#contact", label: "Contact", icon: <FaPaperPlane className="inline mr-2" /> },
  ];

  const skillsData = [
    { name: "Java", icon: FaJava },
    { name: "JavaScript", icon: SiJavascript },
    { name: "HTML", icon: FaHtml5 },
    { name: "CSS", icon: FaCss3Alt },
    { name: "ReactJS", icon: FaReact },
    { name: "Node.js", icon: FaNodeJs },
    { name: "Spring Boot", icon: SiSpringboot },
    { name: "SQL & Database", icon: FaDatabase },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "Postman", icon: SiPostman },
    { name: "DBeaver", icon: FaDatabase },
    { name: "UI/UX Design", icon: FaPaintBrush },
    { name: "Git", icon: FaGitAlt },
    { name: "Bahasa C", icon: SiC },
  ];

  const projectsData = [
    {
      id: 1,
      title: "Aplikasi Manajemen Tugas",
      category: "Java Desktop Application",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      description: "Aplikasi desktop untuk manajemen tugas dengan fitur reminder, kategori, dan prioritas.",
      technologies: ["Java", "JavaFX", "SQLite", "CSS"],
      githubUrl: "https://github.com/imeldaNovianti/Uas-lanjutan-imell.git",
      liveUrl: "#"
    },
    {
      id: 2,
      title: "Sistem Penerimaan Pegawai Baru",
      category: "Full-Stack Web Application",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      description: "Sistem untuk mengelola proses penerimaan pegawai baru dengan fitur aplikasi online, seleksi administrasi, dan penilaian.",
      technologies: ["Java", "Spring Boot", "ReactJS", "PostgreSQL"],
      githubUrl: "https://github.com/iqnefo1310/WEB-PENERIMAAN-PEGAWAI-BARU.git",
      liveUrl: "#"
    },
    {
      id: 3,
      title: "Good Teacher Platform",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      description: "Platform untuk menghubungkan guru dan siswa dengan fitur pencarian, rating, dan sistem booking.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      githubUrl: "https://github.com/imeldaNovianti/GOOD-TEACHER-.git",
      liveUrl: "#"
    },
    {
      id: 4,
      title: "Website Lowongan Kerja",
      category: "Frontend Development",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      description: "Website untuk mempromosikan lowongan kerja dengan filter pencarian dan aplikasi online.",
      technologies: ["ReactJS", "CSS", "JavaScript", "JSON Server"],
      githubUrl: "https://github.com/imeldaNovianti/web_loker.git",
      liveUrl: "#"
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 text-gray-800'} font-['Poppins'] selection:bg-pink-500 selection:text-white overflow-x-hidden transition-colors duration-300`}>
      <InteractiveCursor />
      <ScrollIndicator />
      <FloatingSocials />
      <StarsBackground />
      
      {/* Header */}
      <header className={`fixed top-0 w-full ${darkMode ? 'bg-gray-900' : 'bg-white'} bg-opacity-90 backdrop-blur-md z-50 shadow-lg border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'} transition-colors duration-300`}>
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-pink-500 select-none">
            <div className="w-3 h-3 rounded-full bg-pink-500 animate-pulse"></div>
            <h1 className="text-xl font-bold tracking-widest uppercase">PORTFOLIO IMELDA</h1>
          </div>
          
          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-8 text-lg font-medium">
            {navLinks.map(({ href, label, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`transition-all duration-300 ${
                    activeSection === href.substring(1) 
                      ? "text-pink-500 font-bold border-b-2 border-pink-500" 
                      : `${darkMode ? 'text-gray-400 hover:text-pink-400' : 'text-gray-600 hover:text-pink-500'}`
                  }`}
                  onClick={() => setNavOpen(false)}
                >
                  {icon} {label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle dark mode"
                className={`${darkMode ? 'text-gray-400 hover:text-pink-400' : 'text-gray-600 hover:text-pink-500'} transition text-xl`}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
            </li>
          </ul>
          
          {/* Mobile Nav Toggle */}
          <button
            className={`md:hidden ${darkMode ? 'text-gray-400 hover:text-pink-400' : 'text-gray-600 hover:text-pink-500'} transition text-2xl`}
            aria-label="Toggle menu"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>
        
        {/* Mobile Nav */}
        {navOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`md:hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} px-6 py-4 space-y-4 text-lg font-medium transition-colors duration-300`}
          >
            {navLinks.map(({ href, label, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`block transition ${
                    activeSection === href.substring(1) 
                      ? "text-pink-500 font-bold" 
                      : `${darkMode ? 'text-gray-400 hover:text-pink-400' : 'text-gray-600 hover:text-pink-500'}`
                  }`}
                  onClick={() => setNavOpen(false)}
                >
                  {icon} {label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                  setNavOpen(false);
                }}
                aria-label="Toggle dark mode"
                className={`${darkMode ? 'text-gray-400 hover:text-pink-400' : 'text-gray-600 hover:text-pink-500'} transition text-xl flex items-center gap-2`}
              >
                {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </li>
          </motion.ul>
        )}
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900' : 'bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100'} opacity-90 transition-colors duration-300`}></div>
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
              Hi, I'm <span className="text-pink-500">Imelda Novianty</span>
              <br />Fullstack Developer
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className={`${darkMode ? "text-gray-300" : "text-gray-600"} font-medium`}>
                <Typical
                  steps={[
                    "Fresh Graduate in Management Informatics.",
                    2000,
                    "Passionate about creating beautiful and functional applications.",
                    2000,
                    "Skilled in both frontend and backend development.",
                    2000,
                  ]}
                  loop={Infinity}
                  wrapper="span"
                />
              </span>
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.a
                href="#projects"
                className="px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors shadow-lg"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Projects
              </motion.a>
              <motion.a
                href="#contact"
                className={`px-8 py-4 ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-white hover:bg-gray-100 text-gray-800'} rounded-lg font-medium transition-colors border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <a href="#about" className={`${darkMode ? 'text-gray-600 hover:text-pink-500' : 'text-gray-400 hover:text-pink-500'} transition-colors animate-bounce`}>
                <FaChevronDown size={24} />
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'} font-['Montserrat']`}>
                <FaUser className="inline mr-3 text-pink-500" /> About Me
              </h2>
              <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto text-lg`}>
                Get to know more about my background, education, and interests
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex justify-center"
              >
                <div className="relative max-w-xs">
                  <div className="absolute -inset-3 border-2 border-pink-500 rounded-xl transform rotate-3"></div>
                  <img
                    src="/src/assets/me.jpg"
                    alt="Imelda Novianty"
                    className="relative z-10 rounded-xl shadow-2xl transform -rotate-3 w-72 h-72 object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80";
                    }}
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-pink-500 font-['Montserrat']">Imelda Novianty</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <FaGraduationCap className="text-pink-500" />
                      <span className="font-semibold">Education:</span>
                    </div>
                    <p className={darkMode ? "text-gray-300" : "text-gray-600"}>Management Informatics - Universitas Nasional Pasim</p>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <FaLaptopCode className="text-pink-500" />
                      <span className="font-semibold">Role:</span>
                    </div>
                    <p className={darkMode ? "text-gray-300" : "text-gray-600"}>Fullstack Developer</p>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <FaMapMarkerAlt className="text-pink-500" />
                      <span className="font-semibold">Location:</span>
                    </div>
                    <p className={darkMode ? "text-gray-300" : "text-gray-600"}>Bandung, Jawa Barat</p>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <FaHeart className="text-pink-500" />
                      <span className="font-semibold">Interests:</span>
                    </div>
                    <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                      Web Development, UI/UX Design, Database Management
                    </p>
                  </div>
                </div>
                
                <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} leading-relaxed text-lg`}>
                  As a fresh graduate in Management Informatics, I'm passionate about creating digital solutions 
                  that combine functionality with beautiful design. I enjoy both frontend and backend development, 
                  and I'm constantly learning new technologies to improve my skills. I'm excited to start my 
                  professional journey in the tech industry and contribute to meaningful projects.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'} font-['Montserrat']`}>
                <FaCode className="inline mr-3 text-pink-500" /> Skills & Technologies
              </h2>
              <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
            </motion.div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {skillsData.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`p-4 rounded-xl shadow-md flex flex-col items-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300 cursor-default`}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  <skill.icon className="text-pink-500 text-3xl mb-2" />
                  <span className={`font-medium text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'} font-['Montserrat']`}>
                <FaLaptopCode className="inline mr-3 text-pink-500" /> My Projects
              </h2>
              <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-4 max-w-2xl mx-auto`}>
                Here are some of the projects I've worked on as a student and fresh graduate.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {projectsData.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`rounded-xl overflow-hidden shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300 cursor-default`}
                  whileHover={{ y: -10 }}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{project.title}</h3>
                    <p className="text-pink-500 mb-4">{project.category}</p>
                    <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4">
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaGithub /> View Code
                      </motion.a>
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors text-sm"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'} font-['Montserrat']`}>
                <FaPaperPlane className="inline mr-3 text-pink-500" /> Get In Touch
              </h2>
              <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-4 max-w-2xl mx-auto`}>
                I'm always open to discussing new opportunities and interesting projects.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`rounded-2xl p-8 shadow-2xl ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
                        <FaEnvelope className="text-pink-500 text-xl" />
                      </div>
                      <div>
                        <p className={darkMode ? "text-gray-400" : "text-gray-500"}>Email</p>
                        <a href="mailto:noviantyimelda@gmail.com" className={`${darkMode ? 'text-white hover:text-pink-400' : 'text-gray-800 hover:text-pink-500'} transition-colors`}>
                          noviantyimelda@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
                        <FaWhatsapp className="text-pink-500 text-xl" />
                      </div>
                      <div>
                        <p className={darkMode ? "text-gray-400" : "text-gray-500"}>WhatsApp</p>
                        <a href="https://wa.me/6285223284793" className={`${darkMode ? 'text-white hover:text-pink-400' : 'text-gray-800 hover:text-pink-500'} transition-colors`}>
                          +62 852-2328-4793
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
                        <FaLinkedin className="text-pink-500 text-xl" />
                      </div>
                      <div>
                        <p className={darkMode ? "text-gray-400" : "text-gray-500"}>LinkedIn</p>
                        <a href="https://www.linkedin.com/in/imelda-novianty-6b5606308/" className={`${darkMode ? 'text-white hover:text-pink-400' : 'text-gray-800 hover:text-pink-500'} transition-colors`}>
                          imelda-novianty
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
                        <FaGithub className="text-pink-500 text-xl" />
                      </div>
                      <div>
                        <p className={darkMode ? "text-gray-400" : "text-gray-500"}>GitHub</p>
                        <a href="https://github.com/imeldaNovianti" className={`${darkMode ? 'text-white hover:text-pink-400' : 'text-gray-800 hover:text-pink-500'} transition-colors`}>
                          imeldaNovianti
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <form
                    className="space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert("Thank you for your message! I'll get back to you soon.");
                    }}
                  >
                    <div>
                      <label htmlFor="name" className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors duration-300`}
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors duration-300`}
                        placeholder="Your email address"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none transition-colors duration-300`}
                        placeholder="How can I help you?"
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      className="w-full py-4 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaPaperPlane /> Send Message
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`border-t py-8 text-center select-none transition-colors duration-300 ${darkMode ? 'bg-gray-900 border-gray-800 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Imelda Novianty. Crafted with <FaHeart className="text-pink-500 mx-1" /> and React.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;