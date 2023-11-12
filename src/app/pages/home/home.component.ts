import { Component, OnInit } from '@angular/core';
import { padStart } from '@fullcalendar/core/internal';
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
  }

  // Cuando el modal de edit se cierra
  closeModal() {
    this.modalOpen = false;
  }

  selectedStudent(studentId: number){
    this.studentService.getStudentById(studentId);
  }

  //eliminar estudiante
  deleteStudent(id_Student: number) {
    this.studentService.deleteStudent(id_Student).subscribe(data => {
      alert(data);
    });
    this.studentService.studentList.subscribe((students: StudentInterface[]) => {
      this.studentList = students;
    });
    window.location.reload();
  }

  //cambiar formato fecha
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
