import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Users from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    ) {}
  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findUserByEmail(registerDto.email);
    if (user) {
      throw new HttpException('User already exists', 400);
    }
    registerDto.password = await bcrypt.hash(registerDto.password, 10);
    return await this.usersService.createUser(registerDto);
  }

  async login(loginDto: LoginDto) {
    const user = this.usersService.findUserByEmail(loginDto.email);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const isPasswordMatch = await bcrypt.compare(loginDto.password, (await user).password);
    console.log(isPasswordMatch);
    if (!isPasswordMatch) {
      throw new HttpException('Wrong username or password', 400);
    }

    const accessToken = this.jwtService.sign({
      sub: (await user).id,
      email: (await user).email,

    });
    return {
      access_token: accessToken,
    }
  }


}