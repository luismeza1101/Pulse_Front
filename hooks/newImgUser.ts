export default function newImgUsers(full_name: string){
    const arr_name = full_name.split(' ')
    return `${arr_name[0][0].toUpperCase()}${arr_name[1][0].toUpperCase()}`
}