export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">
          Hi, I’m <span className="text-blue-500">Vansh</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-500">
          I build modern, fast, and clean web applications.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a className="px-6 py-3 rounded-lg bg-blue-500 text-white text-center">
            View Projects
          </a>
          <a className="px-6 py-3 rounded-lg border text-center">
            Contact Me
          </a>
        </div>

      </div>
    </section>
  );
}
