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
import { CategoryModel } from './category.model';
import { ProductOrderModel } from './product-order.model';

@Entity({
  name: 'product',
  comment: 'Entidade que representa um produto disponível para compra.',
})
export class ProductModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false, comment: 'Nome do produto' })
  name: string;

  @Column({ type: 'text', nullable: false, comment: 'Descrição do produto' })
  description: string;

  @Column({ type: 'numeric', nullable: false, comment: 'Preço do produto' })
  price: number;

  @Column({
    type: 'numeric',
    nullable: false,
    comment: 'Tempo de preparação do produto em minutos',
  })
  preparationTime: number;

  @Column({
    type: 'text',
    nullable: false,
    comment: 'URL da imagem do produto',
  })
  figureUrl: string;

  @Column({
    type: 'boolean',
    default: true,
    comment: 'Indica se o produto está habilitado',
  })
  enabled: boolean;

  @ManyToOne(() => CategoryModel, (category) => category.products, {
    eager: true,
  })
  category: CategoryModel;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    comment: 'Data de criação do produto',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Data da última atualização do produto',
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Data da exclusão do produto (soft delete)',
  })
  deletedAt?: Date;

  @OneToMany(() => ProductOrderModel, (productOrder) => productOrder.product)
  productOrders: ProductOrderModel[];
}
