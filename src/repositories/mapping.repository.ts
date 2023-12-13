import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Mapping, MappingRelations} from '../models';

export class MappingRepository extends DefaultCrudRepository<
  Mapping,
  typeof Mapping.prototype.id,
  MappingRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Mapping, dataSource);
  }
}
