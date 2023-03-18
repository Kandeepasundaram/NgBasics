import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform {

  transform(errors: any, ...args: any[]): any {
    if (errors) {
      if (errors.required) {
        return args[0] || 'This field is required';
      }
      if (errors.minAge) {
        return args[1] || 'You must be at least 18 years old';
      }
      if (errors.maxAge) {
        return args[2] || 'You cannot be more than 120 years old';
      }
      if (errors.futureDate) {
        return args[3] || 'Date of birth cannot be in the future';
      }
      if (errors.invalid) {
        return 'Invalid date of birth';
      }
    }
    return '';
  }

}
