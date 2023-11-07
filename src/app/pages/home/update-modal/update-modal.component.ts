import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentInterface } from 'src/app/interface/student.interface';
import { StudentService } from 'src/app/service/student-service.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent implements OnInit {

  public studentSelected: StudentInterface[] = []; //para luego mostrarlos en cada input
  public studentIdSelected: string = ''; //todo

  @Input() modalOpen: boolean = false; // Propiedad de entrada para el estado del modal
  // ...

  public myFormRegister: FormGroup = this.fb.group({
    studentId: [''],
    studentName: ['', [Validators.required]],
    studentLastName: ['', [Validators.required]],
    studentClass: ['', [Validators.required]],
    studentEmail: ['', [Validators.required]],
    studentDni: ['', [Validators.required]],
    studentBirthdate: ['', [Validators.required]],
  });



  constructor(private fb: FormBuilder, private studentService: StudentService) { }

  ngOnInit(): void {
    // No realiza la suscripción al BehaviorSubject aquí
    if (this.modalOpen) {
      this.studentService.studentSelected.subscribe((students: StudentInterface[]) => {
        this.studentSelected = students;
      });
      console.log(this.studentIdSelected);
    }
  }

  //para que se muestre que todos los formularios han sido tocados.
  public onSubmit():void {
    this.myFormRegister.markAllAsTouched();
  };

  public updateStudent(): void {
    if (this.myFormRegister.valid) {

      this.studentService.updateStudent(this.myFormRegister.value).subscribe(data=> {
        alert (data);
      });
    };


  };
}
