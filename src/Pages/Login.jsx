import React from "react";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { user, googleLogin, logout, usersList, userRole  } = useAuth();

  const handleLogin = async () => {
    try {
      await googleLogin();
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(userRole, usersList);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          My Vocabulary Dictionary
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Login with Google to access your dashboard
        </p>

        {user ? (
          <div className="space-y-4">
            {/* User Info */}
            <div className="flex flex-col items-center">
              <img
                src={user?.photoURL || "https://lh3.googleusercontent.com/a/ACg8ocJOctQX6uThuWML9BlvOeQnBGbnis26uqDc_RoqR-kIyLzd4nmK6g=s96-c"}
                alt="User"
                className="w-24 h-24 rounded-full border-4 border-blue-100 shadow-md object-cover"
              />

              <h2 className="text-xl font-semibold text-gray-800 mt-4">
                {user?.displayName || "User Name"}
              </h2>
              <p className="text-sm text-gray-500 capitalize">
                {userRole}
              </p>
              <p className="text-sm text-gray-500">
                {user?.email || "user@gmail.com"}
              </p>

            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
          >
            Continue with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;