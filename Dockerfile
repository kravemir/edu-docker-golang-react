ARG GO_VERSION=1.12
ARG ALPINE_VERSION=3.9

FROM golang:${GO_VERSION}-alpine${ALPINE_VERSION} AS builder

RUN apk update && apk add alpine-sdk git && rm -rf /var/cache/apk/*

RUN mkdir -p /app
WORKDIR /app

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .
RUN go build -o ./app main.go


FROM alpine:${ALPINE_VERSION}

RUN apk update \
  && apk add ca-certificates \
  && rm -rf /var/cache/apk/* \
  && mkdir /app

WORKDIR /app
COPY --from=builder /app/app .

EXPOSE 8080

ENTRYPOINT ["./app"]
