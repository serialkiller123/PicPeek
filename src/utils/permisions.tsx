import {Platform, PermissionsAndroid, Linking, Alert} from 'react-native';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

function openAppSettings() {
  Linking.openSettings();
}

async function requestMediaPermissions() {
  if (Platform.OS === 'android') {
    try {
      const permissionsToRequest = [
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,

        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
        // PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ];

      const granted = await PermissionsAndroid.requestMultiple(
        permissionsToRequest,
      );

      const allPermissionsGranted = permissionsToRequest.every(
        permission =>
          granted[permission] === PermissionsAndroid.RESULTS.GRANTED,
      );

      if (allPermissionsGranted) {
        console.log('Media permissions granted');
      } else {
        Alert.alert(
          'Permission required',
          'Allow VideoBox to access your storage',
          [
            {
              text: 'Open Settings',
              onPress: () => openAppSettings(),
            },
          ],
          {cancelable: false},
        );
        console.log('Media permissions denied');
      }
    } catch (error) {
      console.warn('Error requesting media permissions:', error);
    }
  }
}

async function checkMediaPermissions() {
  try {
    const permissionsToCheck = [
      PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,

      PERMISSIONS.ANDROID.RECORD_AUDIO,
      PERMISSIONS.ANDROID.CAMERA,
      // PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ];

    const permissionResults = await Promise.all(
      permissionsToCheck.map(permission => check(permission)),
    );

    const allPermissionsGranted = permissionResults.every(
      result => result === RESULTS.GRANTED,
    );

    if (allPermissionsGranted) {
      console.log('Media permissions already granted');
    } else {
      requestMediaPermissions();
    }
  } catch (error) {
    console.warn('Error checking media permissions:', error);
  }
}

export default checkMediaPermissions;
