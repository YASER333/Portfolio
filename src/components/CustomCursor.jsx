
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            height: 32,
            width: 32,
            backgroundColor: 'transparent',
            border: '2px solid var(--accent-color)',
            transition: {
                type: "spring",
                mass: 0.1 // quick follow
            }
        },
        hover: {
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
            height: 64,
            width: 64,
            backgroundColor: 'rgba(var(--accent-color), 0.1)',
            border: '2px solid var(--accent-color)',
            transition: {
                type: "spring",
                mass: 0.1
            }
        }
    };

    const dotVariants = {
        default: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            opacity: 1
        },
        hover: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            opacity: 0 // Hide dot when hovering
        }
    }

    return (
        <>
            {/* Main Ring */}
            <motion.div
                className="fixed top-0 left-0 rounded-full z-[9999] pointer-events-none hidden md:block"
                variants={variants}
                animate={isHovering ? "hover" : "default"}
                style={{ mixBlendMode: 'difference' }}
            />
            {/* Center Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-[var(--accent-color)] rounded-full z-[9999] pointer-events-none hidden md:block"
                variants={dotVariants}
                animate={isHovering ? "hover" : "default"}
            />
        </>
    );
};

export default CustomCursor;
