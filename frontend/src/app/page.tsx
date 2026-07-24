'use client';

import { useEffect, useState, useCallback } from 'react';
import { GithubUser } from '@/types/github';
import { fetchGithubUser } from '@/lib/api';
import { ProfileCard } from '@/components/ProfileCard';
import { ProfileSkeleton } from '@/components/Skeleton';
import { ErrorMessage } from '@/components/ErrorMessage';

/** Default GitHub username to display */
const DEFAULT_USERNAME = 'esteban-aulestia';

export default function HomePage(): React.ReactElement {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadUser = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchGithubUser(DEFAULT_USERNAME);
      setUser(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error desconocido al cargar el perfil';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-20">
      {/* ─── Background Effects ─── */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] animate-float" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[120px] animate-float-delayed" />
      </div>

      {/* ─── Header ─── */}
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Reto Técnico — Nacer Digital
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-3">
          GitHub Profile
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            {' '}Viewer
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          Perfil de GitHub consultado a través de un backend NestJS y renderizado con NextJS.
        </p>
      </div>

      {/* ─── Content ─── */}
      {isLoading && <ProfileSkeleton />}
      {error && !isLoading && <ErrorMessage message={error} onRetry={loadUser} />}
      {user && !isLoading && !error && <ProfileCard user={user} />}

      {/* ─── Footer ─── */}
      <footer className="mt-12 text-center text-sm text-gray-600">
        <p>
          Desarrollado por{' '}
          <span className="text-gray-400 font-medium">Esteban Aulestia</span>
          {' '}· 2025
        </p>
      </footer>
    </main>
  );
}
