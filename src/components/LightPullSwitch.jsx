import React, { useRef, useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useTheme } from '../ThemeContext';

const LightPullSwitch = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    const [isDragging, setIsDragging] = useState(false);
    const [pullY, setPullY] = useState(0);

    // Spring configuration for rope physics
    const [{ y }, api] = useSpring(() => ({ y: 0, config: { tension: 300, friction: 20 } }));

    // Refs for drag calculation
    const containerRef = useRef(null);
    const maxPull = 150; // Max pixels user can pull down
    const triggerThreshold = 80; // Distance to trigger toggle

    // Handle Drag Start
    const handlePointerDown = (e) => {
        setIsDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    // Handle Drag Move
    const handlePointerMove = (e) => {
        if (!isDragging) return;

        // Calculate pull distance relative to container top
        // Simple approximation: just use movementY accum or relative to start
        // Better: relative to initial click, but for a hanging rope, 
        // usually users grab the bulb. 
        // We'll just add movementY to current pull logic or tracked separately.

        // Let's us e.movementY for relative updates for smoother "grab anywhere" feel
        // or cleaner: calc delta from initial click.
        // Simplified:
        const movement = e.movementY;

        setPullY(prev => {
            const newY = prev + movement;
            // Clamp between 0 and maxPull + some overpull resistance
            return Math.max(0, Math.min(newY, maxPull));
        });
    };

    // Sync spring with pullY state when dragging
    useEffect(() => {
        if (isDragging) {
            api.start({ y: pullY, immediate: true });
        }
    }, [isDragging, pullY, api]);

    // Handle Release
    const handlePointerUp = (e) => {
        if (!isDragging) return;
        setIsDragging(false);
        e.currentTarget.releasePointerCapture(e.pointerId);

        // Check if pulled enough to toggle
        if (pullY > triggerThreshold) {
            // Trigger Theme Change
            toggleTheme();

            // Haptic feedback if available
            if (window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate(50);
            }
        }

        // Spring back to 0
        setPullY(0);
        api.start({ y: 0, config: { tension: 200, friction: 10 } }); // Bounce back
    };

    // Dynamic Styles for Bulb
    const bulbColor = isDark ? '#444' : '#ffd700'; // Off (Dark mode) vs On (Light mode is usually "Day", wait... "Light Bulb turns ON (warm white) -> Light Theme")
    // Logic: 
    // Light Theme = Bulb IS ON (Daylight/Bright)
    // Dark Theme = Bulb IS OFF (Darkness)
    // Wait, typically "Dark Mode" needs a light source?
    // User request: "Light bulb turns ON -> Page transitions to Light Theme". 
    // "Light bulb turns OFF -> Page transitions to Dark Theme".
    // So:
    // Theme 'light' -> Bulb ON.
    // Theme 'dark' -> Bulb OFF.

    // VISUAL CONSTANTS
    const ropeColor = isDark ? '#555' : '#888';

    // Bulb Glow Shadow
    const bulbGlow = !isDark
        ? 'drop-shadow(0px 0px 20px rgba(255, 215, 0, 0.8))'
        : 'drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.1))';

    return (
        <div
            ref={containerRef}
            className="fixed top-0 right-10 z-[100] flex flex-col items-center cursor-grab active:cursor-grabbing touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp} // Handle partial drags
            style={{ touchAction: 'none' }}
        >
            {/* SVG Rope & Bulb Container */}
            <svg width="60" height="400" className="overflow-visible pointer-events-none">
                {/* Rope Line */}
                <animated.line
                    x1="30" y1="0"
                    x2="30" y2={y.to(val => 100 + val)}
                    stroke={ropeColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                />

                {/* Bulb Group - moves with rope end */}
                <animated.g transform={y.to(val => `translate(30, ${100 + val})`)}>
                    {/* Socket */}
                    <rect x="-6" y="0" width="12" height="15" fill={isDark ? '#333' : '#666'} rx="2" />

                    {/* Glass Bulb */}
                    <circle
                        cx="0" cy="25" r="15"
                        fill={isDark ? '#2a2a2a' : '#ffeb3b'} // Off vs On
                        stroke={isDark ? '#444' : '#fbc02d'}
                        strokeWidth="1"
                        style={{
                            filter: bulbGlow,
                            transition: 'fill 0.3s, stroke 0.3s, filter 0.3s'
                        }}
                    />

                    {/* Filament (visible when off or subtle when on) */}
                    <path
                        d="M-4 25 Q0 35 4 25"
                        stroke={isDark ? '#555' : '#fff'}
                        strokeWidth="1"
                        fill="none"
                        opacity={0.5}
                    />
                </animated.g>
            </svg>

            {/* Invisible clickable area reinforcement for easier grabbing */}
            <animated.div
                style={{
                    position: 'absolute',
                    top: y.to(val => 100 + val),
                    left: '50%',
                    marginLeft: '-25px',
                    width: '50px',
                    height: '60px',
                    transform: 'translateY(0)',
                    pointerEvents: 'auto' // Re-enable pointer events for the grab area
                }}
            />
        </div>
    );
};

export default LightPullSwitch;
