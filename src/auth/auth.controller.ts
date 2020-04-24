import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './auth.dto';
import { RegisterUserDTO } from '../user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  /**
   * @swagger
   *
   * /auth/login:
   *   post:
   *     tags:
   *       - auth
   *     description: Login user
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           required:
   *             - email
   *             - password
   *           properties:
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
  @Post('login')
  async login(@Body() user: LoginUserDTO): Promise<any> {
    return this.authService.login(user);
  }

  /**
   * @swagger
   *
   * /auth/register:
   *   post:
   *     tags:
   *       - auth
   *     description: Register user
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           required:
   *             - email
   *             - password
   *             - name
   *           properties:
   *             email:
   *               type: string
   *             password:
   *               type: string
   *             name:
   *               type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   */
  @Post('register')
  async register(@Body() user: RegisterUserDTO): Promise<any> {
    return this.authService.register(user);
  }
}
