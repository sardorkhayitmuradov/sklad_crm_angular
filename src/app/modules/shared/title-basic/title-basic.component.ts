import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-basic',
  templateUrl: './title-basic.component.html'
})
export class TitleBasicComponent {
  @Input()
  title = '';

}
