## Run

```bash
# allows calls from REST API tools like Postman
npm run dev  # endpoints are at http://localhost:8000/api/
```

## APIs:

Fetch details of GitHub repo:

```
GET /api/gh_repo
    JSON body
    {
        "owner": "danger-ahead",
        "repo": "flutter_dev_folio"
    }
```
