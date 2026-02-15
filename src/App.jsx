
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { ThemeProvider } from './ThemeContext';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import LightPullSwitch from './components/LightPullSwitch';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import RobotLoader from './components/RobotLoader';
import ErrorBoundary from './components/ErrorBoundary';

// 🚀 LAZY LOAD: Heavy 3D Robot (1.14MB three-vendor chunk)
// This prevents blocking first paint and prioritizes content
const ThreeDRobot = lazy(() => import('./components/ThreeDRobot'));

function App() {
  const [loadRobot, setLoadRobot] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile/low-end devices
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768;
      const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
      setIsMobile(isMobileDevice || isLowEnd);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // ⏱️ Load robot AFTER main content renders (priority: content first)
    // Delay ensures Hero text, Navbar, etc. are visible immediately
    const robotLoadTimer = setTimeout(() => {
      setLoadRobot(true);
    }, 500); // 500ms delay - content loads first, robot fades in later

    return () => {
      clearTimeout(robotLoadTimer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="App w-full min-h-screen text-[var(--text-color)] transition-colors duration-500">
        {/* 🎬 3D ROBOT - Lazy loaded, appears after content */}
        {loadRobot && !isMobile && (
          <ErrorBoundary>
            <Suspense fallback={<RobotLoader />}>
              <ThreeDRobot />
            </Suspense>
          </ErrorBoundary>
        )}

        {/* ⚡ MAIN CONTENT - Loads instantly, no blocking */}
        <div className="relative z-10">
          <LightPullSwitch />
          <Navbar />
          <CustomCursor />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
