 export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="h-7 w-36 bg-gray-200 rounded-md"></div>
          </div>
          <div className="h-9 w-40 bg-gray-200 rounded-lg"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm animate-pulse space-y-3"
            >
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="h-5 w-3/4 bg-gray-200 rounded-md"></div>
              <div className="h-3 w-1/2 bg-gray-200 rounded-md"></div>
              <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                <div className="h-4 w-20 bg-gray-200 rounded-md"></div>
                <div className="h-4 w-12 bg-gray-200 rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}