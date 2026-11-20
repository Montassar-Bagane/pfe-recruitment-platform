# ==========================================
# Build Stage
# ==========================================
FROM node:18-alpine AS builder

WORKDIR /app

# Enable legacy OpenSSL for Angular 13 compatibility
ENV NODE_OPTIONS="--openssl-legacy-provider"

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies (using legacy peer deps for ng-zorro compatibility)
RUN npm install --legacy-peer-deps

# Copy application source
COPY . .

# Build production bundle
RUN npm run build -- --configuration production

# ==========================================
# Production Stage with Nginx
# ==========================================
FROM nginx:1.25-alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static files
COPY --from=builder /app/dist/pfe /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
