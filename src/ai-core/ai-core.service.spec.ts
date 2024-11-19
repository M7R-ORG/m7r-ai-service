import { Test, TestingModule } from '@nestjs/testing';
import { AiCoreService } from './ai-core.service';
import { AccContextService } from 'src/common/providers/user-context.service';
import { ProfilesRepository } from 'src/profiles/profiles.repository';

describe('AiCoreService', () => {
  let service: AiCoreService;

  const mockProfilesRepository = {
    getOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiCoreService,
        AccContextService,
        {
          provide: ProfilesRepository,
          useValue: mockProfilesRepository,
        },
      ],
    }).compile();

    service = module.get<AiCoreService>(AiCoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create-completion', () => {
    it('should be defined', () => {
      expect(service.createCompletion).toBeDefined();
    });
  });
});
