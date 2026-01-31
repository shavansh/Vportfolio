type ProjectCardProps = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
};

export default function ProjectCard({
  title,
  description,
  tech,
  github,
  live,
}: ProjectCardProps) {
  return (
    <div className="rounded-xl border p-5 md:p-6">
      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="mt-2 text-gray-600">
        {description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {tech.map((item) => (
          <span
            key={item}
            className="text-sm px-3 py-1 rounded-full bg-gray-100"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <a
          href={github}
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          GitHub
        </a>
        <a
          href={live}
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          Live Demo
        </a>
      </div>
    </div>
  );
}
