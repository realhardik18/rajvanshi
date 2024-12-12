export default function Home() {
    return (
      <div className="bg-gray-950 min-h-screen text-white flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-gray-800 p-6 space-y-8">
          {/* Logo / Club Name */}
          <div className="text-2xl font-bold text-red-600 mb-6">Rajvanshi Cricket Club</div>
          
          {/* Search Bar */}
          <div>
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
            />
          </div>
          
          {/* Sidebar Menu */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <i className="fas fa-user text-gray-400"></i>
              <span className="text-gray-400">Profile</span>
            </div>
            <div className="flex items-center space-x-3">
              <i className="fas fa-cogs text-gray-400"></i>
              <span className="text-gray-400">Settings</span>
            </div>
            <div className="flex items-center space-x-3">
              <i className="fas fa-plus-circle text-gray-400"></i>
              <span className="text-gray-400">Create Post</span>
            </div>
          </div>
        </div>
  
        {/* Feed Section */}
        <div className="flex-1 p-6">
          {/* Header */}
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-red-600">Rajvanshi Cricket Club Feed</h1>
          </header>
  
          {/* Feed */}
          <div className="space-y-8">
            {/* Post 1 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-600"></div>
                <div>
                  <h3 className="text-lg font-semibold">User Name</h3>
                  <p className="text-sm text-gray-400">Posted 1 hour ago</p>
                </div>
              </div>
              <p className="text-gray-200 mb-4">
                Just played a great match! #CricketLife
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-gray-400">
                  <div className="flex space-x-4">
                    <button className="flex items-center hover:text-red-600">
                      <i className="fas fa-thumbs-up mr-2"></i> Like
                    </button>
                    <button className="flex items-center hover:text-red-600">
                      <i className="fas fa-comment mr-2"></i> Comment
                    </button>
                    <button className="flex items-center hover:text-red-600">
                      <i className="fas fa-share-alt mr-2"></i> Share
                    </button>
                  </div>
                  <button className="text-red-600 hover:text-red-700">Follow</button>
                </div>
              </div>
            </div>
  
            {/* Post 2 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-600"></div>
                <div>
                  <h3 className="text-lg font-semibold">Another User</h3>
                  <p className="text-sm text-gray-400">Posted 3 hours ago</p>
                </div>
              </div>
              <p className="text-gray-200 mb-4">
                Great day for cricket! 🌞
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-gray-400">
                  <div className="flex space-x-4">
                    <button className="flex items-center hover:text-red-600">
                      <i className="fas fa-thumbs-up mr-2"></i> Like
                    </button>
                    <button className="flex items-center hover:text-red-600">
                      <i className="fas fa-comment mr-2"></i> Comment
                    </button>
                    <button className="flex items-center hover:text-red-600">
                      <i className="fas fa-share-alt mr-2"></i> Share
                    </button>
                  </div>
                  <button className="text-red-600 hover:text-red-700">Follow</button>
                </div>
              </div>
            </div>
  
            {/* More Posts... */}
          </div>
        </div>
      </div>
    );
  }
  