import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { FullCalendarComponent } from './full-calendar/full-calendar.component';
import { GraphicComponent } from './graphic/graphic.component';
import { ModalComponent } from './home/register-modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateModalComponent } from './home/update-modal/update-modal.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    HomeComponent,
    MapComponent,
    FullCalendarComponent,
    GraphicComponent,
    ModalComponent,
    UpdateModalComponent,

  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    
    CommonModule
  ]
})
export class PagesModule { }
