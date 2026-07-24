// backend/src/common/pipes/parse-username.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

/**
 * Pipe that validates GitHub username parameter format.
 * Prevents path traversal, injection attacks, and invalid requests.
 */
@Injectable()
export class ParseUsernamePipe implements PipeTransform<string, string> {
  // GitHub usernames allow alphanumeric characters and single hyphens (max 39 chars)
  private readonly githubUsernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

  transform(value: string): string {
    if (!value || typeof value !== 'string') {
      throw new BadRequestException('Username parameter is required');
    }

    const trimmed = value.trim();

    if (!this.githubUsernameRegex.test(trimmed)) {
      throw new BadRequestException(
        `Invalid GitHub username format: '${trimmed}'. Usernames can only contain alphanumeric characters and hyphens.`,
      );
    }

    return trimmed;
  }
}
