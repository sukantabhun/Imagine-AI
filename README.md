Here's the updated README to reflect the manual start of both the client and server, along with the GitHub repository link:

---

# Imagine AI: AI-Powered Image Generator and Community Showcase

This project is an AI-powered image generator built using Stability AI, with images stored on Cloudinary and links saved in MongoDB. The images can be accessed and viewed in a community showcase, utilizing the MERN stack.

## Features

- **AI Image Generation**: Create unique images using Stability AI's advanced algorithms.
- **Cloud Storage**: Store generated images securely on Cloudinary.
- **MongoDB Integration**: Save image URLs in MongoDB for easy access and retrieval.
- **Community Showcase**: Display generated images in a community-driven gallery.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI Integration**: Stability AI
- **Image Storage**: Cloudinary
- **Full Stack**: MERN (MongoDB, Express.js, React.js, Node.js)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sukantabhun/Imagine-AI.git
   cd Imagine-AI
   ```

2. **Set up environment variables**
   Create a `.env` file in both the `client` and `server` directories and add the following:
   ```env
   # In the server/.env file
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   MONGODB_URI=your_mongodb_uri
   STABILITY_API_KEY=your_stability_api_key
   ```

3. **Install server dependencies and start the server**
   ```bash
   cd server
   npm install
   npm start
   ```

4. **Install client dependencies and start the client**
   Open a new terminal window and run:
   ```bash
   cd client
   npm install
   npm run dev
   ```

## Usage

- **Generate Images**: Use the frontend interface to create images using Stability AI.
- **View Gallery**: Access the community showcase to see all the generated images.
- **Contribute**: Share your generated images with the community by storing them in the showcase.
