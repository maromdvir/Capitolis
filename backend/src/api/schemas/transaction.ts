import Joi from 'joi';


const TransactionSchema = Joi.object({
    tradingParty: Joi.string().default("me").required(),
    counterparty: Joi.string().required(),
    amount: Joi.number().required()
});

export default TransactionSchema;