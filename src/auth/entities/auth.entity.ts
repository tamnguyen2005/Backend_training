import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('users')
export class Auth {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: 'varchar', nullable: false })
  fullName!: string;
  @Column({ type: 'varchar', nullable: false })
  email!: string;
  @Column({ type: 'varchar', nullable: false })
  phoneNumber!: string;
  @Column({ type: 'varchar', nullable: false })
  passwordHashed!: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
