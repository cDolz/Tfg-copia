
function errorHandler(err, req, res, next) {
    console.error('errorHandler');
    let status = err.status || 500;
    let message = err.message || 'Internal Server Error';
    switch (status) {
        case 400:
            message = message || 'Bad Request';
            break;
        case 401:
            message = message || 'Unauthorized';
            break;
        case 403:
            message = message || 'Forbidden';
            break;
        case 404:
            message = message || 'Not Found';
            break;
    }

    res.status(status).json({ error: message });
}

module.exports = errorHandler;