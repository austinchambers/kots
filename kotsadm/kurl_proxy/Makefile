SHELL := /bin/bash -o pipefail
export GO111MODULE=on

.PHONY: test
test:
	go test ./cmd/...

.PHONY: build
build:
	go build -o bin/kurl_proxy cmd/main.go

.PHONY: up
up:
	skaffold dev -f skaffold.yaml

.PHONY: build-ttl-ci.sh
build-ttl-ci.sh:
	docker build -f deploy/Dockerfile -t ttl.sh/${UUID}/kurl-proxy:2h .
	docker push ttl.sh/${UUID}/kurl-proxy:2h

.PHONY: build-alpha
build-alpha:
	docker build -f deploy/Dockerfile -t kotsadm/kurl-proxy:alpha .
	docker push kotsadm/kurl-proxy:alpha

.PHONY: build-release
build-release:
	docker build -f deploy/Dockerfile -t kotsadm/kurl-proxy:${BUILDKITE_TAG} .
	docker push kotsadm/kurl-proxy:${BUILDKITE_TAG}
