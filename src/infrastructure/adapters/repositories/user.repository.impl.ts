import { IUserRepository } from '@Domain/repositories/user.repository';
import { UserEntity } from '@Infrastructure/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async save(user: UserEntity): Promise<void> {
    await this.userRepository.save(user);
  }

  async getUserByCpf(cpf: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ cpf });
  }
}
