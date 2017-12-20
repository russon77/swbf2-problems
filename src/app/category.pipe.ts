import { Pipe, PipeTransform } from '@angular/core';
import { IProblem } from './api.service';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: IProblem[], categories: string[], args?: any): IProblem[] {
    if (0 === categories.length) {
      return value;
    }

    return value.filter(problem => categories.includes(problem.issueType));
  }
}
