import { NAV_NAME_BARGING_ONLINE_STEP_ONE, NAV_NAME_BARGING_RECAPITULATION, NAV_NAME_BARGING_SCHEDULE, NAV_NAME_CCTV, NAV_NAME_HISTORY_BARGING, NAV_NAME_SENSLOG, NAV_NAME_WEATHER } from "./constant"

const config = {
    screens: {
        [NAV_NAME_BARGING_ONLINE_STEP_ONE]: {
            path: 'bargin-online/step-one'
        },
        [NAV_NAME_BARGING_RECAPITULATION]: {
            path: 'barging-recapitulation'
        },
        [NAV_NAME_BARGING_SCHEDULE]: {
            path: 'barging-schedule'
        },
        [NAV_NAME_CCTV]: {
            path: 'realtime-cctv'
        },
        [NAV_NAME_HISTORY_BARGING]: {
            path: 'history-barging'
        },
        [NAV_NAME_WEATHER]: {
            path: 'weather'
        },
        [NAV_NAME_SENSLOG]: {
            path: 'senslog'
        },
    }
}

const linking = {
    prefixes: ["https://ap.kppmining.com:8787/poins", "poins://app"],
    config
}

export default linking