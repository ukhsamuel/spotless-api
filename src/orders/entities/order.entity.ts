import { Table, Column, Model, DataType, BelongsTo,HasMany,PrimaryKey } from 'sequelize-typescript';

@Table({
    modelName: 'orders'
})
export class OrderModel extends Model {


    @Column({
        type: DataType.INTEGER(),
        allowNull: true
    })
    userId: string;

    @Column({
        type: DataType.STRING(250),
        allowNull: true
    })
    comment: string;

    @Column({
        type: DataType.STRING(250),
        allowNull: false
    })
    address: string;


    @Column({
        type: DataType.STRING(20),
        allowNull: false
    })
    phone: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    email: string;

    @Column({
        type: DataType.STRING(20),
        allowNull: false
    })
    fee: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    workerId: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: true
    })
    selectedTasks: string;

    @Column({
        type: DataType.INTEGER(),
        allowNull: true
    })
    bedrooms: string;

    @Column({
        type: DataType.INTEGER(),
        allowNull: true
    })
    bathrooms: string;
}

 