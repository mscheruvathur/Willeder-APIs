import dayjs from 'dayjs'

// import { parse, format } from 'date-fns';
export const getCurrentJST = () => {

    const currentDate = dayjs();
    const formattedDate = currentDate.format('YYYY-MM-DD HH:mm:ss');
    console.log(formattedDate)
    return formattedDate;
   
}

// export const getAddToCurrentJST = ( num: number, unit: dayjs.ManipulateType ) => {
//     //TODO
// }

// export const isAfterCurrentJST = ( time: string ) => {
//     //TODO 
// }