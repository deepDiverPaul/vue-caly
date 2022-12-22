import {padding} from "@/plugin/composables/useHelpers";
import type {VueCalyAppointment, VueCalyAvailableDate, VueCalySlot} from "@/plugin/VueCaly";

export default (dates:VueCalyAvailableDate[] = [], duration = 30, gap= 30, pause= 15) => {
    const freeSlots: VueCalySlot[] = []
    const ret: VueCalyAppointment[] = []

    const free = dates.filter(d => d.transparency === "transparent")
    const busy = dates.filter(d => d.transparency !== "transparent")

    free.forEach(f => {
        const temp: VueCalySlot[] = [
            {
                start: Date.parse(f.start.dateTime),
                end: Date.parse(f.end.dateTime)
            }
        ]
        busy.forEach(b => {
            const bStart = Date.parse(b.start.dateTime)
            const bEnd = Date.parse(b.end.dateTime) + pause*60000

            temp.forEach((t, ti) => {
                if (bStart <= t.start && bEnd >= t.end) {
                    temp.splice(ti, 1)
                    return
                }
            })


            temp.forEach((t) => {
                if (bStart >= t.start && bEnd <= t.end){ // inmitten von Slot
                    temp.push({
                        start: bEnd,
                        end: t.end
                    })
                    t.end = bStart
                    return
                }
                if (bStart > t.start && bStart < t.end && bEnd >= t.end){ // geht übers Ziel hinaus
                    t.end = bStart
                    return
                }
                if (bStart <= t.start && bEnd <= t.end && bEnd >= t.start){ // beginnt davor
                    t.start = bEnd
                    return
                }
                return
            })
        })
        temp.forEach(s => {
            freeSlots.push(s)
        })
    })
    freeSlots.forEach(fs => {
        let open = true
        const slStart = fs.start
        const slEnd = fs.end
        let start = slStart
        let end = slStart + (duration*60000)
        do {
            if(end <= slEnd){
                const date = new Date(start)
                const sl = {
                    date: date.getFullYear() + '-' + padding(date.getMonth()+1) + '-' + padding(date.getDate()),
                    time: padding(date.getHours()) + ':' + padding(date.getMinutes())
                }
                ret.push(sl)
                start = start + gap*60000
                end = start + duration*60000
            }else{
                open = false
            }
        } while (open);
    })
    return ret
}
