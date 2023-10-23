import { Component, OnInit } from '@angular/core';
import { StudentInterface } from 'src/app/interface/student.interface';

import { StudentService } from 'src/app/service/student-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public studentList: StudentInterface[] = []
  public wantEdit: boolean = false;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.studentList.subscribe((students: StudentInterface[]) => {
      this.studentList = students;
    });
  }

  //hacer que apareza o desaparezca el input para editar los campos
  editStudent():void{
    this.wantEdit = true;
  }

  //guardar la edición de los estudiantes
  updateStudent():void{
    this.wantEdit = false;
  }


}
