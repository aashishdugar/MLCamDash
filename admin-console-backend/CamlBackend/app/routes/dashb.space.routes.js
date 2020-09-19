module.exports = app => {
  const spacedashboard = require("../controllers/dashb.space.controller.js");
  app.post("/dashboard/densityChangeEvents", spacedashboard.getSpaceDensity);
  app.post("/dashboard/currentDensity", spacedashboard.getSpaceCurrentDensity);
  app.post("/dashboard/densityViolationCountsByTime", spacedashboard.getSpaceDensityCountByTime);
  
  app.post("/dashboard/socialDistanceViolationEvents", spacedashboard.getSpaceSocialDistanceViolation);
  // app.post("/dashboard/spacecurrentdistanceviolation/:spaceId", spacedashboard.getSpaceCurrentDistanceViolation);
  app.post("/dashboard/socialDistanceViolationCountsByTime", spacedashboard.getSpaceSocialDistanceViolationCountByTime);

};