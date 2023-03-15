export class ResourceNotFoundError extends Error {
  constructor() {
    // Esse super() utilizará o construtor da superclasse Error
    super('Resource not found')
  }
}
