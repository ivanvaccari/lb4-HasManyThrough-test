import {Entity, model, property, hasMany} from '@loopback/repository';
import {Person} from './person.model';
import {Mapping} from './mapping.model';

@model()
export class Contact extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  value?: string;

  @hasMany(() => Person, {through: {model: () => Mapping}})
  people: Person[];

  constructor(data?: Partial<Contact>) {
    super(data);
  }
}

export interface ContactRelations {
  // describe navigational properties here
}

export type ContactWithRelations = Contact & ContactRelations;
