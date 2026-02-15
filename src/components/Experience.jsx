
import React from 'react';
import { motion } from 'framer-motion';

const TimelineItem = ({ year, title, subtitle, description, isLeft }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`mb-8 flex justify-between items-center w-full ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col`}
        >
            <div className="hidden md:block w-5/12"></div>

            <div className="z-20 flex items-center justify-center bg-[var(--accent-color)] shadow-xl w-4 h-4 rounded-full border-4 border-[var(--bg-color)] shrink-0 md:order-1"></div>

            <div className={`w-full md:w-5/12 px-6 py-4 glass rounded-xl shadow-lg border border-[var(--glass-border)] hover:scale-105 transition-transform duration-300 ${isLeft ? 'text-right' : 'text-left'} md:order-1`}>
                <span className="text-sm font-bold text-[var(--secondary-color)] mb-1 block">{year}</span>
                <h3 className="text-xl font-bold mb-1">{title}</h3>
                <h4 className="text-sm font-medium opacity-80 mb-3">{subtitle}</h4>
                <p className="text-sm opacity-70 leading-relaxed">{description}</p>
            </div>
        </motion.div>
    );
};

const Experience = () => {
    const experiences = [
        {
            year: '2025 - Present',
            title: 'Backend Developer Intern',
            subtitle: 'Flareminds, Coimbatore',
            description: 'Developing a real-time Technician Booking Application. Managing MongoDB integration for efficient data handling.',
        },
        {
            year: '2024 - 2026',
            title: 'Master of Computer Applications (MCA)',
            subtitle: 'RVS College of Arts and Science',
            description: 'Pursuing MCA with 87.37%. Focusing on advanced software development and full-stack technologies.',
        },
        {
            year: '2023',
            title: 'Java J2EE Intern',
            subtitle: 'Gateway Software Solutions',
            description: 'Completed in-plant training in Java J2EE frameworks and enterprise application development.',
        },
        {
            year: '2021 - 2024',
            title: 'BSc Information Technology',
            subtitle: 'G. Vengataswamy Naidu College',
            description: 'Graduated with 79%. Built a strong foundation in programming and IT concepts.',
        },
    ];

    return (
        <section id="experience" className="min-h-[140vh] flex flex-col justify-center py-20 relative overflow-hidden">
            <div className="container mx-auto px-6 relative">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-20 text-center"
                >
                    My <span className="text-[var(--secondary-color)]">Journey</span>
                </motion.h2>

                {/* Vertical Line */}
                <div className="hidden md:block absolute left-1/2 top-32 bottom-0 w-0.5 bg-[var(--text-color)] opacity-10 transform -translate-x-1/2"></div>

                <div className="space-y-4">
                    {experiences.map((exp, index) => (
                        <TimelineItem
                            key={index}
                            {...exp}
                            isLeft={index % 2 === 0}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
