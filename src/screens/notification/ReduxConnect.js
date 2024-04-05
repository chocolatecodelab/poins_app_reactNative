import { connect } from 'react-redux';
import { resetHome, downlodingListNotificationAsync } from '../../redux/features/home/homeSlice';
import NotificationScreen from './Notification';

const transformDataBarging = (state) => {
    const dummyData = [
        {
            EndDate: "2023-07-13T08:42:00",
            Customer: "Not Order",
            Barge: "Not Order",
            Tug_Boat: "Not Order",
            StartWeight: 0,
            Target_Barging: 0,
            persentasevolumeProgres: 0,
            Jetty: "JETTY-J",
            Kode: "STAND BY"
        },
        {
            EndDate: "2023-07-13T08:42:00",
            Customer: "Not Order",
            Barge: "Not Order",
            Tug_Boat: "Not Order",
            StartWeight: 0,
            Target_Barging: 0,
            persentasevolumeProgres: 0,
            Jetty: "JETTY-U",
            Kode: "STAND BY"
        },
        {
            EndDate: null,
            Customer: "Not Order",
            Barge: "Not Order",
            Tug_Boat: "Not Order",
            StartWeight: 0,
            Target_Barging: 0,
            persentasevolumeProgres: 0,
            Jetty: "JETTY-K",
            Kode: "STAND BY"
        }
    ];
    if (state.activeBarging.listHistory.length === 0) {
        return dummyData
    } else {
        let data = state.activeBarging.listHistory.map((item) => item);
        return data
    }
};

const mapStateToProps = state => {
    console.log(state.auth.loginInfo.ID)
    return ({
        isError: state.home.isError,
        isInfo: state.home.isInfo,
        message: state.home.message,
        apps: state.home?.apps,
        data: state.home?.notification,
        listHistory: transformDataBarging(state),
        userId: state.auth?.loginInfo?.ID ? state.auth?.loginInfo?.ID : '',
        isDownloadingApps: state.home.isDownloadingApps
    })
};

const mapDispatchToProps = (dispatch) => ({
    onAppear: (userId) => {
        dispatch(resetHome())
        dispatch(downlodingListNotificationAsync(userId))
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
