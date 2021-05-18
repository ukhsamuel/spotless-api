import { Table, Column, Model, DataType, BelongsTo,HasMany,PrimaryKey } from 'sequelize-typescript';

@Table({
    modelName: 'workers'
})

export class WorkerModel extends Model {


    @Column({
        type: DataType.STRING(150),
        allowNull: true
    })
    name: string;

    @Column({
        type: DataType.STRING(150),
        allowNull: false
    })
    photo: string;


    @Column({
        type: DataType.STRING(20),
        allowNull: false
    })
    contact: string;

    @Column({
        type: DataType.STRING(250),
        allowNull: false
    })
    description: string;
}

 