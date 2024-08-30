import SuluLayout from '@app/shared/ui/sulu/sulu-layout';

export default class SuluTable {
  private static actionColumnsObservers: any[] = [];

  public static async startObserveActionColumns(
    newLabel: string,
    snippet: Function,
    interval: number = 100,
    reinit: boolean = true,
  ): Promise<void> {
    if (reinit) {
      this.clearObserveActionColumns();
    }

    const update = async () => {
      const view: Element = await SuluLayout.getPromisedElement('view');
      const headers: NodeListOf<HTMLElement> = view.querySelectorAll('th[class*=header-cell--]');

      for (const th of headers) {
        if (th.textContent?.trim() === '[action]' || th.dataset['actionColumn'] === 'yes') {
          th.dataset['actionColumn'] = 'yes';
          th.classList.add('app-table-action-column');
          this.transformActionColumn(th, newLabel, snippet, interval);
        }
      }
    };

    await update();
    this.actionColumnsObservers.push(setInterval(() => update(), interval));
  }

  public static clearObserveActionColumns(): void {
    for (const intervalId of this.actionColumnsObservers) {
      clearInterval(intervalId);
    }

    this.actionColumnsObservers = [];
  }

  private static transformActionColumn(
    column: Element,
    newLabel: string,
    snippet: Function,
    interval: number = 100,
  ): void {
    const transform = () => {
      column.innerHTML = `<span>${newLabel}</span>`;
      const table: HTMLElement | null = column.closest('table');
      const headRow: Element | null = column.closest('tr');

      if (table && headRow) {
        const index = Array.from(headRow.children).indexOf(column);
        const rows = table.querySelectorAll('tbody tr');

        if (index !== -1 && rows.length > 0) {
          for (const tr of rows) {
            const cell = tr.children.item(index) as HTMLElement;

            if (cell && cell.dataset['transformed'] !== 'yes') {
              cell.classList.add('app-table-action-column');
              cell.innerHTML = snippet(cell.textContent?.trim());
              cell.dataset['transformed'] = 'yes';
            }
          }
        }
      }
    }

    transform();
    this.actionColumnsObservers.push(setInterval(() => transform(), interval));
  }
}
