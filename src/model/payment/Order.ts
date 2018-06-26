import 
{ Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, 
    UpdateDateColumn, OneToMany, OneToOne } 
from 'typeorm';

import { OrderItem } from './OrderItem';
import { Payment } from './Payment';

enum OrderStatusEnum { 'created', 'canceled', 'paid', 'fulfilled', 'refunded' };
type Status = 'created' | 'canceled' | 'paid' | 'fulfilled' | 'refunded';

enum MainTypeEnum { 'transfer','recharge','topup','withdraw','walletTransfer','merchant' };
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

    @Column({name: 'status', type: 'enum', enum: OrderStatusEnum, default: 'created'})
    status: Status;

    @Column({name: 'mainType', type: 'enum', enum: MainTypeEnum})
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
