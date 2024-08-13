import { CreateOrderEntity } from '@Domain/entities/create-order.entity';
import { OrderEntity, ProductOrderEntity } from '@Domain/entities/order.entity';
import { UserEntity } from '@Domain/entities/user.entity';
import {
  IOrderRepository,
  IOrderRepositorySymbol,
} from '@Domain/repositories/order.repository';
import {
  IProductOrderRepository,
  IProductOrderRepositorySymbol,
} from '@Domain/repositories/product-order.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OrderStatusType } from '@Shared/enums/order-status-type.enum';
import { PaymentStatusType } from '@Shared/enums/payment-status-type.enum';
import {
  IProductService,
  IProductServiceSymbol,
} from '../product/product.service';
import { IUserService, IUserServiceSymbol } from '../user/user.service';
import { IOrderService } from './order.service';

@Injectable()
export class OrderServiceImpl implements IOrderService {
  constructor(
    @Inject(IOrderRepositorySymbol)
    private readonly repository: IOrderRepository,
    @Inject(IProductOrderRepositorySymbol)
    private readonly productOrderRepository: IProductOrderRepository,
    @Inject(IProductServiceSymbol)
    private readonly productService: IProductService,
    @Inject(IUserServiceSymbol)
    private readonly userService: IUserService,
  ) {}

  async createOrder(order: CreateOrderEntity): Promise<OrderEntity> {
    let user: UserEntity;

    console.log(order.cpf);

    if (order.cpf) {
      const cpf = order.cpf;
      user = await this.userService.getOne({ cpf });
    }

    const productsOrder: ProductOrderEntity[] = [];
    let totalPrice = 0;

    for (const productOrder of order.productOrders) {
      const product = await this.productService.findById(
        productOrder.productId,
      );

      if (product) {
        totalPrice += product.price * productOrder.quantity;

        const productOrderEntity = await this.productOrderRepository.save(
          new ProductOrderEntity(productOrder.quantity, product, new Date()),
        );

        productsOrder.push(productOrderEntity);
      } else {
        throw new NotFoundException(
          `Product with ID ${productOrder.productId} not found`,
        );
      }
    }

    const orderEntity = new OrderEntity(
      totalPrice,
      PaymentStatusType.PENDING,
      OrderStatusType.NONE,
      new Date(),
      productsOrder,
      user,
    );

    console.log({ orderEntity });

    return this.repository.save(orderEntity);
  }

  async approveOrder(id: number): Promise<void> {
    const order = await this.repository.findById(id);
    if (!order) throw new NotFoundException('Order not found');
    order.paymentStatus = PaymentStatusType.APPROVED;
    this.repository.save(order);
  }

  async cancelOrder(id: number): Promise<void> {
    const order = await this.repository.findById(id);
    if (!order) throw new NotFoundException('Order not found');
    order.paymentStatus = PaymentStatusType.CANCELED;
    this.repository.save(order);
  }

  async findOrderById(id: number): Promise<OrderEntity> {
    return this.repository.findById(id);
  }

  async findAllOrders(): Promise<OrderEntity[]> {
    return this.repository.findAll();
  }
}
