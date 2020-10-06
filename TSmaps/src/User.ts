import faker from 'faker';
import { Marker } from './CustomMap';

export default 'red';

export class User implements Marker {
  
  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    }
  }
  color: string = 'blue';
  name: string;
  location: {
    lat: number;
    lng: number;
  }
  markerContent(): string {
    return `
        <h1>User Name: ${this.name}</h1>
    `;
  }
}