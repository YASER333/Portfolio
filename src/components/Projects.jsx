
import React from 'react';
import { motion } from 'framer-motion';

const projects = [
    {
        title: 'Technician Booking System',
        role: 'Backend Developer Intern',
        description: 'Real-time technician booking application with service scheduling and technician assignment. Implemented RESTful APIs and MongoDB integration.',
        tech: ['Node.js', 'Express', 'MongoDB'],
        link: '#',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'College Placement Attendance',
        role: 'MERN Stack (FYP)',
        description: 'Digital attendance system with Admin/Student dashboards. Secure API design for attendance tracking.',
        tech: ['MERN Stack', 'React', 'Node.js'],
        link: '#',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'Employee Salary Management',
        role: 'MERN Stack',
        description: 'Role-based salary management with secure authentication for Admin, Supervisor, and Employees.',
        tech: ['React', 'Node.js', 'MongoDB'],
        link: '#',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'Bank Website',
        role: 'MERN Stack',
        description: 'Secure banking web app for user accounts and financial transactions.',
        tech: ['React', 'Node.js', 'Express'],
        link: '#',
        image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80&w=800'
    }
];

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-2xl h-96 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
        >
            <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                    {project.tech.map((t, i) => (
                        <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="min-h-[140vh] flex flex-col justify-center py-20 md:py-32 px-6">
            <div className="container mx-auto">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center"
                >
                    Featured <span className="text-[var(--secondary-color)]">Projects</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
