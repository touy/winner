import * as mongoose from 'mongoose';

// document
export interface PlayerDocument extends mongoose.Document {
    username: string;
    password: string;
    phonenumber: string;
}
// // interface
export interface IPlayer extends PlayerDocument {

}
// Model
export interface PlayerModel extends mongoose.Model<IPlayer, PlayerDocument> {

}
// shcema
export const PlayerSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String,unique:true,required:true,min:6,max:30 },
    password: { type: mongoose.Schema.Types.String ,required:true},
    phonenumber: { type: mongoose.Schema.Types.String,unique:true,required:true ,min:10},

});
