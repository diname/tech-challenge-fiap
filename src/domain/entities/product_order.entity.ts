import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';

@Entity({
  name: 'product_order',
  comment:
    'Entidade que representa a relação entre um produto e um pedido, incluindo a quantidade do produto no pedido.',
})
export class ProductOrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, (product) => product.productOrders)
  product: ProductEntity;

  @Column({
    type: 'int',
    nullable: false,
    comment: 'Quantidade do produto no pedido',
  })
  quantity: number;

  @ManyToOne(() => OrderEntity, (order) => order.productOrders)
  order: OrderEntity;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    comment: 'Data de criação da relação produto-pedido',
  })
  createdAt: Date;
}
