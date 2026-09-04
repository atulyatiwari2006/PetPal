# PetPal

PetPal is a full-stack pet management web application that helps pet owners
register their pets, track care schedules, browse a photo gallery, and manage
pet profiles in one place.

## Features

- Pet registration and profile management (add, view, update pet details)
- Pet photo gallery
- Care tracking (medicine schedules, care reminders)
- Multi-page frontend with a Node.js backend

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Version Control:** Git & GitHub
- **CI/CD:** GitHub Actions, Jenkins
- **Containerization:** Docker
- **Orchestration:** Kubernetes
- **Monitoring:** Prometheus

## Project Structure

```
PetPal/
├── pages/            # Frontend pages (registration, gallery, care, etc.)
├── server.js         # Backend entry point
├── docs/             # Documentation and deployment screenshots
├── monitoring/        # Monitoring configuration (Prometheus, dashboards)
├── k8s/               # Kubernetes manifests (deployment, service)
├── .github/workflows/ # CI pipeline configuration
├── Jenkinsfile        # Jenkins pipeline definition
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
git clone https://github.com/skit-devops-2026/devops-24ESKCS090.git
cd devops-24ESKCS090
npm install
```

### Running Locally

```bash
npm start
```

The app will be available at `http://localhost:3000` (or the port configured
in `server.js`).

### Running Tests

```bash
npm test
```

## DevOps Practices

This repository is part of the DevOps Practices and Principles (CSUL511)
course project. It demonstrates:

- Git branching and pull request workflows
- Continuous Integration via GitHub Actions
- Jenkins pipeline automation
- Docker containerization
- Kubernetes deployment
- Application monitoring with Prometheus

## Live Deployment

_Live URL will be added here once deployed (M6)._

## Author

**Bhumika Raghav**
B.Tech Computer Science, SKIT Jaipur
Roll No: 24ESKCS090

