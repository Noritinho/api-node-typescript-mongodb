import { User } from '../../models/user';
import { HttpRequest, HttpResponse } from '../protocols';
import {
  CreateUserParams,
  IcreateUserController,
  IcreateUserRepository,
} from './protocols';

export class CreateUserController implements IcreateUserController {
  constructor(private readonly createUserRepository: IcreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpResponse<User>> {
    try {
      if (!httpRequest.body) {
        return { statusCode: 400, body: 'Please specify a body' };
      }

      const user = await this.createUserRepository.createUser(httpRequest.body);
      return { statusCode: 201, body: user };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong.',
      };
    }
  }
}
