import {v4 as uuidV4} from "uuid"

export class User {
  public readonly id: string
  public name: string
  public email: String
  public password: String

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props)

    if(!id) {
      this.id = uuidV4()
    }
  }
}