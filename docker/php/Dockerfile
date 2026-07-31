FROM php:8.2-fpm

WORKDIR /var/www/html

# Copy application source
COPY . /var/www/html/

# Correct ownership/permissions for files served by php-fpm's www-data user
RUN chown -R www-data:www-data /var/www/html \
    && find /var/www/html -type d -exec chmod 755 {} \; \
    && find /var/www/html -type f -exec chmod 644 {} \;

EXPOSE 9000
