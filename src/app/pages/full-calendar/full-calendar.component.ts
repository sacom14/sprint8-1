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
        title: "Evento 1",
        start: new Date(),
        description: "Evento 1",
      },
      {
        title: "Evento 2",
        start: new Date(new Date().getTime()+86400000),
        description: "Evento 2",
      },
      {
        title: "Evento 3",
        start: new Date(new Date().getTime()+86400000*2),
        end: new Date(new Date().getTime()+86400000*3),
        description: "Evento 3",
      }
    ]
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next,today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
  };

  

}
