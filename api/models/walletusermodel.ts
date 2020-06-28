import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { userType } from '../services/services';

export interface WalletUserDocument extends mongoose.Document {
    userName: string;
    password: string;
    email: string;
    phoneNumber: number;
    // userRole: string;
    admin:string;
    last_update: string;
    created_date: string;
}
export interface IWalletUser extends WalletUserDocument {
    hashPassword(password: string): string;
    validPassword(password: string): boolean;
}
export interface WalletUserModel extends mongoose.Model<IWalletUser> {
    // validPassword(password: string): boolean;
}

export const walletUserSchema = new Schema({
    userName: {
        type: String, length: 6,
        required: [true, 'Enter username with min 6 digits'], unique: true
    },
    password: {
        type: String,
        required: [true, 'Enter a password with min length 6 digits']
    },
    email: { type: String,unique: true },
    // userRole:{type:UserRole.admin},
    admin:{type: mongoose.Schema.Types.ObjectId,
        ref: 'walletAdmins',required:[true,'enter admin code']},
    phoneNumber: { type: Number, unique: true, required: true, min: 10 },
    last_update: { type: Date, default: Date.now() },
    created_date: { type: Date, default: Date.now() },
})