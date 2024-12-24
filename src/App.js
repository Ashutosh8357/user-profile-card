import React, { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const fetchUser = () => {
    setLoading(true);
    fetch('https://randomuser.me/api/?page=1&results=1&seed=abc')
      .then(response => response.json())
      .then(data => {
        setUser(data.results[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div
      className={`flex flex-col justify-center items-center min-h-screen ${
        darkMode
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'
      }`}
    >
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 px-4 py-2 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-600 transition"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? '🌞 Light Mode' : '🌜 Dark Mode'}
      </button>

      {/* Refresh Button */}
      <button
        onClick={fetchUser}
        className="absolute top-4 left-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-500 transition"
        aria-label="Refresh User Data"
      >
        🔄 Refresh
      </button>

      {/* Content */}
      {loading ? (
        
        <div className="flex flex-col items-center" role="status">
          <div
            className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"
            aria-label="Loading"
          ></div>
          <p className="mt-4 text-lg">Loading User Data...</p>
        </div>
      ) : (
        user && (
          <div
            className={`${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } border border-gray-200 rounded-3xl shadow-xl p-6 max-w-md w-full flex items-center gap-6 transform hover:scale-105 transition-transform duration-300`}
            role="region"
            aria-labelledby="user-profile"
          >
            {/* Profile Image */}
            <div
              className="relative w-32 h-32 rounded-lg overflow-hidden shadow-md border-2 border-blue-400"
              aria-label="Profile Picture"
            >
              <img
                src={user.picture.large}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 bg-black/60 text-white text-xs text-center w-full p-1">
                {user.name.title}
              </div>
            </div>

            {/* User Details */}
            <div className="flex flex-col space-y-3">
              {/* First Name and Last Name */}
              <div
                className="flex justify-between items-center text-lg font-medium"
                aria-labelledby="user-name"
              >
                <div className="relative group" aria-label="First Name">
                  <span className="font-semibold text-blue-500">First Name:</span> {user.name.first}
                  <span className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded-md px-2 py-1 top-[-30px] left-0">
                    {user.name.first}
                  </span>
                </div>
                <div className="relative group" aria-label="Last Name">
                  <span className="font-semibold text-blue-500">Last Name:</span> {user.name.last}
                  <span className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded-md px-2 py-1 top-[-30px] right-0">
                    {user.name.last}
                  </span>
                </div>
              </div>

              {/* Gender */}
              <div className="relative group text-lg" aria-label="Gender">
                <span className="font-semibold text-blue-500">Gender:</span> {user.gender}
                <span className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded-md px-2 py-1 top-[-30px] left-0">
                  {user.gender}
                </span>
              </div>

              {/* Phone Number */}
              <div className="relative group text-lg" aria-label="Phone Number">
                <span className="font-semibold text-blue-500">Phone:</span> {user.phone}
                <span className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded-md px-2 py-1 top-[-30px] left-0">
                  {user.phone}
                </span>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default App;
