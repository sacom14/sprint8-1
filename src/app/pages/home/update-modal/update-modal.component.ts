import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentInterface } from 'src/app/interface/student.interface';
import { StudentService } from 'src/app/service/student-service.service';
import { ValidatorsService } from 'src/app/service/validators.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent{

  public studentSelected: StudentInterface[] = []; //para luego mostrarlos en cada input
  public studentIdSelected!: string; //todo
  public showButton:boolean = false;

  @Input() modalOpen: boolean = false; // Propiedad de entrada para el estado del modal

  public myFormRegister: FormGroup = this.fb.group({
    id_Student: [`${this.studentIdSelected}`],
    name_Student: ['', [Validators.required, Validators.pattern(this.validatorsService.nameAndLastNamePattern)]],
    last_Name_Student: ['', [Validators.required, Validators.pattern(this.validatorsService.nameAndLastNamePattern)]],
    class_Student: ['', [Validators.required, Validators.pattern(this.validatorsService.classNamePattern)]],
    email_Student: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    dni_Student: ['', [Validators.required, Validators.pattern(this.validatorsService.dniPattern)]],
    birthdate_Student: ['', [Validators.required, Validators.pattern(this.validatorsService.birthdatePattern)]],
  });

  constructor(private fb: FormBuilder, private studentService: StudentService, private validatorsService:ValidatorsService) {
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
      this.studentService.updateStudent(this.myFormRegister.value);
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

