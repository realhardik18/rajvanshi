export default function SignUp() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950">
      <div className="flex w-full rounded-lg bg-gray-950 shadow-lg overflow-hidden">
        <div className="w-full p-8 sm:w-2/3">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Rajvanshi Cricket Club Delhi
          </h1>
          <p className="text-sm text-gray-100 mb-8">
            To use website, Please Create An Account.
          </p>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-100">Name</label>
              <input type="text" placeholder="Enter your name" className="mt-1 w-full p-2 bg-gray-950 text-white border border-gray-600 rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Username</label>
              <input type="text" placeholder="Choose a username" className="mt-1 w-full p-2 bg-gray-950 text-white border border-gray-600 rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Phone Number</label>
              <input type="tel" placeholder="Enter your phone number" className="mt-1 w-full p-2 bg-gray-950 text-white border border-gray-600 rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Password</label>
              <input type="password" placeholder="Choose a password" className="mt-1 w-full p-2 bg-gray-950 text-white border border-gray-600 rounded" />
            </div>

            <button                 
              type="submit" 
              className="w-full mt-4 py-3 bg-red-600 text-white text-lg hover:bg-red-700"                              
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-400">
            Already have an account?{" "}
            <a href="/sign-in" className="text-red-600 font-medium">Sign in</a>
          </p>
        </div>

        {/* Right SVG Section */}
        <div className="hidden sm:block w-1/3 bg-red-600 p-8">
          {/* Replace with your SVG code */}
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
            <circle cx="8" cy="8" r="3" stroke="white" strokeWidth="2" />
            <circle cx="16" cy="16" r="2" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}
