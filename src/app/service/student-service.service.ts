import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getStudents(): void {
    this.http.get<StudentInterface[]>(this._studentUrl).subscribe((resp: StudentInterface[]) => {
      this._studentList.next(resp);
    });
  }

}
