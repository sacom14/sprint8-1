import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  public useLocation: [number, number] | undefined;

  get isUserLocationReady(): boolean{
    return !!this.useLocation
  }

  constructor() {
    this.getUserLocation();
  }

  async getUserLocation(): Promise<[number, number]>{
    return new Promise ( (resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.useLocation = [coords.longitude, coords.latitude];//for mapbox
          resolve(this.useLocation);
        },
        (err) => {
          alert('Any location');
          reject();
        }
      );
    });
  }
}
