import dayjs from 'dayjs'
export const getCurrentJST = () => {
    const currentJST = dayjs().startOf('month').add(1, 'day').set('year', 2018).format('YYYY-MM-DD HH:mm:ss');
    return currentJST
}

export const getAddToCurrentJST = ( num: number, unit: dayjs.ManipulateType ) => {
    //TODO
}

export const isAfterCurrentJST = ( time: string ) => {
    //TODO 
}