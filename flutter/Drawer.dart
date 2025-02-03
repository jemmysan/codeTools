import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    theme: ThemeData(
      colorSchemeSeed: Colors.blue,
      scaffoldBackgroundColor: Colors.white,
    ),
    home: const HomePage(),
  ));
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});
  @override
  State<HomePage> createState() {
    return HomePageState();
  }
}

class HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Theme.of(context).colorScheme.inversePrimary,
          title: const Text('Mon Appli'),
          elevation: 12,
          actions: [
            IconButton(onPressed: () {}, icon: const Icon(Icons.search)),
            IconButton(onPressed: () {}, icon: const Icon(Icons.more_vert))
          ],
        ),
        drawer: Drawer(
          child: ListView(
            children: [
               const DrawerHeader(
                  decoration: BoxDecoration(
                    color: Colors.blue,
                  ),
                  child: Text('Menu')
              ),
                  ListTile(
                    leading : Icon(Icons.settings),
                    title: Text('Paramètre'),
                    subtitle: Text('Page de paramètre'),
                    trailing: Icon(Icons.chevron_right),
                    onTap : (){},
                  ),

                  ListTile(
                    leading : Icon(Icons.account_box),
                    title: Text('Profil'),
                    onTap : (){},
                  ),
                   ListTile(
                    leading : Icon(Icons.help),
                    title: Text('Help'),
                    onTap : (){},
                  ), 
                   ListTile(
                    leading : Icon(Icons.close),
                    title: Text('Quitter'),
                    onTap : (){},
                  )
            ],
          ),
        ),
        body: const Center(child: Text('Flutter newer')));
  }
}
