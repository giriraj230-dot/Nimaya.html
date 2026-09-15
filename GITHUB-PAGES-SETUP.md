# GitHub Pages setup

This project is a Vite + React app. GitHub cannot display the source project as a website just by opening `index.html` in the repository. It must be built first.

## Upload
Upload the CONTENTS of this folder to the root of your GitHub repository. Make sure `.github/workflows/deploy-pages.yml` is included.

## Turn on Pages
1. Open the repository on GitHub.
2. Go to **Settings > Pages**.
3. Under **Build and deployment > Source**, choose **GitHub Actions**.
4. Go to the **Actions** tab and wait for **Deploy website to GitHub Pages** to finish.
5. Return to **Settings > Pages** and open the published site link.

Every future push to the `main` branch will rebuild and publish the site automatically.
