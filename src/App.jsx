
import React from 'react';
import { ThemeProvider } from './ThemeContext';
import Navbar from './components/Navbar';
import ThreeDRobot from './components/ThreeDRobot';
import CustomCursor from './components/CustomCursor';
import LightPullSwitch from './components/LightPullSwitch';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="App w-full min-h-screen text-[var(--text-color)] transition-colors duration-500">
        <ThreeDRobot />
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
