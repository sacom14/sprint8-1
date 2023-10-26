import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/service/student-service.service';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.scss']
})
export class ModalRegisterComponent {
  public myFormRegister: FormGroup = this.fb.group({
    studentId:[''],
    studentName: ['', [Validators.required]],
    studentLastName: ['', [Validators.required]],
    studentClass: ['', [Validators.required]],
    studentEmail: ['', [Validators.required]],
    studentDni: ['', [Validators.required]],
    studentBirthdate: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private studentService: StudentService) { }

  //para que se muestre que todos los formularios han sido tocados.
  public onSubmit():void {
    this.myFormRegister.markAllAsTouched();
  };

  public newStudentRegister(): void {
    if (this.myFormRegister.valid) {

      this.studentService.addStudent(this.myFormRegister.value).subscribe(data=> {
        alert (data);
      });
    };

  };
}
