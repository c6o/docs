# CodeZero Docs

This documentation is published by CodeZero Technologies Inc. and covers all aspects of the CodeZero system. The documents are open to modification and is the basis for the [https://docs.codezero.io](https://docs.codezero.io) website.

All modifications should be submitted via a pull request and are subject to review prior to publishing.

## Running the Site Locally

This documentation is put together using [docsify](docsifyjs.com) and uses `markdown`. You can edit the markdown files in the `content/` folder using the GitHub markdown editor, and submit a pull request.

If you would like to preview the site or make your changes locally, clone this repo and run the following:

```bash
git clone ...
cd docs
yarn install
yarn run develop

OR

yarn global add docsify-cli
docsify serve .
```

The site will run locally at `http://localhost:3000`

## Finding broken links

[Lychee](https://github.com/lycheeverse/lychee) automatically checks links in the repository and you can see of the currently broken links here [#142](https://github.com/c6o/docs/issues/142). However, Lychee can also be run locally with the following command.

```bash
lychee --exclude-all-private './content/**/*.md' -u 'Mozilla/5.0 (X11; Linux x86_64; rv:10.0) Gecko/20100101 Firefox/10.0' --exclude "http://sample-project-*" "mongodb:*" "http://\$*"
```

## Organization of the Documentation

Concepts => Thought leadership to train, educate and evangelize best practices to DevOps, Architects
Guides => Multi step complex scenarios/tasks
Tutorials => Exercises to try with the sample-project
Reference => Detail information on a single command (a more graphical view of czctl <command> --help)

## Legal Stuff

These documents are published as-is and come with no warranty. CodeZero Technologies Inc. reserves the right to change these documents at any time.

© Copyright 2021 CodeZero Technologies Inc. All Rights Reserved
