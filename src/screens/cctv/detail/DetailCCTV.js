import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { VLCPlayer, VlCPlayerView } from 'react-native-vlc-media-player'
import { getScreenDimension } from '../../../tools/helper';

const DetailCCTV = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const playerRef = useRef(null);

    useEffect(() => {
        // Listen for orientation changes
        Orientation.addOrientationListener(handleOrientationChange);

        // Clean up the event listener on unmount
        return () => {
            Orientation.removeOrientationListener(handleOrientationChange);
        };
    }, []);
    const handleFullScreenToggle = () => {
        setIsFullScreen(!isFullScreen);
        if (!isFullScreen) {
            Orientation.lockToLandscape();
        } else {
            Orientation.lockToPortrait();
        }
    };

    const handleOrientationChange = (orientation) => {
        setIsFullScreen(orientation === 'LANDSCAPE');
    };
    return (
        <View>
            <VLCPlayer
                ref={playerRef}
                style={isFullScreen ? styles.videoFullScreen : styles.video}
                videoAspectRatio="16:9" // Adjust the aspect ratio based on your video
                autoplay={true}
                source={{ uri: 'YOUR_VIDEO_URL' }}
            />
        </View>
    )
}

export default DetailCCTV

const styles = StyleSheet.create({
    video: {
        width: '100%',
        height: 200, // Adjust the height as needed
    },
    videoFullScreen: {
        width: getScreenDimension().height,
        height: getScreenDimension().width,
    },
})