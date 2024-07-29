import { ApproveOrderCommand } from '@Application/commands/order/approve-order.command';
import { CancelOrderCommand } from '@Application/commands/order/cancel-order.command';
import { CreateOrderCommand } from '@Application/commands/order/create-order.command';
import { FindOrderByIdCommand } from '@Application/commands/order/find-order-by-id.command';
import { ProductOrderEntity } from '@Domain/entities/product_order.entity';
import {
  IOrderRepository,
  IOrderRepositorySymbol,
} from '@Domain/repositories/order.repository';
import {
  IProductOrderRepository,
  IProductOrderRepositorySymbol,
} from '@Domain/repositories/product-order.repository';
import { Inject, Injectable } from '@nestjs/common';
import { OrderResponseDto } from '@Shared/dto/response/order.respose.dto';

@Injectable()
export class OrderServiceImpl {
  constructor(
    @Inject(IOrderRepositorySymbol)
    private readonly orderRepository: IOrderRepository,
    @Inject(IProductOrderRepositorySymbol)
    private readonly productOrderRepository: IProductOrderRepository,
  ) {}

  async createOrder(command: CreateOrderCommand): Promise<OrderResponseDto> {
    const savedOrder = await this.orderRepository.createOrder(command);

    const productOrders = command.productOrders.map((productOrder) => {
      const productOrderEntity = new ProductOrderEntity();
      // @TODO: Substitua por ProductEntity corretamente
      productOrderEntity.product = { id: productOrder.productId } as any;
      productOrderEntity.quantity = productOrder.quantity;
      productOrderEntity.order = savedOrder;
      return productOrderEntity;
    });

    await this.productOrderRepository.createProductOrders(productOrders);

    const response = new OrderResponseDto();
    response.id = savedOrder.id;
    response.totalPrice = savedOrder.totalPrice;
    response.userId = savedOrder.user.id;
    response.paymentStatus = savedOrder.paymentStatus;
    response.orderStatus = savedOrder.orderStatus;
    response.productOrders = productOrders.map((po) => ({
      productId: po.product.id,
      quantity: po.quantity,
    }));
    response.createdAt = savedOrder.createdAt;
    response.updatedAt = savedOrder.updatedAt;

    return response;
  }

  async approveOrder(command: ApproveOrderCommand): Promise<void> {
    await this.orderRepository.approveOrder(command);
  }

  async cancelOrder(command: CancelOrderCommand): Promise<void> {
    await this.orderRepository.cancelOrder(command);
  }

  async findAllOrders(): Promise<OrderResponseDto[]> {
    const orders = await this.orderRepository.findAllOrders();
    return orders.map((order) => {
      const response = new OrderResponseDto();
      response.id = order.id;
      response.totalPrice = order.totalPrice;
      response.userId = order.user.id;
      response.paymentStatus = order.paymentStatus;
      response.orderStatus = order.orderStatus;
      response.productOrders = order.productOrders.map((po) => ({
        productId: po.product.id,
        quantity: po.quantity,
      }));
      response.createdAt = order.createdAt;
      response.updatedAt = order.updatedAt;
      return response;
    });
  }

  async findOrderById(
    command: FindOrderByIdCommand,
  ): Promise<OrderResponseDto | null> {
    const order = await this.orderRepository.findOrderById(command);
    if (!order) {
      return null;
    }
    const response = new OrderResponseDto();
    response.id = order.id;
    response.totalPrice = order.totalPrice;
    response.userId = order.user.id;
    response.paymentStatus = order.paymentStatus;
    response.orderStatus = order.orderStatus;
    response.productOrders = order.productOrders.map((po) => ({
      productId: po.product.id,
      quantity: po.quantity,
    }));
    response.createdAt = order.createdAt;
    response.updatedAt = order.updatedAt;
    return response;
  }
}
