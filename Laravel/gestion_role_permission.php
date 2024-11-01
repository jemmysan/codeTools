1- Installer Spatie avec Composer :

    composer require spatie/laravel-permission

2- Publier la configuration et les migrations 

    php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"

3- Exécuter les migrations : Cette commande crée les tables roles, permissions, et les tables de relation entre rôles, permissions et utilisateurs.
     
    php artisan migrate

4 - Configurer le modèle utilisateur : Ouvrez le fichier app/Models/User.php et ajoutez le trait HasRoles fourni par Spatie pour permettre au modèle d'utilisateur de gérer les rôles et permissions.

    use Spatie\Permission\Traits\HasRoles;

    class User extends Authenticatable
    {
        use HasRoles;
    }

5 - Créer un Seeder pour les rôles et permissions :

    php artisan make:seeder RolePermissionSeeder

6- Définir les rôles et permissions dans le seeder : Ouvrez database/seeders/RolePermissionSeeder.php et ajoutez du code pour créer les rôles et permissions nécessaires.

    use Spatie\Permission\Models\Role;
    use Spatie\Permission\Models\Permission;

    class RolePermissionSeeder extends Seeder
    {
        public function run()
        {
            // Crée les permissions
            Permission::create(['name' => 'view users']);
            Permission::create(['name' => 'edit users']);
            Permission::create(['name' => 'delete users']);

            // Crée les rôles et leur assigne les permissions
            $adminRole = Role::create(['name' => 'admin']);
            $adminRole->givePermissionTo(['view users', 'edit users', 'delete users']);

            $userRole = Role::create(['name' => 'user']);
            $userRole->givePermissionTo(['view users']);
        }
    }

7 - Exécuter le Seeder :

    php artisan db:seed --class=RolePermissionSeeder

8 - Ajout des methode dans le controller 