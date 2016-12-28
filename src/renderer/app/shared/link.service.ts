const {shell} = require('electron');

export class LinkService {

  open(url:string){
    shell.openExternal(url);
  }

}
