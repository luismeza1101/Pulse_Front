const logOut = () => {
    localStorage.removeItem('user_id')
    window.location.reload()
}

export default logOut