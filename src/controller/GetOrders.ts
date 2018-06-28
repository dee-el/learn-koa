import { Context } from "koa";
import { getManager } from "typeorm";
import { Order } from "../model/payment/Order";
import { Payment } from "../model/payment/Payment";

const repositoryManager = (model: any) => {
    return getManager('payment').getRepository(model);
}

/**
 * Loads all orders from the database.
 */
export const fetchOrders = async(context: Context) => {
    // get a order repository to perform operations with order
    const orderRepository = repositoryManager(Order);

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

    const orders = await orderRepository.find({
        ...fetchOptions,
        join: {
            alias: "order",
            innerJoinAndSelect: {
                orderItems: "order.orderItems",
                payment: "order.payment"
            }
        }
    });

    // return loaded orders
    return context.body = orders;
}

export const fetchPayments = async (context: Context) => {
    const paymentRepository = repositoryManager(Payment);

    const query = context.query;
    const limit = query.limit ? +query.limit : 10;
    const page = query.page ? +query.page - 1 : 0

    let fetchOptions = {};
    fetchOptions = {
        ...fetchOptions,
        skip: page * limit,
        take: limit,
        order: {
            paymentId: 'DESC'
        }
    };

    const payments = await paymentRepository.find({
        ...fetchOptions,
        join: {
            alias: "payment",
            innerJoinAndSelect: {
                order: "payment.order"
            }
        }
    });

    // return loaded payments
    return context.body = payments;
}

export const fetchOrderById = async (context: Context) => {
    const orderRepository = repositoryManager(Order);

    const orderId = context.params.orderId;
    
    let fetchOptions = {
        where: {
            orderId: orderId
        },
        join: {
            alias: "order",
            innerJoinAndSelect: {
                orderItems: "order.orderItems",
                payment: "order.payment"
            }
        }
    };

    const order = await orderRepository.findOne(fetchOptions);

    return context.body = order;
}

const whereStack = (query) : Object => {
    let stack = {};
    if(query.userId) stack = {...stack, userId: query.userId};
    if(query.orderId) stack = {...stack, orderId: query.orderId};
    if(query.status) stack = {...stack, status: query.status};
    if(query.mainType) stack = {...stack, mainType: query.mainType};

    return stack;
}

