import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { FullCalendarComponent } from './full-calendar/full-calendar.component';
import { GraphicComponent } from './graphic/graphic.component';



@NgModule({
  declarations: [
    HomeComponent,
    MapComponent,
    FullCalendarComponent,
    GraphicComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
