import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import * as crypto from "crypto";
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService) { }

    async validateUser(email: string, pass: string) {
        // find if user exist with this email
        const user = await this.userService.getByEmail(email);
         console.log(user)
        if (!user) {
            return null;
        }

        // find if user password match
        const match = await this.comparePassword(pass, user.password);
        if (!match) {
            return null;
        }
        
        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = user['dataValues'];
        return result;
    }


    public async login(user) {
        const token = await this.generateToken(user);
        const userData = await this.userService.getByEmail(user.email)

        if (!userData) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
        }
        
        // compare passwords    
        const areEqual = await this.comparePassword(user.password, userData.password);
    
        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
          }
      
        console.log(areEqual)
        
        return { user: userData, token };
    }

    public async create(userData: any){

        try {
           
            userData.password = await this.hashPassword(userData.password)
          
            const user =  await this.userService.createUser(userData);
            console.log(user)
            if(user){
                const token = await this.generateToken(user);
                const refreshToken = await this.generateRefreshToken();
                const newUser =  await this.userService.updateUserToken(token, refreshToken, user);
                
                return { user: newUser, token, refreshToken };
            }else{
                throw new HttpException({message: 'An error occurred'}, HttpStatus.INTERNAL_SERVER_ERROR); 
            }
             
           } catch (error) {
               console.log(error)
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
           }
      
    }

    private async generateToken(user: any) {
        const body = {
            id: user.id, username: user.username
        }
        const token = await this.jwtService.signAsync(body);
        return token;
    }

    private async hashPassword(password: string) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    private async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }

    private async  generateEmailVerificationCode() {
        const str = crypto.randomBytes(20).toString("hex");
        return str;
    }

    private async generateUniqueIdentifier(length) {
        let text = "";
        let possible = "1234567890";
        for (let i = 0; i < length; i++) {
          let sup = Math.floor(Math.random() * possible.length);
          text += i > 0 && sup == i ? "0" : possible.charAt(sup);
        }
        return Number(text);
      }

      private async generateRefreshToken() {
        const refreshToken = uuidv4();
          return refreshToken;
      }

      private  generatePasswordResetCode = () => {
        return crypto.randomBytes(3).toString("hex");
      }

}