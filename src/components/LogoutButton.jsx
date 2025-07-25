import { useAuth } from "../context/AuthContext";

export default function LogoutButton() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 pr-4">
      {user.picture && (
        <img
          src={user.picture}
          alt="profile"
          className="w-8 h-8 rounded-full border"
        />
      )}
      <span className="text-sm font-medium">
        {user.name || user.email}
      </span>
      <button
        onClick={logout}
        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
