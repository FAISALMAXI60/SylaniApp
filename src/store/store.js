import { createStore } from 'redux';



const storeInitialState = {
    auth: false,
    course: null,
    batch: null,
    class: null,
    section: null,
    qrData:null,
    qrAuth:false,
}
let store = createStore((state = storeInitialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                auth: true
            }
        case 'LOG_OUT':
            return {
                ...state,
                auth: false
            }
        case 'COURSE':
            return {
                ...state,
                course: action.courseObj
            }
        case 'BATCH':
            return {
                ...state,
                batch: action.batchObj
            }
        case 'CLASS':
            return {
                ...state,
                class: action.classObj
            }
        case 'SECTION':
            return {
                ...state,
                section: action.sectionObj
            }
        case 'QR_DATA':
            return {
                ...state,
                qrData: action.qrData,
                qrAuth: true
            }
        case 'QR_AUTH':
            return {
                ...state,
                qrAuth: false
            }
        default:
            return state
    }
})


export default store;