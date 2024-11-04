import { AccContextService } from './user-context.service';

export class Service {
  protected readonly accountId: number;
  protected readonly accountRole: string;

  constructor(accContextService: AccContextService) {
    this.accountId = accContextService.getId();
    this.accountRole = accContextService.getRole();
  }
}
