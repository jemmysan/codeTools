import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(home: HomePage()));
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() {
    return HomePageState();
  }
}

class HomePageState extends State<HomePage> {
  final List contacts = [
    'Jean Malick MENDY',
    "Jean Louis CORREA",
    "Inès Marie A. KOTE"
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('List View'),
          elevation: 12,
        ),
        body: ListView.separated(
          itemCount: contacts.length,
          itemBuilder: (context, index) {
            return Container(
              margin: const EdgeInsets.all(10),
              child: Text(contacts[index]),
            );
          },
          separatorBuilder: (context, index) {
            return Divider();
          },
        ));
  }
}
