import { IAIModel } from '../ai-client';
import { MessageT } from '../ai-client.types';
import { YouChatMessageRoleEnum } from './you-chat.types';

class YouChatModel implements IAIModel {
  public userRole = YouChatMessageRoleEnum.User;

  public async createCompletion(): Promise<MessageT> {
    throw new Error('Method not implemented');
  }
}

export { YouChatModel };
