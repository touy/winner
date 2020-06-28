import * as mongoose from 'mongoose';
import {Schema} from 'mongoose';
export interface ReceivedInvoiceDocument extends mongoose.Document {
    walletOwner: string;
    invoiceId: string;
    invoiceName: string;
    invoiceTime: string;
    invoiceValue: string;
    invoiceSender: string;
    description: string;

}
export interface IReceivedInvoice extends ReceivedInvoiceDocument{

}
export interface ReceivedInvoiceModel extends mongoose.Model< IReceivedInvoice> {

}
export const ReceivedInvoiceSchema = new Schema({
    walletOwner: {type: mongoose.Schema.Types.ObjectId,
        ref: 'wallet'},
    invoiceId: {type:String},
    invoiceName: {type:String},
    invoiceTime: {type:Date},
    invoiceValue: {type:Number},
    invoiceSender: {type:String},
    description:{type:String},
});