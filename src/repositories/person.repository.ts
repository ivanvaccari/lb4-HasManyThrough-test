import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Person, PersonRelations} from '../models';

export class PersonRepository extends DefaultCrudRepository<
  Person,
  typeof Person.prototype.id,
  PersonRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Person, dataSource);
  }
}
