import { Table, Column, Model, DataType, HasOne, HasMany } from 'sequelize-typescript';
// import { ProfileModel } from '../../profile/profile.entity';

@Table({
    modelName: 'users'
})
export class UserModel extends Model {

    @Column({
        type: DataType.STRING(70),
        allowNull: false,
        unique: {
            name: "email",
            msg: "An account already exists with this email address.",
        },
        validate: {
            isEmail: { msg: "Please check this is a valid email" },
            notEmpty: { msg: "email can't be empty" },
        },
    })
    email: string;


    @Column({
        type: DataType.STRING(200)
    })
    password:string

    @Column({
        type: DataType.STRING(30),
        validate: {
            min: 2,
        },
    })
    first_name: string

    @Column({
        type: DataType.STRING(30),
        validate: {
            min: 2,
        },
    })
    last_name: string

    @Column({
        type: DataType.STRING(30)
    })
    phone: string

    @Column({
        type: DataType.STRING(150),
        unique: {
            name: "refresh_token",
            msg: "Duplicate refresh token",
        },
        allowNull: true,
    })
    refresh_token: string


    
}
