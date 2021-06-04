import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DomComponent } from './dom/dom.component';
import { FroalaComponent } from './froala/froala.component';

const routes: Routes = [
  { path: 'froala', component: FroalaComponent },
  { path: 'dom', component: DomComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }