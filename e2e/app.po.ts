import { browser, by, element } from 'protractor';

export class AppPage {
  static navigateTo() {
    return browser.get('/');
  }
}

export class AppHeader {
  static logo() {
    return element(by.css('app-root .header img'));
  }

  static addIssue() {
    return element(by.css('app-root .header a.app-add-issue'));
  }

  static contact() {
    return element(by.css('app-root .header a.app-contact'))
  }
}
