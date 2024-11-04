import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';
import { AccContextService } from 'src/common/providers/user-context.service';
import { Service } from 'src/common/providers/base.service';
import { modelMapper } from 'src/ai-core/integrations/ai-client.model-mapper';
import { ProfilesRepository } from './profiles.repository';
import { PagedResponseT } from 'src/common/common.types';
import { GetProfilesArgsT } from './profiles.types';

@Injectable()
export class ProfilesService extends Service {
  constructor(
    private readonly profilesRepository: ProfilesRepository,
    accContextService: AccContextService,
  ) {
    super(accContextService);
  }

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = await this.profilesRepository.create({
      ...createProfileDto,
      accountId: this.accountId,
      integration: modelMapper[createProfileDto.model],
    });

    return profile;
  }

  async deleteProfile(id: number): Promise<void> {
    await this.profilesRepository.delete(id);
  }

  // async updateProfile(updateProfileDto: UpdateProfileDto): Promise<Profile> {
  //   const profile = await this.profileRepository.save({
  //     ...createProfileDto,
  //     accountId: this.accountId,
  //     integration: modelMapper[createProfileDto.model],
  //   });

  //   return profile;
  // }

  async getProfiles(args: GetProfilesArgsT): Promise<PagedResponseT<Profile>> {
    const { pageNumber, pageSize, searchField } = args;

    const profiles = await this.profilesRepository.getMany({
      filter: {
        accountId: this.accountId,
        searchField,
      },
      pagination: { pageNumber, pageSize },
    });

    return profiles;
  }

  async getProfile(id: number) {
    const profile = await this.profilesRepository.getOne({
      id,
      accountId: this.accountId,
    });

    return profile;
  }
}
