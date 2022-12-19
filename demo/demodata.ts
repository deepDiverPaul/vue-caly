import type {VueCalyAvailableDate} from "@/plugin/VueCaly";

export default [
    {
        transparency: 'transparent',
        start: {
            dateTime: '2022-12-21T08:00:00+01:00',
            timeZone: "Europe/Berlin"
        },
        end: {
            dateTime: '2022-12-21T13:00:00+01:00',
            timeZone: "Europe/Berlin"
        }
    },
    {
        start: {
            dateTime: '2022-12-21T09:30:00+01:00',
            timeZone: "Europe/Berlin"
        },
        end: {
            dateTime: '2022-12-21T10:00:00+01:00',
            timeZone: "Europe/Berlin"
        }
    },
    {
        transparency: 'transparent',
        start: {
            dateTime: '2022-12-21T15:00:00+01:00',
            timeZone: "Europe/Berlin"
        },
        end: {
            dateTime: '2022-12-21T17:00:00+01:00',
            timeZone: "Europe/Berlin"
        }
    }
] as VueCalyAvailableDate[]