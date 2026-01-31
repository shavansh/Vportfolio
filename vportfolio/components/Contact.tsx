export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Contact Me
        </h2>

        <p className="text-gray-600 mb-10">
          Have a project in mind or want to work together?
          Feel free to reach out.
        </p>

        <form className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              rows={5}
              placeholder="Your message"
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
