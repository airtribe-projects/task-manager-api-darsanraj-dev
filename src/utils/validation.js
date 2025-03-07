const Joi = require("joi");

exports.validateTask = (task) => {
  const schema = Joi.object({
    id: Joi.number().integer().min(1).required(), 
    title: Joi.string().min(3).required(),
    description: Joi.string().min(5).required(),
    completed: Joi.boolean().required(),
    priority: Joi.string().valid("low", "medium", "high").default("medium"),
  });

  return schema.validate(task);
};
