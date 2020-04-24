import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { LoginUserDTO } from './auth.dto';
import { RegisterUserDTO } from '../user/user.dto';
import { UserRepository } from '../user/user.repository';
import * as crypto from "crypto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {
  }

  private async validate(user_data: LoginUserDTO): Promise<User> {
    return await this.userRepository.findByEmail(user_data.email);
  }

  public async login(user: LoginUserDTO): Promise<any | { status: number }> {
    const userData = await this.userRepository.findByEmail(user.email);
    if (!userData) {
      return false;
    }

    const password = await crypto.createHmac('sha256', user.password).digest('hex');

    if (password !== userData.password) {
      throw new UnauthorizedException('User or passowrd incorrect.');
    }

    const payload = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      ...payload,
      access_token: access_token,
    };
  }

  public async register(user: RegisterUserDTO): Promise<any> {
    return this.userService.create(user);
  }
}
