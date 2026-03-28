import { ChatGPTModelEnum } from './chat-gpt/chat-gpt.types';
import { GigaChatModelEnum } from './giga-chat/giga-chat.types';
import { YandexGPTModelEnum } from './yandex-gpt/yandex-gpt.types';

export type MessageT = {
  content: string;
  role: string;
};

export type AIModelArgsT = {
  model: AIModelEnum;
  apiKey: string;
  additionalKey?: string;
};

export type CreateCompletionArgsT = {
  messages: Array<MessageT>;
  temperature?: number;
  template?: string;
};

export enum AIIntegrationEnum {
  ChatGPT = 'chat-gpt',
  YouChat = 'you-chat',
  YandexGPT = 'yandex-gpt',
  GigaChat = 'giga-chat',
}

export enum AIModelEnum {
  Gpt3T = ChatGPTModelEnum.Gpt3T,
  Gpt4 = ChatGPTModelEnum.Gpt4,
  Gpt4OM = ChatGPTModelEnum.Gpt4OM,
  YaLite = YandexGPTModelEnum.YaLite,
  GigaChat = GigaChatModelEnum.GigaChat,
  GigaChatPlus = GigaChatModelEnum.GigaChatPlus,
  GigaChatPro = GigaChatModelEnum.GigaChatPro,
}
