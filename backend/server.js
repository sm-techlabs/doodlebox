
require('dotenv').config();
const express = require('express');
const { App } = require('octokit');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const { APP_ID, PRIVATE_KEY_PATH, INSTALLATION_ID, GITHUB_REPO_OWNER, GITHUB_REPO_NAME } = process.env;

if (!APP_ID || !PRIVATE_KEY_PATH || !INSTALLATION_ID || !GITHUB_REPO_OWNER || !GITHUB_REPO_NAME) {
  throw new Error('Missing GitHub App configuration in .env file');
}

const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, "utf8")

const octokitApp = new App({
  appId: APP_ID,
  privateKey: privateKey,
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/spawn', async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const octokit = await octokitApp.getInstallationOctokit(Number(INSTALLATION_ID));

    await octokit.request('POST /repos/{owner}/{repo}/dispatches', {
      owner: 'sm-techlabs',
      repo: 'oci-infra-art',
      event_type: 'deploy-ephemeral-infra',
      client_payload: {
        custom_string: 'this-is-my-string',
      }
    });

    res.json({ message: 'Doodle spawned successfully!' });
  } catch (error) {
    console.error('Error spawning doodle:', error);
    res.status(500).json({ error: 'Failed to spawn doodle' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
