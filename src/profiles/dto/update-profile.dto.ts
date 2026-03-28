import { AIModelEnum } from 'src/ai-core/integrations/ai-client.types';

export class UpdateProfileDto {
  name: string;
  apiKey: string;
  temperature: number;
  template: string;
  model: AIModelEnum;
}
