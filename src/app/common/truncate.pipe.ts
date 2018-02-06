import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'truncate'})
export class TruncatePipe implements PipeTransform {
  transform(value: string, length: number, suffix:string): string {
    let limit =  length || 10;
    let trail = suffix || '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
