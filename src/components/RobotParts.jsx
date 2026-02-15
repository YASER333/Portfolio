import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import * as THREE from 'three';

// --- PHYSICS CONSTANTS ---
const SPRING_CONFIG = { stiffness: 0.02, damping: 0.9 }; // SLOW, HEAVY MOVEMENT

const RobotParts = ({ currentSection, mouse, theme, scale = 1 }) => {
    // Refs
    const group = useRef();
    const headGroup = useRef();
    const leftArmGroup = useRef();
    const rightArmGroup = useRef();
    const bodySegments = useRef([]);
    const engineRef = useRef();

    // Physics State
    const [currentPos] = useState(() => new THREE.Vector3(0, -3, -5));
    const [targetPos] = useState(() => new THREE.Vector3());
    const [velocity] = useState(() => new THREE.Vector3());
    const [blink, setBlink] = useState(false);

    const { viewport } = useThree();
    const isMobile = viewport.width < 5;

    // Theme Colors (Phantom Mode)
    const isDark = theme === 'dark';
    const colors = useMemo(() => ({
        body: isDark ? '#1a1a1a' : '#f0f0f0', // Match background closer
        accent: isDark ? '#00e5ff' : '#2196f3',
        joint: isDark ? '#111' : '#e0e0e0',
        glow: isDark ? '#00e5ff' : '#2196f3'
    }), [isDark]);

    // Materials - PHANTOM STYLE (Glass/Ghost)
    const materials = useMemo(() => ({
        chrome: new THREE.MeshPhysicalMaterial({
            color: colors.body,
            roughness: 0.2,
            metalness: 0.8,
            transmission: 0.6, // See-through
            thickness: 2,
            transparent: true,
            opacity: 0.5, // Faded
            envMapIntensity: 0.8
        }),
        accent: new THREE.MeshStandardMaterial({
            color: colors.accent, roughness: 0.2, metalness: 0.9, emissive: colors.accent, emissiveIntensity: 0.1
        }),
        joint: new THREE.MeshStandardMaterial({
            color: colors.joint, roughness: 0.7, metalness: 0.5, transparent: true, opacity: 0.8
        }),
        glass: new THREE.MeshPhysicalMaterial({
            color: isDark ? '#000' : '#fff', roughness: 0.1, metalness: 0.1, transmission: 0.9, transparent: true, opacity: 0.2
        }),
        glow: new THREE.MeshBasicMaterial({
            color: colors.glow, toneMapped: false, transparent: true, opacity: 0.6
        })
    }), [colors, isDark]);

    // Blink
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.8) {
                setBlink(true);
                setTimeout(() => setBlink(false), 200);
            }
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // --- CINEMATIC ANIMATION LOOP ---
    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;
        const damp = (curr, target, speed) => THREE.MathUtils.lerp(curr, target, delta * speed);

        // 1. POSITIONING: Far Right Guardian
        // Push far to the side so it frames the content, doesn't block it.
        const baseX = isMobile ? 1.5 : 5.5; // Far right
        const baseY = isMobile ? -3 : -2;
        const baseZ = -6; // Deeper

        let posTarget = { x: baseX, y: baseY, z: baseZ };
        let headTarget = { x: 0, y: 0 };
        let rArmTarget = { x: 0, z: -0.5 };
        let lArmTarget = { x: 0, z: 0.5 };
        let bodyRotTarget = { x: 0, y: -0.3 }; // Default slight turn

        switch (currentSection) {
            case 0: // Hero: Standing Tall
                posTarget = { x: baseX, y: baseY, z: baseZ };
                headTarget = { x: -0.1, y: -0.2 };
                bodyRotTarget = { x: 0, y: -0.4 };
                break;
            case 1: // About: Lean In
                posTarget = { x: baseX, y: baseY, z: baseZ + 1 };
                bodyRotTarget = { x: 0.1, y: -0.6 }; // Turning towards content
                headTarget = { x: 0.1, y: -0.3 };
                break;
            case 2: // Skills: Holographic Mode / Raise Hand
                posTarget = { x: baseX, y: baseY + 0.5, z: baseZ };
                rArmTarget = { x: 0.5, z: -0.2 }; // Subtle raise
                headTarget = { x: -0.2, y: 0 };
                break;
            case 3: // Experience: Parallax Rotate
                posTarget = { x: baseX + 1, y: baseY, z: baseZ - 2 };
                bodyRotTarget = { x: 0, y: -0.8 }; // Big turn
                headTarget = { x: 0, y: -0.5 }; // Looking back
                break;
            case 4: // Projects: Looking Down
                posTarget = { x: baseX, y: baseY + 1, z: baseZ + 1.5 };
                bodyRotTarget = { x: 0.2, y: -0.2 };
                headTarget = { x: 0.3, y: -0.2 };
                rArmTarget = { x: 0.4, z: -1.0 }; // Pointing
                break;
            case 5: // Contact: Respectful Bow / Wave
                posTarget = { x: baseX, y: baseY - 0.5, z: baseZ + 2 };
                headTarget = { x: 0.2, y: 0 };
                rArmTarget = { x: 0.8, z: -0.5 }; // Wave pose
                break;
            default: break;
        }

        targetPos.set(posTarget.x, posTarget.y, posTarget.z);

        // 2. HEAVY PHYSICS MOVEMENT
        const force = new THREE.Vector3().subVectors(targetPos, currentPos).multiplyScalar(SPRING_CONFIG.stiffness);
        const damping = velocity.clone().multiplyScalar(SPRING_CONFIG.damping);
        const acceleration = force.sub(damping);
        velocity.add(acceleration);
        currentPos.add(velocity);

        // Breathing (Very Slow)
        const breathe = Math.sin(t * 0.8) * 0.1;

        if (group.current) {
            group.current.position.set(currentPos.x, currentPos.y + breathe, currentPos.z);
            group.current.scale.setScalar(scale);

            // Smooth Body Rotation
            group.current.rotation.y = damp(group.current.rotation.y, bodyRotTarget.y, 2);
            group.current.rotation.x = damp(group.current.rotation.x, bodyRotTarget.x, 2);
        }

        // 3. PARTS ANIMATION
        if (headGroup.current) {
            // Mouse Parallax on Head
            const mouseX = mouse.current[0] * 0.2;
            const mouseY = mouse.current[1] * 0.2;

            headGroup.current.rotation.y = damp(headGroup.current.rotation.y, headTarget.y + mouseX, 3);
            headGroup.current.rotation.x = damp(headGroup.current.rotation.x, headTarget.x - mouseY, 3);
        }

        if (rightArmGroup.current && leftArmGroup.current) {
            // Wave Animation Override
            if (currentSection === 5) {
                rArmTarget.z = -2.5 + Math.sin(t * 4) * 0.3; // Slow majestic wave
                rArmTarget.x = 0.5;
            }

            rightArmGroup.current.rotation.z = damp(rightArmGroup.current.rotation.z, rArmTarget.z, 2);
            rightArmGroup.current.rotation.x = damp(rightArmGroup.current.rotation.x, rArmTarget.x, 2);

            // Left arm idle
            leftArmGroup.current.rotation.z = damp(leftArmGroup.current.rotation.z, lArmTarget.z + Math.sin(t) * 0.05, 2);
        }

        // Spine Lag (Heavy)
        bodySegments.current.forEach((seg, i) => {
            if (seg) {
                seg.rotation.z = Math.sin(t * 0.5 + i) * 0.02; // Very subtle
            }
        });

        // Engine Pulse (Slow)
        if (engineRef.current) {
            engineRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05);
        }
    });

    return (
        <group ref={group} dispose={null}>
            {/* --- BODY CONSTRUCTION (Simplified for Scale) --- */}

            {/* UPPER BODY */}
            <group ref={el => bodySegments.current[0] = el} position={[0, 0.5, 0]}>
                <mesh geometry={new THREE.CylinderGeometry(0.4, 0.35, 0.6, 8)}>
                    <primitive object={materials.chrome} />
                </mesh>

                {/* HEAD */}
                <group ref={headGroup} position={[0, 0.6, 0]}>
                    <mesh position={[0, 0.2, 0]}>
                        <boxGeometry args={[0.5, 0.4, 0.5]} />
                        <primitive object={materials.chrome} />
                    </mesh>
                    {/* Visor */}
                    <mesh position={[0, 0.2, 0.26]}>
                        <boxGeometry args={[0.42, 0.15, 0.05]} />
                        <primitive object={materials.glass} />
                    </mesh>
                    {/* Eyes */}
                    <mesh position={[0, 0.2, 0.26]} scale={[1, blink ? 0.05 : 1, 1]}>
                        <boxGeometry args={[0.3, 0.05, 0.06]} />
                        <primitive object={materials.glow} />
                    </mesh>
                </group>

                {/* ARMS */}
                <group ref={leftArmGroup} position={[-0.55, 0.2, 0]}>
                    <mesh geometry={new THREE.SphereGeometry(0.18)}>
                        <primitive object={materials.chrome} />
                    </mesh>
                    <mesh position={[0, -0.4, 0]}>
                        <capsuleGeometry args={[0.12, 0.7]} />
                        <primitive object={materials.chrome} />
                    </mesh>
                </group>

                <group ref={rightArmGroup} position={[0.55, 0.2, 0]}>
                    <mesh geometry={new THREE.SphereGeometry(0.18)}>
                        <primitive object={materials.chrome} />
                    </mesh>
                    <mesh position={[0, -0.4, 0]}>
                        <capsuleGeometry args={[0.12, 0.7]} />
                        <primitive object={materials.chrome} />
                    </mesh>
                    {/* Hand Trail - only visible on movement */}
                    <group position={[0, -0.8, 0]}>
                        <Trail width={0.4} length={4} color={colors.accent} attenuation={(t) => t * t}>
                            <mesh visible={false}>
                                <sphereGeometry args={[0.1]} />
                                <meshBasicMaterial />
                            </mesh>
                        </Trail>
                    </group>
                </group>
            </group>

            {/* MID BODY */}
            <group ref={el => bodySegments.current[1] = el} position={[0, 0, 0]}>
                <mesh geometry={new THREE.SphereGeometry(0.28)}>
                    <primitive object={materials.joint} />
                </mesh>
                <mesh position={[0, 0, 0.25]} rotation={[1.57, 0, 0]}>
                    <torusGeometry args={[0.18, 0.04, 16, 32]} />
                    <primitive object={materials.glow} />
                </mesh>
            </group>

            {/* LOWER BODY */}
            <group ref={el => bodySegments.current[2] = el} position={[0, -0.5, 0]}>
                <mesh geometry={new THREE.CylinderGeometry(0.25, 0.1, 0.6, 8)}>
                    <primitive object={materials.chrome} />
                </mesh>
                <group position={[0, -0.4, 0]}>
                    <mesh ref={engineRef} rotation={[Math.PI, 0, 0]}>
                        <coneGeometry args={[0.2, 0.6, 16, 1, true]} />
                        <primitive object={materials.glow} />
                        <meshBasicMaterial color={colors.accent} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
                    </mesh>
                </group>
            </group>

        </group>
    );
};

export default React.memo(RobotParts);
