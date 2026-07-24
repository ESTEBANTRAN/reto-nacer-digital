// frontend/src/components/StatCard.tsx

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
}

export function StatCard({ label, value, icon }: StatCardProps): React.ReactElement {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-center transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/10 hover:scale-[1.02]">
      {/* Subtle gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <span className="relative block text-2xl mb-1">{icon}</span>
      <span className="relative block text-2xl sm:text-3xl font-bold text-white tabular-nums">
        {value.toLocaleString()}
      </span>
      <span className="relative block text-xs sm:text-sm text-gray-400 mt-1 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}
