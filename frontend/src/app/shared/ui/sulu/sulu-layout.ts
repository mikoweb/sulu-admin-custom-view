import { LayoutReady } from '@app/shared/ui/layout-ready';

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

  public static async onReady() {
    return new Promise<void>((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          LayoutReady.onReady(() => {
            resolve();
          });
        });
      } else {
        LayoutReady.onReady(() => {
          resolve();
        });
      }
    });
  }

  public static async getPromisedElement(name: string): Promise<Element> {
    return new Promise<Element>((resolve) => {
      this.onReady().then(() => {
        const intervalId = setInterval(() => {
          // @ts-ignore
          const func = this[`get${name.charAt(0).toUpperCase() + name.slice(1)}`];

          if (func) {
            const view: Element | null = func();

            if (view) {
              clearInterval(intervalId);
              resolve(view);
            }
          }
        }, 10);
      });
    });
  }

  public static async getPromisedCustomView(): Promise<Element> {
    return new Promise<Element>((resolve) => {
      this.getPromisedElement('view').then((view: Element) => {
        const parent: Element = view.parentElement as Element;

        if (parent) {
          const customView: Element | null = parent.querySelector('.app-custom-view');

          if (customView) {
            const detached = parent.removeChild(customView);
            parent.appendChild(detached);
            resolve(customView);
          } else {
            const div = document.createElement('div');
            div.classList.add('app-custom-view');
            parent.appendChild(div);
            resolve(div);
          }
        }
      });
    });
  }

  public static updateElementContent(element: Element | null, html: string): void {
    if (element) {
      element.innerHTML = html;
    }
  }

  public static updateElementDisplay(
    element: Element | null,
    visible: boolean,
    visibleDisplay: string = 'block'
  ): void {
    if (element) {
      (element as HTMLElement).style.display = visible ? visibleDisplay : 'none';
    }
  }

  public static async prepareCustomView(html: string = '', visible: boolean = false): Promise<Element> {
    const customView = await this.getPromisedCustomView();
    const view = await this.getPromisedElement('view');
    this.updateElementDisplay(view, !visible);
    this.updateElementDisplay(customView, visible);
    this.updateElementContent(customView, html);

    return customView;
  }

  public static async changeSearchNavigationLink(
    label: string,
    iconName: string,
    interval: number = 300
  ): Promise<void> {
    const update = async () => {
      const navigation: Element = await this.getPromisedElement('navigation');
      const searchButton = navigation.querySelector('.su-search')?.closest('button');

      if (searchButton) {
        const text = searchButton.querySelector('*[class*=text--]');
        const icon = searchButton.querySelector('.su-search');

        if (text) {
          text.textContent = label;
        }

        if (icon) {
          icon.classList.remove('su-search');
          icon.classList.add(iconName);
          icon.setAttribute('aria-label', iconName);
        }
      }
    };

    await update();
    setInterval(() => update(), interval);
  }
}
