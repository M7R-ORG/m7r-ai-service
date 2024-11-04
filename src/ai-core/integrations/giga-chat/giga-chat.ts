import { IAIModel } from '../ai-client';
import {
  AIModelArgsT,
  AIModelEnum,
  CreateCompletionArgsT,
  MessageT,
} from '../ai-client.types';
import { GigaChatMessageRoleEnum, GigaChatScopeEnum } from './giga-chat.types';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import * as https from 'https';
import { RequestFailedError } from '../ai-client.errors';
import { defaultTemperature } from '../ai-client.constants';

class GigaChatModel implements IAIModel {
  private model: AIModelEnum;
  private apiKey: string;
  public userRole = GigaChatMessageRoleEnum.User;

  public constructor(args: AIModelArgsT) {
    this.model = args.model;
    this.apiKey = args.apiKey;
  }

  private async getAuthToken(): Promise<string> {
    const url = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth';

    const response = await axios
      .post(
        url,
        new URLSearchParams({
          scope: GigaChatScopeEnum.Personal,
        }),
        {
          headers: {
            ['Content-Type']: 'application/x-www-form-urlencoded',
            ['Accept']: 'application/json',
            ['RqUID']: uuidv4(),
            ['Authorization']: `Basic ${this.apiKey}`,
          },
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
        },
      )
      .then((response) => response.data)
      .catch((error) => {
        throw new RequestFailedError(this.model, error.message);
      });

    return response.access_token;
  }

  public async createCompletion(
    args: CreateCompletionArgsT,
  ): Promise<MessageT> {
    const { messages, temperature } = args;

    const accessToken = await this.getAuthToken();

    const url = 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions';

    const response = await axios
      .post(
        url,
        {
          model: this.model,
          messages,
          temperature: temperature || defaultTemperature,
        },
        {
          headers: {
            ['Content-Type']: 'application/json',
            ['Accept']: 'application/json',
            ['Authorization']: `Bearer ${accessToken}`,
          },
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
        },
      )
      .then((response) => response.data)
      .catch((error) => {
        throw new RequestFailedError(this.model, error.message);
      });

    const choices = response?.choices;

    const message = choices?.[0]?.message;

    return message;
  }
}

export { GigaChatModel };
