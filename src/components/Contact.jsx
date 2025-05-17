function Contact() {
  return (
    <section id="contact" className="p-8 bg-blue-50">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Kontak Saya</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Nama" className="border p-2 rounded" />
          <input type="email" placeholder="Email" className="border p-2 rounded" />
          <textarea placeholder="Pesan" className="border p-2 rounded" rows="5"></textarea>
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Kirim</button>
        </form>
      </div>
    </section>
  )
}

export default Contact
