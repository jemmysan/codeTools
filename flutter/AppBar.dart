import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    theme: ThemeData(
      colorSchemeSeed: Colors.blue,
      scaffoldBackgroundColor: Colors.white,
    ),
    home: HomePage(),
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
        leading: Icon(Icons.menu),
        title: Text('Mon Appli'),
        elevation: 12,
        actions: [
          IconButton(onPressed: (){}, icon: Icon(Icons.search)),
          IconButton(onPressed: (){}, icon: Icon(Icons.more_vert))
        ],
      ),
        body: Center(
      child: Text('Flutter newer'),
    ));
  }
}
