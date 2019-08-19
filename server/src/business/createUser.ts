import { User } from '../entities/User';
import { getRepository } from "typeorm";
import { hashPassword } from '../auth';

/**
 * Creates a user with the given name, email and password in the database
 */
export async function createUser(username: string, first_name: string, last_name: string, email: string, password: string): Promise<User> {
    let user = new User();
    user.email = email;
    user.username = username;
    user.first_name = first_name;
    user.last_name = last_name;
    user.password = hashPassword(password);
    user.admin = false;
    user = await getRepository(User).save(user);

    return user;
}