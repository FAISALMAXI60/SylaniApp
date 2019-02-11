export const login = () => {
    return {
        type:'LOG_IN'
    }
}
export const logout = () => {
    return {
        type:'LOG_OUT'
    }
}
export const courseHandler = (courseObj) => {
    return {
        type:'COURSE',
        courseObj
    }
}
export const batchHandler = (batchObj) => {
    return {
        type:'BATCH',
        batchObj
    }
}
export const classHandler = (classObj) => {
    return {
        type:'CLASS',
        classObj
    }
}
export const sectionHandler = (sectionObj) => {
    return {
        type:'SECTION',
        sectionObj
    }
}
export const qrHandler = (qrData) => {
    return {
        type:'QR_DATA',
        qrData
    }
}
export const qrAuthHandler = () => {
    return {
        type:'QR_AUTH'
    }
}