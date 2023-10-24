import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { FullCalendarComponent } from './full-calendar/full-calendar.component';
import { GraphicComponent } from './graphic/graphic.component';
import { ModalComponent } from './home/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    MapComponent,
    FullCalendarComponent,
    GraphicComponent,
    ModalComponent,

  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,

    CommonModule
  ]
})
export class PagesModule { }
