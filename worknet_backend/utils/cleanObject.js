exports.cleanObject = (obj) => {
    Object.keys(obj).forEach(key => {
        if (obj[key] === undefined || obj[key] === '') {
            delete obj[key];
        }
    });
    return obj;
};
