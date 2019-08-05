const Joi = require('@hapi/joi');

const AddBookSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(),
    author: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    pages: Joi.number().required(),
});

const EditBookSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30),
    author: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    pages: Joi.number(),
});

function validateAddBook(req, res, next) {
    const { error } = AddBookSchema.validate(req.body);
    if (error) {
        return res.status(422).send(error);
    }
    next();
}

function validateEditBook(req, res, next) {
    const { error } = EditBookSchema.validate(req.body);
    if (error) {
        return res.status(422).send(error);
    }
    next();
}

module.exports = {
    validateAddBook,
    validateEditBook
};
