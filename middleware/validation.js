const validator = require('../helper/validate');

const validateRoute = async (req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "setter": "required|string",
        "grade": "required|string",
        "holdColor": "string",
        "startDate": "required|date",
        "completionDate": "date",
        "attempts": "integer",
        "gym_id": "required|string"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

const validateGym = async (req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "address": "required|string",
        "phone": "string"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}
module.exports = {
    validateRoute,
    validateGym
};