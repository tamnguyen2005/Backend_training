import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price!: number;
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
