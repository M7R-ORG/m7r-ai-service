import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesService } from './profiles.service';
import { ProfilesRepository } from './profiles.repository';
import { AccContextService } from '../common/providers/user-context.service';

describe('ProfilesService', () => {
  let service: ProfilesService;

  beforeEach(async () => {
    const mockProfilesRepository = {
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      getMany: jest.fn(),
      getOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        AccContextService,
        {
          provide: ProfilesRepository,
          useValue: mockProfilesRepository,
        },
      ],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
