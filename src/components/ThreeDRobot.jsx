import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import RobotParts from './RobotParts';
import { useTheme } from '../ThemeContext';

const Scene = ({ theme }) => {
    const [section, setSection] = useState(0);
    const mouse = useRef([0, 0]);

    // Handle Scroll -> Section Mapping
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const newSection = Math.round(scrollY / (windowHeight * 0.8));
            setSection(newSection);
        };

        const handleMouseMove = (event) => {
            mouse.current = [
                (event.clientX / window.innerWidth) * 2 - 1,
                -(event.clientY / window.innerHeight) * 2 + 1
            ];
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Cinematic Camera Rig
    const Rig = () => {
        useFrame((state, delta) => {
            const targetX = mouse.current[0] * 0.5; // Slight parallax
            const targetY = mouse.current[1] * 0.5;

            // Very smooth, heavy camera movement
            THREE.MathUtils.damp(state.camera.position, 'x', targetX, 0.1, delta);
            THREE.MathUtils.damp(state.camera.position, 'y', targetY, 0.1, delta);
            state.camera.lookAt(0, 0, 0);
        });
        return null;
    };

    return (
        <>
            {/* --- ATMOSPHERE --- */}
            {/* Fog for depth - darker colors for background fade */}
            <fog attach="fog" args={[theme === 'dark' ? '#050505' : '#f0f0f0', 5, 25]} />

            {/* Cinematic Environment */}
            <Environment preset={theme === 'dark' ? "city" : "studio"} blur={0.8} intensity={0.5} />

            {/* LIGHTING: Dramatic Rim + Soft Fill */}
            {/* Key Light (Side) */}
            <spotLight
                position={[10, 10, 10]}
                angle={0.3}
                penumbra={1}
                intensity={theme === 'dark' ? 1.0 : 0.8}
                color={theme === 'dark' ? '#00f2ff' : '#ffffff'}
                castShadow
            />

            {/* Rim Light (Back - Strong Silhouette) */}
            <spotLight
                position={[0, 5, -10]}
                intensity={theme === 'dark' ? 4 : 2}
                color={theme === 'dark' ? '#ff0055' : '#e6e6e6'}
                angle={0.5}
            />

            {/* Fill Light (Soft) */}
            <pointLight position={[-5, -2, 5]} intensity={0.2} color="#ffffff" />

            {/* --- THE ROBOT (GIANT) --- */}
            {/* Scale increased to 2.5 for dominance */}
            <RobotParts currentSection={section} mouse={mouse} theme={theme} scale={2.5} />

            {/* --- SHADOWS --- */}
            <ContactShadows
                resolution={1024}
                scale={20}
                blur={3}
                opacity={0.5}
                far={10}
                color={theme === 'dark' ? '#000000' : '#8a8a8a'}
            />

            <Rig />
        </>
    );
};

// Wrapper Component that bridges the Theme Context
const ThreeDRobot = () => {
    const { theme } = useTheme();

    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none" style={{ position: 'fixed', zIndex: 0 }}>
            <Canvas
                shadows
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 0.9 // Reduced slightly to avoid washout
                }}
                camera={{ position: [0, 0, 10], fov: 40 }}
            >
                <React.Suspense fallback={null}>
                    <Scene theme={theme} />
                </React.Suspense>
            </Canvas>
        </div>
    );
};

export default ThreeDRobot;
