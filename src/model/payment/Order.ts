import 
{ Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, 
    UpdateDateColumn, OneToMany, OneToOne, JoinColumn } 
from 'typeorm';

import { OrderItem } from './OrderItem';
import { Payment } from './Payment';

const statusArray = ['created', 'canceled', 'paid', 'fulfilled', 'refunded'];
type StatusType = 'created' | 'canceled' | 'paid' | 'fulfilled' | 'refunded';

const mainTypeArray = ['transfer','recharge','topup','withdraw','walletTransfer','merchant'];
type MainType =  'transfer' |'recharge' | 'topup' | 'withdraw' | 'walletTransfer' | 'merchant';

@Entity()
export class Order {

    @PrimaryGeneratedColumn({name: 'orderId'})
    orderId: number;

    @Column({name: 'userId'})
    userId: number;

    @Column({name: 'sellPrice', type: 'decimal', precision: 5, scale: 2, default: 0})
    sellPrice: number;

    @Column({name: 'netPrice', type: 'decimal', precision: 10, scale: 2, default: 0})
    netPrice: number;

    @Column({name: 'status', type: 'enum', enum: statusArray, default: 'created'})
    status: StatusType;

    @Column({name: 'mainType', type: 'enum', enum: mainTypeArray})
    mainType: MainType;

    @CreateDateColumn({name: 'createdAt'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updatedAt'})
    updatedAt: Date;

    @OneToMany(type => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];

    @OneToOne(type => Payment, payment => payment.order)
    payment: Payment;
}
