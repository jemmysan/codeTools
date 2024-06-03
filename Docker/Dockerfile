# Utilisation de l'image officielle PHP 7.4
FROM php:7.4-cli

# Définir le répertoire de travail dans le conteneur
WORKDIR /var/www/html

# Copier les fichiers de l'application dans le conteneur
COPY . .

# Copier wait-for-it.sh dans le conteneur et le rendre exécutable
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Mise à jour des paquets et installation des dépendances nécessaires
RUN apt-get update && \
    apt-get install -y zlib1g-dev libpng-dev libjpeg-dev libfreetype6-dev libzip-dev unzip curl && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install pdo pdo_mysql mysqli gd zip

# Installation de Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Installation de Node.js v18 et npm
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Mise à jour de npm
RUN npm install -g npm@latest

# Installation des dépendances npm
RUN npm install

# Exposer le port 80 pour le serveur web
EXPOSE 80

# Commande pour lancer l'application avec wait-for-it.sh
CMD ["wait-for-it.sh", "db:3306", "--", "php", "artisan", "serve", "--host=0.0.0.0", "--port=80"]