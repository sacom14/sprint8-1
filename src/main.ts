import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

if( !navigator.geolocation){
  throw new Error
}

Mapboxgl.accessToken = 'pk.eyJ1Ijoic2Fjb20xNCIsImEiOiJjbG9vYTFjeDAyZWxwMmxudmhnaTl6ZW9qIn0.K2LyVYyiToPhdygm1fpbeg';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
