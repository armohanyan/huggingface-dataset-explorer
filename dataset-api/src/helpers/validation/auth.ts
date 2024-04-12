import {IUser} from "../../interfaces/user";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const validateRegisterBody = (data: IUser) => {
    const {username, password, email, dateOfBirth, country} = data

    if (!username || !password || !email) return 'username, password, email is are required'

    if (!emailRegex.test(email)) return 'Invalid email field'

    if (!passwordRegex.test(password)) return 'Invalid password field'

    return false
}