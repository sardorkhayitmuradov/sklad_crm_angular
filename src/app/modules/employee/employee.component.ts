import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { TranslateService } from '@ngx-translate/core';
import { role } from './models/role.model';
import { TOKEN } from 'src/app/core/auth.inteceptor';
import {
  DEFAULT_LANGUAGE,
  getCurrentLangauge,
} from './components/language/language.component';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent {
  isCollapsed = true;
  tokenInfo: role;
  showBreadCrumb = true;

  constructor(
    private router: Router,
    translate: TranslateService,
    private $translate: TranslateService
  ) {
    $translate.onLangChange.subscribe((w) => {
      this.showBreadCrumb = false;
      setTimeout(() => {
        console.log(w);
        this.translateFn = (key) => this.$translate.instant(key);
        this.showBreadCrumb = true;
      });
    });
    const token = localStorage.getItem(TOKEN)!;
    this.tokenInfo = this.getDecodedAccessToken(token) as role;
    translate.setDefaultLang(DEFAULT_LANGUAGE);
    translate.use(getCurrentLangauge());
  }

  private getDecodedAccessToken(token: string) {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  /**
   *
   * @param key
   * @returns
   */
  translateFn = (key: string) => this.$translate.instant(key);

  logOut() {
    localStorage.removeItem(TOKEN);
    this.router.navigate(['/login']);
  }
}
