import React from 'react';
import { useTheme } from '../ThemeContext';

/**
 * Lightweight fallback component shown while ThreeDRobot lazy loads.
 * Maintains layout space and provides subtle visual feedback.
 * NO heavy dependencies - just pure CSS animation.
 */
const RobotLoader = () => {
    const { theme } = useTheme();

    return (
        <div
            className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none"
            style={{ position: 'fixed', zIndex: 0 }}
        >
            {/* Subtle gradient orb - atmospheric placeholder */}
            <div
                className="absolute right-[10%] bottom-[20%] md:right-[15%] md:bottom-[30%]"
                style={{
                    width: '200px',
                    height: '200px',
                    background: theme === 'dark'
                        ? 'radial-gradient(circle, rgba(0,229,255,0.15) 0%, rgba(0,229,255,0) 70%)'
                        : 'radial-gradient(circle, rgba(33,150,243,0.1) 0%, rgba(33,150,243,0) 70%)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                    animation: 'pulse 3s ease-in-out infinite'
                }}
            />
        </div>
    );
};

export default RobotLoader;
