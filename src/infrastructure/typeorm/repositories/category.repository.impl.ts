import { ICategoryRepository } from '@Domain/repositories/category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderMapper } from '../mappers/order.mapper';
import { CategoryModel } from '../models/category.model';

export class CategoryRepositoryImpl implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryModel)
    private readonly repository: Repository<CategoryModel>,
  ) {}
  find(): Promise<CategoryEntity[]> {
    throw new Error('Method not implemented.');
  }

  async save(order: CategoryEntity): Promise<CategoryEntity> {
    const model = OrderMapper.toModel(order);
    const savedModel = await this.repository.save(model);
    return OrderMapper.toEntity(savedModel);
  }

  async update(id: number, order: CategoryEntity): Promise<CategoryEntity> {
    const model = await this.repository.preload({
      id: id,
      ...OrderMapper.toModel(order),
    });
    if (!model) return null;
    const updatedModel = await this.repository.save(model);
    return OrderMapper.toEntity(updatedModel);
  }

  async delete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  async findAll(): Promise<CategoryEntity[]> {
    const models = await this.repository.find();
    return models.map(OrderMapper.toEntity);
  }

  async findById(id: number): Promise<CategoryEntity> {
    const model = await this.repository.findOne({ where: { id } });
    return OrderMapper.toEntity(model);
  }
}
