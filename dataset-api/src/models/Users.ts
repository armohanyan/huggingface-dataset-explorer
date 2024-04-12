import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import {IDocUser} from "../interfaces/user";

const userSchema: Schema<IDocUser> = new Schema<IDocUser>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    }
});

// Hash the password before saving it to the database
userSchema.pre<IDocUser>('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error as any);
    }
});

// Compare the given password with the hashed password in the database
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model<IDocUser>('User', userSchema)
