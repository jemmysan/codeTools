# Utilisation de l'image officielle PHP
FROM php:7.4-cli

# Définir le répertoire de travail dans le conteneur
WORKDIR /var/www/html

# Copier les fichiers de l'application dans le conteneur
COPY . .

# Mise à jour des paquets et installation des dépendances nécessaires
RUN apt-get update && \
    apt-get install -y zlib1g-dev libpng-dev libjpeg-dev libfreetype6-dev libzip-dev unzip && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install pdo pdo_mysql mysqli gd zip

# Installation de Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Installation des dépendances PHP via Composer
RUN composer install

# Installation de Node.js et npm
RUN apt-get install -y nodejs npm

# Mise à jour de npm
RUN npm install -g npm@latest

# Installation des dépendances npm
RUN npm install

# Exposer le port 80 pour le serveur web
EXPOSE 80

# Commande pour lancer l'application
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=80"]
