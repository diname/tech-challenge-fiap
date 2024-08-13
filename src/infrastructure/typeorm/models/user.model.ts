import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderModel } from './order.model';
import { UserRoleModel } from './user-role.model';

@Entity({
  name: 'user',
  comment:
    'Entidade que representa um usuário do sistema, contendo informações básicas e suas associações com papéis e pedidos.',
})
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false, comment: 'Nome do usuário' })
  name: string;

  @Column({
    length: 100,
    unique: true,
    nullable: false,
    comment: 'Email do usuário',
  })
  @Index()
  email: string;

  @Column({
    length: 11,
    unique: true,
    nullable: true,
    comment: 'CPF do usuário',
  })
  @Index()
  cpf: string;

  @Column({
    length: 60,
    nullable: true,
    comment: 'Senha dos usuários administradores',
  })
  password: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    comment: 'Data de criação do usuário',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Data da última atualização do usuário',
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Data da exclusão do usuário (soft delete)',
  })
  deletedAt?: Date;

  @OneToMany(() => UserRoleModel, (userRole) => userRole.user)
  userRoles: UserRoleModel[];

  @OneToMany(() => OrderModel, (order) => order.user)
  orders: OrderModel[];
}
