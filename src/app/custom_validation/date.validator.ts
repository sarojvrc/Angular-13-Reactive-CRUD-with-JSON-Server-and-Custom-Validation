import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateCanNotBeSame(startDate: string, endDate: string): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
    const firstDateValue = formGroup.get(startDate)?.value;
    const secondDateValue = formGroup.get(endDate)?.value;
    const todayDate = new Date();

    const month = todayDate.getMonth() + 1;
    const date = todayDate.getDate();
    const year = todayDate.getFullYear();

    const makeToday = month + "/" + date + "/" + year;
    const today = new Date(makeToday);

    const firstDate: any = new Date(firstDateValue);
    const secondDate: any = new Date(secondDateValue);

    if(firstDate.getTime() < today.getTime()){
      const err = { 'startDateCanNotBeLessThanToday': true };
      formGroup.get(startDate)?.setErrors(err);
      return err;
    }

    if (firstDate.getTime() === secondDate.getTime()) {
      const err = { 'dateCanNotBeSame': true };
      formGroup.get(endDate)?.setErrors(err);
      return err;
    }

    if(firstDate.getTime() > secondDate.getTime()){
      const err = { 'endDateCanNotBeLess': true };
      formGroup.get(endDate)?.setErrors(err);
      return err;
    }else{
      return null;
    }

  };
}
