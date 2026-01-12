# Use official Bun image
FROM oven/bun:1 as base
WORKDIR /usr/src/app

# Install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Expose port (Server runs on 5000)
EXPOSE 5000

# Start the application
CMD ["bun", "run", "start"]
