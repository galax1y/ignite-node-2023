export class LateCheckInValidationError extends Error {
  constructor() {
    // Esse super() utilizará o construtor da superclasse Error
    super('Limit time for check-in validation was reached (20 minutes)')
  }
}
