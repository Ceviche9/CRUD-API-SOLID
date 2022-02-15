import {Request as HttpRequest, Response as HttpResponse} from "express"
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase
  ) {}

  async handle(request: HttpRequest, response: HttpResponse): Promise<HttpResponse> {
    const {name, email, password} = request.body

    try {
      await this.createUserUseCase.execute({name, email, password})

      return response.status(201).send()
    } catch(err) {
      response.status(400).json({
        error: err.message || "Unexpected Error"
      })
    }
  }
}