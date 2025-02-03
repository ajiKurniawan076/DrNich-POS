const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    let statuscode = res.statusCode === 200 ? 500 : res.statusCode; // Corrected here
    let message = err.message;

    if(err.name === 'CastError' && err.kind === 'ObjectId') {
        statuscode = 404;
        message = 'Resource not found';
    }

    res.status(statuscode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}

export{ notFound , errorHandler};