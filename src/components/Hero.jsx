
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } },
    };

    // Floating animation for background elements
    const floatingVariant = {
        animate: {
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div id="home" className="min-h-[120vh] w-full flex flex-col justify-center items-center text-center relative overflow-hidden">

            {/* Dynamic Background Elements */}
            <motion.div
                variants={floatingVariant}
                animate="animate"
                className="absolute top-20 left-10 w-72 h-72 bg-[var(--secondary-color)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
            />
            <motion.div
                variants={floatingVariant}
                animate="animate"
                transition={{ delay: 2, duration: 7 }}
                className="absolute top-40 right-10 w-72 h-72 bg-[var(--accent-color)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
            />
            <motion.div
                variants={floatingVariant}
                animate="animate"
                transition={{ delay: 4, duration: 6 }}
                className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
            />

            {/* Grid Pattern Overlay */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(var(--text-color) 1px, transparent 1px), linear-gradient(90deg, var(--text-color) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            ></div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="relative z-10 max-w-4xl px-4"
            >
                <motion.p variants={itemVariants} className="text-xl md:text-2xl font-light tracking-widest uppercase mb-4 text-[var(--secondary-color)]">
                    Welcome to my digital space
                </motion.p>

                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-8xl font-black mb-6 leading-tight glass-text"
                    style={{
                        fontFamily: 'var(--heading-font)',
                        textShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                >
                    MOHAMMED YASER A
                </motion.h1>

                <motion.p variants={itemVariants} className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto opacity-80">
                    Full Stack Developer | Creating Seamless Digital Experiences
                </motion.p>

                <motion.div variants={itemVariants} className="flex gap-6 justify-center">
                    <a
                        href="#projects"
                        className="px-8 py-3 rounded-full text-lg font-semibold border-2 transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                        style={{
                            borderColor: 'var(--text-color)',
                            color: 'var(--bg-color)',
                            backgroundColor: 'var(--text-color)'
                        }}
                    >
                        View Work
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-3 rounded-full text-lg font-semibold border-2 transition-all hover:scale-105 active:scale-95 glass hover:bg-[var(--accent-color)]/10"
                        style={{ borderColor: 'var(--text-color)', color: 'var(--text-color)' }}
                    >
                        Contact Me
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-50 cursor-pointer"
                onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
            >
                <div className="w-[30px] h-[50px] rounded-full border-2 border-[var(--text-color)] flex justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-1.5 h-1.5 rounded-full bg-[var(--text-color)] mb-1"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
