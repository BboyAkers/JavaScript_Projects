import faker from 'faker';

class User {
  
  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    }
  }

  name: string;
  location: {
    lat: number;
    lng: number;
  }
}