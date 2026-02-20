export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">
          Hola, soy [Tu Nombre]
        </h1>
        <p className="text-lg mb-8">
          Desarrollador web. Aquí encontrarás mis proyectos,
          información sobre mí y cómo contactarme.
        </p>
        <div className="flex gap-4">
          <a href="/projects" className="px-4 py-2 bg-emerald-500 rounded-md font-medium">
            Ver proyectos
          </a>
          <a href="/contact" className="px-4 py-2 border border-slate-500 rounded-md">
            Contacto
          </a>
        </div>
      </section>
    </main>
  );
}
