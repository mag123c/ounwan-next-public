import moment from 'moment-timezone';

export const getDate = (date?: Date): Date => {
    return moment(date).tz("Asia/Seoul").toDate();
}

export const extractToYmd = (date?: Date): string => {    
    return moment(date).tz("Asia/Seoul").format("YYYY-MM-DD");
}

export const extractToYmd2 = (date?: Date): string => {    
    return moment(date).tz("Asia/Seoul").format("YY.MM.DD");
}


export const addDays = (days: number) => {
    return moment().add(days, 'days').toDate();
}