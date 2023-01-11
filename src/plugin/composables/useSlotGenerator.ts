import type {VueCalyAvailableDate} from "@/plugin/VueCaly";

type VueCalySlotGeneratorTime = [[number,number],[number,number]]

export type VueCalySlotGenerator = {
    // days?: ('mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa' | 'su')[]
    days: number[]
    times: VueCalySlotGeneratorTime[]
    gmtOffset: number
    start: Date
    end: Date
}

const gmtString = (gmtOffset: number): string => `GMT${gmtOffset < 0 ? '-' : '+'}${Math.trunc(Math.abs(gmtOffset))}`

const getVueCalyAvailableDate = (date: Date,
                                 time: VueCalySlotGeneratorTime,
                                 gmtOffset: number): VueCalyAvailableDate => {

    return {
        transparency: "transparent",
        start: {
            dateTime: `${date.toISOString().split('T')[0]} ${time[0][0]}:${time[0][1]}:00 ${gmtString(gmtOffset)}`
        },
        end: {
            dateTime: `${date.toISOString().split('T')[0]} ${time[1][0]}:${time[1][1]}:00 ${gmtString(gmtOffset)}`
        }
    }
}

const defaultConfig: VueCalySlotGenerator = {
    days: [1,2,3,4,5],
    times: [[[9,30],[12,0]],[[13,30],[17,0]]],
    gmtOffset: 1,
    start: new Date(),
    end: new Date(new Date().setMonth(new Date().getMonth()+3)),
}

export default (configs: VueCalySlotGenerator[] = [defaultConfig]): VueCalyAvailableDate[] => {
    const dates: VueCalyAvailableDate[] = []
    let needFiller: false | Date = false

    configs.forEach(config => {
        const startDate = config.start
        startDate.setSeconds(0)
        startDate.setMinutes(0)
        startDate.setHours(0)
        if(config.start.valueOf() < (new Date()).valueOf()) {
            if(needFiller === false) {
                needFiller = config.start
            } else if(config.start.valueOf() < needFiller.valueOf()) {
                needFiller = config.start
            }
        }
        const date = new Date(config.start)
        while (date < config.end) {
            date.setDate(date.getDate() + 1)
            const day = date.getDay()
            if(config.days.includes(day)) {
                config.times.forEach(time => {
                    dates.push(getVueCalyAvailableDate(
                        date,
                        time,
                        config.gmtOffset
                    ))
                })
            }
        }
        if (needFiller !== false) {
            dates.push({
                start: {
                    dateTime: `${needFiller.toISOString().split('T')[0]} 00:00:00 ${gmtString(config.gmtOffset)}`
                },
                end: {
                    dateTime: (new Date).toJSON()
                }
            })
        }
    })
    return dates
}
