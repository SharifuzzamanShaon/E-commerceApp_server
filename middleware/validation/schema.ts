import Joi from "joi";

export const schema ={
    register: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      }),
      login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      }),
}
