export default function toolbarButtonHelp(ariaLabel: string = '') {
  return `<app-toolbar-button-help>
    <span slot="icon" aria-label="${ariaLabel}" class="su-information"></span>
  </app-toolbar-button-help>`;
}
