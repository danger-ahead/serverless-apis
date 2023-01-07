## Run

```bash
# allows calls from REST API tools like Postman
npm run dev  # endpoints are at http://localhost:8000/api/
```

## APIs:

### Fetch details of GitHub repo:

```
# Private API; only accessible from whitelisted origins
GET /api/gh_repo
    JSON body
    {
        "owner": "danger-ahead",
        "repo": "flutter_dev_folio"
    }
```

### Get WakaTime stats (SVG):

```
# Public API; anybody can call
GET /api/wakatime_code_stats
```
