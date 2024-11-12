import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderModel } from './order.model';
import { ProductModel } from './product.model';

@Entity({
  name: 'product_order',
  comment:
    'Entidade que representa a relação entre um produto e um pedido, incluindo a quantidade do produto no pedido.',
})
export class ProductOrderModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductModel, (product) => product.productOrders, {
    eager: true,
  })
  product: ProductModel;

  @Column({
    type: 'int',
    nullable: false,
    comment: 'Quantidade do produto no pedido',
  })
  quantity: number;

  @ManyToOne(() => OrderModel, (order) => order.productOrders)
  order: OrderModel;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    comment: 'Data de criação da relação produto-pedido',
  })
  createdAt: Date;
}
