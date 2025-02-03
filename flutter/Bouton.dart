import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    theme: ThemeData(
      colorSchemeSeed: Colors.green,
      scaffoldBackgroundColor: Colors.white,
    ),
    home: HomePage(),
    debugShowCheckedModeBanner: false,
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
  Color bg = Colors.white;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: bg,
        body: ListView(
          padding: EdgeInsets.only(top: 50, left: 20, right: 20),
          children: [
            ElevatedButton(
                onPressed: () {
                  setState(() {
                    bg = Colors.orange;
                  });
                },
                child: Text('Button avec elevation'),
                style: ElevatedButton.styleFrom(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    backgroundColor: Colors.orange,
                    elevation: 12)),
            OutlinedButton(
                onPressed: () {
                  setState(() {
                    bg = Colors.red;
                  });
                },
                child: Text('Bouton avec contour'),
                style: OutlinedButton.styleFrom(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  backgroundColor: Colors.red,
                )),
            TextButton(
                onPressed: () {
                  setState(() {
                    bg = Colors.green;
                  });
                },
                child: Text('Bouton avec Text'),
                style: TextButton.styleFrom(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  backgroundColor: Colors.green,
                )),
            IconButton(
                onPressed: () {
                  setState(() {
                    bg = Colors.yellow;
                  });
                },
                icon: Icon(Icons.home),
                style: OutlinedButton.styleFrom(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  backgroundColor: Colors.yellow,
                ))
          ],
        ));
  }
}
