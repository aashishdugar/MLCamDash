module.exports = app => {
  const rule = require("../controllers/rule.controller.js");

  // Create a Rule
  app.post("/rule/create", rule.create);

  // Update a Rule
  app.post("/rule/update", rule.update);

  // Retrieve all Rule
  app.post("/rule/getall", rule.findAll);

  // Retrieve a single Rule with RuleId
  app.post("/rule/get/:ruleId", rule.findOne);

  // Delete a Rule
  app.post("/rule/delete/:ruleId", rule.delete);

  // Retrieve all Rule
  app.post("/rule/getallsimplified", rule.getAllSimplified);

  // Retrieve a single Rule with RuleId
  app.post("/rule/getsimplified/:ruleId", rule.getSimplified);

  // Update a RuleStatus
  app.post("/rule/updatestatus", rule.updateRuleStatus);

};