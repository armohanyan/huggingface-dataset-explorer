# Dataset API

## Description
Dataset API is a Node.js backend service built with Express and TypeScript, designed to explore datasets from Hugging Face. It provides endpoints for dataset exploration and implements JWT authentication for user management. MongoDB is used as the database for storing datasets and user information.

## Prerequisites
- Node.js version 20
- MongoDB
- Yarn

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com
    ```

2. Navigate into the project directory:
    ```bash
    cd dataset-api
    ```

3. Install dependencies:
    ```bash
    yarn install
    ```

## Configuration
1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file:
    ```
    PORT=3000
    AUTH_REFRESH_TOKEN_SECRET=2Kp6BjSKl3boT6+Zf3D0tw
    AUTH_ACCESS_TOKEN_SECRET=bkZaWfqssqzE0fg1TMCHqQ
    MONGO_CLUSTER_URI=<YOUR_MONGODB_URI>
    ```

## Usage
1. Start the server:
    ```bash
    yarn dev
    ```

2. The server will start on port 3000 by default (or as specified in the `.env` file).

## Available Endpoints
- `/api/datasets`: Operations for datasets
- `/api/auth/login`: User authentication (login)
- `/api/auth/register`: User registration

## Dependencies
- [axios](https://www.npmjs.com/package/axios) - Promise-based HTTP client for making API requests
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Library for hashing passwords
- [cors](https://www.npmjs.com/package/cors) - CORS middleware for Express
- [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from a `.env` file
- [express](https://www.npmjs.com/package/express) - Web framework for Node.js
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - JSON Web Token implementation for Node.js
- [lodash](https://www.npmjs.com/package/lodash) - Utility library for JavaScript
- [mongoose](https://www.npmjs.com/package/mongoose) - MongoDB object modeling for Node.js
- [nodemon](https://www.npmjs.com/package/nodemon) - Utility that automatically restarts the server when changes are detected during development

## Dev Dependencies
- [@types/express](https://www.npmjs.com/package/@types/express) - TypeScript types for Express
- [@types/node](https://www.npmjs.com/package/@types/node) - TypeScript types for Node.js
- [ts-node](https://www.npmjs.com/package/ts-node) - TypeScript execution and REPL for Node.js
- [typescript](https://www.npmjs.com/package/typescript) - TypeScript language server
