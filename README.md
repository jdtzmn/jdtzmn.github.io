# jdtzmn.github.io

My portfolio website

[![Website preview](../assets/website.png?raw=true)][website-url]

[![License][license-badge]](LICENSE)
[![Last Commit][last-commit-badge]][commits-link]
[![JavaScript Style Guide][style-badge]][style-link]

[![Stars][stars-badge]][repo-link]
[![Forks][forks-badge]][repo-link]


## Getting Started

### Prerequisites

This is a [Node.js](https://nodejs.org/en/) application.

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

### Installing

Clone the repository

```bash
$ git clone https://github.com/jdtzmn/jdtzmn.github.io
$ cd jdtzmn.github.io
```

Install dependencies

```bash
$ npm install
```

Generate the static website

```bash
$ npm run generate
```

Serve the website

```bash
$ npm start
```

If all goes to plan, the website should be hosted at [http://localhost:3000](http://localhost:3000)

## Running the tests

To run all the tests (unit and end to end):

```bash
$ npm test
```

Alternatively, to just run unit tests:

```bash
$ npm run test:unit
```

### End to end tests

The end to end tests will test the website itself and how it looks.

Run the end to end tests using the following command:

```
$ npm run test:e2e
```

This will start the server if it is not running already and then run the end to end tests.

### Coding style tests

To run both JavaScript coding style tests and CSS style tests:

```bash
$ npm run lint
```

Alternatively, to test just JavaScript coding style tests or CSS style tests:
``` bash
$ npm run lint:js
$ npm run lint:css
```

In addition, these tests will run automatically before every commit.

## Built With

* [Vue](https://vuejs.org) - The Progressive JavaScript Framework
* [Nuxt](https://nuxtjs.org) - Universal Vue.js Applications

## Acknowledgments

* [Font Awesome](https://fontawesome.com) - The beautiful fonts
* [Cypress](https://cypress.io) - Awesome end to end testing

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/jdtzmn/jdtzmn.github.io/tags). 

## Authors

* **Jacob Daitzman** - *Initial work* - [jdtzmn](https://github.com/jdtzmn)

See also the list of [contributors](https://github.com/jdtzmn/jdtzmn.github.io/contributors) who participated in this project.

## License

This project is licensed under the GNU General Public License - see the [LICENSE](LICENSE) file for details

[website-url]: https://jdtzmn.github.io
[license-badge]: https://img.shields.io/github/license/jdtzmn/jdtzmn.github.io.svg
[last-commit-badge]: https://img.shields.io/github/last-commit/jdtzmn/jdtzmn.github.io.svg
[commits-link]: https://github.com/jdtzmn/jdtzmn.github.io/commits/dev
[style-badge]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-link]: https://standardjs.com
[stars-badge]: https://img.shields.io/github/stars/jdtzmn/jdtzmn.githb.io.svg?style=social&label=Stars
[repo-link]: https://github.com/jdtzmn/jdtzmn.github.io
[forks-badge]: https://img.shields.io/github/forks/jdtzmn/jdtzmn.github.io.svg?style=social&label=Fork
