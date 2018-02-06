import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'positiveInteger'})
export class PositiveIntegerPipe implements PipeTransform {
  transform(value: string, min:number=0, max:number=null): string {
    console.log("positiveInteger: " + value);
    let s:string = value || '';
    s = s.replace(/[^\d]+/g, '');
    console.log('s: ' + s)
    let n:number = parseInt(s);
    console.log('n: ' + n)
    if(isNaN(n) || n < min){
      return min.toString();
    }
    else if(max && n > max){
      return max.toString();
    }
    return n.toString();
  }
}
