import { ProductOrderEntity } from '@Domain/entities/product-order.entity';
import { IProductOrderRepository } from '@Domain/repositories/product-order.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductOrderMapper } from '../mappers/product-order.mapper';
import { ProductOrderModel } from '../models/product-order.model';

export class ProductOrderRepositoryImpl implements IProductOrderRepository {
  constructor(
    @InjectRepository(ProductOrderModel)
    private readonly repository: Repository<ProductOrderModel>,
  ) {}

  async save(productOrder: ProductOrderEntity): Promise<ProductOrderEntity> {
    const productOrderModel = ProductOrderMapper.toModel(productOrder);
    const savedModel = await this.repository.save(productOrderModel);
    return ProductOrderMapper.toEntity(savedModel);
  }

  async update(
    id: number,
    productOrder: ProductOrderEntity,
  ): Promise<ProductOrderEntity> {
    const productOrderModel = await this.repository.preload({
      id: id,
      ...ProductOrderMapper.toModel(productOrder),
    });
    if (!productOrderModel) return null;
    const updatedProductOrderModel =
      await this.repository.save(productOrderModel);
    return ProductOrderMapper.toEntity(updatedProductOrderModel);
  }

  async delete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  async findAll(): Promise<ProductOrderEntity[]> {
    const productsOrder = await this.repository.find();
    return productsOrder.map(ProductOrderMapper.toEntity);
  }

  async findById(id: number): Promise<ProductOrderEntity> {
    const productOrder = await this.repository.findOne({ where: { id } });
    return ProductOrderMapper.toEntity(productOrder);
  }
}
