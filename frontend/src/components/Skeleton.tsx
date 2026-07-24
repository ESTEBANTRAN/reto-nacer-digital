// frontend/src/components/Skeleton.tsx

export function ProfileSkeleton(): React.ReactElement {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden animate-pulse">
        {/* Gradient bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700" />

        <div className="p-8 sm:p-10">
          {/* Avatar + Name */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="w-[120px] h-[120px] rounded-full bg-gray-700" />
            <div className="text-center sm:text-left space-y-3">
              <div className="h-8 w-48 bg-gray-700 rounded-lg" />
              <div className="h-5 w-32 bg-gray-700 rounded-lg" />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2 mb-8">
            <div className="h-4 w-full bg-gray-700 rounded" />
            <div className="h-4 w-3/4 bg-gray-700 rounded" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center"
              >
                <div className="h-6 w-6 bg-gray-700 rounded mx-auto mb-2" />
                <div className="h-8 w-12 bg-gray-700 rounded mx-auto mb-1" />
                <div className="h-3 w-16 bg-gray-700 rounded mx-auto" />
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-4 w-4 bg-gray-700 rounded" />
                <div className="h-4 w-24 bg-gray-700 rounded" />
                <div className="h-4 w-32 bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
