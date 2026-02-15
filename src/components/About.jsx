
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <section id="about" className="min-h-[140vh] flex items-center py-20 px-6 relative">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Image / Visual */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="relative group w-full h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl"
                    style={{ border: '1px solid var(--glass-border)' }}
                >
                    {/* Placeholder for Profile Image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary-color)] to-[var(--accent-color)] opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                    <img
                        src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800"
                        alt="Mohammed Yaser A"
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                    />

                    {/* Floating decorative element */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--accent-color)] rounded-full blur-3xl opacity-30 animate-pulse"></div>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="space-y-6"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
                    <h3 className="text-xl md:text-2xl font-light text-[var(--secondary-color)]">
                        Full Stack Developer & Creative Thinker
                    </h3>

                    <p className="text-lg leading-relaxed opacity-80">
                        Hello! I'm <span className="font-semibold text-[var(--accent-color)]">Mohammed Yaser A</span>, a passionate Full Stack Developer based in Coimbatore.
                        Currently pursuing my MCA at RVS College of Arts and Science.
                    </p>

                    <p className="text-lg leading-relaxed opacity-80">
                        My journey involves building scalable RESTful APIs and database-driven systems using the MERN stack.
                        I thrive on creating secure, efficient, and visually stunning web applications.
                    </p>

                    <div className="grid grid-cols-2 gap-6 mt-8">
                        <div className="p-4 glass rounded-xl text-center hover:scale-105 transition-transform duration-300">
                            <span className="block text-3xl font-bold text-[var(--secondary-color)]">2+</span>
                            <span className="text-sm uppercase tracking-wider opacity-70">Years Experience</span>
                        </div>
                        <div className="p-4 glass rounded-xl text-center hover:scale-105 transition-transform duration-300">
                            <span className="block text-3xl font-bold text-[var(--secondary-color)]">10+</span>
                            <span className="text-sm uppercase tracking-wider opacity-70">Projects Completed</span>
                        </div>
                    </div>

                    <a href="#contact" className="inline-block mt-8 text-[var(--accent-color)] border-b border-[var(--accent-color)] pb-1 hover:text-[var(--text-color)] transition-colors">
                        Let's collaborate →
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
