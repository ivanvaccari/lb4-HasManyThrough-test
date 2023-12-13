import {Entity, model, property} from '@loopback/repository';

@model()
export class Mapping extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  contactId?: string;

  @property({
    type: 'string',
  })
  personId?: string;

  constructor(data?: Partial<Mapping>) {
    super(data);
  }
}

export interface MappingRelations {
  // describe navigational properties here
}

export type MappingWithRelations = Mapping & MappingRelations;
