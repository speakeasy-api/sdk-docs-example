generate:
	speakeasy docs generate -s openapi.yaml -o ./ --langs python,typescript,go,curl --compile

migrate-changes:
	cp -rf src/components/* ../openapi-generation/templates/templates/docs/auxiliary/src/components/
	cp -rf src/styles/* ../openapi-generation/templates/templates/docs/auxiliary/src/styles/
	cp -rf src/utils/* ../openapi-generation/templates/templates/docs/auxiliary/src/utils/
	cp -rf src/lib/* ../openapi-generation/templates/templates/docs/auxiliary/src/lib/
	cp -rf src/icons/* ../openapi-generation/templates/templates/docs/auxiliary/src/icons/
