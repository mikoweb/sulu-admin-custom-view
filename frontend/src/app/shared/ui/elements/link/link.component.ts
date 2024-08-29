import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import Router from '@app/core/application/router/router';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class LinkComponent  implements OnInit {
  constructor(
      private readonly element: ElementRef,
      private readonly router: Router,
  ) {
  }

  @Input() href?: string;

  ngOnInit() {
    this.element.nativeElement.addEventListener('click', () => {
      if (this.href) {
        this.router.go(this.href);
      }
    });
  }
}
