import { AIModelEnum } from '../ai-client.types';
import { YandexGPTModel } from './yandex-gpt';

describe('YandexGPTModel', () => {
  let yandexGPTModel: YandexGPTModel;

  beforeEach(() => {
    yandexGPTModel = new YandexGPTModel({
      apiKey: 'api-key',
      model: AIModelEnum.Gpt3T,
    });
  });

  it('should be defined', () => {
    expect(yandexGPTModel).toBeDefined();
  });

  describe('create-completion', () => {
    it('should be defined', () => {
      expect(yandexGPTModel.createCompletion).toBeDefined();
    });
  });
});
