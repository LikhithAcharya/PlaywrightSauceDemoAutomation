# Use Microsoft's official Playwright image with Alpine (lightweight)
FROM mcr.microsoft.com/playwright:v1.40.0-alpine

# Set working directory
WORKDIR /app

# Install Node.js (Alpine image needs explicit Node installation)
RUN apk add --no-cache \
    nodejs \
    npm

# Copy package files
COPY package*.json ./

# Install npm dependencies
RUN npm ci

# Install Playwright browsers
RUN npx playwright install

# Copy project files
COPY . .

# Create logs directory
RUN mkdir -p logs

# Set environment variables
ENV NODE_ENV=production
ENV CI=true

# Run Playwright tests
CMD ["npx", "playwright", "test"]
