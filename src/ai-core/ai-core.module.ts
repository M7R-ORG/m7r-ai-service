import { Module } from '@nestjs/common';
import { AiCoreService } from './ai-core.service';
import { AiCoreController } from './ai-core.controller';
import { AccContextService } from 'src/common/providers/user-context.service';
import { ProfilesModule } from 'src/profiles/profiles.module';

@Module({
  imports: [ProfilesModule],
  controllers: [AiCoreController],
  providers: [AiCoreService, AccContextService],
})
export class AiCoreModule {}
