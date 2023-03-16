export class MaxDistanceError extends Error {
  constructor() {
    // Esse super() utilizará o construtor da superclasse Error
    super('Max distance reached')
  }
}
