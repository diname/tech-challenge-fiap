import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { ProductOrderEntity } from './product_order.entity';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'numeric', nullable: false })
  price: number;

  @Column({ type: 'text', nullable: false })
  figureUrl: string;

  @Column({ type: 'boolean', default: true })
  enabled: boolean;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category: CategoryEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @OneToMany(() => ProductOrderEntity, (productOrder) => productOrder.product)
  productOrders: ProductOrderEntity[];
}
