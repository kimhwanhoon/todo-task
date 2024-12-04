# Todo App

## How to run

```bash
# 1. Clone the project and install dependencies
git clone <repository-url>
cd todo-task
npm install

# 2. Set environment variables
echo "VITE_API_URL=http://localhost:3001" > .env.local

# 3. Run the application
# Terminal 1: Start the JSON server (port 3001)
npm run server

# Terminal 2: Start the Vite development server (port 3000)
npm run dev
```

## Why used json-server?

- It's simple and easy to use.
- It provides a realistic simulation of a RESTful API server with minimal setup

## Time tracking note

- 11:10 - 11:20: Project setup
- 11:20 - 11:50: Basic components
- 11:50 - 12:00: Styling
- 12:00 - 13:10: Hooks & App logic
- 13:10 - 13:20: Readme

## Notes

As I have primarily worked with Next.js recently, this was my first experience using Vite.
While this led to some additional time spent on project setup, it was a valuable learning experience that helped me understand the differences between these build tools.
Vite's fast development server and build performance were particularly impressive.
