# Traxitt Docs

This documentation is published by Traxitt Inc. and covers all aspects of the Traxitt system. The documents are open to modification and is the basis for the [http://docs.traxitt.com](http://docs.traxitt.com) website.

All modifications should be submitted via a pull request and are subject to review prior to publishing.

## Developing

This documentation is put together using [docsify](docsifyjs.com) and is all in `markdown`. You may edit the markdown files in the `content/` folder using the standard github markdown editor and submit a pull request.

If however, you would like to preview the site, clone this repo and run the following:

``` bash
git clone ...
npm install
npm run develop

OR

npm install -g docsify-cli
docsify serve ./docs
```

The site will run locally at `http://localhost:3000`

## Hosting

The site is publicly hosted using GitHub Pages however, a private (work in progress) fork of this site is hosted behind an authentication wall.

GitHub Pages serve the ./docs folder of this code and ignore the outer content.

## Heroku

Run locally

`heroku local web` or `yarn start`

Push local build after committing to git

`git push heroku <local branch>:master`

The credential is stored in

## Errors

If you encounter the `env: node\r: No such file or directory`, see this issue and fix: [Issue 78](https://github.com/docsifyjs/docsify-cli/issues/78)

## Legal Stuff

These documents are published as-is and come with no warranty. Traxitt Inc. reserves the right to change these documents at any time.

© Copyright 2019 Traxitt Inc. All Rights Reserved
