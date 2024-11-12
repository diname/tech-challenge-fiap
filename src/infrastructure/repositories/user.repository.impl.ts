import { UserEntity } from '@Domain/entities/user.entity';
import { IUserRepository } from '@Domain/repositories/user.repository';
import { UserMapper } from '@Infrastructure/typeorm/mappers/user.mapper';
import { RoleModel } from '@Infrastructure/typeorm/models/role.model';
import { UserRoleModel } from '@Infrastructure/typeorm/models/user-role.model';
import { UserModel } from '@Infrastructure/typeorm/models/user.model';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleEnum } from '@Shared/enums/user-role.enum';
import { DataSource, In, Repository } from 'typeorm';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(RoleModel)
    private readonly roleRepository: Repository<RoleModel>,
    private readonly dataSource: DataSource,
  ) {}

  async save(user: UserEntity): Promise<void> {
    const roles = await this.getManyRoleByUserRoleEnum(user.roles);
    if (!roles?.length) {
      throw new UnprocessableEntityException();
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userModel = await queryRunner.manager.save(
        UserModel,
        UserMapper.toModel(user),
      );

      for (const role of roles) {
        const userRoleModel = new UserRoleModel();
        userRoleModel.role = role;
        userRoleModel.user = userModel;
        await queryRunner.manager.save(UserRoleModel, userRoleModel);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
  }

  async getUserByCpf(cpf: string): Promise<UserEntity> {
    const userModel = await this.userRepository.findOne({
      where: { cpf },
      relations: ['userRoles', 'userRoles.role'],
    });
    if (userModel) {
      return UserMapper.toEntity(userModel);
    }
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const userEntity = await this.userRepository.findOne({
      where: { email },
      relations: ['userRoles', 'userRoles.role'],
    });
    if (userEntity) {
      return UserMapper.toEntity(userEntity);
    }
  }

  async getUsersByRole(role: UserRoleEnum): Promise<UserEntity[]> {
    const users = await this.userRepository.find({
      where: { userRoles: { role: { name: role } } },
      relations: ['userRoles', 'userRoles.role'],
    });

    return users.map((user) => UserMapper.toEntity(user));
  }

  private async getManyRoleByUserRoleEnum(
    enumRoles: UserRoleEnum[],
  ): Promise<RoleModel[]> {
    return this.roleRepository.find({
      where: { name: In(enumRoles) },
    });
  }
}
