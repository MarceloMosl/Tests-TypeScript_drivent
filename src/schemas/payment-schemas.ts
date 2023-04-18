import Joi from 'joi';

export const paymentSchema = Joi.object({
  ticketId: Joi.number().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string(),
    cvv: Joi.number().required(),
  }).required(),
});
