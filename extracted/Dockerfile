# MOOL storefront — static site served by nginx.
# Build context is this folder (index.html + css/ + js/).
FROM nginx:1.27-alpine

# Serve only the real site assets (not the backup, Dockerfile, etc.)
COPY index.html /usr/share/nginx/html/index.html
COPY css/       /usr/share/nginx/html/css/
COPY js/        /usr/share/nginx/html/js/

# Container listens on 80; map it to a host port at run time.
EXPOSE 80

# nginx:alpine already runs `nginx -g 'daemon off;'` in the foreground.
