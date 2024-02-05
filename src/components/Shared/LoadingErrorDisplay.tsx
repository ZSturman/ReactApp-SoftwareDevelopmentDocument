interface LoadingErrorDisplayProps {
    loading: boolean;
    error: Error | null;
}

const LoadingErrorDisplay: React.FC<LoadingErrorDisplayProps> = ({ loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    return null;
}

export default LoadingErrorDisplay;
