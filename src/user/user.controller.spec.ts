import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { UserModule } from './user.module';
import initTestConfig from '../../test/initTestConfig';
import { getRepository } from 'typeorm';
import { User } from './user.entity';
import { Role } from '../role/role.entity';
import * as faker from 'faker';

describe('User Controller', () => {
  let app: INestApplication;
  let role: Role;
  let userObj;
  let user;

  beforeAll(async () => {
    const moduleApp = await initTestConfig(UserModule);
    app = moduleApp.app;
  });

  beforeEach( async () => {
    role = await getRepository(Role).save({ name: 'Role' });

    userObj = {
      'name': 'Victor',
      'email': faker.internet.email(),
      'password': '123',
      'role_id': role.id,
    };

    const userEntity = Object.assign(new User(), userObj);
    user = await getRepository(User).save(userEntity);
  })

  afterEach(async () => {
    await getRepository(User).delete({});
    await getRepository(Role).delete(role.id);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({ statusCode: 401 }),
        );
      });
  });

  it('/ (POST)', async () => {
    const email = faker.internet.email();
    return request(app.getHttpServer())
      .post('/user')
      .send({...userObj, email})
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({ name: userObj.name, email: email }),
        );
      });
  });

  it('/ (PUT)', async () => {
    const modifiedUserObj = {
      name: 'name-test',
      'email': faker.internet.email(),
    };

    return request(app.getHttpServer())
      .put(`/user/${user.id}`)
      .send(modifiedUserObj)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(modifiedUserObj ),
        );
      });
  });

  it('/ (DELETE)', async () => {
    return request(app.getHttpServer())
      .delete(`/user/${user.id}`)
      .expect(200)
      .expect(async (res) => {
        expect(res.body).toHaveProperty('affected');
        expect(res.body.affected).toEqual(1);
      });
  });
});
