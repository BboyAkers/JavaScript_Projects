import faker from 'faker';
import { Marker } from './CustomMap';

export class Company implements Marker {

  constructor() {
    this.companyName = faker.company.companyName();
    this.catchPhrase = faker.company.catchPhrase();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    }
  }
  color: string = 'red';
  companyName: string;
  catchPhrase: string;
  location: {
    lat: number;
    lng: number;
  }
  
  markerContent(): string {
    return `
      <div>
        <h1> Company Name: ${this.companyName}</h1>
        <h3>Catchphrase: ${this.catchPhrase}</h3>
      </div>
    `;
  }
} 