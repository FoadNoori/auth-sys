import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Users from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly user_repository: Repository<Users>,
    ) {}


  findUserByEmail = async (email:string) => {
    return await this.user_repository.findOne({
      where: { email:email },
    });
  }

  findAll = async () => {

    return await this.user_repository.find();
  };

  createUser = async () =>{
    const user = await this.user_repository.create({
      first_name:'abc',
      last_name:'abc',
      age:23,
      email:'abc@abc.com',
      password:'1234',
    })
    this.user_repository.save(user);
    return user;
  };

  findUserById(id: number) {
    return {
      id,
      name: '',
      username: '',
    };
  }
  findByUsername(username: string) {
    return {
      id: 1,
      name: '',
      username,
    };
  }
}
