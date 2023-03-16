export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    // Esse super() utilizará o construtor da superclasse Error
    super('Max number of check-ins reached')
  }
}
