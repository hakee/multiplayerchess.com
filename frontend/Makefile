all:
	make templates;
	make js;

.PHONY: templates
templates:
	cd templates; \
	python build.py>bundle.js; \
	cd ../;

.PHONY: wallpapers
wallpapers:
	cd wallpapers; \
	node pack.js > wallpapers.js; \
	cd ../;

warn:
	grep "console.log" * -rn --color
	grep "document.title" * -rn --color

js:
	~/.node_modules/one/bin/onejs build package.json site/mpc.js
	cat templates/bundle.js >> site/mpc.js

deploy:
	cp -rf site/* ~/www/multiplayerchess.com/public/test/.
	cp ~/www/multiplayerchess.com/public/test/index-test.html ~/www/multiplayerchess.com/public/test/index.html

prod:
	cp -rf site/* ~/www/multiplayerchess.com/public/.
	cp ~/www/multiplayerchess.com/public/index-prod.html ~/www/multiplayerchess.com/public/index.html
