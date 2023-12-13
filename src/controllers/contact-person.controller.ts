import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Contact,
Mapping,
Person,
} from '../models';
import {ContactRepository} from '../repositories';

export class ContactPersonController {
  constructor(
    @repository(ContactRepository) protected contactRepository: ContactRepository,
  ) { }

  @get('/contacts/{id}/people', {
    responses: {
      '200': {
        description: 'Array of Contact has many Person through Mapping',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Person)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Person>,
  ): Promise<Person[]> {
    return this.contactRepository.people(id).find(filter);
  }

  @post('/contacts/{id}/people', {
    responses: {
      '200': {
        description: 'create a Person model instance',
        content: {'application/json': {schema: getModelSchemaRef(Person)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Contact.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {
            title: 'NewPersonInContact',
            exclude: ['id'],
          }),
        },
      },
    }) person: Omit<Person, 'id'>,
  ): Promise<Person> {
    return this.contactRepository.people(id).create(person);
  }

  @patch('/contacts/{id}/people', {
    responses: {
      '200': {
        description: 'Contact.Person PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {partial: true}),
        },
      },
    })
    person: Partial<Person>,
    @param.query.object('where', getWhereSchemaFor(Person)) where?: Where<Person>,
  ): Promise<Count> {
    return this.contactRepository.people(id).patch(person, where);
  }

  @del('/contacts/{id}/people', {
    responses: {
      '200': {
        description: 'Contact.Person DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Person)) where?: Where<Person>,
  ): Promise<Count> {
    return this.contactRepository.people(id).delete(where);
  }
}
