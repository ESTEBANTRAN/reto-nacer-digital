// frontend/src/lib/api.ts
import { GithubUser } from '@/types/github';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  console.warn(
    '⚠️ NEXT_PUBLIC_API_URL is not defined. API calls will fail. ' +
    'Create a .env.local file with NEXT_PUBLIC_API_URL=http://localhost:3001'
  );
}

/**
 * Fetches a GitHub user profile from our NestJS backend.
 *
 * @param username - GitHub username to look up
 * @returns GithubUser data
 * @throws Error with descriptive message on failure
 */
export async function fetchGithubUser(username: string): Promise<GithubUser> {
  const url = `${API_BASE_URL}/user/${encodeURIComponent(username)}`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
    // Revalidate every 60 seconds (ISR-like behavior for client calls)
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message =
      errorData?.message ?? `Error ${response.status}: Failed to fetch user profile`;
    throw new Error(message);
  }

  return response.json() as Promise<GithubUser>;
}
