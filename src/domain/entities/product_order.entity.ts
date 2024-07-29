import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'product_order' })
export class ProductOrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, (product) => product.productOrders)
  product: ProductEntity;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @ManyToOne(() => OrderEntity, (order) => order.productOrders)
  order: OrderEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;
}
