#!/bin/bash

# Update Browser key (auto created by Firebase)
echo "Updating Browser key restrictions..."
gcloud services api-keys update 3bd32310-ea67-48e2-a813-8a149aef1fb3 \
  --project=crowdwave-93d4d \
  --clear-restrictions \
  --api-target=service=firebasedatabase.googleapis.com \
  --api-target=service=firebasehosting.googleapis.com \
  --api-target=service=firebaserules.googleapis.com \
  --api-target=service=sqladmin.googleapis.com \
  --api-target=service=cloudconfig.googleapis.com \
  --api-target=service=datastore.googleapis.com \
  --api-target=service=fcmregistrations.googleapis.com \
  --api-target=service=firebase.googleapis.com \
  --api-target=service=firebaseappcheck.googleapis.com \
  --api-target=service=firebaseappdistribution.googleapis.com \
  --api-target=service=firebaseapphosting.googleapis.com \
  --api-target=service=firebaseapptesters.googleapis.com \
  --api-target=service=firebasedataconnect.googleapis.com \
  --api-target=service=firebaseinappmessaging.googleapis.com \
  --api-target=service=firebaseinstallations.googleapis.com \
  --api-target=service=firebaseml.googleapis.com \
  --api-target=service=firebaseremoteconfig.googleapis.com \
  --api-target=service=firebaseremoteconfigrealtime.googleapis.com \
  --api-target=service=firebasestorage.googleapis.com \
  --api-target=service=generativelanguage.googleapis.com \
  --api-target=service=firestore.googleapis.com \
  --api-target=service=identitytoolkit.googleapis.com \
  --api-target=service=logging.googleapis.com \
  --api-target=service=mlkit.googleapis.com \
  --api-target=service=securetoken.googleapis.com \
  --api-target=service=places-backend.googleapis.com \
  --api-target=service=geocoding-backend.googleapis.com \
  --api-target=service=maps-backend.googleapis.com

echo "Done! Changes may take 5 minutes to propagate."
