// backend/src/github/dto/github-user.dto.ts

/**
 * Represents the subset of GitHub's User API response
 * that we expose to the frontend.
 *
 * @see https://docs.github.com/en/rest/users/users#get-a-user
 */
export interface GithubUserDto {
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
 * Raw response shape from GitHub's REST API.
 * Used internally in the service layer — never exposed directly.
 */
export interface GithubApiRawUser {
  readonly login: string;
  readonly id: number;
  readonly node_id: string;
  readonly avatar_url: string;
  readonly gravatar_id: string;
  readonly url: string;
  readonly html_url: string;
  readonly name: string | null;
  readonly company: string | null;
  readonly blog: string | null;
  readonly location: string | null;
  readonly email: string | null;
  readonly bio: string | null;
  readonly twitter_username: string | null;
  readonly public_repos: number;
  readonly public_gists: number;
  readonly followers: number;
  readonly following: number;
  readonly created_at: string;
  readonly updated_at: string;
}
