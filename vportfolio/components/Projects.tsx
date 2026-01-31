import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/project";

export default function Projects() {
    return (
        <section id="projects" className="py-20 px-6 bg-gray-50">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-10">
                    Projects
                </h2>

                <div className="grid gap-8 sm:grid-cols-2">

                    {projects.map((project) => (
                        <ProjectCard
                            key={project.title}
                            title={project.title}
                            description={project.description}
                            tech={project.tech}
                            github={project.github}
                            live={project.live}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
