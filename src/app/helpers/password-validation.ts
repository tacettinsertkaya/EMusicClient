import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';


export class PasswordValidation {

  public static matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl:any) => ValidationErrors | null {
    return (control: any): ValidationErrors | null => {

      let result = !!control.parent && !!control.parent.value && control.value == control.parent.controls[matchTo].value
        ?null: { isMatching: false };
        return result;
    };
  }
}