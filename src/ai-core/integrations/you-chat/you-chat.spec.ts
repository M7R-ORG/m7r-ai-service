import { YouChatModel } from './you-chat';

describe('GigaChatModel', () => {
  let youChatModel: YouChatModel;

  beforeEach(() => {
    youChatModel = new YouChatModel();
  });

  it('should be defined', () => {
    expect(youChatModel).toBeDefined();
  });

  describe('create-completion', () => {
    it('should be defined', () => {
      expect(youChatModel.createCompletion).toBeDefined();
    });
  });
});
