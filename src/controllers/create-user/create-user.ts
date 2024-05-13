import { MongoClient } from '../../database/mongo';
import { User } from '../../models/user';
import { CreateUserParams, IcreateUserRepository } from './protocols';

export class MongoCreateUser implements IcreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection('users')
      .insertOne(params);

    const user = await MongoClient.db
      .collection<Omit<User, 'id'>>('User')
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error('User not found');
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
