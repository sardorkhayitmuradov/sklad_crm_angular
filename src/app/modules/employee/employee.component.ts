import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeBalanceModel } from './models/role.model';
import { TOKEN } from 'src/app/core/auth.inteceptor';
import {
  DEFAULT_LANGUAGE,
  getCurrentLangauge,
} from '../components/language/language.component';
import { EmployeeService } from './service/employee.service';
import { BaseResponse } from '../shared/models/base.interface';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent {
  isCollapsed = true;
  showBreadCrumb = true;

  role: EmployeeBalanceModel | undefined;

  constructor(
    private info: EmployeeService,
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
    this.getInformation();
  }
  
  getInformation() {
    this.info
      .getInfos()
      .subscribe((response: BaseResponse<EmployeeBalanceModel>) => {
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
