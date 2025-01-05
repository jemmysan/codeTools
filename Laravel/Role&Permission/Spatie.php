Voici un guide étape par étape pour configurer et utiliser **Spatie Laravel Permission** dans Laravel 11 afin de gérer les rôles et permissions.

---

## Étape 1 : Installer le package

### Commande d'installation
Dans le terminal, exécutez la commande suivante pour installer le package :

```bash
composer require spatie/laravel-permission
```

---

## Étape 2 : Publier les fichiers de configuration et de migration

Publiez les fichiers nécessaires (config et migrations) avec la commande suivante :

```bash
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
```

Cela va générer :
- Le fichier de configuration : `config/permission.php`
- Les fichiers de migration pour les tables des rôles et permissions dans `database/migrations`.

---

## Étape 3 : Lancer les migrations

Créez les tables nécessaires en exécutant les migrations :

```bash
php artisan migrate
```

Cela créera les tables suivantes dans la base de données :
1. `roles`
2. `permissions`
3. `model_has_roles`
4. `model_has_permissions`
5. `role_has_permissions`

---

## Étape 4 : Configurer le modèle utilisateur

Ajoutez le trait `HasRoles` dans le modèle `User` pour gérer les rôles et permissions.

### Exemple
```php
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles;

    // Autres configurations...
}
```

---

## Étape 5 : Ajouter un middleware pour les permissions

Spatie fournit un middleware prêt à l'emploi pour vérifier les rôles ou permissions.

Ajoutez ces middlewares dans `app/Http/Kernel.php` :

```php
protected $routeMiddleware = [
    // Autres middlewares...
    'role' => \Spatie\Permission\Middlewares\RoleMiddleware::class,
    'permission' => \Spatie\Permission\Middlewares\PermissionMiddleware::class,
];
```

---

## Étape 6 : Créer des rôles et permissions

Utilisez les commandes artisan ou le code dans vos contrôleurs.

### Avec les commandes artisan

Pour créer des rôles :
```bash
php artisan permission:create-role "Admin"
php artisan permission:create-role "User"
```

Pour créer des permissions :
```bash
php artisan permission:create-permission "edit articles"
php artisan permission:create-permission "delete articles"
```

### Avec le code PHP
Dans un seed, un contrôleur ou Tinker :

```php
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

// Créer des rôles
$adminRole = Role::create(['name' => 'Admin']);
$userRole = Role::create(['name' => 'User']);

// Créer des permissions
$editPermission = Permission::create(['name' => 'edit articles']);
$deletePermission = Permission::create(['name' => 'delete articles']);

// Assigner des permissions à un rôle
$adminRole->givePermissionTo('edit articles');
$adminRole->givePermissionTo('delete articles');

// Assigner un rôle à un utilisateur
$user = User::find(1);
$user->assignRole('Admin');
```

---

## Étape 7 : Vérification des rôles et permissions

Vous pouvez vérifier si un utilisateur a un rôle ou une permission avec les méthodes fournies par Spatie.

### Vérification des rôles
```php
if ($user->hasRole('Admin')) {
    // L'utilisateur a le rôle Admin
}
```

### Vérification des permissions
```php
if ($user->can('edit articles')) {
    // L'utilisateur peut éditer des articles
}
```

### Vérification des multiples rôles/permissions
```php
if ($user->hasAnyRole(['Admin', 'User'])) {
    // L'utilisateur a au moins un des rôles spécifiés
}

if ($user->hasAllRoles(['Admin', 'User'])) {
    // L'utilisateur a tous les rôles spécifiés
}
```

---

## Étape 8 : Utiliser le middleware dans les routes

Appliquez le middleware `role` ou `permission` dans vos routes pour sécuriser les actions.

### Exemple de routes protégées par des rôles :
```php
Route::get('/admin', function () {
    return 'Bienvenue Admin';
})->middleware('role:Admin');
```

### Exemple de routes protégées par des permissions :
```php
Route::get('/edit-article', function () {
    return 'Page d\'édition';
})->middleware('permission:edit articles');
```

---

## Étape 9 : Modifier les rôles et permissions

### Ajouter ou retirer des rôles à un utilisateur :
```php
$user = User::find(1);

// Assigner un rôle
$user->assignRole('Admin');

// Retirer un rôle
$user->removeRole('Admin');

// Synchroniser les rôles (supprime les anciens et ajoute les nouveaux)
$user->syncRoles(['Admin', 'User']);
```

### Ajouter ou retirer des permissions à un rôle :
```php
$role = Role::findByName('Admin');

// Assigner une permission
$role->givePermissionTo('edit articles');

// Retirer une permission
$role->revokePermissionTo('delete articles');

// Synchroniser les permissions
$role->syncPermissions(['edit articles', 'delete articles']);
```

---

## Étape 10 : Utilisation avancée

### Lier des permissions directement à un utilisateur
```php
$user = User::find(1);
$user->givePermissionTo('edit articles');
```

### Supprimer des permissions d'un utilisateur
```php
$user->revokePermissionTo('edit articles');
```

### Réinitialiser toutes les permissions d'un utilisateur
```php
$user->syncPermissions([]);
```

---

## Étape 11 : Déboguer les rôles et permissions

### Voir les rôles d’un utilisateur
```php
$user->getRoleNames(); // Retourne une collection de rôles
```

### Voir les permissions d’un utilisateur
```php
$user->getAllPermissions(); // Retourne une collection de permissions
```

---

En suivant ces étapes, vous aurez un système complet et robuste pour gérer les rôles et permissions dans Laravel 11 en utilisant **Spatie Laravel Permission**.