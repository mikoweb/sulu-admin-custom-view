export interface Client {
  method: any;
  getValidationError(errorResponse: any): Promise<string>;
}
