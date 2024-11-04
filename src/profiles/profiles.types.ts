import { PaginationT } from 'src/common/common.types';

export type ProfilesRepositoryGetManyArgsT = {
  filter: {
    accountId: number;
    searchField: string;
  };
  pagination: PaginationT;
};

export type ProfilesRepositoryGetOneArgsT = {
  id: number;
  accountId?: number;
};

export type GetProfilesArgsT = PaginationT & {
  searchField?: string;
};
