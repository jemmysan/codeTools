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
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Container'),
        elevation: 12,
      ),
      body: Container(
        child :  Text("Container"),
        alignment: Alignment.center,
        padding: const EdgeInsets.all(20),
        margin : const EdgeInsets.all(20),
        height: 200,
        decoration: BoxDecoration(
          color: Colors.blue,
          borderRadius: BorderRadius.circular(20)
        ),
        
      )

    );
  }
}
