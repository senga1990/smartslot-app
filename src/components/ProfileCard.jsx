import { useAuth } from "../context/AuthContext";

export default function ProfileCard() {
  const { user } = useAuth();

  const name =
    user?.name ?? (user?.email ? user.email.split("@")[0] : "user");
  const accountType = user?.accountType ?? "standard";
  const company = user?.companyName ?? null;

  return (
    <div style={card}>
      <div style={titleRow}>
        <h3 style={title}>Profile</h3>
        <span style={badge}>{accountType}</span>
      </div>

      <div style={row}><span style={label}>Name</span><span>{name}</span></div>
      <div style={row}><span style={label}>Email</span><span>{user?.email}</span></div>
      {company && (
        <div style={row}><span style={label}>Company</span><span>{company}</span></div>
      )}
    </div>
  );
}

const card = {
  width: "100%",
  maxWidth: 420,
  padding: 20,
  borderRadius: 16,
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 8px 28px rgba(0,0,0,0.4)",
  color: "#fff"
};
const titleRow = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 };
const title = { fontSize: 18, fontWeight: 700, margin: 0 };
const badge = { fontSize: 12, padding: "4px 10px", borderRadius: 999, background: "rgba(255,255,255,0.12)" };
const row = { display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "1px solid rgba(255,255,255,0.08)" };
const label = { opacity: 0.8, marginRight: 12 };
