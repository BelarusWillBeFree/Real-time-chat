start-frontend:
	make -C frontend NODE_ENV=production start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

deploy:
	git push heroku main