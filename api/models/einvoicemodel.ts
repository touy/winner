import * as mongoose from 'mongoose';
import {Schema} from 'mongoose';
export interface ExpenditureInvoiceDocument extends mongoose.Document{
    walletOwner:string;
    invoiceId:string;
    invoiceName:string;
    invoiceTime:string;
    invoiceValue:string;
    invoiceReceiver:string;    
    description:string;
}
export interface IExpenditureInvoice  extends ExpenditureInvoiceDocument{
    
    
}
export interface ExpenditureInvoiceModel extends mongoose.Model<IExpenditureInvoice>{

}
export const ExpenditureInvoiceSchema = new Schema({
    walletOwner:{type: mongoose.Schema.Types.ObjectId,
        ref: 'wallet'},
    invoiceId:{type:String},
    invoiceName:{type:String},
    invoiceTime:{type:Date},
    invoiceValue:{type:Number},
    invoiceReceiver:{type:String},   
    description:{type:String},
})
