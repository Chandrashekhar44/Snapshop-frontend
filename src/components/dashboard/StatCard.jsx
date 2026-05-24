
const colorMap = {
  blue:   { bar: "bg-blue-500",   icon: "bg-blue-50 text-blue-700" },
  green:  { bar: "bg-green-600",  icon: "bg-green-50 text-green-700" },
  amber:  { bar: "bg-amber-500",  icon: "bg-amber-50 text-amber-700" },
  red:    { bar: "bg-red-600",    icon: "bg-red-50 text-red-700" },
  teal:   { bar: "bg-teal-500",   icon: "bg-teal-50 text-teal-700" },
  purple: { bar: "bg-violet-500", icon: "bg-violet-50 text-violet-700" },
};

export default function StatCard({ label, value, delta, deltaType = "neutral", icon: Icon, color = "blue" }) {
  const { bar, icon } = colorMap[color] ?? colorMap.blue;

  const deltaColor =
    deltaType === "up" ? "text-green-700" :
    deltaType === "down" ? "text-red-600" :
    "text-slate-500";

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 relative overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-[3px] ${bar}`} />

      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2.5 ${icon}`}>
        <Icon className="w-4 h-4" />
      </div>

      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className="text-2xl font-medium text-slate-900 leading-none">{value}</p>

      {delta && (
        <p className={`text-[11px] mt-1.5 flex items-center gap-1 ${deltaColor}`}>
          {delta}
        </p>
      )}
    </div>
  );
}
