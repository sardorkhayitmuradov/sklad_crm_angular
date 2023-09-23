import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN } from 'src/app/core/auth.inteceptor';
import { TranslateService } from '@ngx-translate/core';
import {
  DEFAULT_LANGUAGE,
  getCurrentLangauge,
} from '../components/language/language.component';
import { EmployerService } from './services/employer.service';
import { BaseResponse } from '../shared/models/base.interface';
import { EmployerBalanceModel } from './model/role.model';

@Component({
  selector: 'employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css'],
})
export class EmployerComponent {
  isCollapsed = true;
  showBreadCrumb = true;
  overallNotifications: number = 9;

  role: EmployerBalanceModel | undefined

  constructor(
    private info: EmployerService,
    private router: Router,
    private $translate: TranslateService
  ) {
    $translate.onLangChange.subscribe((w) => {
      this.showBreadCrumb = false;
      setTimeout(() => {
        this.translateFn = (key) => this.$translate.instant(key);
        this.showBreadCrumb = true;
      });
    });
    $translate.setDefaultLang(DEFAULT_LANGUAGE);
    $translate.use(getCurrentLangauge());
    this.getInformation()
  }

  getInformation() {
    this.info
      .getInfos()
      .subscribe((response: BaseResponse<EmployerBalanceModel>) => {
        this.role = response.data;
        console.log(this.role);
      });
  }

  getFormattedBalance(): number {
    return this.role?.balance || 0;
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
