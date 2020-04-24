import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { OrderService } from "./orders.service";
import { Order } from "./order.entity";
import { FindOneOrder } from "./order.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller('order')
@UseGuards(new AuthGuard())
export class OrderController {
  constructor(private orderService: OrderService) {
  }

  /**
   * @swagger
   *
   * /order:
   *   get:
   *     tags:
   *       - order
   *     description: Get all orders
   *     security:
   *       - bearer: []
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   */
  @Get()
  index(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  /**
   * @swagger
   *
   * /order:
   *   post:
   *     tags:
   *       - order
   *     description: Add new order
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           $ref: '#/definitions/Order'
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   *     security:
   *       - bearer: []
   */
  @Post('')
  async create(@Body() data: any, @Req() req): Promise<any> {
    return this.orderService.create(data, req.user);
  }

  /**
   * @swagger
   *
   * /order/{id}:
   *   put:
   *     tags:
   *       - order
   *     description: Update order
   *     parameters:
   *       - name: id
   *         in: path
   *         description: id
   *         required: true
   *         type: integer
   *       - name: body
   *         in: body
   *         required: true
   *         schema:
   *          type: object
   *          $ref: '#/definitions/Order'
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   *     security:
   *       - bearer: []
   */
  @Put(':id')
  async update(@Param() params: FindOneOrder, @Body() data: any, @Req() req): Promise<any> {
    data.id = Number(params.id);
    return this.orderService.update(data, req.user);
  }

  /**
   * @swagger
   *
   * /order/{id}:
   *   delete:
   *     tags:
   *       - order
   *     description: Delete order
   *     parameters:
   *       - name: id
   *         in: path
   *         description: id
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: success
   *     security:
   *       - bearer: []
   */
  @Delete(':id')
  async delete(@Param() params: FindOneOrder): Promise<any> {
    return this.orderService.delete(params.id);
  }
}
