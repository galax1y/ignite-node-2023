export class UserAlreadyExistsError extends Error {
  constructor() {
    // Esse super() utilizará o construtor da superclasse Error
    super('Email already exists')
  }
}
