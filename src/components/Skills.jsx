
import React from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaJs, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt } from 'react-icons/fa';
import { SiMongodb, SiPostman, SiExpress, SiC } from 'react-icons/si';

const skills = [
    { name: 'JavaScript', icon: <FaJs />, level: 'Advanced' },
    { name: 'React', icon: <FaReact />, level: 'Advanced' },
    { name: 'Node.js', icon: <FaNodeJs />, level: 'Advanced' },
    { name: 'MongoDB', icon: <SiMongodb />, level: 'Intermediate' },
    { name: 'Express', icon: <SiExpress />, level: 'Intermediate' },
    { name: 'HTML5', icon: <FaHtml5 />, level: 'Advanced' },
    { name: 'CSS3', icon: <FaCss3Alt />, level: 'Advanced' },
    { name: 'Python', icon: <FaPython />, level: 'Intermediate' },
    { name: 'C', icon: <SiC />, level: 'Intermediate' },
    { name: 'Git', icon: <FaGitAlt />, level: 'Advanced' },
    { name: 'Postman', icon: <SiPostman />, level: 'Intermediate' },
];

const Skills = () => {
    return (
        <section id="skills" className="min-h-[140vh] flex flex-col justify-center py-20 px-6">
            <div className="container mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-16"
                >
                    Technical <span className="text-[var(--secondary-color)]">Skills</span>
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                            className="flex flex-col items-center justify-center p-6 glass rounded-2xl hover:bg-[var(--accent-color)]/10 transition-colors duration-300"
                        >
                            <div className="text-5xl text-[var(--accent-color)] mb-4 transition-transform hover:scale-110 duration-300">
                                {skill.icon}
                            </div>
                            <h3 className="font-semibold text-lg">{skill.name}</h3>
                            <span className="text-xs opacity-60 mt-1 uppercase tracking-wide">{skill.level}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
