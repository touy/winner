import * as mongoose from 'mongoose';
import { IPlayer, PlayerDocument, PlayerModel, PlayerSchema } from '../models/playerModel';
import { rejects } from 'assert';

export class PlayerController {
    docPlayer = mongoose.model<IPlayer, PlayerModel>('Players', PlayerSchema);
    constructor() {

    }
    create(p: IPlayer): Promise<IPlayer> {
        return new Promise<IPlayer>((resolve, reject) => {
            this.docPlayer.create(p).then(r => {
                resolve(r);
            }).catch(e => {
                reject(e);
            });
        });

    }
    udpate(_id: string) {
        //1
        this.docPlayer.findById(_id).then(r => {
            // 3 later
        }).catch(e => {
            // 3-4 later
        });
        //2
        //// 
    }
    delete(_id: string) {
        //1
        this.docPlayer.findByIdAndDelete(_id).then(r => {
            // 3 later
        }).catch(e => {
            // 3-4 later
        });
        //2
        //// 
    }
    playerInfo(_id: string): Promise<IPlayer> {

        return new Promise<IPlayer>(async (resolve, reject) => {
            try {
                let p = await this.docPlayer.findById(_id);
                resolve(p);
            } catch (error) {
                reject(error);
            }
        });

    }
    playerList(limit:number,offset:number): Promise<IPlayer[]> {

        return new Promise<IPlayer[]>(async (resolve, reject) => {
            try {
                let p = await this.docPlayer.find().limit(limit).skip(offset*limit);
                resolve(p);
            } catch (error) {
                reject(error);
            }
        });

    }

}