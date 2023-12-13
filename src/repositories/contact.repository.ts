import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Contact, ContactRelations, Person, Mapping} from '../models';
import {MappingRepository} from './mapping.repository';
import {PersonRepository} from './person.repository';

export class ContactRepository extends DefaultCrudRepository<
  Contact,
  typeof Contact.prototype.id,
  ContactRelations
> {

  public readonly people: HasManyThroughRepositoryFactory<Person, typeof Person.prototype.id,
          Mapping,
          typeof Contact.prototype.id
        >;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('MappingRepository') protected mappingRepositoryGetter: Getter<MappingRepository>, @repository.getter('PersonRepository') protected personRepositoryGetter: Getter<PersonRepository>,
  ) {
    super(Contact, dataSource);
    this.people = this.createHasManyThroughRepositoryFactoryFor('people', personRepositoryGetter, mappingRepositoryGetter,);
    this.registerInclusionResolver('people', this.people.inclusionResolver);
  }
}
