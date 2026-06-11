const styles = {
  delivered:  "bg-green-50 text-green-800",
  pending:    "bg-blue-50 text-blue-800",
  transit:    "bg-amber-50 text-amber-800",
  cancelled:  "bg-red-50 text-red-800",
  active:     "bg-teal-50 text-teal-800",
  completed:  "bg-green-50 text-green-800",
  new:        "bg-blue-50 text-blue-800",
  dispatched: "bg-amber-50 text-amber-800",
};

export default function StatusPill({ status }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${styles[status] ?? "bg-slate-100 text-slate-700"}`}>
      {label}
    </span>
  );
}
