import { AppHeader, AppPage, AppStats } from './app.po';

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
  it('should display a count of total issues, total votes and patches', async () => {
    await AppPage.navigateTo();

    await expect(AppStats.issues.value()).toBeGreaterThanOrEqual(0);
    await expect(AppStats.votes.value()).toBeGreaterThanOrEqual(0);
    await expect(AppStats.patches.value()).toBeGreaterThanOrEqual(0);
  });

  it('should display a count of days since launch', async () => {
    const now = Date.now();
    const launch = new Date(2017, 10, 17).getTime();

    const expected = Math.floor((now - launch) / (1000 /* ms to one second */
      * 60 /* seconds to one minute */ * 60 /* minutes to one hour */
      * 24 /* hours to one day */)
    );

    await AppPage.navigateTo();
    const actual = await AppStats.days.value();

    await expect(+actual).toEqual(expected);
  });
});

describe('app comments', () => {
  xit('should display a list of issues');

  xit('should upvote an issue');

  xit('should sort by date or votes');

  xit('should filter by category');
});
