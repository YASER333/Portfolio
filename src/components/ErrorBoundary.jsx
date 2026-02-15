import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // In production, you might want to log this to an error reporting service
        // For now, we'll silently handle it to prevent breaking the UI
        if (process.env.NODE_ENV === 'development') {
            console.error('3D Robot Error:', error, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            // Gracefully degrade - just don't show the robot
            return null;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
