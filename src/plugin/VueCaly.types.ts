export type VueCalyAppointment = {
    date: null | number
    time: null | string
}

export type VueCalyPluginOptions = {
    lang?: 'en'
}

export type VueCalyAvailableDate = {
    transparency?: 'transparent'
    start: {
        dateTime: string
        timeZone: string
    }
    end: {
        dateTime: string
        timeZone: string
    }
}

export type VueCalySlot = {
    start: number
    end: number
}

export type VueCalyObject = {
    date: string
    time: string
    dateObject: Date
    string: string
}