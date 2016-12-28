import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

//components
import { AppComponent } from './app.component';
import { HeroesModule }     from './heroes/heroes.module';
import { AppRoutingModule } from './app.routing.module';

import { NotFoundComponent } from './not-found/not-found.component';
import { MarketComponent } from './market/market.component';
import { CollectionComponent } from './collection/collection.component';
import { HeaderComponent } from './header/header.component';

//services
import { Database } from './shared/database.service';
import { LinkService } from './shared/link.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HeroesModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    MarketComponent,
    CollectionComponent,
    HeaderComponent,
    NotFoundComponent
    ],
  providers:[ Database, LinkService ],
  bootstrap: [ AppComponent ],
})

export class App { }
