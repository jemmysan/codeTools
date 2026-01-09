# Utilisez des chaînes aléatoires longues pour les clés secrets
 node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"