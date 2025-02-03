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
        title: const Text('Column'),
        elevation: 12,
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Text('Text 1'),
          Text('Text 2'),
         Image.network("https://i.pinimg.com/736x/63/9b/4c/639b4ca92fea684055dffeed48960796.jpg")
        ],
      ),
      

    );
  }
}
