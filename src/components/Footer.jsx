
import React from 'react';

const Footer = () => {
    return (
        <footer className="py-8 bg-[var(--bg-color)] border-t border-[var(--glass-border)] text-center opacity-60">
            <p>&copy; {new Date().getFullYear()} Mohammed Yaser A. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
