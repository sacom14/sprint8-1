import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {


  //name and lastname
  public nameAndLastNamePattern: string = "^(?:[a-zA-Z]+\\s?){1,3}$";

  //class name
  public classNamePattern: string = "^(?:[a-zA-Z0-5]+\\s?){1,3}$";

  //email
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$";

  //DNI
  public dniPattern: string = "^\\d{8}[a-zA-Z]$";


  //birthdate
  public birthdatePattern: string = "^(?!0000)[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$";

  //validation control
  public isValidField(form: FormGroup, field: string){
    return form.controls[field].errors && form.controls[field].touched;
  };

}
