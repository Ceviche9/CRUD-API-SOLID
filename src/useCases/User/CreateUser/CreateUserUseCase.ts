import { User } from "../../../entities/User";
import { IMailProvider } from "../../../providers/IMailProvider";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

/*  --- Princípios SOLID aplicados até agora --- 
  1 - Single Responsibility Principle: Essa classe só tem uma única responsabilidade
que é criação de um novo usuário caso ele já não exista. Ou seja, qualquer outro lugar
da aplicação que precise criar um novo usuário pode utilizar esta classe.

  2 - Liskov Substitution Principle: A partir do momento em que o usersRepository
está sendo chamado e definimos o tipo dele como um IUsersRepository, foi criado um
"contrato" que define quais são os métodos que define quais são os métodos do repositório,
mão importa para qual banco de dados a aplicação irá utilizar pois o contrato já está definido.

  3 - Dependency Inversion Principle: Essa classe não está dependendo diretamente da implementação
dos usuários no banco de dados e sim de uma abstração da implementação.
*/
export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if(userAlreadyExists) {
      throw new Error("User already exists"); 
    }

    const user = new User(data)

    await this.usersRepository.save(user);

    this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: "Tunde.dev",
        email: "ayotunde_sales@hotmail.com"
      },
      subject: "Seja bem-vindo a plataforma",
      body: "<p>Vocẽ já pode logar na nossa plataforma.</p>"
    })
  }
}