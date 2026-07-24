// frontend/src/components/ProfileCard.tsx
import { GithubUser } from '@/types/github';
import Image from 'next/image';
import { StatCard } from './StatCard';

interface ProfileCardProps {
  user: GithubUser;
}

export function ProfileCard({ user }: ProfileCardProps): React.ReactElement {
  const joinDate = new Date(user.created_at).toLocaleDateString('es-EC', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* ─── Glass Card ─── */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        {/* Gradient accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />

        <div className="p-8 sm:p-10">
          {/* ─── Avatar + Identity ─── */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 opacity-60 blur-md group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src={user.avatar_url}
                alt={`Avatar de ${user.name ?? user.login}`}
                width={120}
                height={120}
                className="relative rounded-full ring-2 ring-white/20 object-cover"
                priority
              />
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {user.name ?? user.login}
              </h1>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors mt-1 text-lg"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                @{user.login}
              </a>
            </div>
          </div>

          {/* ─── Bio ─── */}
          {user.bio && (
            <p className="text-gray-300 text-lg leading-relaxed mb-8 text-center sm:text-left">
              {user.bio}
            </p>
          )}

          {/* ─── Stats Grid ─── */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <StatCard label="Repos" value={user.public_repos} icon="📦" />
            <StatCard label="Seguidores" value={user.followers} icon="👥" />
            <StatCard label="Siguiendo" value={user.following} icon="➡️" />
          </div>

          {/* ─── Details ─── */}
          <div className="space-y-3 text-sm text-gray-400">
            {user.location && (
              <DetailRow icon="📍" label="Ubicación" value={user.location} />
            )}
            {user.company && (
              <DetailRow icon="🏢" label="Empresa" value={user.company} />
            )}
            {user.blog && (
              <DetailRow
                icon="🔗"
                label="Blog"
                value={user.blog}
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
              />
            )}
            {user.twitter_username && (
              <DetailRow
                icon="𝕏"
                label="Twitter"
                value={`@${user.twitter_username}`}
                href={`https://twitter.com/${user.twitter_username}`}
              />
            )}
            <DetailRow icon="📅" label="Miembro desde" value={joinDate} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Detail Row Sub-component ─── */
interface DetailRowProps {
  icon: string;
  label: string;
  value: string;
  href?: string;
}

function DetailRow({ icon, label, value, href }: DetailRowProps): React.ReactElement {
  return (
    <div className="flex items-center gap-3">
      <span className="w-5 text-center">{icon}</span>
      <span className="text-gray-500">{label}:</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 transition-colors truncate"
        >
          {value}
        </a>
      ) : (
        <span className="text-gray-300">{value}</span>
      )}
    </div>
  );
}
