import { MessageT } from '../integrations/ai-client.types';

export class CreateCompletionDto {
  accountId: number;
  profileId: number;
  channelId: number;
  messages: Array<MessageT>;
  originalMessageId: number;
}
