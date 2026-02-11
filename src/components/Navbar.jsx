
import React from 'react';
import { useTheme } from '../ThemeContext';
import { motion } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navItems = ['Home', 'About', 'Projects', 'Experience', 'Contact'];

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 w-full z-50 glass ${theme === 'dark' ? 'bg-black/20' : 'bg-white/20'} backdrop-blur-md px-6 py-4 flex justify-between items-center transition-all duration-300`}
            style={{
                borderBottom: `1px solid var(--glass-border)`,
                backgroundColor: `rgba(${theme === 'dark' ? '0,0,0' : '255,255,255'}, 0.7)`
            }}
        >
            <div
                className="text-2xl font-bold cursor-pointer"
                onClick={() => scrollToSection('home')}
                style={{ fontFamily: 'var(--heading-font)' }}
            >
                YASER<span style={{ color: 'var(--secondary-color)' }}>.</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
                {navItems.map((item) => (
                    <div
                        key={item}
                        className="cursor-pointer hover:text-[var(--secondary-color)] transition-colors relative group"
                        onClick={() => scrollToSection(item.toLowerCase())}
                    >
                        {item}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--secondary-color)] group-hover:w-full transition-all duration-300"></span>
                    </div>
                ))}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-4">
                <button onClick={toggleMenu} className="text-2xl">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-16 left-0 w-full glass p-6 flex flex-col items-center gap-6 md:hidden"
                    style={{ backgroundColor: `var(--bg-color)` }}
                >
                    {navItems.map((item) => (
                        <div
                            key={item}
                            className="cursor-pointer text-xl hover:text-[var(--secondary-color)] transition-colors"
                            onClick={() => scrollToSection(item.toLowerCase())}
                        >
                            {item}
                        </div>
                    ))}
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;
