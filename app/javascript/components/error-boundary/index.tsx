import React, { Component, ReactNode } from 'react';

import Error from '../error';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: { message: string };
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public static getDerivedStateFromError(error: string) {
    return { hasError: true, error: { message: error } };
  }

  public state = { hasError: false, error: { message: '' } };

  public render() {
    let { hasError, error } = this.state;
    let { children } = this.props;

    if (hasError) {
      return <Error error={error} />;
    }

    return children;
  }
}

export default ErrorBoundary;
