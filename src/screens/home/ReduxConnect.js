import { connect } from 'react-redux';
import { downlodingCheckVersionAsync, downlodingMenuAppsAsync, resetHome } from '../../redux/features/home/homeSlice';
import { downlodingProfileAsync, resetProfile } from '../../redux/features/profile/profileSlice';
import HomeScreen from './Home';

const mapStateToProps = state => {
    return ({
        isError: state.home.isError,
        message: state.home.message,
        apps: state.home.apps,
        userId: state.auth?.loginInfo?.ID ? state.auth?.loginInfo?.ID : '',
    })
};

const mapDispatchToProps = (dispatch) => ({
    onAppear: (userId) => {
        dispatch(downlodingProfileAsync(userId))
        dispatch(downlodingMenuAppsAsync())
        dispatch(downlodingCheckVersionAsync())
        dispatch(resetHome())
        dispatch(resetProfile())
    },
    onCloseModalError: () => {
        dispatch(resetHome())
        dispatch(resetProfile())
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
