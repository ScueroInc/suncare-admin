import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg1: any): any {
    const resultSearch = [];
    for (const dermatologo of value) {
      if(dermatologo.nombre.toLowerCase().indexOf(arg1.toLowerCase()) > -1 || 
        dermatologo.apellido.toLowerCase().indexOf(arg1.toLowerCase()) > -1 ||
        dermatologo.codigo.toLowerCase().indexOf(arg1.toLowerCase()) > -1
      ){
        resultSearch.push(dermatologo);
      };
    };
    return resultSearch;
  }

}
