import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './pages/map/map.component';
import { FullCalendarComponent } from './pages/full-calendar/full-calendar.component';
import { GraphicComponent } from './pages/graphic/graphic.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'School'
  },
  {
    path: 'map',
    component: MapComponent,
    title: 'School'
  },
  {
    path: 'fullCalendar',
    component: FullCalendarComponent,
    title: 'School'
  },
  {
    path: 'graphic',
    component: GraphicComponent,
    title: 'School'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
