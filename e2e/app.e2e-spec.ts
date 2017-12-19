import { AppHeader, AppPage } from './app.po';

describe('app header', () => {
  it('should display the logo', async () => {
    await AppPage.navigateTo();
    await expect(AppHeader.logo().isPresent()).toBeTruthy();
  });

  it('should navigate to the Google form for new submissions', async () => {
    await AppPage.navigateTo();

    await expect(AppHeader.addIssue().getAttribute('href')).toContain('docs.google.com/forms');
  });

  it('should navigate to the contact page', async () => {
    await AppPage.navigateTo();

    await expect(AppHeader.contact().getAttribute('href')).toContain('github.com/russon77');
  });
});

describe('app stats', () => {
  xit('should display a count of total issues, total votes and patches');

  xit('should display a count of days since launch');

  xit('should upvote an issue');
});

describe('app comments', () => {
  xit('should display a list of issues');

  xit('should sort by date or votes');

  xit('should filter by category');
});
