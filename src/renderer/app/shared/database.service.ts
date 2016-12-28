declare var require: any;
let Datastore = require('nedb');

var dataB = "database.db";

export class Database {

    constructor (){
        this.db = new Datastore({
          filename: dataB ,
          autoload: true });
    }

    private collection = [{
      name:'Lápiz',
      price:'5',
      _id:'1lk21l0sa9'
    }];
    public db:any;

    //---------------------------------------------------------------
    //CRUD NeDB
    //---------------------------------------------------------------

    insert(item:any) {
        return new Promise((resolve, reject) => {
            return this.db.insert(item, ((err:any, newItem:any) => {
                if ( err )
                {
                    reject(err);
                }
                else
                {
                    resolve(newItem);
                }
            }))
        });
    }

    findAll() {
        return new Promise((resolve, reject) => {
            return this.db.find({}, ((err:any, items:any) => {
                if ( err )
                {
                    reject(err);
                }
                else
                {
                    resolve(items);
                }
            }));
        })
    }

    remove(id:any) {
        return new Promise((resolve, reject) => {
            return this.db.remove({ _id: id }, {}, ((err:any, numRemoved:any) => {
                if ( err )
                {
                    reject(err);
                }
                else
                {
                    resolve(numRemoved);
                }
            }));
        })
    }

    findPrice(filter:any) {
        return new Promise((resolve, reject) => {
            return this.db.find({price:filter}, ((err:any, items:any) => {
                if ( err )
                {
                    reject(err);
                }
                else
                {
                    resolve(items);
                }
            }));
        })
    }

    //---------------------------------------------------------------
    //Collection
    //---------------------------------------------------------------

    getCollection(){
      return this.collection;
    }

    addToCollection(item:any){
      for(let i = 0;i<this.collection.length;i++){
        if(this.compareObjects(this.collection[i],item)){
          return
        }
      }
      this.collection.push(item);
    }

    removeFromCollection(item:any){
      this.collection.splice(this.collection.indexOf(item),1);
    }

    //See if 2 array of objects contain same data
    //source:
    //http://stackoverflow.com/questions/1068834/object-comparison-in-javascript
    compareObjects(o:any, p:any)
    {
        var i:any,
            keysO = Object.keys(o).sort(),
            keysP = Object.keys(p).sort();
        if (keysO.length !== keysP.length)
            return false;//not the same nr of keys
        if (keysO.join('') !== keysP.join(''))
            return false;//different keys
        for (i=0;i<keysO.length;++i)
        {
            if (o[keysO[i]] instanceof Array)
            {
                if (!(p[keysO[i]] instanceof Array))
                    return false;
                //if (compareObjects(o[keysO[i]], p[keysO[i]] === false) return false
                //would work, too, and perhaps is a better fit, still, this is easy, too
                if (p[keysO[i]].sort().join('') !== o[keysO[i]].sort().join(''))
                    return false;
            }
            else if (o[keysO[i]] instanceof Date)
            {
                if (!(p[keysO[i]] instanceof Date))
                    return false;
                if ((''+o[keysO[i]]) !== (''+p[keysO[i]]))
                    return false;
            }
            else if (o[keysO[i]] instanceof Function)
            {
                if (!(p[keysO[i]] instanceof Function))
                    return false;
                //ignore functions, or check them regardless?
            }
            else if (o[keysO[i]] instanceof Object)
            {
                if (!(p[keysO[i]] instanceof Object))
                    return false;
                if (o[keysO[i]] === o)
                {//self reference?
                    if (p[keysO[i]] !== p)
                        return false;
                }
                else if (this.compareObjects(o[keysO[i]], p[keysO[i]]) === false)
                    return false;//WARNING: does not deal with circular refs other than ^^
            }
            if (o[keysO[i]] !== p[keysO[i]])//change !== to != for loose comparison
                return false;//not the same value
        }
        return true;
    }
}
