// backend/src/github/github.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubUserDto } from './dto/github-user.dto';

@Controller('user')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  /**
   * GET /user/:username
   *
   * Fetches and returns a GitHub user's public profile.
   *
   * @param username - GitHub username
   * @returns GithubUserDto with the user's public information
   */
  @Get(':username')
  async getUser(@Param('username') username: string): Promise<GithubUserDto> {
    return this.githubService.getUserProfile(username);
  }
}
