export class InvalidCredentialsError extends Error {
  constructor() {
    // Esse super() utilizará o construtor da superclasse Error
    super('Invalid credentials')
  }
}
