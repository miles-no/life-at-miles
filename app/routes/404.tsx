export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
            <p className="text-xl text-center">
                The resource you're looking for doesn't exist or has been moved.
            </p>
        </div>
    );
}