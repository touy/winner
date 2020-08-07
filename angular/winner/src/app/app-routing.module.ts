import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddPlayerComponent} from './add-player/add-player.component';
import { DrawComponent } from './draw/draw.component';

const routes: Routes = [
  {path:'addPlayer',component:AddPlayerComponent},
  {path:'draw',component:DrawComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
