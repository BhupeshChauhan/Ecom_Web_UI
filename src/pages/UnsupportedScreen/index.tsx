import { MdOutlineDevices } from "react-icons/md";

const UnsupportedScreen = ({ windowWidth }) => {
  return (
    <div
      className="min-h-screen w-full bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 flex items-center justify-center"
      role="alert"
      aria-label="Screen size not supported"
    >
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-8 transform transition-all duration-500">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="rounded-full bg-red-100 dark:bg-red-900 p-6 animate-pulse">
            <MdOutlineDevices className="h-16 w-16 text-red-500 dark:text-red-400" />
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Screen Size Not Supported
          </h1>

          <div className="space-y-4">
            <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
              Current screen width: {windowWidth}px
            </p>

            <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                This website is optimized for larger screens. Please switch to a
                device with a minimum width of 768 pixels for the best
                experience.
              </p>
            </div>

            <div className="flex flex-col space-y-4 mt-8">
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 dark:bg-red-600 rounded-full"
                  style={{ width: `${(windowWidth / 1200) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {Math.round((windowWidth / 1200) * 100)}% of recommended width
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnsupportedScreen;
