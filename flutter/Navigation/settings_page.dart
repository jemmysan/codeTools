import 'package:flutter/material.dart';

class MySettingsPage extends StatefulWidget {
  const MySettingsPage({super.key});
  @override
  State<MySettingsPage> createState() => _MySettingsPageState();
}

class _MySettingsPageState extends State<MySettingsPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Settings page'),
        ),
        body: Center(
          child: ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: Text('Retournez Home page')),
        ));
  }
}
