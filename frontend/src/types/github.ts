// frontend/src/types/github.ts

/**
 * Mirrors the backend's GithubUserDto interface.
 * Single source of truth for the GitHub user shape on the frontend.
 */
export interface GithubUser {
  readonly login: string;
  readonly name: string | null;
  readonly bio: string | null;
  readonly avatar_url: string;
  readonly html_url: string;
  readonly public_repos: number;
  readonly followers: number;
  readonly following: number;
  readonly location: string | null;
  readonly company: string | null;
  readonly blog: string | null;
  readonly twitter_username: string | null;
  readonly created_at: string;
}

/**
 * Standard API error response shape from the backend.
 */
export interface ApiError {
  readonly statusCode: number;
  readonly message: string;
  readonly timestamp: string;
  readonly path: string;
}
