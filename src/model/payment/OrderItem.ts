import 
{ Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, 
    UpdateDateColumn, ManyToOne } 
from 'typeorm';

import { Order } from './Order';

@Entity({name: "orderItem"})
export class OrderItem {

    @PrimaryGeneratedColumn({name: 'orderId'})
    orderItemId: number;

    @Column({name: 'sellPrice', type: 'decimal', precision: 5, scale: 2, default: 0})
    sellPrice: number;

    @Column({name: 'netPrice', type: 'decimal', precision: 10, scale: 2, default: 0})
    netPrice: number;

    @CreateDateColumn({name: 'createdAt'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updatedAt'})
    updatedAt: Date;

    @ManyToOne(type => Order, order => order.orderItems)
    order: Order;
}
