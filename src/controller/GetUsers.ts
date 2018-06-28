import { Context } from "koa";
import { getManager } from "typeorm";
import { User } from "../model/user/User";

const repositoryManager = (model: any) => {
    return getManager('user').getRepository(model);
}

/**
 * Loads all users from the database.
 */
export const fetchUsers = async(context: Context) => {
    // get a user repository to perform operations with user
    const userRepository = repositoryManager(User);

    // load all users
    const users = await userRepository.find({
        skip: 0,
        take: 10
    });

    // return loaded users
    return context.body = users;
}

export const createUser = async (context: Context) => {
    const user = new User();
    user.fullName = "Test using typeorm";

    const userRepository = repositoryManager(User);
    await userRepository.save(user);
    
    return context.body = user;
}