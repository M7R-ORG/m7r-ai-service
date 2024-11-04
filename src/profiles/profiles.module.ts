import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { AccContextService } from 'src/common/providers/user-context.service';
import { ProfilesRepository } from './profiles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [ProfilesController],
  providers: [ProfilesService, ProfilesRepository, AccContextService],
  exports: [ProfilesRepository, TypeOrmModule],
})
export class ProfilesModule {}
