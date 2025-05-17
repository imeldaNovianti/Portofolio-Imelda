function Skills() {
  const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Git', 'Figma']

  return (
    <section id="skills" className="bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Skill</h2>
        <div className="flex flex-wrap gap-4">
          {skills.map((skill, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
