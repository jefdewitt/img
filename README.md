# img
A MERN stack web app, inspirational meme gallery (img) incorporates a full-stack, three-tier distributed system architecture.

## Stack
M = MongoDB
E = ExpressJS
R = React
N = NodeJS
## Architecturual Components
A React web app powers the front-end. Hosted on GitHub Pages, it reaches out to Node app hosted on Heroku.

The Node app leverages the Express framework to build out the backend server logic, providing an API that queries a cloud-based MongoDB instance. This database primarily stores image URLs and meme collections data.

Rounding out the system, images are stored in an S3 bucket in the AWS suite of cloud services.
