import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { RegisterUserDTO } from './user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
  ) {
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(userDTO: RegisterUserDTO): Promise<User> {

    const user = new User();
    user.name = userDTO.name;
    user.email = userDTO.email;
    user.password = userDTO.password;

    return await this.userRepository.save(user);
  }

  async update(User: RegisterUserDTO): Promise<User> {
    const user = await this.userRepository.findOne(User.id);
    if (!user) {
      return user;
    }

    user.name = User.name;
    user.email = User.email;
    user.password = User.password;

    return await this.userRepository.save(user);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
