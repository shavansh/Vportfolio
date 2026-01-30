export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold">
        Hi, I’m <span className="text-blue-500">Vansh</span>
      </h1>

      <p className="mt-4 text-xl text-gray-600">
        Web Developer • Next.js • React
      </p>

      <div className="mt-6 flex gap-4">
        <a
          href="#projects"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg"
        >
          View Projects
        </a>

        <a
          href="#contact"
          className="px-6 py-3 border rounded-lg"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}
