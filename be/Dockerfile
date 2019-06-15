ARG GO_VERSION=1.12
ARG ALPINE_VERSION=3.9

FROM golang:${GO_VERSION}-alpine${ALPINE_VERSION} AS base

RUN apk update \
  && apk add alpine-sdk git \
  && rm -rf /var/cache/apk/* \
  && mkdir -p /app

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download


FROM base AS builder

COPY . .
RUN go build -o ./app -v


FROM base AS hot-reload

RUN go get github.com/githubnemo/CompileDaemon

COPY . .

ENTRYPOINT CompileDaemon -log-prefix=false -build="go build -o ./app -v" -command="./app"


FROM alpine:${ALPINE_VERSION}

RUN apk update \
  && apk add ca-certificates \
  && rm -rf /var/cache/apk/* \
  && mkdir /app

WORKDIR /app
COPY --from=builder /app/app .

EXPOSE 8080

ENTRYPOINT ["./app"]
