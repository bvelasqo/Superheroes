
export class LeadAlreadyExist extends Error {
  constructor () {
    super('Lead already exist');
  }
}

export class PTExceeded extends Error {
  constructor () {
    super('Provisioned throughput exceeded.');
  }
}

export class ResourceNotFound extends Error {
  constructor () {
    super('Table not found.');
  }
}

export class ValidationError extends Error {
  constructor () {
    super('Validation error.');
  }
}

export class InternalError extends Error {
  constructor () {
    super('Internal error.');
  }
}

export class RequestLimitExceeded extends Error {
  constructor () {
    super('Request limit exceeded.');
  }
}

export class AccessDenied extends Error {
  constructor () {
    super('Access denied.');
  }
}

export class ResourceInUse extends Error {
  constructor () {
    super('Resource in use.');
  }
}

export class Errors {
  static readonly LeadAlreadyExist = LeadAlreadyExist;
  static readonly PTExceeded = PTExceeded;
  static readonly ResourceNotFound = ResourceNotFound;
  static readonly ValidationError = ValidationError;
  static readonly InternalError = InternalError;
  static readonly RequestLimitExceeded = RequestLimitExceeded;
  static readonly AccessDenied = AccessDenied;
  static readonly ResourceInUse = ResourceInUse;

  constructor (message: string) {
    switch (message) {
      case 'ConditionalCheckFailedException':
        throw new LeadAlreadyExist();
      case 'ProvisionedThroughputExceededException':
        throw new PTExceeded();
      case 'ResourceNotFoundException':
        throw new ResourceNotFound();
      case 'ValidationException':
        throw new ValidationError();
      case 'InternalServerError':
        throw new InternalError();
      case 'RequestLimitExceeded':
        throw new RequestLimitExceeded();
      case 'AccessDeniedException':
        throw new AccessDenied();
      case 'ResourceInUseException':
        throw new ResourceInUse();
      default:
        throw new Error(message);
    }
  }
}
