import { fetchOrders, fetchPayments } from "../controller/GetOrders";
import { fetchUsers } from "../controller/GetUsers";

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
    }
];