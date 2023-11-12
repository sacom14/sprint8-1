import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {Map} from 'mapbox-gl';
import { LocationsService } from 'src/app/service/locations.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef

  constructor(private locationsService:LocationsService) { }

  async ngAfterViewInit(): Promise<void> {
    let location = await this.locationsService.getUserLocation(); //import the code from mapbox
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.locationsService.useLocation, // user locations
      zoom: 14, // starting zoom
    });
  }
}
