import { UserModel } from '@Domain/models/user.model';
import { IUserRepository } from '@Domain/repositories/user.repository';
import { RoleEntity } from '@Infrastructure/entities/role.entity';
import { UserRoleEntity } from '@Infrastructure/entities/user-role.entity';
import { UserEntity } from '@Infrastructure/entities/user.entity';
import { UserMapper } from '@Infrastructure/mappers/user.mapper';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleEnum } from '@Shared/enums/user-role.enum';
import { DataSource, In, Repository } from 'typeorm';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async save(user: UserModel): Promise<void> {
    const rolesEntity = await this.getManyRoleByUserRoleEnum(user.roles);
    if (!rolesEntity?.length) {
      throw new UnprocessableEntityException();
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userEntity = await queryRunner.manager.save(
        UserEntity,
        UserMapper.toEntity(user),
      );

      for (const roleEntity of rolesEntity) {
        const userRoleEntity = new UserRoleEntity();
        userRoleEntity.role = roleEntity;
        userRoleEntity.user = userEntity;
        await queryRunner.manager.save(UserRoleEntity, userRoleEntity);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
  }

  async getUserByCpf(cpf: string): Promise<UserModel> {
    const userEntity = await this.userRepository.findOneBy({ cpf });
    if (userEntity) {
      return UserMapper.toModel(userEntity);
    }
  }

  async getUserByEmail(email: string): Promise<UserModel> {
    const userEntity = await this.userRepository.findOneBy({ email });
    if (userEntity) {
      return UserMapper.toModel(userEntity);
    }
  }

  private async getManyRoleByUserRoleEnum(
    enumRoles: UserRoleEnum[],
  ): Promise<RoleEntity[]> {
    return this.roleRepository.find({
      where: { name: In(enumRoles) },
    });
  }
}
