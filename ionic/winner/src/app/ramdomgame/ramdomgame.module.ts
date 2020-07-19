import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RamdomgamePageRoutingModule } from './ramdomgame-routing.module';

import { RamdomgamePage } from './ramdomgame.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RamdomgamePageRoutingModule
  ],
  declarations: [RamdomgamePage]
})
export class RamdomgamePageModule {}
