import { Component, OnInit } from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'; //import them without {}
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es' //for spain

import { CalendarOptions } from 'fullcalendar';

@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.scss']
})
export class FullCalendarComponent implements OnInit {
  public events: any[] = [];
  public options: CalendarOptions={};

  constructor (){}

  ngOnInit(): void {

    this.events = [
      {
        title: "Tutoria",
        start: "2023-11-10",
        description: "Tutoria con Maria",
      },
      {
        title: "Excursión",
        start: "2023-11-12",
        description: "Excursión al CosmoCaixa",
      },
      {
        title: "Colonias",
        start: "2023-11-19",
        end: "2023-11-22",
        description: "Colonias a casa rural La Garriga",
      }
    ]
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next,today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
  };



}
