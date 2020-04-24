import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { OrderRepository } from "./orders.repository";
import { Order } from "./order.entity";
import { UserRepository } from "../user/user.repository";
import moment from "moment";
import { validate } from "class-validator";

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private userRepository: UserRepository,
  ) {
  }

  async findAll(sessionUserId): Promise<any> {
    const orders = await this.orderRepository.find({where: {created_by: sessionUserId}});
    const volunteer_orders = await this.orderRepository.find({where: {accepted_by: sessionUserId}});

    return {
      orders,
      volunteer_orders,
    };
  }

  async getById(orderId) {
    return await this.orderRepository.findOne({where: {id: orderId}, relations: ["created_by", "accepted_by"]});
  }

  async accept(orderId: number, sessionUserId: number) {
    const order = await this.orderRepository.findOne(orderId);
    order.accepted_by = await this.userRepository.findOne(sessionUserId);

    return this.orderRepository.save(order);
  }

  async create(requestDto: any, sessionUser) {
    const order = new Order();
    order.title = requestDto.title;
    order.description = requestDto.description;
    order.latitude = requestDto.latitude;
    order.longitude = requestDto.longitude;
    order.address = requestDto.address;
    order.expires_at = requestDto.expires_at;
    order.created_by = await this.userRepository.findOne({where: {id: sessionUser.id}});
    order.created_at = moment(new Date()).format("YYYY-MM-DD HH:mm");
    order.status = 'open';

    const errors = await validate(order);
    if (errors.length > 0) {
      return errors;
    }

    return await this.orderRepository.save(order);
  }

  async update(requestDto: any, sessionUser) {
    const order = await this.orderRepository.findOne(requestDto.id);
    order.title = requestDto.title || order.title;
    order.description = requestDto.description || order.description;
    order.latitude = parseFloat(requestDto.latitude || order.latitude);
    order.longitude = parseFloat(requestDto.longitude || order.longitude);
    order.address = requestDto.address || order.address;
    order.expires_at = moment(requestDto.expires_at || order.expires_at).format("YYYY-MM-DD HH:mm");
    order.created_by = await this.userRepository.findOne({where: {id: sessionUser.id}});
    order.created_at = moment(new Date()).format("YYYY-MM-DD HH:mm");
    order.status = requestDto.status || 'open';

    const errors = await validate(order);
    if (errors.length > 0) {
      return errors;
    }

    return await this.orderRepository.save(order);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.orderRepository.delete(id);
  }
}
