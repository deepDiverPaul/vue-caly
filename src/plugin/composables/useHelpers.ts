const padding = (text: string | number, width= 2) => String(text).padStart(width, '0')

const calendarize = (target: Date | string = new Date(), offset = 1) => {
    let i = 0,
        j = 0,
        week: number [];
    const page: number[][] = [],
          date = new Date(target);

    const year = date.getFullYear(),
        month = date.getMonth();

    // day index (of week) for 1st of month
    let first = new Date(year, month, 1 - offset).getDay();

    // how many days there are in this month
    const days = new Date(year, month + 1, 0).getDate();

    while (i < days) {
        for (j = 0, week = Array(7); j < 7; ) {
            while (j < first) week[j++] = 0;
            week[j++] = ++i > days ? 0 : i;
            first = 0;
        }
        page.push(week);
    }
    return page;
};

export default () => {
    return {
        padding,
        calendarize
    }
}

export {
    padding,
    calendarize
}