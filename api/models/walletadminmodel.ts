import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { userType } from '../services/services';

export interface WalletAdminDocument extends mongoose.Document {
    userName: string;
    password: string;
    email: string;
    phoneNumber: number;
    // userRole: string;
    adminCode:string;
    last_update: string;
    created_date: string;
}
export interface IWalletAdmin extends WalletAdminDocument {
    hashPassword(password: string): string;
    validPassword(password: string): boolean;
}
export interface WalletAdminModel extends mongoose.Model<IWalletAdmin> {
    
}

export const WalletAdminSchema = new Schema({
    userName: {
        type: String, length: 6,
        required: [true, 'Enter username with min 6 digits'], unique: true
    },
    password: {
        type: String,
        required: [true, 'Enter a password with min length 6 digits']
    },
    email: { type: String,unique: true },
    adminCode: { type: String,unique: true,required:[true,'enter admin code'] },
    // userRole:{type:UserRole.admin},
    phoneNumber: { type: Number, unique: true, required: true, min: 10 },
    last_update: { type: Date, default: Date.now() },
    created_date: { type: Date, default: Date.now() },
})