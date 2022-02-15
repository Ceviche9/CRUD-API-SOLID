
import { MailtrapMailProvider } from '../../../providers/implementations/MailtrapMailProvider';
import { PostgresUserRepository } from '../../../repositories/implementations/PostgresUSerRepository';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

const mailtrapMailProvider = new MailtrapMailProvider()
const postgresUserRepository = new PostgresUserRepository()

const createUserUseCase = new CreateUserUseCase(postgresUserRepository, mailtrapMailProvider)

const createUserController = new CreateUserController(createUserUseCase)

export { createUserController }