import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Plus, Settings, Home, User, Wallet } from 'lucide-react';

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'Rahul Sharma',
      profilePic: 'https://source.unsplash.com/random/100x100?face,man',
      time: '1 hour ago',
      content: 'Just played an incredible match against Delhi Dynamos! Our team showed outstanding teamwork and spirit. 🏏💪 #CricketLife #RajvanshiCC',
      images: [
        'https://source.unsplash.com/random/800x600?cricket,sports',
        'https://source.unsplash.com/random/800x600?cricket,team',
      ],
      likes: 42,
      comments: 7,
    },
    {
      id: 2,
      username: 'Priya Patel',
      profilePic: 'https://source.unsplash.com/random/100x100?face,woman',
      time: '3 hours ago',
      content: 'Training day! Preparing for the upcoming tournament with the most amazing team. 🌞🏏',
      images: [
        'data:image/jpeg;base64,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',
      ],
      likes: 28,
      comments: 4,
    },
    {
      id: 3,
      username: 'Coach Vikram',
      profilePic: 'https://source.unsplash.com/random/100x100?face,men',
      time: 'Yesterday',
      content: 'Team strategy meeting went great! We\'re ready to bring home the trophy this season. 🏆 #RajvanshiCricketClub',
      images: [],
      likes: 55,
      comments: 12,
    }
  ]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const likePost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? {...post, likes: post.likes + 1} 
        : post
    ));
  };

  const NavItem = ({ icon: Icon, text, color }) => (
    <div 
      className={`flex items-left justify-left cursor-pointer ${color} hover:opacity-75 transition duration-300 p-2 rounded-lg`}
    >
      <Icon className="w-5 h-5" />
      {isOpen && <span className="ml-2 text-sm">{text}</span>}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* Compact Sidebar */}
      <div
        className={`bg-gray-900 text-white ${isOpen ? 'w-52' : 'w-16'} transition-width duration-300 min-h-screen flex flex-col p-2 overflow-hidden`}
      >
        {/* Toggle Button */}
        <button
          className="text-red-600 mb-4 focus:outline-none self-end"
          onClick={toggleSidebar}
        >
          {isOpen ? '←' : '→'}
        </button>

        {/* Compact Logo */}
        <div className="flex items-left justify-left mb-6">
          <img
            src="https://source.unsplash.com/random/50x50?logo,sports"
            alt="Logo"
            className="w-8 h-8 rounded-full bg-gray-600"
          />
          {isOpen && <span className="ml-2 text-sm font-bold text-red-600">Rajvanshi CC</span>}
        </div>

        {/* Compact Navigation Links */}
        <nav className="">
          <NavItem icon={Plus} text="Post" color="text-green-500" />
          <NavItem icon={Settings} text="Settings" color="text-blue-500" />
          <NavItem icon={User} text="Profile" color="text-purple-500" />
          <NavItem icon={Home} text="Home" color="text-indigo-500" />
          <NavItem icon={Wallet} text="Fee Portal" color="text-yellow-500" />
        </nav>
      </div>

      {/* Post Feed */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Top Right Header */}
        <div className="flex justify-between items-center sticky top-0 bg-gray-950 z-10 pb-4">
          <h1 className="text-xl font-bold">Post Feed</h1>
          <div className="text-red-600 font-bold text-md">Rajvanshi Cricket Club Delhi</div>
        </div>

        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-800 p-4 rounded-xl shadow-xl transition duration-300 hover:shadow-2xl"
          >
            {/* Post Header */}
            <div className="flex items-center space-x-3 mb-3">
              <img
                src={post.profilePic}
                alt={`${post.username} profile`}
                className="w-10 h-10 rounded-full bg-gray-600"
              />
              <div>
                <h3 className="text-md font-semibold text-gray-100">
                  {post.username}
                </h3>
                <p className="text-xs text-gray-400">{post.time}</p>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-sm text-gray-200 mb-3">{post.content}</p>

            {/* Post Images */}
            {post.images && post.images.length > 0 && (
              <div className={`grid gap-2 mb-3 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {post.images.map((image, index) => (
                  <img 
                    key={index} 
                    src={image} 
                    alt={`Post image ${index + 1}`} 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center justify-between text-gray-400">
              <div className="flex space-x-3">
                <button 
                  onClick={() => likePost(post.id)}
                  className="flex items-center hover:text-red-600 transition duration-200 text-sm"
                >
                  <Heart className="mr-1 w-4 h-4" /> {post.likes}
                </button>
                <button className="flex items-center hover:text-red-600 transition duration-200 text-sm">
                  <MessageCircle className="mr-1 w-4 h-4" /> {post.comments}
                </button>
                <button className="flex items-center hover:text-red-600 transition duration-200 text-sm">
                  <Share2 className="mr-1 w-4 h-4" /> Share
                </button>
              </div>
              <button className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition duration-200 text-xs">
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}