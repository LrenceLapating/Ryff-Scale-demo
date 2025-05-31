# Running the Ryff PWB Assessment System

This guide provides detailed instructions for setting up, running, and troubleshooting the Ryff PWB Assessment System.

## Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Detailed Setup Instructions

### System Requirements

- **Node.js**: Version 18.x or higher
- **RAM**: At least 4GB recommended
- **Disk Space**: At least 500MB free space
- **Browser**: Latest versions of Chrome, Firefox, Edge, or Safari

### Step-by-Step Installation

1. **Clone or download the repository**:
   ```bash
   git clone https://github.com/your-username/ryff-pwb-system.git
   cd ryff-pwb-system
   ```

2. **Install dependencies**:
   ```bash
   # Use --legacy-peer-deps flag to handle React 19 compatibility issues
   npm install --legacy-peer-deps
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   - Open your browser and navigate to [http://localhost:3000](http://localhost:3000)
   - If port 3000 is in use, the application will automatically use the next available port (e.g., 3001)

## Configuration Options

### Environment Variables

Create a `.env.local` file in the root directory to customize the application:

```
# Server configuration
PORT=3000

# Feature flags
ENABLE_ANALYTICS=true
ENABLE_NOTIFICATIONS=true

# API endpoints (for future use)
API_URL=http://localhost:8000/api
```

### Custom Port

To run the application on a specific port:

```bash
# Windows (CMD)
set PORT=8080 && npm run dev

# Windows (PowerShell)
$env:PORT=8080; npm run dev

# Linux/macOS
PORT=8080 npm run dev
```

## Troubleshooting

### Common Issues and Solutions

#### Installation Problems

**Issue**: Dependency conflicts with React 19
```
npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree
```

**Solution**: Use the `--legacy-peer-deps` flag
```bash
npm install --legacy-peer-deps
```

#### Runtime Errors

**Issue**: "Module not found" errors
```
Error: Cannot find module '@/components/ui/...'
```

**Solution**: Check import paths and ensure all dependencies are installed correctly
```bash
# Reinstall dependencies
rm -rf node_modules
npm install --legacy-peer-deps
```

**Issue**: Port already in use
```
Error: Port 3000 is already in use
```

**Solution**: Kill the process using the port or use a different port
```bash
# Find and kill the process (Linux/macOS)
lsof -i :3000
kill -9 <PID>

# Find and kill the process (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or specify a different port
PORT=3001 npm run dev
```

### Performance Optimization

If the application is running slowly:

1. **Development Mode**: The application runs slower in development mode due to hot reloading and debugging tools
2. **Build for production** for better performance:
   ```bash
   npm run build
   npm run start
   ```
3. **Reduce browser extensions**: Disable unnecessary browser extensions when testing

## Deployment Options

### Vercel (Recommended)

1. Push your repository to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

### Docker

1. Build the Docker image:
   ```bash
   docker build -t ryff-pwb-system .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 ryff-pwb-system
   ```

### Traditional Hosting

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `.next` folder and other necessary files to your hosting provider

## Development Workflow

### Running Tests

```bash
# Run all tests
npm test

# Run specific tests
npm test -- -t "dashboard tests"
```

### Linting

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix
```

### Building for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm run start
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/en-US/api)

## Support

If you encounter any issues not covered in this guide, please:

1. Check the [GitHub Issues](https://github.com/your-username/ryff-pwb-system/issues) for similar problems
2. Create a new issue with detailed information about the problem
3. Contact the development team at support@example.com 