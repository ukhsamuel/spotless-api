import { Table, Column, Model, DataType, BelongsTo,HasMany,PrimaryKey } from 'sequelize-typescript';

@Table({
    modelName: 'tasks'
})


export class TaskModel extends Model {


    @Column({
        type: DataType.STRING(250),
        allowNull: true
    })
    name: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    icon: string;


    @Column({
        type: DataType.STRING(20),
        allowNull: false
    })
    duration: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    type: string;
}

 