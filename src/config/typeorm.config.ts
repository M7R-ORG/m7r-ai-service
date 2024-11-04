import { ConfigService } from '@nestjs/config';
import { DbConfig } from './app.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export async function typeORMFactory(
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> {
  const {
    host,
    name: database,
    password,
    port,
    username,
  } = configService.get<DbConfig>('db');

  return {
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    synchronize: true,
    autoLoadEntities: true,
    migrationsRun: true,
    logging: false,
  };
}
