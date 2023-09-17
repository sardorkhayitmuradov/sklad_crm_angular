import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const LOCAL_STORAGE_CURRENT_LANGUAGE = 'currentLanguage';
export const DEFAULT_LANGUAGE = 'ru';
const CURRENT_LANGUAGE = 'ru';

@Component({
  selector: 'employee-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class EmployeeLanguageComponent {

  /**
   * 
   */
  currentLanguage = getCurrentLangauge();

  /**
   * 
   * @param translate 
   */
  constructor(
    private translate: TranslateService
  ) {
  }

  /**
   * 
   * @param newLanguage 
   */
  chooseCurrentLanguage(newLanguage: string) {
    this.translate.use(newLanguage);
    localStorage.setItem(LOCAL_STORAGE_CURRENT_LANGUAGE, newLanguage);
  }
}

/**
 * 
 * @returns 
 */
export function getCurrentLangauge() {
  let currentLanguage = localStorage.getItem(LOCAL_STORAGE_CURRENT_LANGUAGE);
  if (!currentLanguage) {
    currentLanguage = CURRENT_LANGUAGE;
    localStorage.setItem(LOCAL_STORAGE_CURRENT_LANGUAGE, currentLanguage);
  }

  return currentLanguage;
}