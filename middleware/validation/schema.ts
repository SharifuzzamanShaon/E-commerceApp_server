import Joi from "joi";

export const schema = {
  register: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  product: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().optional(),
    categoryId: Joi.string().required(),
    stock: Joi.number().required(),
    color: Joi.array()
    .items(Joi.string().valid('RED', 'GREEN', 'BLUE', 'YELLOW', 'ORANGE', 'PURPLE', 'PINK', 'BLACK', 'WHITE', 'GRAY'))
    .optional(),
  size: Joi.array()
    .items(Joi.string().valid('XS', 'S', 'M', 'L', 'XL', 'XXL'))
    .optional(),

  }),
  category:Joi.object({
    name:Joi.string().required()
  }),
  subCategory:Joi.object({
    name:Joi.string().required(),
    parentCategoryId:Joi.string().required()
  })
}
