import { Context } from "koa";
import { getManager } from "typeorm";
import { User } from "../model/user/User";

/**
 * Loads all users from the database.
 */
export const fetchUsers = async(context: Context) => {
    // get a user repository to perform operations with user
    const userRepository = getManager('user').getRepository(User);

    // load all users
    const users = await userRepository.find({
        skip: 0,
        take: 10
    });

    // return loaded users
    return context.body = users;
}