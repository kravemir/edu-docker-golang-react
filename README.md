# toy-docker-golang-react

## Run

Just run docker compose:

```bash
docker-compose up --build
```

Access the web: http://localhost:8080/ping

## Used technologies

The primary three technologies:

- **docker** for local development environment,
- **go** for backend implementation,
- **react** for frontend implementation.

Development environment technology added along the way:

- **postgresql** in dockerized form.

Backend technologies added along the way:

- **gin** HTTP web framework for go,
- **gorm** ORM library for go.

Frontend technologies added along the way:

- **node** as the requirement to build the "modern" frontend stuff,
- **parcel** to bundle and serve the frontend.

## Development

Population of `go.mod` and `go.sum`:

* when: dependencies change,
* then:

  ```bash
  go build
  ```

Connecting to DB:

```bash
docker-compose exec db sh -c 'PGPASSWORD=tralalala psql -h db -U postgres'
```
