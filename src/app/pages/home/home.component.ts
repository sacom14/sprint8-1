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

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.studentList.subscribe((students: StudentInterface[]) => {
      this.studentList = students;
    });
  }

  selectStudent(student: StudentInterface){
    //enviamos al servicio los datos del estudiante seleccionado
    this.studentService.getStudentById(student.id_Student);
    this.studentService.getSelectedStudent(student);
    console.log(student);
  }
  //eliminar estudiante
  deleteStudent(id_Student:number){
    this.studentService.deleteStudent(id_Student).subscribe( data => {
      console.log(data);
    });
    this.studentService.studentList.subscribe((students: StudentInterface[]) => {
      this.studentList = students;
    });
  }

}
