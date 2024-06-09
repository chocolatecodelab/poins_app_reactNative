/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
// import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import navigationService from './src/tools/navigationService';
import { NAV_NAME_NOTIFICATION } from './src/tools/constant';


// notification
// const onMessageReceived = async (message) => {
//     if (message) {
//         await notifee.requestPermission();
//         await notifee.createChannel({
//             id: 'default9',
//             name: 'Default Channel 9',
//             sound: 'cute_sound',
//             badge: true,
//             importance: AndroidImportance.HIGH,
//         });
//         await notifee.displayNotification(JSON.parse(message.data.notifee));
//     }
// }

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const {notification, pressAction} = detail;
    // Penanganan peristiwa latar belakang di sini
    // Misalnya, menampilkan notifikasi berdasarkan peristiwa yang terjadi
    console.log('Background event type:', type);
    console.log('Background event detail:', detail);
    if (type == EventType.ACTION_PRESS && pressAction === 'open-app' || type == EventType.PRESS ) {
        
        navigationService.navigate(NAV_NAME_NOTIFICATION);

        await notifee.cancelNotification(notification.id);
    }
});


// messaging().setBackgroundMessageHandler(onMessageReceived);



AppRegistry.registerComponent(appName, () => App);
