import { NAV_NAME_BARGING_ONLINE_STEP_ONE, NAV_NAME_BARGING_RECAPITULATION, NAV_NAME_BARGING_SCHEDULE, NAV_NAME_CCTV } from "./constant"

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
    }
}

const linking = {
    prefixes: ["https://ap.kppmining.com:8787/poins", "poins://app"],
    config
}

export default linking