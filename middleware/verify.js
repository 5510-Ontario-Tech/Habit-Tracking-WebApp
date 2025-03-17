import joi from 'joi'

export const signupschema = joi.object({


    email: joi.string()
    .min(4)
    .max(20)
    .required()
    .email({
        tlds: { allow: ['com', 'yahoo']},

    }),

    password: joi.string()
    .required()
    .pattern(new RegExp('^\$2[ayb]\$([0-9]{2})\$[A-Za-z0-9./]{53}$/')),

})