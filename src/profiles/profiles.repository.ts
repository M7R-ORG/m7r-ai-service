import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository, ILike, FindOptionsWhere } from 'typeorm';
import {
  ProfilesRepositoryGetManyArgsT,
  ProfilesRepositoryGetOneArgsT,
} from './profiles.types';
import { PagedResponseT } from 'src/common/common.types';

@Injectable()
export class ProfilesRepository {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async getMany(
    args: ProfilesRepositoryGetManyArgsT,
  ): Promise<PagedResponseT<Profile>> {
    const { filter, orderBy, pagination } = args;
    const { pageNumber, pageSize } = pagination;

    const whereConditions: FindOptionsWhere<Profile> = {
      accountId: filter.accountId,
    };

    if (filter.searchField) {
      whereConditions.name = ILike(`%${filter.searchField}%`);
    }

    const [profiles, itemsCount] = await this.profileRepository.findAndCount({
      where: whereConditions,
      order: orderBy,
      skip: pageNumber * pageSize,
      take: pageSize,
    });

    const pagesCount = pageSize > 0 ? Math.ceil(itemsCount / pageSize) : 0;

    return {
      meta: {
        pagesCount,
        itemsCount,
        pageNumber,
        pageSize,
      },
      items: profiles,
    };
  }

  async getOne(args: ProfilesRepositoryGetOneArgsT): Promise<Profile> {
    const profile = await this.profileRepository.findOneBy(args);

    return profile;
  }

  async create(entity: Partial<Profile>): Promise<Profile> {
    const profile = await this.profileRepository.save(entity);

    return profile;
  }

  async update(id: number, entity: Partial<Profile>): Promise<Profile> {
    const existingProfile = await this.profileRepository.findOneBy({ id });

    if (!existingProfile) {
      throw new Error(`Profile with ID ${id} not found`);
    }

    const profile = await this.profileRepository.save({
      ...existingProfile,
      ...entity,
    });

    return profile;
  }

  async delete(id: number): Promise<void> {
    await this.profileRepository.delete({ id });
  }
}
