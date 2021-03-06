import { Component, OnInit } from '@angular/core';
import { Database } from '../shared/database.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html'
})
export class MarketComponent implements OnInit {

  angularclassLogo = 'assets/img/angularclass-avatar.png';
  url = 'https://twitter.com/AngularClass';


  constructor(private db : Database) { }

  items: any = [];
  nuevo: any = {_id:'',name:'',price:''};

  toUpdate:any;
  editing:any = null;

  price_list: any = [];
  price_filter: any = '';

  //---------------------------------------------------------------

  ngOnInit() {
    this.findItems();
  }

  //---------------------------------------------------------------

  onAddToCollection(item:any) {
    this.db.addToCollection(item);
  }

  findItems () {
    this.db.findAll().then(
        (items) => {
            this.items = items;
        },
        (err) => {
            console.log(err);
        }
    )
  }

  save(nameP:any, priceP:any){
    this.addItem({name:nameP,price:priceP});

    this.nuevo.name='';
    this.nuevo.price='';
  }

  addItem (item:any) {
    this.db.insert(item).then(
        (newItem) => {
            return this.findItems();
        },
        (err) => {
            console.log(err);
        }
    )
  }

  removeItem (id:any) {
    this.db.remove(id).then(
        (success) => {
            return this.findItems();
        },
        (err) => {
            console.log(err);
        }
    )
  }

  findPrice (filter:any) {
    this.db.findPrice(filter).then(
        (items) => {
            this.price_list = items;
        },
        (err) => {
            console.log(err);
        }
    )
  }

  updateItem (item:any, nuevo:any){
    if(this.toUpdate == null){
      return;
    }
    this.db.update(item,nuevo).then(
      (success) => {
        return this.findItems();
      },
      (err) => {
        console.log(err);
      }
    )
  }

  accessEdit(item:any){
    if(this.editing==item._id){
      this.editing=null;
      return;
    }
    this.editing=item._id;
  }

  endEdit(item:any){
    this.editing = null;
  }

  //---------------------------------------------------------------

  get diagnostic() {
    return JSON.stringify(this.items);
  }

  get priceA() {
    return JSON.stringify(this.price_list);
  }

}
