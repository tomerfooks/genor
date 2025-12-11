/**
 * Geo Location Value Object
 * Represents geographic coordinates
 */
export interface Geo {
  readonly lat: string;
  readonly lng: string;
}

/**
 * Address Value Object
 * Represents a user's address
 */
export interface Address {
  readonly street: string;
  readonly suite: string;
  readonly city: string;
  readonly zipcode: string;
  readonly geo: Geo;
}

/**
 * Company Value Object
 * Represents company information
 */
export interface Company {
  readonly name: string;
  readonly catchPhrase: string;
  readonly bs: string;
}

/**
 * User Entity
 * Core domain entity representing a user
 */
export interface User {
  readonly id: number;
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly address: Address;
  readonly phone: string;
  readonly website: string;
  readonly company: Company;
}

/**
 * Factory function to create a User entity
 */
export function createUser(data: User): User {
  return Object.freeze({
    id: data.id,
    name: data.name,
    username: data.username,
    email: data.email,
    address: Object.freeze({
      street: data.address.street,
      suite: data.address.suite,
      city: data.address.city,
      zipcode: data.address.zipcode,
      geo: Object.freeze({
        lat: data.address.geo.lat,
        lng: data.address.geo.lng,
      }),
    }),
    phone: data.phone,
    website: data.website,
    company: Object.freeze({
      name: data.company.name,
      catchPhrase: data.company.catchPhrase,
      bs: data.company.bs,
    }),
  });
}
