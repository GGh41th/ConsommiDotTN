import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { get } from 'http';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  
  create(createUserDto: CreateUserDto) {
    //print the user
    const uuid = require('uuid');
    const newUser ={
      id: uuid.v4(),
      ...createUserDto,
    }
    console.log(newUser);
    const user = new this.userModel(newUser);
    return user.save();
  }
  
  CreateFirstUser() {
    //new uuid
    const uuid = require('uuid');
    
    const user = new this.userModel({
      
      id: uuid.v4(),
      name: 'John',
      lastName: 'Doe',
      email: 'John@mail',
      password: '12345678',
      phone: '12345678',
      address: {
        city: 'Tunis',
        street: 'Tunis',
        postalCode: '1000',
      },
      isApproved: true,
      role: 'admin',});
    return user.save();
  }


  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    //verify the user exist
    this.verifyUserExsitance(id);
    //find the user
    const user = this.userModel.findOne({id:id});
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    //verify the user exist
    this.verifyUserExsitance(id);
    
    const user = this.userModel.findOneAndUpdate({id:id},updateUserDto);
    
    return user;
  }

  remove(id: string) {
    //verify the user exist
    this.verifyUserExsitance(id);
    //delete the user
    const user = this.userModel.findOneAndUpdate({id:id});
    return user;
  }
   
  verifyUserExsitance(id: string) {
    //verify the user exist
    const finduser = this.userModel.findOne({id:id});
    if((!finduser)){
      throw new Error('User not found');
    }
   
  }


}
