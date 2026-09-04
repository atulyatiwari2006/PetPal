.PHONY: install test build run docker-build docker-up

install:
	@echo "PetPal has no external dependencies"

test:
	node --test tests/server.test.js

build:
	@echo "PetPal build verification"
	node --check pages/Chaitanya/server.js

run:
	node pages/Chaitanya/server.js

docker-build:
	docker build -t petpal .

docker-up:
	docker compose up --build