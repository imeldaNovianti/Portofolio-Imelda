function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Portofolio Imelda</h1>
        <ul className="flex gap-6 text-sm">
          <li><a href="#about" className="hover:text-blue-600">Tentang</a></li>
          <li><a href="#skills" className="hover:text-blue-600">Skill</a></li>
          <li><a href="#projects" className="hover:text-blue-600">Proyek</a></li>
          <li><a href="#contact" className="hover:text-blue-600">Kontak</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
