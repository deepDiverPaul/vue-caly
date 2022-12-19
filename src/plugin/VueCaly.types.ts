export type VueCalyAppointment = {
    date: null | number | string
    time: null | string | number
}

export type VueCalyPluginOptions = {
    lang?: 'en'
}

export type VueCalyAvailableDate = {
    transparency?: 'transparent'
    start: {
        dateTime: string
    }
    end: {
        dateTime: string
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
