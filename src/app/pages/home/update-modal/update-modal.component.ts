import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentInterface } from 'src/app/interface/student.interface';
import { StudentService } from 'src/app/service/student-service.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent{

  public studentSelected: StudentInterface[] = []; //para luego mostrarlos en cada input
  public studentIdSelected!: string; //todo

  @Input() modalOpen: boolean = false; // Propiedad de entrada para el estado del modal
  // ...

  public myFormRegister: FormGroup = this.fb.group({
    id_Student: [`${this.studentIdSelected}`],
    name_Student: ['', [Validators.required]],
    last_Name_Student: ['', [Validators.required]],
    class_Student: ['', [Validators.required]],
    email_Student: ['', [Validators.required]],
    dni_Student: ['', [Validators.required]],
    birthdate_Student: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private studentService: StudentService) {
    this.studentService.studentIdSelected.subscribe((studentId) =>{
      this.studentIdSelected = studentId.toString();
      this.myFormRegister.patchValue({
        id_Student: this.studentIdSelected //para que se actualice el id del myfrom
      });

      this.addInputInitialValue();
    });
  }

  //para que se muestre que todos los formularios han sido tocados.
  public onSubmit():void {
    this.myFormRegister.markAllAsTouched();
  };

  public addInputInitialValue(){
    this.studentService.studentSelected.subscribe((students) => {
      if (students.length > 0) {
        this.myFormRegister.setValue({
          id_Student: students[0].id_Student,
          name_Student: students[0].name_Student,
          last_Name_Student: students[0].last_Name_Student,
          class_Student: students[0].class_Student,
          email_Student: students[0].email_Student,
          dni_Student: students[0].dni_Student,
          birthdate_Student: this.formatBirthdate(students[0].birthdate_Student),
        });
      }
    });
  }

  public updateStudent(): void {
    if (this.myFormRegister.valid) {
      console.log(this.myFormRegister.value);
      this.studentService.updateStudent(this.myFormRegister.value);
      window.location.reload();
    };
  };

  formatBirthdate(dateString: Date): string {
    const date = new Date(dateString); // Convierte la cadena a un objeto Date
    if (isNaN(date.getTime())) {
      return 'Fecha no válida'; // Manejar el caso en que la fecha no sea válida
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ajustar el mes para que tenga siempre dos dígitos
    const day = date.getDate().toString().padStart(2, '0'); // Ajustar el día para que tenga siempre dos dígitos

    return `${year}-${month}-${day}`;
  }
}

