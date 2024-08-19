import { Injectable } from '@angular/core';
import CustomRouter from '@app/module/custom/infrastructure/routes/custom-router';

@Injectable({
  providedIn: 'root',
})
export default class AppRouter {
  constructor(
    private readonly customRouter: CustomRouter,
  ) {
  }

  public init(): void {
    this.customRouter.init();
  }
}
