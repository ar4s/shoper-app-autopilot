build:
	docker build -t ar4s/shoper-telegram .
push:
	docker push ar4s/shoper-telegram

tunnel:
	ngrok http --region=eu --domain=source-apps.eu.ngrok.io 80


image-counter-api:
	docker build -f Dockerfile.counter-api . -t ar4s/shoper-counter-api
push-counter-api:
	docker push ar4s/shoper-counter-api

counter-api: image-counter-api push-counter-api

image-counter-pixel:
	make -C packages/counter-pixel build
	docker build -f packages/counter-pixel/Dockerfile packages/counter-pixel -t ar4s/shoper-counter-pixel

push-counter-pixel:
	docker push ar4s/shoper-counter-pixel

counter-pixel: image-counter-pixel push-counter-pixel
