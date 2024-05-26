import { BadRequestException, Injectable } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  /**
   * adds a User object into the database

   * @param user : User must be a User object, id and _id should not be provided
   */
  async add(user: User) {
    const userDocument = new this.userModel(user);
    userDocument.id = userDocument._id.toString();
    return await userDocument.save();
  }

  async findByEmail(email: string): Promise<User> {
    return User.fromDoc(
      await this.userModel.findOne({ email: email }).lean().exec(),
    );
  }

  async findAll(transform: boolean = true): Promise<User[]> {
    const users = await this.userModel.find().lean().exec();
    if (transform || true) return users.map((doc) => User.fromDoc(doc));
  }

  async findOne(id: string): Promise<User> {
    console.log(id);
    if (!id) {
      throw new BadRequestException("Id should be Provided");
    }
    const userDoc = await this.userModel.findById(id).lean().exec();

    return User.fromDoc(userDoc);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    //verify the user exist
    this.verifyUserExsitance(id);

    const user = this.userModel.findOneAndUpdate({ id: id }, updateUserDto);

    return user;
  }

  remove(id: string) {
    //verify the user exist
    this.verifyUserExsitance(id);
    //delete the user
    const user = this.userModel.findOneAndUpdate({ id: id });
    return user;
  }

  async verifyUserExsitance(id: string): Promise<boolean> {
    const finduser = await this.userModel.findOne({ id: id });
    return Boolean(finduser);
  }
}
