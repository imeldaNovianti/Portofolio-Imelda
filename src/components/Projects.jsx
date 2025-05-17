function Projects() {
  const projects = [
    {
      title: 'Website Portofolio',
      description: 'Aplikasi portofolio pribadi menggunakan React dan Tailwind.',
      image: '/project1.png',
    },
    {
      title: 'Job Portal App',
      description: 'Aplikasi pencarian kerja dengan fitur login, posting, dan melamar pekerjaan.',
      image: '/project2.png',
    }
  ]

  return (
    <section id="projects" className="py-8 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Proyek Saya</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition">
              <img src={project.image} alt={project.title} className="rounded mb-4" />
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
