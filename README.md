# irapid-management

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).


## Developer Specification

### Naming conventions

- file naming
     - all lowercase
     - as short as possible
     - Try to avoid using `_`, if you must split, use `_`
- variable naming
     - hump
- constant naming
     - hump

### Development Process

[Fork & Pull Request process](https://aaronflower.github.io/essays/github-fork-pull-workflow.html)

- checkout develop -> feature
- coding
- pull request
- review
- merge

### Push instructions

- feature:  Add new feature
- fix:      fix bug
- hotfix:   Emergency fix bug
- docs:     Only modified documents, such as README, CHANGELOG, CONTRIBUTE, etc.
- style:    Only spaces, format indentation, commas, etc. are modified without changing the code logic
- refactor: Code refactoring, consistent external behavior (you better not make new bugs)
- perf:     Optimization related, such as improving performance and experience
- test:     Test cases, including unit tests, integration tests, etc.
- chore:    Change the build process, or add dependent libraries, tools, etc.
- revert:   rollback to previous version

### Toolkits

- [postman](https://www.postman.com/)
    - login to use

