import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } 
from 'typeorm';


@Entity()
export class User {
    @PrimaryGeneratedColumn({name: 'userId'})
    userId: number;

    @Column({name: 'fullName', type: 'varchar'})
    fullName: string;

    @Column({name: 'blocked', default: 0})
    blocked: number;

    @CreateDateColumn({name: 'createdAt'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updatedAt'})
    updatedAt: Date;
}