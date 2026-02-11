
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';

const Robot = () => {
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        // Fetch a public Lottie JSON for a robot
        fetch('https://assets9.lottiefiles.com/packages/lf20_w51pcehl.json')
            .then(response => response.json())
            .then(data => setAnimationData(data))
            .catch(error => console.error("Error loading robot animation:", error));
    }, []);

    if (!animationData) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="fixed bottom-10 right-10 w-32 h-32 md:w-48 md:h-48 z-50 pointer-events-none"
        >
            <div className="relative w-full h-full">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-[var(--accent-color)] rounded-full blur-3xl opacity-20 animate-pulse"></div>

                <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </motion.div>
    );
};

export default Robot;
