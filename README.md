## Run

```bash
# allows calls from REST API tools like Postman
npm run dev  # endpoints are at http://localhost:8000/api/
```

## APIs:

### Fetch details of GitHub repo:

```
# Private API; only accessible from whitelisted origins
GET /api/gh_repo?owner=REPO_OWNER&repo=REPO_NAME
```

### Get WakaTime stats (SVG):

```
# Public API; anybody can call
GET /api/wakatime_code_stats
```

### Requirements

- In order to access `gh_repo` api, make a new GitHub Private Access Token with appropriate scope and add the token in environment variables as `GH_PAT`. Also add the allowed origin to access this end-point as `NEXT_PUBLIC_GH_REPO_ALLOW_ORIGIN`.
- In order to access `wakatime_code_stats` api, make a new WakaTime API Key and add the key in environment variables as `WAKATIME_API_KEY`.
