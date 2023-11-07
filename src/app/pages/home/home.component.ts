import { Component, OnInit } from '@angular/core';
import { StudentInterface } from 'src/app/interface/student.interface';

import { StudentService } from 'src/app/service/student-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public studentList: StudentInterface[] = [];

  public modalOpen: boolean = false; // Propiedad para el estado del modal
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.studentList.subscribe((students: StudentInterface[]) => {
      this.studentList = students;
    });
  }

  // cuando el modal de edit se abre
  openModal() {
    this.modalOpen = true;
    console.log(this.modalOpen)
  }

  // Cuando el modal de edit se cierra
  closeModal() {
    this.modalOpen = false;
    console.log(this.modalOpen)
  }

  selectStudent(student: StudentInterface) {
    //enviamos al servicio los datos del estudiante seleccionado
    this.studentService.getStudentById(student.id_Student);
    this.studentService.getSelectedStudent(student);
  }
  //eliminar estudiante
  deleteStudent(id_Student: number) {
    this.studentService.deleteStudent(id_Student).subscribe(data => {
      alert(data);
    });
    this.studentService.studentList.subscribe((students: StudentInterface[]) => {
      this.studentList = students;
    });
  }

}
