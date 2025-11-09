export default function NotifyBanner(
    { title, description, isHidden }
) {
    if (isHidden) {
        return <></>
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900/90 backdrop-blur-sm">
            <div className="text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full mx-4">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4">
                </div>
                <h2 className="text-xl font-semibold text-black dark:text-white">{title}</h2>
                <p className="text-gray-400 mt-2 text-sm">{description}</p>
            </div>
        </div>
    )
}