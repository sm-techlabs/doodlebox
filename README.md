# Doodlebox Prototype

This is a minimal full-stack prototype for the Doodlebox app.

## Running the Application

### Backend

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory and add the following environment variables:
    ```
    APP_ID=your_app_id
    PRIVATE_KEY="your_private_key"
    INSTALLATION_ID=your_installation_id
    GITHUB_REPO_OWNER=your_repo_owner
    GITHUB_REPO_NAME=your_repo_name
    ```
4.  Start the backend server:
    ```bash
    node server.js
    ```
    The server will be running at `http://localhost:3000`.

### Frontend

1.  Open the `frontend/index.html` file in your web browser.

## How to Use

1.  Enter your username in the input field.
2.  Click the "Magic Button" to trigger the GitHub Actions workflow.
3.  You will see a success or error message below the button.
