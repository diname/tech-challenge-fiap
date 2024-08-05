import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleModel } from './role.model';
import { UserModel } from './user.model';

@Entity({
  name: 'user_role',
  comment:
    'Entidade que representa a relação entre um usuário e um papel que ele possui.',
})
export class UserRoleModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserModel, (user) => user.userRoles)
  user: UserModel;

  @ManyToOne(() => RoleModel, (role) => role.userRoles)
  role: RoleModel;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    comment: 'Data de criação da relação usuário-papel',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Data da última atualização da relação usuário-papel',
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Data da exclusão da relação usuário-papel (soft delete)',
  })
  deletedAt?: Date;
}
