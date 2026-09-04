# PetPal

PetPal is a pet-care management web application that helps users manage their pets and access pet-care features such as daily care, medicine tracking, pet profiles, and a gallery.

## Technology

* HTML5
* CSS3
* JavaScript
* Node.js
* GitHub Actions
* Jenkins
* Docker
* Git and GitHub

## Project Structure

```text
PetPal/
├── pages/
│   ├── Chaitanya/       # Main dashboard and pet-management pages
│   ├── atulya/          # Medicine tracker
│   └── bhumika/         # Daily care module
├── tests/               # Automated tests
├── .github/workflows/   # GitHub Actions CI
├── Dockerfile
├── Jenkinsfile
├── package.json
└── server.js
```

## Run Locally

### Requirements

* Node.js 18 or later
* npm

Install dependencies:

```bash
npm install
```

Run the automated tests:

```bash
npm test
```

Start the application:

```bash
node server.js
```

Then open:

```text
http://localhost:3000
```

## CI Pipeline

GitHub Actions automatically runs the test suite on pushes and pull requests targeting the `main` branch.

The CI pipeline:

1. Checks out the repository.
2. Sets up Node.js.
3. Installs dependencies.
4. Runs the automated tests using `npm test`.

## Docker

Build the Docker image:

```bash
docker build -t petpal .
```

Run the container:

```bash
docker run --rm -p 3000:3000 petpal
```

Then open:

```text
http://localhost:3000
```

## Jenkins

The `Jenkinsfile` defines a Jenkins pipeline containing checkout, testing, and Docker build stages.

The pipeline can be executed on a local Jenkins installation.

## Automated Testing

Automated tests are stored in the `tests/` directory and are executed using:

```bash
npm test
```

The same test suite is used by GitHub Actions and Jenkins.

## DevOps Practices

This project demonstrates basic DevOps practices including:

* Git version control
* Feature branches
* Pull requests
* Automated testing
* Continuous Integration with GitHub Actions
* Jenkins pipeline automation
* Docker containerization
* Repository hygiene using `.gitignore`
