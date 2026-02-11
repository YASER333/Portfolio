
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle form submission
        console.log('Form submitted:', formState);
        alert('Message sent! (Demo)');
        setFormState({ name: '', email: '', message: '' });
    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="min-h-[140vh] flex flex-col justify-center py-20 px-6 relative">
            <div className="container mx-auto max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center"
                >
                    Get in <span className="text-[var(--secondary-color)]">Touch</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
                            <p className="opacity-70 leading-relaxed mb-8">
                                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, feel free to reach out!
                            </p>
                        </div>

                        <div className="space-y-4">
                            <a href="mailto:mdyaser2021@gmail.com" className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-[var(--accent-color)]/10 transition-colors group">
                                <div className="p-3 bg-[var(--accent-color)]/20 rounded-full text-[var(--accent-color)] group-hover:scale-110 transition-transform">
                                    <FaEnvelope size={20} />
                                </div>
                                <div>
                                    <span className="block text-sm opacity-50">Email</span>
                                    <span className="font-semibold">mdyaser2021@gmail.com</span>
                                </div>
                            </a>

                            <a href="tel:9345468461" className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-[var(--accent-color)]/10 transition-colors group">
                                <div className="p-3 bg-[var(--accent-color)]/20 rounded-full text-[var(--accent-color)] group-hover:scale-110 transition-transform">
                                    <FaPhone size={20} />
                                </div>
                                <div>
                                    <span className="block text-sm opacity-50">Phone</span>
                                    <span className="font-semibold">9345468461</span>
                                </div>
                            </a>

                            <div className="flex gap-4 pt-4">
                                <a href="https://github.com/YASER333" target="_blank" rel="noopener noreferrer" className="p-4 glass rounded-full hover:scale-110 hover:text-[var(--accent-color)] transition-all">
                                    <FaGithub size={24} />
                                </a>
                                <a href="https://www.linkedin.com/in/mdyaser333" target="_blank" rel="noopener noreferrer" className="p-4 glass rounded-full hover:scale-110 hover:text-[var(--accent-color)] transition-all">
                                    <FaLinkedin size={24} />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass p-8 rounded-2xl border border-[var(--glass-border)] shadow-xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2 opacity-70">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formState.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-color)] border border-[var(--glass-border)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] outline-none transition-all"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2 opacity-70">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-color)] border border-[var(--glass-border)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] outline-none transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2 opacity-70">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formState.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-color)] border border-[var(--glass-border)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] outline-none transition-all resize-none"
                                    placeholder="Your Message..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 rounded-lg bg-[var(--accent-color)] text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl active:scale-95 transform duration-200"
                            >
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
