// backend/src/github/github.service.ts
import {
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import { GithubApiRawUser, GithubUserDto } from './dto/github-user.dto';

@Injectable()
export class GithubService {
  private readonly logger = new Logger(GithubService.name);
  private readonly githubApiBaseUrl = 'https://api.github.com';

  constructor(private readonly configService: ConfigService) {}

  /**
   * Fetches a GitHub user profile and maps it to our DTO.
   *
   * @param username - GitHub username to look up
   * @returns Mapped GithubUserDto
   * @throws HttpException on API failure or user not found
   */
  async getUserProfile(username: string): Promise<GithubUserDto> {
    const url = `${this.githubApiBaseUrl}/users/${encodeURIComponent(username)}`;
    const token = this.configService.get<string>('GITHUB_TOKEN');

    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'reto-nacer-digital-backend',
    };

    // Optional: Authenticated requests get 5000 req/hr vs 60 req/hr
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const { data } = await axios.get<GithubApiRawUser>(url, { headers });
      return this.mapToDto(data);
    } catch (error) {
      this.handleGithubError(error, username);
    }
  }

  /**
   * Maps raw GitHub API response to our public DTO.
   * Only exposes fields the frontend needs — no email, no internal IDs.
   */
  private mapToDto(raw: GithubApiRawUser): GithubUserDto {
    return {
      login: raw.login,
      name: raw.name,
      bio: raw.bio,
      avatar_url: raw.avatar_url,
      html_url: raw.html_url,
      public_repos: raw.public_repos,
      followers: raw.followers,
      following: raw.following,
      location: raw.location,
      company: raw.company,
      blog: raw.blog,
      twitter_username: raw.twitter_username,
      created_at: raw.created_at,
    };
  }

  /**
   * Translates Axios/GitHub errors into proper NestJS HTTP exceptions.
   */
  private handleGithubError(error: unknown, username: string): never {
    if (error instanceof AxiosError) {
      const status = error.response?.status;

      if (status === 404) {
        throw new HttpException(
          `GitHub user '${username}' not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      if (status === 403) {
        this.logger.warn('GitHub API rate limit exceeded');
        throw new HttpException(
          'GitHub API rate limit exceeded. Try again later.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      this.logger.error(
        `GitHub API error: ${status} - ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to fetch data from GitHub',
        HttpStatus.BAD_GATEWAY,
      );
    }

    this.logger.error('Unexpected error fetching GitHub user', error);
    throw new HttpException(
      'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
