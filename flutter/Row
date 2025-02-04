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
        title: const Text('Row'),
        elevation: 12,
        
      ),
      body: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Icon(Icons.thumb_up),
         Image.network("https://i.pinimg.com/736x/63/9b/4c/639b4ca92fea684055dffeed48960796.jpg",
         width: 200,),
          Icon(Icons.thumb_down),
        ],
      ),
      

    );
  }
}
