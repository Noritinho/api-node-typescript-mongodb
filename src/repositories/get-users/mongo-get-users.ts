import { IGetUsersRepository } from '../../controllers/get-users/protocols';
import { User } from '../../models/user';

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: 'Marcelo',
        lastName: 'Norita',
        email: 'marnori@gmail.com',
        password: '123456',
      },
    ];
  }
}
