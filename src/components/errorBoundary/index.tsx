import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorComponent from '../errorComponent';
import './style.scss';
import { CustomError } from '../../services/errorHandler';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: CustomError | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: new CustomError(error.message, 500) };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error: new CustomError(error.message, 500), errorInfo });
  }

  handleReload = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorComponent error={this.state.error} onReload={this.handleReload} />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
