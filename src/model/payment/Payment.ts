import 
{ Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, 
    UpdateDateColumn, OneToOne, JoinColumn } 
from 'typeorm';

import {Order} from './Order';


enum PaymentStatusEnum { 'wait', 'confirm', 'pending', 'paid', 'process', 'failed', 'refund' };

type PaymentStatus = 'wait' | 'confirm' | 'pending' | 'paid' | 'process' | 'failed' | 'refund';

@Entity({name: 'payment'})
export class Payment{
    @PrimaryGeneratedColumn({name: 'paymentId'})
    paymentId: number;

    @Column()
    paymentMethod: string;

    @Column({type: 'json'})
    paymentMethodDetail: Object;

    @Column({name: 'paymentStatus', type: 'enum', enum: PaymentStatusEnum, default: 'pending'})
    paymentStatus: PaymentStatus

    @CreateDateColumn({name: 'createdAt'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updatedAt'})
    updatedAt: Date;

    @OneToOne(type => Order, order => order.payment)
    @JoinColumn({ name: "orderId" })
    order: Order;
};