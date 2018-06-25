import 
{ Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, 
    UpdateDateColumn, OneToOne, JoinColumn } 
from 'typeorm';

import {Order} from './Order';

@Entity({name: 'payment'})
export class Payment{
    @PrimaryGeneratedColumn({name: 'paymentId'})
    paymentId: number;

    @Column()
    paymentMethod: string;

    @Column({type: 'json'})
    paymentMethodDetail: Object;

    @CreateDateColumn({name: 'createdAt'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updatedAt'})
    updatedAt: Date;

    @OneToOne(type => Order, order => order.payment)
    @JoinColumn({ name: "orderId" })
    order: Order;
};