import { UserModel } from '@Domain/models/user.model';
import { IUserRepository } from '@Domain/repositories/user.repository';
import { UserEntity } from '@Infrastructure/entities/user.entity';
import { UserMapper } from '@Infrastructure/mappers/user.mapper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async save(user: UserModel): Promise<void> {
    await this.userRepository.save(UserMapper.toEntity(user));
  }

  async getUserByCpf(cpf: string): Promise<UserModel> {
    const userEntity = await this.userRepository.findOneBy({ cpf });
    return UserMapper.toModel(userEntity);
  }

  async getUserByEmail(email: string): Promise<UserModel> {
    const userEntity = await this.userRepository.findOneBy({ email });
    return UserMapper.toModel(userEntity);
  }
}
