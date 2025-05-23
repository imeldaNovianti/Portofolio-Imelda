import { useEffect, useState } from "react";
import { FaCode, FaLaptopCode, FaDatabase, FaGithub, FaLinkedin, FaUser , FaTools, FaProjectDiagram, FaEnvelope, FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";
import Typical from "react-typical";

function LandingPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
    { href: "#about", icon: <FaUser  />, label: "About" },
    { href: "#skills", icon: <FaTools />, label: "Skills" },
    { href: "#projects", icon: <FaProjectDiagram />, label: "Projects" },
    { href: "#contact", icon: <FaEnvelope />, label: "Contact" },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-black via-pink-900 to-indigo-900 text-white'} font-poppins selection:bg-pink-500 selection:text-black`} style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Header */}
      <header className={`fixed top-0 w-full ${darkMode ? 'bg-gray-800' : 'bg-black bg-opacity-90'} backdrop-blur-md z-50 shadow-lg`}>
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-pink-400 select-none">
            <FaCode size={28} />
            <h1 className="text-2xl font-extrabold tracking-widest uppercase">IMELDA NOVIANTY</h1>
          </div>
          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-8 text-lg font-semibold">
            {navLinks.map(({ href, icon, label }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`flex items-center gap-1 transition ${activeSection === href.substring(1) ? "text-pink-400 font-bold" : "hover:text-pink-300"}`}
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
                className="text-pink-400 hover:text-pink-300 transition text-xl"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
            </li>
          </ul>
          {/* Mobile Nav Toggle */}
          <button
            className="md:hidden text-pink-400 hover:text-pink-300 transition text-2xl"
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
            className={`md:hidden ${darkMode ? 'bg-gray-800' : 'bg-black bg-opacity-95'} backdrop-blur-md px-6 py-4 space-y-4 text-lg font-semibold`}
          >
            {navLinks.map(({ href, icon, label }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`flex items-center gap-2 transition ${activeSection === href.substring(1) ? "text-pink-400 font-bold" : "hover:text-pink-300"}`}
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
                className="text-pink-400 hover:text-pink-300 transition text-xl flex items-center gap-2"
              >
                {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </li>
          </motion.ul>
        )}
      </header>

      <main className="pt-28 max-w-5xl mx-auto px-6 select-text">
        {/* Hero Section */}
        <motion.section
          className="flex flex-col md:flex-row items-center gap-12 py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-52 h-52 rounded-full border-8 border-pink-500 overflow-hidden shadow-2xl mx-auto md:mx-0 transform hover:scale-105 transition-transform duration-500">
            <img
              src="https://avatars.githubusercontent.com/u/65158495?v=4"
              alt="Foto Imelda"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="text-center md:text-left max-w-xl">
            <h2 className="text-5xl font-extrabold mb-4">
              Hi, I'm Imelda Novianty.
              {" "}
              <span role="img" aria-label="programmer">
                👩‍💻
              </span>
            </h2>
            <p className="text-xl mb-8 text-pink-300 min-h-[3rem]">
              <Typical
                steps={[
                  "Passionate Frontend Developer.",
                  2000,
                  "UI/UX Enthusiast.",
                  2000,
                  "React, Tailwind CSS Expert.",
                  2000,
                  "Building clean & performant apps.",
                  2000,
                ]}
                loop={Infinity}
                wrapper="span"
              />
            </p>
            <div className="flex justify-center md:justify-start gap-8 text-pink-400 text-3xl">
              <a
                href="https://github.com/imelda"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-white transition transform hover:scale-110"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/imelda"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-white transition transform hover:scale-110"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          className="py-16 border-t border-pink-700 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-4xl font-bold mb-8 text-pink-400 tracking-wide">About Me</h3>
          <p className="text-pink-200 text-lg leading-relaxed">
            Saya adalah programmer handal dengan pengalaman membangun aplikasi web modern menggunakan teknologi terbaru.
            Keahlian utama saya adalah React JS dan Tailwind CSS yang memungkinkan saya membuat UI yang responsif,
            cepat, dan user-friendly. Selain frontend, saya juga mengerti konsep backend dan database sehingga aplikasi
            yang saya buat berjalan optimal. Saya percaya bahwa kode yang bersih dan terstruktur adalah kunci keberhasilan proyek.
            <br />
            <br />
            Dengan kemampuan problem solving yang baik dan terus belajar teknologi terbaru, saya siap menghadapi tantangan
            pengembangan perangkat lunak dengan penuh semangat dan profesionalisme.
          </p>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          className="py-16 border-t border-pink-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-4xl font-bold mb-10 text-pink-400 tracking-wide text-center">Skills & Tools</h3>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto">
            {[
              { icon: FaCode, name: "JavaScript" },
              { icon: FaLaptopCode, name: "React JS" },
              { icon: FaDatabase, name: "PostgreSQL" },
              { icon: FaTools, name: "Tailwind CSS" },
              { icon: FaTools, name: "Node.js" },
              { icon: FaTools, name: "Express" },
              { icon: FaTools, name: "Git & GitHub" },
              { icon: FaTools, name: "Figma" },
            ].map(({ icon: Icon, name }) => (
              <motion.li
                key={name}
                className="flex flex-col items-center text-pink-300 hover:text-pink-100 cursor-default select-none"
                whileHover={{ scale: 1.15, color: "#ec4899" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon size={48} />
                <span className="mt-3 font-semibold text-lg">{name}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          className="py-16 border-t border-pink-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-4xl font-bold mb-10 text-pink-400 tracking-wide text-center">Projects</h3>
          <div className="grid gap-10 max-w-5xl mx-auto md:grid-cols-2">
            {[
              {
                title: "Portfolio Website",
                description: "Website portfolio pribadi yang responsive dengan React dan Tailwind CSS.",
                img: "https://source.unsplash.com/800x600/?website,code",
                live: "https://imelda-portfolio.example.com",
                repo: "https://github.com/imelda/portfolio",
              },
              {
                title: "Job Portal App",
                description: "Aplikasi portal lowongan kerja lengkap dengan fitur login, CRUD lowongan, dan dashboard.",
                img: "https://source.unsplash.com/800x600/?job,portal",
                live: "https://jobportal.imelda.com",
                repo: "https://github.com/imelda/jobportal",
              },
              {
                title: "E-commerce App",
                description: "Aplikasi e-commerce menggunakan React, Express, dan PostgreSQL dengan fitur keranjang dan pembayaran.",
                img: "https://source.unsplash.com/800x600/?ecommerce,shopping",
                live: "https://ecommerce.imelda.com",
                repo: "https://github.com/imelda/ecommerce",
              },
            ].map(({ title, description, img, live, repo }) => (
              <motion.div
                key={title}
                className="bg-gradient-to-tr from-pink-900 to-indigo-900 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <img src={img} alt={title} className="w-full h-48 object-cover" loading="lazy" />
                <div className="p-6">
                  <h4 className="text-2xl font-bold mb-2">{title}</h4>
                  <p className="text-pink-300 mb-4">{description}</p>
                  <div className="flex gap-4">
                    <a
                      href={live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-pink-500 hover:bg-pink-600 transition text-white px-4 py-2 rounded shadow"
                    >
                      Live Demo
                    </a>
                    <a
                      href={repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-pink-700 hover:bg-pink-800 transition text-white px-4 py-2 rounded shadow"
                    >
                      GitHub Repo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="py-16 border-t border-pink-700 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-4xl font-bold mb-8 text-pink-400 tracking-wide text-center">Get in Touch</h3>
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for contacting me! (Simulated)");
            }}
            aria-label="Contact form"
          >
            <label htmlFor="name" className="text-pink-300 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="rounded px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Your full name"
            />
            <label htmlFor="email" className="text-pink-300 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="rounded px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Your email address"
            />
            <label htmlFor="message" className="text-pink-300 font-semibold">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="rounded px-4 py-2 text-black resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Write your message here..."
            />
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 transition text-white font-bold py-3 rounded shadow"
              aria-label="Send message"
            >
              Send Message
            </button>
          </form>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className={`bg-black bg-opacity-90 text-pink-400 py-8 text-center select-none`}>
        <p>© {new Date().getFullYear()} Imelda. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
