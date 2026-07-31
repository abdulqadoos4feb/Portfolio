FROM nginx:1.27-alpine

# Nginx needs the app files on its own filesystem too - it serves static
# assets directly and uses try_files/SCRIPT_FILENAME for routing, even
# though PHP execution itself happens in the app (php-fpm) container.
COPY . /var/www/html/

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q -O /dev/null http://localhost/ || exit 1
