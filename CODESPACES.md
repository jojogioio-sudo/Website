# Using GitHub Codespaces

## Quick Start

1. Go to your GitHub repository: https://github.com/jojogioio-sudo/Website
2. Click the **Code** button (green button)
3. Select **Codespaces** tab
4. Click **Create codespace on claude/zivildienst-rating-site-smkzP**
5. Wait for the Codespace to load (1-2 minutes)

## Running the Application

Once Codespaces loads:

1. Open the terminal (Ctrl+` or View → Terminal)
2. Run:
   ```bash
   npm install
   npm start
   ```
3. After "Server running on http://localhost:3000", GitHub will show a notification
4. Click "Open in Browser" or look for the forwarded port notification
5. You'll get a private URL like: `https://your-username-abc123.preview.app.github.dev/`

## Features

- ✅ Fully private - only you can access it
- ✅ Runs in the cloud - no local setup needed
- ✅ Shareable link - copy URL to share with specific people
- ✅ Free tier available
- ✅ Auto-saves your work to GitHub

## Stopping & Restarting

- **Stop**: Close the Codespace tab
- **Restart**: Go back to Code → Codespaces, click on your Codespace
- **Delete**: Click the three dots → Delete (frees up your free tier minutes)

## Tips

- The terminal may show "npm: command not found" - just wait a few seconds after the Codespace opens, Node.js is still installing
- If you close and reopen the Codespace, run `npm start` again
- Your changes are automatically saved to the branch
