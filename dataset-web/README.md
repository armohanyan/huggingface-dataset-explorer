# Dataset Web

## Description
Dataset Web is a React web application built using Vite with TypeScript. Its primary goal is to explore datasets from Hugging Face. The application utilizes Redux for state management, Axios for API requests, and PrimeReact for UI components.

## Features
- Explore datasets from Hugging Face
- Display dataset details
- Perform CRUD operations on datasets
- User authentication

## Prerequisites
- Node.js version 20
- Yarn
- TypeScript
- Vite

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/dataset-web.git
    ```

2. Navigate into the project directory:    ```bash
    cd dataset-web
    ```

3. Install dependencies:
    ```bash
    yarn install
    ```

## Configuration
1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file:
    ```
   VITE_SERVER_BASE_URL=http://localhost:3000
    ```

## Usage
1. Run the development server:
    ```bash
    yarn dev
    ```

2. Open your web browser and navigate to `http://localhost:5173` to view the app.

## Building for Production
To build the app for production, run:
```bash
yarn build
