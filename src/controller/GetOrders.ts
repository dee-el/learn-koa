import { Context } from "koa";
import { getManager } from "typeorm";
import { Order } from "../model/payment/Order";
import { OrderItem } from "../model/payment/OrderItem";

/**
 * Loads all orders from the database.
 */
export const fetchOrders = async(context: Context) => {
    // get a order repository to perform operations with order
    const orderRepository = getManager('payment').getRepository(Order);

    const query = context.query;
    const limit = query.limit ? +query.limit : 10;
    const page = query.page ? +query.page - 1 : 0

    let fetchOptions = {};
    fetchOptions = {
        ...fetchOptions,
        skip: page * limit,
        take: limit,
        order: {
            orderId: 'DESC'
        }
    };

    const where = whereStack(query);

    if(Object.keys(where).length !== 0) fetchOptions = {...fetchOptions, where};

    // load all orders
    // const orders = await orderRepository.createQueryBuilder('order')
    //     .innerJoinAndMapMany(
    //         'order.orderItems', 
    //         OrderItem, 'orderItem', 
    //         '"orderItem"."orderId" = "order"."orderId"'
    //     )
    //     .where(fetchOptions)
    //     .getMany();

    const orders = await orderRepository.find({
        ...fetchOptions,
        join: {
            alias: "order",
            innerJoinAndSelect: {
                orderItems: "order.orderItems",
            }
        }
    });

    // return loaded orders
    return context.body = orders;
}

const whereStack = (query) : Object => {
    let stack = {};
    if(query.userId) stack = {...stack, userId: query.userId};
    if(query.orderId) stack = {...stack, orderId: query.orderId};
    if(query.status) stack = {...stack, status: query.status};
    if(query.mainType) stack = {...stack, mainType: query.mainType};

    return stack;
}

