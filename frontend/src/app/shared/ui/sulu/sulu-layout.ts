export default class SuluLayout {
  public static getContent(): Element | null {
    return document.querySelector('*[class*=content--]');
  }

  public static getNavigation(): Element | null {
    return document.querySelector('nav[class*=navigation--]');
  }

  public static getView(): Element | null {
    return document.querySelector('*[class*=view--]');
  }

  public static getControls(): Element | null {
    return document.querySelector('*[class*=controls--]');
  }

  public static getTabs(): Element | null {
    return document.querySelector('*[class*=tabs--]');
  }

  public static updateView(html: string): void {
    const view = this.getView();

    if (view !== null) {
      view.innerHTML = html;
    }
  }

  public static loadEmptyView(): void {
    this.updateView('');
  }

  public static loadEmptyTabView(): void {
    this.updateView(`<div class="form--VaSruwzZWz"><div class="grid--NlXPeQSu8O grid--VzWZS2QOSh"></div></div>`);
  }

  public static async updateTabView(html: string): Promise<void> {
    return this.updateCustomView('*[class*=grid--]', html);
  }

  public static loadEmptyTableView(): void {
    this.updateView(`<div class="list-container--vlDPR2mrK9"><div class="list-container--R_i5KfZVXK"><h1>Custom Table</h1><div class="toolbar--fO9agCOYEc"><div class="toolbar-left--R6hMdhYoHr"><label aria-label="Szukaj…"><div class="input--f6Y7zzKD1w dark--_ZDVqa6gRR left--r4xBFGcxLN collapsed--BapvGaZIeB has-append-icon--l19YOQW5a4"><div class="prepended-container--S_9VyXoRnq dark--_ZDVqa6gRR collapsed--BapvGaZIeB"><span aria-label="su-search" class="su-search clickable--IaD5obhE5P icon--MHnGed9Qrd dark--_ZDVqa6gRR icon-clickable--DlJG_7md62 collapsed--BapvGaZIeB" role="button" tabindex="0"></span></div><input placeholder="Szukaj…" type="text" value=""></div></label></div><div class="toolbar-right--dndILrM7e_"><div><button class="button--CMWxP7fcJV icon--RBFSkD1GIK" type="button"><span aria-label="su-sort" class="su-sort button-icon--SqrucnDZDR"></span><span aria-label="su-angle-down" class="su-angle-down dropdown-icon--hFn1Iv3PMe"></span></button></div></div></div><div class="list--w0sr9iIQzQ"><div class="dark--RHXKQwhD58"><table class="table--VEZk6p5fMN"><thead class="header--X0v_oyR1ZH"><tr><th class="header-cell--WzewAehL94"><span><label class="label--OpPkT9WbAB" tabindex="-1"><span class="switch--lQQJwFYSKo checkbox--46IjK_04Wl light--Ept4J2kL5K"><input type="checkbox" value=""><span></span></span></label></span></th></tr></thead><tbody></tbody></table><div class="table-placeholder-area--sSade0Wj6B"><span aria-label="su-battery-low" class="su-battery-low table-placeholder-icon--A_AETnATU1"></span></div></div></div></div></div>`);
  }

  public static async updateTableView(html: string): Promise<void> {
    return new Promise<void>((resolve) => {
      this.updateCustomView('table > tbody', '').then(() => {
        this.updateView(html);
        resolve();
      });
    });
  }

  public static async updateTableKeepTitleView(html: string): Promise<void> {
    return new Promise<void>((resolve) => {
      this.updateCustomView('table > tbody', '').then(() => {
        const view = this.getView()?.querySelector('*[class*=list--]');
        this.getView()?.querySelector('*[class*=toolbar--]')?.remove();

        if (view) {
          view.innerHTML = html;
        }

        resolve();
      });
    });
  }

  public static async updateCustomView(querySelector: string, html: string, interval: number = 10): Promise<void> {
    new Promise<void>((resolve) => {
      const intervalId = setInterval(() => {
        const view = this.getView()?.querySelector(querySelector);

        if (view && view.innerHTML.trim().length === 0) {
          view.innerHTML = html;
          clearInterval(intervalId);
          resolve();
        }
      }, interval);
    });
  }
}
