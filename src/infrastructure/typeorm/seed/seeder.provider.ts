import { Injectable, OnModuleInit } from '@nestjs/common';
import { CategorySeeder } from './category.seeder';
import { ProductSeeder } from './product.seeder';
import { RoleSeeder } from './role.seeder';
import { UserRoleSeeder } from './user-role.seeder';
import { UserSeeder } from './user.seeder';

@Injectable()
export class SeederProvider implements OnModuleInit {
  constructor(
    private readonly categorySeeder: CategorySeeder,
    private readonly roleSeeder: RoleSeeder,
    private readonly userSeeder: UserSeeder,
    private readonly userRoleSeeder: UserRoleSeeder,
    private readonly productSeeder: ProductSeeder,
  ) {}

  async onModuleInit() {
    await this.categorySeeder.seed();
    await this.userSeeder.seed();
    await this.roleSeeder.seed();
    await this.userRoleSeeder.seed();
    await this.productSeeder.seed();
  }
}
