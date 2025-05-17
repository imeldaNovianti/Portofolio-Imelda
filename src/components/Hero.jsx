function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center p-6 bg-gradient-to-b from-blue-100 to-white">
      <img src="/profile.jpg" alt="profile" className="w-40 h-40 rounded-full shadow-md" />
      <h1 className="text-4xl font-bold mt-4">Imelda Novianty</h1>
      <p className="mt-2 text-xl text-gray-700">Frontend Developer | UI/UX Enthusiast</p>
    </section>
  )
}

export default Hero
