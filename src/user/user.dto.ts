import {IsString, IsNotEmpty, IsEmail, IsNumber, IsOptional, Validate} from 'class-validator';
import { UserExistById, UserExistValidator, UserUniqueValidator } from './user.validator';


export class FindOneUser {
  @IsString()
  @Validate(UserExistById)
  id: number;
}

export class RegisterUserDTO {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Validate(UserUniqueValidator)
  @IsEmail({}, { message: 'Incorect E-mail' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDTO {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Incorect E-mail' })
  @Validate(UserExistValidator, { message: 'User with this email already exist.' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

}

export class UserDTO {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Incorrect E-mail' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
