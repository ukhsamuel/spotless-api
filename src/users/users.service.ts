import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserModel } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(UserModel) private readonly userRepository: typeof UserModel,
    ) {}
   
    async createUser(userData: any): Promise<any> {
        try {
         const user = await this.userRepository.create<any>(userData);
         console.log(99999)
         if(user){
          return user
         }
         return 
        } catch (error) {
         throw new HttpException({message: error},  HttpStatus.INTERNAL_SERVER_ERROR)
        }
     }


    async updateUserToken(auth_key: any, refresh_token: any, user: any){
        await this.userRepository.update({ auth_key, refresh_token}, {where: { email: user.email }});
        return this.findOneById(user.id);
    }
    
  async getByEmail(email: string) {
    const user = await this.userRepository.findOne<any>({ where: { email } });

    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }
    
  async findOneById(id: number): Promise<any> {
    return await this.userRepository.findOne<any>({ 
        where: { id },
        attributes: {
            exclude: [
                "password", "email_verification_code", "auth_key", "deleted_at",
            ],
        }
    });
}

}
