import { Component, type ReactNode } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    onReset?: () => void;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
        this.props.onReset?.();
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <Card className="p-6">
                    <div className="text-center">
                        <i className="pi pi-exclamation-triangle text-red-400 text-4xl mb-4" />
                        <h3 className="text-xl font-semibold text-red-400 mb-2">
                            Something went wrong
                        </h3>
                        <p className="text-color-secondary mb-4">
                            {this.state.error?.message || 'An unexpected error occurred'}
                        </p>
                        <Button 
                            label="Try Again" 
                            icon="pi pi-refresh" 
                            onClick={this.handleReset}
                        />
                    </div>
                </Card>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;