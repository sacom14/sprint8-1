import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { finalize } from 'rxjs';
import { MonthApiInterface } from 'src/app/interface/student.interface';
import { StudentService } from 'src/app/service/student-service.service';

Chart.register(...registerables);

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent {


  public monthApi!: MonthApiInterface[];
  public months: string[] = [];
  public quantity: number[] = [];
  public monthList: MonthApiInterface[] = [];

  constructor(private studentService: StudentService) {
    this.getData();
  }

  getData() {
    this.studentService.getMonth()
      .pipe(
        finalize(() => {
          let data = Object.values(this.monthApi);

          data.forEach((data) => {

            this.months.push(data.month);
            this.quantity.push(data.quantity);
          });

          this.renderChart()
        })
      )
      .subscribe((res) => { this.monthApi = res })
  }

  renderChart() {
    const myChart = document.getElementById('myChart');

    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [{
          label: '# of Votes',
          data: this.quantity,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 255, 1)',
            'rgba(255, 23, 32, 1)',
            'rgba(12, 99, 23, 1)',
            'rgba(255, 99, 12, 1)',
            'rgba(255, 12, 132, 1)',
            'rgba(54, 99, 76, 1)',
            'rgba(12, 99, 3, 1)',
            'rgba(123, 242, 1, 1)',
            'rgba(12, 99, 132, 1)',
            'rgba(255, 99, 56, 1)',
            'rgba(23, 93, 132, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
