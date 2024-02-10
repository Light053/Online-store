import React, { ErrorInfo, ReactNode, Suspense } from "react";

interface ErrorBoundaryProps {
	children: ReactNode
}

interface ErrorBoundaryState {
	hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.log("ошибка:", error, errorInfo);
	}

	render() {
		const { children } = this.props;
		const { hasError } = this.state

		if (hasError) {

			return (
				<Suspense fallback="">
					<div>ERROR!</div>
				</Suspense>
			)
		}

		return children;
	}
}