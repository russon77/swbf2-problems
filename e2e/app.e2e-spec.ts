import { browser } from 'protractor';
import { AppHeader, AppIssues, AppPage, AppStats } from './app.po';

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
  it('should display a list of issues', async () => {
    await AppPage.navigateTo();

    await expect(AppIssues.count()).toBeGreaterThan(0);
  });

  it('should upvote an issue', async () => {
    await AppPage.navigateTo();

    const previousCount = + await AppIssues.upvote.value(0);

    await AppIssues.upvote.do(0);

    await browser.sleep(1500);

    await expect(+ await AppIssues.upvote.value(0)).toEqual(previousCount + 1);
  });

  it('should sort by date or votes', async () => {
    await AppPage.navigateTo();

    // check sort by votes
    await AppIssues.filter.sort('Votes');

    const problemsByVote: {date: number, votes: number}[] = <{date: number, votes: number}[]> await AppIssues.problems.get();

    for (let i = 0; i < problemsByVote.length - 1; i++) {
      await expect(problemsByVote[i].votes).toBeGreaterThanOrEqual(problemsByVote[i + 1].votes);
    }

    // check sort by date
    await AppIssues.filter.sort('Date');

    const problemsByDate: {date: number, votes: number}[] = <{date: number, votes: number}[]> await AppIssues.problems.get();

    for (let i = 0; i < problemsByDate.length - 1; i++) {
      await expect(problemsByDate[i].date).toBeGreaterThanOrEqual(problemsByDate[i + 1].date);
    }
  });

  it('should filter by category', async () => {
    await AppPage.navigateTo();

    // test selecting a single category

    await AppIssues.filter.category('Bug');

    const categories = await AppIssues.category.list();

    await expect((<string[]> categories).length).toEqual(1);
  });
});
