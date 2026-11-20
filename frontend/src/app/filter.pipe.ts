import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value) return null;
    if(!args) return value;
    args = args.toLowerCase();
    return value.filter(function(item: any){
      const titleMatch = item.title.toLowerCase().includes(args);
      const typeMatch = item.type.toLowerCase().includes(args);
      const salaryMatch = item.salary.toLowerCase().includes(args);
      const unitMatch = item.unit.toLowerCase().includes(args);
      const timeTypeMatch = item.timeType.toLowerCase().includes(args);
      return titleMatch || typeMatch || salaryMatch || unitMatch || timeTypeMatch;
    })
  }

}
