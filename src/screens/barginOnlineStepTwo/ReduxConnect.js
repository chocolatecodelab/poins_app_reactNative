import { connect } from 'react-redux';
import { downloadingListBookingAsync, downloadingTimeBookingAsync, resetStatuBarginOnline, uploadingBarginAsync } from '../../redux/features/barginOnline/barginOnlineSlice';
import { NAV_NAME_HOME_MENU } from '../../tools/constant';
import { stringMonth } from '../../tools/helper';
import NavigationService from '../../tools/navigationService';
import BarginOnlineStepTwoScreen from './BarginOnlineStepTwo';

const enumerateDaysBetweenDates = (state) => {
    const ListBooking = state.barginOnline.listBooking
    let from = new Date();
    let to = new Date();
    to.setDate(to.getDate() + 15);
    let now = from
    let dates = [];
    for (let i = 0; i < 15; i++) {
        let labelMonth = stringMonth[now.getMonth()]
        let day = now.getUTCDate();
        let year = now.getUTCFullYear();
        dates.push({
            day: day,
            month: now.getMonth(),
            year: year,
            labelMonth,
            isBooked: false
        });
        now.setDate(now.getDate() + 1);
    }

    for (let i = 0; i < dates.length; i++) {
        for (let j = 0; j < ListBooking.length; j++) {
            let convertBookingDate = new Date(ListBooking[j].bookingDate).getDate()
            if (dates[i].day === convertBookingDate) {
                dates[i].isBooked = true;
            }
        }
    }
    return dates;
};

const enumerateSelectedHours = (state) => {
    const hours = Array.from(Array(24), (_, i) => ({
        hour: i,
    }))
    return hours;
};

const mapStateToProps = (state, props) => {
    return ({
        isUploading: state.barginOnline.isUploading,
        isUploadingSuccess: state.barginOnline.isUploadingSuccess,
        isError: state.barginOnline.isError,
        message: state.barginOnline.message,
        props: props.route.params,
        userId: state.auth?.loginInfo?.ID ? state.auth?.loginInfo?.ID : '',
        listDate: enumerateDaysBetweenDates(state),
        hours: enumerateSelectedHours(state),
        listTime: state.barginOnline.listTime,
        isLoadingTimeBooking: state.barginOnline.isLoadingTimeBooking,
    })
};

const mapDispatchToProps = (dispatch) => ({
    onAppear: (id) => {
        dispatch(downloadingListBookingAsync(id))
    },
    onSubmitPressed: (props, selectTime, selectedDay, userId, setIsOrder) => {
        const data = {
            Company: props?.selectCompany,
            Barge: props?.selectBarge,
            TugBoat: props?.selectTugBoat,
            Jetty: props?.jetty,
            Capacity: props?.selectCapacity,
            ProcessTime: props?.duration,
            DateBooking: `${selectedDay?.year}-${selectedDay?.month + 1}-${selectedDay?.day}`,
            StartTIme: selectTime,
            Id_User: userId,
            Vessel: props?.vessel
        }
        dispatch(uploadingBarginAsync(data))
        setIsOrder(false)
    },
    onSelectedDatePressed: (selectedDay) => {
        const date = `${selectedDay?.year}-${selectedDay?.month + 1}-${selectedDay?.day}`
        dispatch(downloadingTimeBookingAsync(date))
    },
    onCloseModalSuccess: () => {
        dispatch(resetStatuBarginOnline())
        NavigationService.reset(NAV_NAME_HOME_MENU)
    },
    onCloseModalError: () => {
        dispatch(resetStatuBarginOnline())
        return NavigationService.back()
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(BarginOnlineStepTwoScreen);
