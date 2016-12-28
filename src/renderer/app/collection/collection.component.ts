import { Component, OnInit } from '@angular/core';
import { Database } from '../shared/database.service';
import { LinkService } from '../shared/link.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html'
})
export class CollectionComponent implements OnInit {

  constructor(private db : Database, private link: LinkService) { }

  collectedItems:any = [];

  url:string = 'https://github.com';

  //---------------------------------------------------------------

  ngOnInit () {
    this.collectedItems = this.db.getCollection();
  }

  //---------------------------------------------------------------

  onRemove(item:any){
    this.db.removeFromCollection(item);
  }

  openLink(url:string){
    this.link.open(url);
  }

  //---------------------------------------------------------------

  get diagnostic() {
    return JSON.stringify(this.collectedItems);
  }

}
