import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductOrderEntity } from './product_order.entity';
import { UserEntity } from './user.entity';

export enum PaymentStatusType {
  PENDING = 'pending',
  APPROVED = 'approved',
  CANCELED = 'canceled',
}

export enum OrderStatusType {
  NONE = 'none',
  RECEIVED = 'received',
  IN_PREPARATION = 'in_preparation',
  READY = 'ready',
  FINISHED = 'finished',
}

@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double precision', nullable: false })
  totalPrice: number;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @Column({
    type: 'enum',
    enum: PaymentStatusType,
    default: PaymentStatusType.PENDING,
  })
  paymentStatus: PaymentStatusType;

  @Column({
    type: 'enum',
    enum: OrderStatusType,
    default: OrderStatusType.NONE,
  })
  orderStatus: OrderStatusType;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @OneToMany(() => ProductOrderEntity, (productOrder) => productOrder.order)
  productOrders: ProductOrderEntity[];
}
