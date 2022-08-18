install:
	npm ci
	make -C frontend install

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

deploy:
	git push heroku main
	
build:
	make -C frontend build