import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { FindOneUser, RegisterUserDTO, UpdateUserDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  /**
   * @swagger
   *
   * /user:
   *   get:
   *     tags:
   *       - user
   *     description: Get all users
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   *     security:
   *       - Bearer: []
   */
  @Get()
  index(): Promise<User[]> {
    return this.userService.findAll();
  }

  /**
   * @swagger
   *
   * /user:
   *   post:
   *     tags:
   *       - user
   *     description: Add new user
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           required:
   *             - name
   *             - email
   *             - password
   *           properties:
   *             name:
   *               type: string
   *             email:
   *               type: string
   *             password:
   *               type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   */
  @Post('')
  async create(@Body() userData: RegisterUserDTO): Promise<any> {
    return this.userService.create(userData);
  }

  /**
   * @swagger
   *
   * /user/{id}:
   *   put:
   *     tags:
   *       - user
   *     description: Update user
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
   *           type: object
   *           required:
   *             - name
   *             - email
   *             - password
   *           properties:
   *             name:
   *               type: string
   *             email:
   *               type: string
   *             password:
   *               type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   */
  @Put(':id')
  async update(@Param() params: FindOneUser, @Body() userData: UpdateUserDTO): Promise<any> {
    userData.id = Number(params.id);
    return this.userService.update(userData);
  }

  /**
   * @swagger
   *
   * /user/{id}:
   *   delete:
   *     tags:
   *       - user
   *     description: Delete user
   *     parameters:
   *       - name: id
   *         in: path
   *         description: id
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: success
   */
  @Delete(':id')
  async delete(@Param() params: FindOneUser): Promise<any> {
    return this.userService.delete(params.id);
  }
}
