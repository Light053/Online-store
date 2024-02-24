import { useEffect, useState } from "react"

// component for testing ErrorBoundary
export const BugButton = () => {
	const [error, setError] = useState(false);

	const throwE = () => {
		setError(true)
	}

	useEffect(() => {
		if (error) {
			throw new Error()
		}
	}, [error])

	return (
		<div>
			<button
				style={{ fontSize: '28px', }}
				onClick={throwE}>
				throw error
			</button>
		</div>
	)
}