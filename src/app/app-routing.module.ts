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
    title: 'School-Lara'
  },
  {
    path: 'map',
    component: MapComponent,
    title: 'School-Lara'
  },
  {
    path: 'fullCalendar',
    component: FullCalendarComponent,
    title: 'School-Lara'
  },
  {
    path: 'graphic',
    component: GraphicComponent,
    title: 'School-Lara'
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
