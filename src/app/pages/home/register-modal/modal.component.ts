import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/service/student-service.service';
import { ValidatorsService } from 'src/app/service/validators.service';

@Component({
  selector: 'app-home-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  public showButton:boolean = false;
  // public myFormRegister: FormGroup = this.fb.group({
  //   studentId:[''],
  //   studentName: ['', [Validators.required]],
  //   studentLastName: ['', [Validators.required]],
  //   studentClass: ['', [Validators.required]],
  //   studentEmail: ['', [Validators.required]],
  //   studentDni: ['', [Validators.required]],
  //   studentBirthdate: ['', [Validators.required]],
  // });

  // constructor(private fb: FormBuilder, private studentService: StudentService) { }

  // //para que se muestre que todos los formularios han sido tocados.
  // public onSubmit():void {
  //   this.myFormRegister.markAllAsTouched();
  // };

  // public newStudentRegister(): void {
  //   if (this.myFormRegister.valid) {

  //     this.studentService.addStudent(this.myFormRegister.value).subscribe(data=> {
  //       alert (data);
  //     });

  //     window.location.reload();
  //   };
  // };

  public myFormRegister: FormGroup = this.fb.group({
    studentId:[''],
    studentName: ['', [Validators.required, Validators.pattern(this.validatorsService.nameAndLastNamePattern)]],
    studentLastName: ['', [Validators.required, Validators.pattern(this.validatorsService.nameAndLastNamePattern)]],
    studentClass: ['', [Validators.required, Validators.pattern(this.validatorsService.classNamePattern)]],
    studentEmail: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    studentDni: ['', [Validators.required, Validators.pattern(this.validatorsService.dniPattern)]],
    studentBirthdate: ['', [Validators.required, Validators.pattern(this.validatorsService.birthdatePattern)]],
  });

  constructor(private fb: FormBuilder, private studentService: StudentService, private validatorsService:ValidatorsService) { }

  //para que se muestre que todos los formularios han sido tocados.
  public onSubmit():void {
    this.myFormRegister.markAllAsTouched();
  };

  public newStudentRegister(): void {
    if (this.myFormRegister.valid) {
      this.studentService.addStudent(this.myFormRegister.value).subscribe(data=> {
        alert (data);
      });
      window.location.reload();
    };

  };

  public isValidField(field: string) {
    if(this.myFormRegister.valid){
      this.showButton = true;
    } else {
      this.showButton = false;
    }
    return this.validatorsService.isValidField(this.myFormRegister, field);
  };


}
