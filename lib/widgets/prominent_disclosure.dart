import 'package:flutter/material.dart';

/// Prominent Disclosure dialog for requesting background location
/// Shows purpose, how location is used, whether it's required, and actions.
class ProminentDisclosureDialog extends StatelessWidget {
  const ProminentDisclosureDialog({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Background location access'),
      content: SingleChildScrollView(
        child: ListBody(
          children: const <Widget>[
            Text(
                'CrowdWave uses your device location in the background to provide continuous delivery tracking and route optimization even when the app is not in use.'),
            SizedBox(height: 8),
            Text(
                'We only collect location data necessary to provide these features and do not share your precise location with third parties except where required for delivery coordination.'),
            SizedBox(height: 8),
            Text(
                'You can decline and still use most app features. Background location is required only for live tracking and automatic route updates while the app is closed.'),
          ],
        ),
      ),
      actions: <Widget>[
        TextButton(
          onPressed: () {
            Navigator.of(context).pop(false);
          },
          child: const Text('Don\'t Allow'),
        ),
        ElevatedButton(
          onPressed: () {
            Navigator.of(context).pop(true);
          },
          child: const Text('Allow'),
        ),
      ],
    );
  }
}
