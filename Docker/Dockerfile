# Utiliser une image de PHP avec Apache
FROM php:8.2.12-apache

# Définir le répertoire de travail dans l'image
WORKDIR /var/www/html

# Installer les dépendances PHP nécessaires pour Laravel
RUN docker-php-ext-install pdo pdo_mysql

# Installer Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copier les fichiers de l'application Laravel dans l'image
COPY . .

# Installer les dépendances PHP via Composer
RUN composer install --no-dev

# Donner les droits nécessaires
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html/storage /var/www/html/bootstrap/cache

# Exposer le port 80 (Apache)
EXPOSE 8080

# Commande par défaut pour démarrer Apache et Laravel
CMD ["apache2-foreground"]


# Commande pour specifier le port a utiliser
# CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=9000"]

