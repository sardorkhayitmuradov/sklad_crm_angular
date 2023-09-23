import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE, getCurrentLangauge } from '../components/language/language.component';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NotFoundComponent {
  constructor(private $translate: TranslateService) {
    $translate.onLangChange.subscribe((w) => {
      setTimeout(() => {
        this.translateFn = (key) => this.$translate.instant(key);
      });
    });
    $translate.setDefaultLang(DEFAULT_LANGUAGE);
    $translate.use(getCurrentLangauge());
  }

   /**
   *
   * @param key
   * @returns
   */
   translateFn = (key: string) => this.$translate.instant(key);
}
