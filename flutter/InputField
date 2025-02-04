import 'package:flutter/material.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  String email = '';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Home page'),
          elevation: 12,
        ),
        body: (ListView(
          padding: const EdgeInsets.all(20),
          children: [
            TextField(
              decoration: const InputDecoration(
                  prefixIcon: Icon(Icons.email),
                  hintText: "Entrer votre email",
                  labelText: "E-mail",
                  border: OutlineInputBorder(),
                  helperText: "Votre e-mail doit contenir @ ",
                  filled: true),
              onChanged: (value) {
                setState(() {
                  email = value;
                });
              },
            ),
            Text(email)
          ],
        )));
  }
}
