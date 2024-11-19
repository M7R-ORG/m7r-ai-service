import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

describe('ProfilesController', () => {
  let controller: ProfilesController;

  const mockProfilesService = {
    createProfile: jest.fn(),
    getProfile: jest.fn(),
    getProfiles: jest.fn(),
    updateProfile: jest.fn(),
    deleteProfile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
      providers: [
        {
          provide: ProfilesService,
          useValue: mockProfilesService,
        },
      ],
    }).compile();

    controller = module.get<ProfilesController>(ProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create-profile', () => {});
  describe('get-profile', () => {});
  describe('get-profiles', () => {});
  describe('update-profile', () => {});
  describe('delete-profile', () => {});
});
