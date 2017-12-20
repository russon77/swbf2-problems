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

export class AppIssues {
  static problems = {
    get() {
      return element.all(by.css('app-root .app-main-comments .app-comment'))
        .map(async ef => ({
          date: + await ef.$('.app-comment-timestamp').getAttribute('data-value'),
          votes: + await ef.$('.app-comment-votes').getAttribute('data-value')
        }));
    }
  };

  static upvote = {
    value(index: number) {
      return element.all(by.css('app-root .app-main-comments .app-comment-votes')).get(index).getAttribute('data-value');
    },
    do(index: number) {
      return element.all(by.css('app-root .app-main-comments .app-comment-upvote')).get(index).click();
    }
  };

  static category = {
    async list() {
      const categories = await element.all(by.css('app-root .app-main-comments .app-comment-category')).map(ef => ef.getText());
      return categories.reduce((acc: string[], val: string) => acc.indexOf(val) === -1 ? acc.concat(val) : acc, []);
    }
  };

  static filter = {
    category(category: string) {
      return element(by.cssContainingText('app-root .app-main-comments option', category)).click();
    },
    sort(sortBy: string) {
      return element(by.cssContainingText('app-root .app-main-comments option', sortBy)).click();
    }
  };

  static count() {
    return element.all(by.css('app-root .app-main-comments .app-comment')).count();
  }
}
