import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
import { Op } from 'sequelize';

import { UserModel } from '../entities/index';
  
  @ValidatorConstraint({ async: true })
  @Injectable()
  export class IsUserEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
    constructor(
        @InjectModel(UserModel)
        private userModel: typeof UserModel,
      ) {}
    
    validate(email: any, args: ValidationArguments) {
        try {
          // console.log(this);
          // const user =  this.userModel.findOne<any>({ where: { email } });

          // return this.userModel.findOne({where:{email}}).then(user => {
          //   if (user) {
          //       throw new HttpException({message: 'An account with this email already exists.'}, HttpStatus.BAD_REQUEST);    
          //   };
          //   return true;
          // });
          return true;

        } catch (error) {
          console.log(error)
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
       
    }
  }
  
  export function IsUserEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsUserEmailAlreadyExistConstraint,
      });
    };
  }
