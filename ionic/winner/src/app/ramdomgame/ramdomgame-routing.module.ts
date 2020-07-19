import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RamdomgamePage } from './ramdomgame.page';

const routes: Routes = [
  {
    path: '',
    component: RamdomgamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RamdomgamePageRoutingModule {}
