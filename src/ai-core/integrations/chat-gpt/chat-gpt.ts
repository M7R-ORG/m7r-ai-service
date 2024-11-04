import openAI from 'openai';
import { IAIModel } from '../ai-client';
import { ChatGPTMessageRoleEnum } from './chat-gpt.types';
import {
  AIModelArgsT,
  AIModelEnum,
  CreateCompletionArgsT,
  MessageT,
} from '../ai-client.types';
import { defaultTemperature } from '../ai-client.constants';
import { RequestFailedError } from '../ai-client.errors';

class ChatGPTModel implements IAIModel {
  private client: openAI;
  private model: AIModelEnum;
  public userRole = ChatGPTMessageRoleEnum.User;

  public constructor(args: AIModelArgsT) {
    this.client = new openAI({ apiKey: args.apiKey });
    this.model = args.model;
  }

  public async createCompletion(
    args: CreateCompletionArgsT,
  ): Promise<MessageT> {
    const { messages, temperature } = args;

    const adaptedMessages = messages.map((message) => ({
      ...message,
      role: message.role as ChatGPTMessageRoleEnum,
    }));

    const chatCompletion = await this.client.chat.completions
      .create({
        messages: adaptedMessages,
        model: this.model,
        temperature: temperature || defaultTemperature,
      })
      .catch((error) => {
        throw new RequestFailedError(this.model, error.message);
      });

    const [choice] = chatCompletion.choices;

    return choice.message;
  }
}

export { ChatGPTModel };
