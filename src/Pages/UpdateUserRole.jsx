import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelope, FaUserShield, FaPaperPlane } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const UpdateUserRole = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("viewer");
  const [rolePostLoading, setRolePostLoading] = useState(false);

  const {usersList, loading} = useAuth();

  const API_URL = import.meta.env.VITE_COLLECTION_SHEET_WRITE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !role) {
      return toast.error("Email and role are required!");
    }

    setRolePostLoading(true);
    const toastId = toast.loading("Updating user role...");
    try {

      const params = new URLSearchParams();
      params.append("action", "userRole");
      params.append("email", email);
      params.append("role", role);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });

      const text = await res.text();

      let data = JSON.parse(text);
      console.log(JSON.parse(text))
      setEmail("");
      setRole("viewer");
    

    if (!res.ok) {
      throw new Error(data?.message || "Request failed");
    }

    
  } catch (error) {
    console.error("Update role error:", error);

    toast.error(
      error.message || "Something went wrong!",
      { id: toastId }
    );
  } finally {
    setRolePostLoading(false);
  }
  };

  const emails = usersList?.reverse().map(ulst => ulst.email);

  if(loading){
    return <>
        <h2>Loading...</h2>
    </>
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Update User Role
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Assign or change user access level in the system
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Email Input */}
        <div className="relative">
        <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />

        <input
            type="email"
            list="emails"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <datalist id="emails">
            {emails?.map((item, index) => (
            <option
                key={index}
                value={typeof item === "string" ? item : item.email}
            />
            ))}
        </datalist>
        </div>

        {/* Role Dropdown */}
        <div className="relative">
          <FaUserShield className="absolute left-3 top-3.5 text-gray-400" />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={rolePostLoading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-60"
        >
          <FaPaperPlane />
          {rolePostLoading ? "Updating..." : "Update Role"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUserRole;