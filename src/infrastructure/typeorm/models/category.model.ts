import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductModel } from './product.model';

@Entity({
  name: 'category',
  comment: 'Entidade que representa uma categoria de produtos.',
})
export class CategoryModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false, comment: 'Nome da categoria' })
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    comment: 'Data de criação da categoria',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Data da última atualização da categoria',
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Data da exclusão da categoria (soft delete)',
  })
  deletedAt?: Date;

  @OneToMany(() => ProductModel, (product) => product.category)
  products: ProductModel[];
}
