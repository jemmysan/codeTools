import 'package:flutter/material.dart';
import 'package:first_app/pages/discussion.dart';
import 'package:first_app/pages/actus.dart';
import 'package:first_app/pages/communaute.dart';
import 'package:first_app/pages/appel.dart';

void main() {
  runApp(MaterialApp(
      theme: ThemeData(
        colorSchemeSeed: Colors.green,
        scaffoldBackgroundColor: Colors.white,
      ),
      home: HomePage()));
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() {
    return HomePageState();
  }
}

class HomePageState extends State<HomePage> {
  final pages = [Discussion(), Actus(), Communaute(), Appel()];
  int pageIndex = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('List View'),
        elevation: 12,
      ),
      body: pages[pageIndex],
      bottomNavigationBar: Container(
        decoration : const BoxDecoration(
          border: Border(
            top : BorderSide(color: Colors.grey, width: 1)
          )
        ),
        child:  NavigationBar(
        backgroundColor: Colors.white,
          selectedIndex: pageIndex,
          onDestinationSelected: (int index) {
            setState(() {
              pageIndex = index;
            });
          },
          destinations: const [
            NavigationDestination(
                icon: Icon(Icons.message), label: 'Discussions'),
            NavigationDestination(
                icon: Icon(Icons.filter_tilt_shift), label: 'Actus'),
            NavigationDestination(
                icon: Icon(Icons.group), label: 'Communautés'),
            NavigationDestination(icon: Icon(Icons.phone), label: 'Appels')
          ]),
      )
    );
  }
}
