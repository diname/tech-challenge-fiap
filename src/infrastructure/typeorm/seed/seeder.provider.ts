import { Injectable, OnModuleInit } from '@nestjs/common';
import { CategorySeeder } from './category.seeder';
import { RoleSeeder } from './role.seeder';
import { UserSeeder } from './user.seeder';

@Injectable()
export class SeederProvider implements OnModuleInit {
  constructor(
    private readonly categorySeeder: CategorySeeder,
    private readonly roleSeeder: RoleSeeder,
    private readonly userSeeder: UserSeeder,
  ) {}

  async onModuleInit() {
    await this.categorySeeder.seed();
    await this.userSeeder.seed();
    await this.roleSeeder.seed();
  }
}
