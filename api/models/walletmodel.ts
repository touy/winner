import * as mongoose from 'mongoose';
import {Schema} from 'mongoose';
// Document of mongoose
export interface WalletDocument extends mongoose.Document{
    userNameOwner:string;
    totalBalance:number;
    totalReceived:number;
    totalSpent:number;
}
// Interface of document 
export interface IWallet extends WalletDocument {

}
// Model of Interface
export interface WalletModel extends mongoose.Model<IWallet> {

}

// Create a schema of Model
export const WalletSchema = new Schema({
    userNameOwner:{type: mongoose.Schema.Types.ObjectId,
        ref: 'walletUsers'},
    totalBalance:{type:mongoose.Schema.Types.Number},
    totalReceived:{type:mongoose.Schema.Types.Number},
    totalSpent:{type:mongoose.Schema.Types.Number},
});
