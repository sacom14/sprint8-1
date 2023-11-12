import { Injectable, numberAttribute } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, finalize } from 'rxjs';

import { MonthApiInterface, StudentInterface } from 'src/app/interface/student.interface';



@Injectable({
  providedIn: 'root'
})

export class StudentService {
  //BehaviorSubject => emite una señal cada vez que se actualiza la lista de estudiantes.
  private _studentList: BehaviorSubject<StudentInterface[]> = new BehaviorSubject<StudentInterface[]>([]); //va a contener toda la lista de estudiantes
  private _studentUrl: string = "http://localhost:4000/api/student/";
  private _monthList: BehaviorSubject<MonthApiInterface[]> = new BehaviorSubject<MonthApiInterface[]>([]);

  // Define las cabeceras CORS
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', // Especifica el tipo de contenido
    }),
  };

  public studentIdSelected: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public studentSelected: BehaviorSubject<StudentInterface[]> = new BehaviorSubject<StudentInterface[]>([]);;


  get studentList(): Observable<StudentInterface[]> {
    return this._studentList.asObservable(); //para asegurarnos que solo se pueda acceder con un Observable, y no se pueda modificar de otra manera
  }

  get monthList(): Observable<MonthApiInterface[]> {
    return this._monthList.asObservable();
  }

  constructor(private http: HttpClient) {
    this.getStudents();
  }

  //obtener estudiantes
  getStudents(): void {
    this.http.get<StudentInterface[]>(this._studentUrl).subscribe((resp: StudentInterface[]) => {
      this._studentList.next(resp);
    });
  }


  getStudentById(id: number) {
    this.studentIdSelected.next(id);
    return this.http.get<StudentInterface[]>(`${this._studentUrl}${id}`).subscribe((data: StudentInterface[]) => {
      this.studentSelected.next(data);
    });
  }

  //obtener estudiante seleccionado
  getSelectedStudent(student: StudentInterface) {
    // Obtiene el valor actual del BehaviorSubject
    const currentStudents = this.studentSelected.value;

    // Modifica el array y agrega el estudiante seleccionado
    currentStudents.push(student);

    // Emite el nuevo valor actualizado
    this.studentSelected.next(currentStudents);
  }

  //agregar estudiantes
  addStudent(student: StudentInterface) {
    this.httpOptions;
    return this.http.post<string>(this._studentUrl + 'add', student);
  }

  //actualizar estudiatne
  updateStudent(student: StudentInterface) {
    this.httpOptions;
    const { id_Student, ...rest } = student; //separar id:student del resto de los datos
    return this.http.put<StudentInterface>(`${this._studentUrl}update/${id_Student}`, rest, this.httpOptions)
      .subscribe({
        next: (data) => {
          alert(data);
        },
        error: (error) => {
          console.error('Error en la actualización', error);
        }
      });
  }

  //eliminar estudiante
  deleteStudent(id: number) {
    return this.http.delete<string>(`${this._studentUrl}delete/${id}`);
  }

  //get quantity of months
  getQuantityMonth() {
    return this.http.get<MonthApiInterface[]>(`${this._studentUrl}quantityMonth`).subscribe((resp: MonthApiInterface[]) => {
      this._monthList.next(resp);
    });
  }

  //get quantity of months
  getMonth(): Observable<MonthApiInterface[]> {

    return this.http.get<MonthApiInterface[]>(`${this._studentUrl}quantityMonth`)
  }
}
