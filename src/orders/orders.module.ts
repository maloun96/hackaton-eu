import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "../user/user.repository";
import { OrderRepository } from "./orders.repository";
import { OrderService } from "./orders.service";
import { OrderController } from "./orders.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, OrderRepository]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrdersModule {}
