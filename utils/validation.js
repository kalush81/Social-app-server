const validateUN = (username) => {
    return username.length < 20 && username.length > 3
}

module.exports = {
    validateUN
}