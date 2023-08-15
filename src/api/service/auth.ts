import { addUser } from "models/user";
import { UserDocument } from "models/user/user.entity";
import {v4 as uuidv4} from 'uuid';
import { getCurrentJST } from "utils/dayjs";


export const createUser = async (email: string, password: string, name: string, phone: string, address: string) => {
    try {

        const newUser: UserDocument = {
            user_id: uuidv4(),
            email: email,
            password: password,
            name: name,
            phone: phone,
            address: address,
            status: 'active',
            created_at: getCurrentJST(),
            updated_at: getCurrentJST()
        };

        await addUser(newUser);
        return Promise.resolve('success')

    }  catch (err) {
        return Promise.reject(err);
    }
}