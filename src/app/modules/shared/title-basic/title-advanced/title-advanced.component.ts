import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-advanced',
  templateUrl: './title-advanced.component.html'
})
export class TitleAdvancedComponent {
  @Input()
  title = '';

}
