import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionComponent } from "./collection/collection.component";
import { MarketComponent } from "./market/market.component";
import { NotFoundComponent } from './not-found/not-found.component';
import { HeroListComponent }    from './heroes/hero-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/collection', pathMatch: 'full' },
  { path: 'collection', component: CollectionComponent },
  { path: 'market', component: MarketComponent },
  //
  { path: 'heroes', component: HeroListComponent },
  {path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
