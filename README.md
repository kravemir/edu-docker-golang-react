# toy-docker-golang-react

## Run

Just run docker compose:

```bash
docker-compose up --build
```

Access the web: http://localhost:8080/ping

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
