export default function Home() {
    return (
      <div className="bg-gray-950 min-h-screen text-white flex">
        {/* Left Sidebar */}
        <div className="w-72 bg-gray-900 p-6 space-y-8 rounded-l-lg shadow-lg">
          {/* Logo / Club Name */}
          <div className="text-3xl font-extrabold text-red-600 mb-6">Rajvanshi Cricket Club</div>
          
          {/* Search Bar with Search Icon */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <i className="absolute top-3 right-3 text-gray-500 fas fa-search"></i> {/* Search Icon */}
          </div>
          
          {/* Sidebar Menu */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 cursor-pointer hover:text-red-600 transition duration-300">
              <i className="fas fa-plus-circle text-gray-400"></i>
              <span className="text-gray-400">Create Post</span>
            </div>
            <div className="flex items-center space-x-3 cursor-pointer hover:text-red-600 transition duration-300">
              <i className="fas fa-cogs text-gray-400"></i>
              <span className="text-gray-400">Settings</span>
            </div>            
            <div className="flex items-center space-x-3 cursor-pointer hover:text-red-600 transition duration-300">
              <i className="fas fa-user text-gray-400"></i>
              <a className="text-gray-400">Profile</a>
            </div>            
          </div>
        </div>
  
        {/* Feed Section */}
        <div className="flex-1 p-8 space-y-8">            
          {/* Feed */}
          <div className="space-y-8">
            {/* Post 1 */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-xl transition duration-300 hover:shadow-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-600"></div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">User Name</h3>
                  <p className="text-sm text-gray-400">Posted 1 hour ago</p>
                </div>
              </div>
              <p className="text-gray-200 mb-4">
                Just played a great match! #CricketLife
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-gray-400">
                  <div className="flex space-x-4">
                    <button className="flex items-center hover:text-red-600 transition duration-200">
                      <i className="fas fa-thumbs-up mr-2"></i> Like
                    </button>
                    <button className="flex items-center hover:text-red-600 transition duration-200">
                      <i className="fas fa-comment mr-2"></i> Comment
                    </button>
                    <button className="flex items-center hover:text-red-600 transition duration-200">
                      <i className="fas fa-share-alt mr-2"></i> Share
                    </button>
                  </div>
                  <button className="text-red-600 hover:text-red-700 transition duration-200">Follow</button>
                </div>
              </div>
            </div>
  
            {/* Post 2 */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-xl transition duration-300 hover:shadow-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-600"></div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">Another User</h3>
                  <p className="text-sm text-gray-400">Posted 3 hours ago</p>
                </div>
              </div>
              <p className="text-gray-200 mb-4">
                Great day for cricket! 🌞
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-gray-400">
                  <div className="flex space-x-4">
                    <button className="flex items-center hover:text-red-600 transition duration-200">
                      <i className="fas fa-thumbs-up mr-2"></i> Like
                    </button>
                    <button className="flex items-center hover:text-red-600 transition duration-200">
                      <i className="fas fa-comment mr-2"></i> Comment
                    </button>
                    <button className="flex items-center hover:text-red-600 transition duration-200">
                      <i className="fas fa-share-alt mr-2"></i> Share
                    </button>
                  </div>
                  <button className="text-red-600 hover:text-red-700 transition duration-200">Follow</button>
                </div>
              </div>
            </div>
  
            {/* More Posts... */}
          </div>
        </div>
      </div>
    );
  }
  