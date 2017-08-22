import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(array: any[], field: string): any[] {
    let invert = false;
    if (field.split(' ').length > 1 && field.split(' ')[1] === 'inv') {
      invert = true;
      field = field.split(' ')[0];
    }
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return invert ? array.reverse() : array;
  }
}
