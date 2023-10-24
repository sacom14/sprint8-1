import { Injectable, numberAttribute } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { StudentInterface } from 'src/app/interface/student.interface';



@Injectable({
  providedIn: 'root'
})

export class StudentService {
  //BehaviorSubject => emite una señal cada vez que se actualiza la lista de estudiantes.
  private _studentList: BehaviorSubject<StudentInterface[]> = new BehaviorSubject<StudentInterface[]>([]); //va a contener toda la lista de estudiantes
  private _studentUrl: string = "http://localhost:4000/api/student/";

  constructor(private http: HttpClient) {
    this.getStudents();
  }

  get studentList(): Observable<StudentInterface[]> {
    return this._studentList.asObservable(); //para asegurarnos que solo se pueda acceder con un Observable, y no se pueda modificar de otra manera
  }

  //obtener estudiantes
  getStudents(): void {
    this.http.get<StudentInterface[]>(this._studentUrl).subscribe((resp: StudentInterface[]) => {
      this._studentList.next(resp);
    });
  }

  getStudentById(id: number) {
    return this.http.get<StudentInterface[]>(`${this._studentUrl}${id}`);
  }

  //agregar estudiantes
  addStudent(form: StudentInterface) {
    // Define las cabeceras CORS
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Especifica el tipo de contenido
      }),
    };
    return this.http.post<string>(this._studentUrl + 'add', form);
  }

  //actualizar estudiatne
  updateStudent(student: StudentInterface) {
    return this.http.put<StudentInterface>(`${this._studentUrl}update/${student.id_Student}`, student);
  }

  //eliminar estudiante
  deleteStudent(id: number) {
    return this.http.delete<string>(`${this._studentUrl}delete/${id}`);
  }

}
