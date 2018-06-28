import { fetchOrders, fetchPayments, fetchOrderById } from "../controller/GetOrders";
import { fetchUsers, createUser } from "../controller/GetUsers";

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/orders",
        method: "get",
        action: fetchOrders
    },
    {
        path: "/users",
        method: "get",
        action: fetchUsers
    },
    {
        path: "/payments",
        method: "get",
        action: fetchPayments
    },
    {
        path: "/orders/:orderId",
        method: "get",
        action: fetchOrderById
    },
    {
        path: "/users/create",
        method: "get",
        action: createUser
    }
];