import {
  AIIntegrationEnum,
  AIModelEnum,
} from 'src/ai-core/integrations/ai-client.types';
import { ColumnTypeEnum } from 'src/common/common.enums';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  apiKey: string;

  @Column({ nullable: true })
  additionalKey: string;

  @Column('float')
  temperature: number;

  @Column({ nullable: true })
  template?: string;

  @Column({
    type: ColumnTypeEnum.Enum,
    enum: AIModelEnum,
  })
  model: AIModelEnum;

  @Index()
  @Column({
    type: ColumnTypeEnum.Enum,
    enum: AIIntegrationEnum,
  })
  integration: AIIntegrationEnum;

  @Index()
  @Column()
  accountId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
