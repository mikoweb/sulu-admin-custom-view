import '@app/core/application/library/HashRouter-script.js';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class Router {
  private router: any;

  constructor() {
    this.router = (window as any).HashRouter.createRouter();
  }

  public define(path: string, handler: Function): void {
    this.router.add(path, handler);
  }

  public go(href: string): void {
    const path = document.location.href.split('#')[0];
    const hash = href.startsWith('/') ? href : `/${href}`;
    const url = `${path}#${hash}`;

    document.location.href = url;
    history.pushState({}, '', url);
  }
}
