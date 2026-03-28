import { Injectable } from '@nestjs/common';
import { CreateCompletionArgsT, MessageT } from './ai-client.types';

export interface IAIModel {
  createCompletion(args: CreateCompletionArgsT): Promise<MessageT>;

  userRole: string;
}

@Injectable()
export class AIClient {
  constructor(private readonly model: IAIModel) {}

  createCompletion(args: CreateCompletionArgsT) {
    return this.model.createCompletion(args);
  }
}
