# toy-docker-golang-react

## Run

Just build and run docker image:

```bash
docker build -t toy-docker-golang-react .
docker run -it -p 8080:8080 toy-docker-golang-react
```

Access the web: http://localhost:8080/ping

## Development

Population of `go.mod` and `go.sum`:

* when: dependencies change,
* then:

  ```bash
  go build
  ```
