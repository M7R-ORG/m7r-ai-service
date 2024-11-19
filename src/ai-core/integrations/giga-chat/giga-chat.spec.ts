import { AIModelEnum } from '../ai-client.types';
import { GigaChatModel } from './giga-chat';

const mockModelArgs = {
  apiKey: 'api-key',
  model: AIModelEnum.GigaChat,
};

describe('GigaChatModel', () => {
  let gigaChatModel: GigaChatModel;

  beforeEach(() => {
    gigaChatModel = new GigaChatModel(mockModelArgs);
  });

  it('should be defined', () => {
    expect(gigaChatModel).toBeDefined();
  });

  describe('create-completion', () => {
    it('should be defined', () => {
      expect(gigaChatModel.createCompletion).toBeDefined();
    });

    it('args should be defined', () => {
      expect(gigaChatModel['model']).toBeDefined();
      expect(gigaChatModel['apiKey']).toBeDefined();
    });

    it('args should be correct', () => {
      const { model, apiKey } = mockModelArgs;

      expect(gigaChatModel['model']).toBe(model);
      expect(gigaChatModel['apiKey']).toBe(apiKey);
    });

    //   it('should create auth token', async () => {
    //     const mockRequest = {
    //       temperature: 0.6,
    //       template: 'test',
    //       messages: [{ content: 'test', role: GigaChatMessageRoleEnum.User }],
    //     };

    //     const message = { content: 'test response', role: 'assistant' };

    //     const mockAIModelResponse = {
    //       choices: [{ message }],
    //     };

    //     const mockCreate = gigaChatModel['client'].chat.completions.create;

    //     (mockCreate as jest.Mock).mockResolvedValue(mockAIModelResponse);

    //     const result = await gigaChatModel.createCompletion(mockRequest);

    //     expect(result).toBeDefined();
    //     expect(result).toEqual(message);
    //     expect(mockCreate).toHaveBeenCalled();
    //   });

    //   it('should send a request via api and return a response', async () => {
    //     const mockRequest = {
    //       temperature: 0.6,
    //       template: 'test',
    //       messages: [{ content: 'test', role: GigaChatMessageRoleEnum.User }],
    //     };

    //     const message = { content: 'test response', role: 'assistant' };

    //     const mockAIModelResponse = {
    //       choices: [{ message }],
    //     };

    //     const mockCreate = gigaChatModel['client'].chat.completions.create;

    //     (mockCreate as jest.Mock).mockResolvedValue(mockAIModelResponse);

    //     const result = await gigaChatModel.createCompletion(mockRequest);

    //     expect(result).toBeDefined();
    //     expect(result).toEqual(message);
    //     expect(mockCreate).toHaveBeenCalled();
    //   });

    //   it('should throw a error when API call fails', async () => {
    //     const mockRequest = {
    //       temperature: 0.6,
    //       template: 'test',
    //       messages: [{ content: 'test', role: ChatGPTMessageRoleEnum.User }],
    //     };

    //     const errorMessage = 'API call failed';

    //     const mockCreate = gigaChatModel['client'].chat.completions.create;

    //     (mockCreate as jest.Mock).mockRejectedValue(new Error(errorMessage));

    //     await expect(gigaChatModel.createCompletion(mockRequest)).rejects.toThrow(
    //       new RequestFailedError(mockModelArgs.model, errorMessage),
    //     );
    //   });
  });
});
