import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class AccContextService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  getId(): number | null {
    const accountId = this.request.headers?.['x-account-id'];
    return Number(accountId) || null;
  }

  getRole(): string | null {
    const accountRole = this.request.headers?.['x-account-role'];
    return (accountRole as string) || null;
  }
}
