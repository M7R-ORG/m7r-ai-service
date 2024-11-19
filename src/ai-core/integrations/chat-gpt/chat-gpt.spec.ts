import { RequestFailedError } from '../ai-client.errors';
import { AIModelEnum } from '../ai-client.types';
import { ChatGPTModel } from './chat-gpt';
import { ChatGPTMessageRoleEnum } from './chat-gpt.types';

const mockModelArgs = {
  apiKey: 'api-key',
  model: AIModelEnum.Gpt3T,
};

jest.mock('openai', () => ({
  default: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
  })),
}));

describe('ChatGPTModel', () => {
  let chatGPTModel: ChatGPTModel;

  beforeEach(() => {
    chatGPTModel = new ChatGPTModel(mockModelArgs);
  });

  it('should be defined', () => {
    expect(chatGPTModel).toBeDefined();
  });

  describe('create-completion', () => {
    it('should be defined', () => {
      expect(chatGPTModel.createCompletion).toBeDefined();
    });

    it('args should be defined', () => {
      expect(chatGPTModel['model']).toBeDefined();
      expect(chatGPTModel['client']).toBeDefined();
    });

    it('args should be correct', () => {
      const { model } = mockModelArgs;

      expect(chatGPTModel['model']).toBe(model);
    });

    it('should add template to message list', async () => {
      const mockRequest = {
        temperature: 0.6,
        template: 'template',
        messages: [{ content: 'test', role: ChatGPTMessageRoleEnum.User }],
      };

      const mockCreate = chatGPTModel['client'].chat.completions.create;

      const mockAIModelResponse = {
        choices: [{ content: 'test response', role: 'assistant' }],
      };

      (mockCreate as jest.Mock).mockResolvedValue(mockAIModelResponse);

      await chatGPTModel.createCompletion(mockRequest);

      expect(mockCreate).toHaveBeenCalled();
      expect(mockCreate).toHaveBeenCalledWith({
        model: mockModelArgs.model,
        temperature: mockRequest.temperature,
        messages: [
          {
            content: mockRequest.template,
            role: ChatGPTMessageRoleEnum.System,
          },
          { content: 'test', role: ChatGPTMessageRoleEnum.User },
        ],
      });
    });

    it('should not add template to message list', async () => {
      const mockRequest = {
        temperature: 0.6,
        messages: [{ content: 'test', role: ChatGPTMessageRoleEnum.User }],
      };

      const mockCreate = chatGPTModel['client'].chat.completions.create;

      const mockAIModelResponse = {
        choices: [{ content: 'test response', role: 'assistant' }],
      };

      (mockCreate as jest.Mock).mockResolvedValue(mockAIModelResponse);

      await chatGPTModel.createCompletion(mockRequest);

      expect(mockCreate).toHaveBeenCalled();
      expect(mockCreate).toHaveBeenCalledWith({
        model: mockModelArgs.model,
        temperature: mockRequest.temperature,
        messages: [{ content: 'test', role: ChatGPTMessageRoleEnum.User }],
      });
    });

    it('should send a request via api and return a response', async () => {
      const mockRequest = {
        temperature: 0.6,
        template: 'test',
        messages: [{ content: 'test', role: ChatGPTMessageRoleEnum.User }],
      };

      const message = { content: 'test response', role: 'assistant' };

      const mockAIModelResponse = {
        choices: [{ message }],
      };

      const mockCreate = chatGPTModel['client'].chat.completions.create;

      (mockCreate as jest.Mock).mockResolvedValue(mockAIModelResponse);

      const result = await chatGPTModel.createCompletion(mockRequest);

      expect(result).toBeDefined();
      expect(result).toEqual(message);
      expect(mockCreate).toHaveBeenCalled();
    });

    it('should throw a error when API call fails', async () => {
      const mockRequest = {
        temperature: 0.6,
        template: 'test',
        messages: [{ content: 'test', role: ChatGPTMessageRoleEnum.User }],
      };

      const errorMessage = 'API call failed';

      const mockCreate = chatGPTModel['client'].chat.completions.create;

      (mockCreate as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(chatGPTModel.createCompletion(mockRequest)).rejects.toThrow(
        new RequestFailedError(mockModelArgs.model, errorMessage),
      );
    });
  });
});
