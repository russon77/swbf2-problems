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

export class AppStats {
  static issues = {
    value() {
      return element(by.css('app-root .app-stats .app-stats-issues')).getText();
    }
  };

  static votes = {
    value() {
      return element(by.css('app-root .app-stats .app-stats-votes')).getText();
    }
  };

  static patches = {
    value() {
      return element(by.css('app-root .app-stats .app-stats-patches')).getText();
    }
  };

  static days = {
    value() {
      return element(by.css('app-root .app-stats .app-stats-days')).getText();
    }
  };
}
