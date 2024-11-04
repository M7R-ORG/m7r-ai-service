import { Body, Controller, Post } from '@nestjs/common';
import { AiCoreService } from './ai-core.service';
import { CreateCompletionDto } from './dto/create-completion.dto';
import { ApiTags } from '@nestjs/swagger';
import { MessageT } from './integrations/ai-client.types';
import { CustomEventPattern } from 'src/common/common.decorators';

@Controller('api/ai-core')
@ApiTags('AI-Core')
export class AiCoreController {
  constructor(private readonly aiCoreService: AiCoreService) {}

  @CustomEventPattern('create-message')
  async createMessage(createCompletionDto: CreateCompletionDto) {
    const { channelId, profileId } = createCompletionDto;

    const { content } =
      await this.aiCoreService.createCompletion(createCompletionDto);

    return {
      message: content,
      channelId,
      profileId,
    };
  }

  @Post('create-message')
  async createMessageRest(
    @Body() createCompletionDto: CreateCompletionDto,
  ): Promise<MessageT> {
    return this.aiCoreService.createCompletion(createCompletionDto);
  }
}
