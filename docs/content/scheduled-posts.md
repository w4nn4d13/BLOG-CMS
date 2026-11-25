# Scheduled posts

A post with a future `date` is hidden until that date.

## Rule

In production, `getAllPosts()` compares date strings (`YYYY-MM-DD`) and drops any post whose date is later than today (UTC). Comparing only the date, not the time, means a post dated today always appears.

## How it goes live

The site is static, so nothing changes until the next deployed build. `.github/workflows/deploy.yml` has a schedule trigger:

```yaml
schedule:
  - cron: '0 6 * * *'
```

That starts a build every day at 06:00 UTC. The deploy job only runs for `push` events, though, so the scheduled run does not currently publish anything; a future-dated post appears on the first push to `main` on or after its date. See [scheduled rebuilds](../ci/scheduled-rebuilds.md) for the fix.

## Tips

- Use ISO dates: `date: 2026-12-01`.
- To publish earlier, change the date and push.
- Netlify deployments do not have this cron by default. Trigger a build hook on a schedule if you host there.
