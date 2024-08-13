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
import { UserRoleModel } from './user-role.model';

@Entity({
  name: 'role',
  comment:
    'Entidade que representa um papel ou função que pode ser atribuído a um usuário.',
})
export class RoleModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false, comment: 'Nome do papel' })
  @Index()
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    comment: 'Data de criação do papel',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Data da última atualização do papel',
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Data da exclusão do papel (soft delete)',
  })
  deletedAt?: Date;

  @OneToMany(() => UserRoleModel, (userRole) => userRole.role)
  userRoles: UserRoleModel[];
}
