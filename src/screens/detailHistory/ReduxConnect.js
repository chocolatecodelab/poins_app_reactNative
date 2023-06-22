import { connect } from 'react-redux';
import DetailHistoryScreen from './DetailHistory';

const mapStateToProps = state => {
    return ({
        prop: state.prop,
    })
};

const mapDispatchToProps = () => ({
    onEvent: () => { },
});


export default connect(mapStateToProps, mapDispatchToProps)(DetailHistoryScreen);
