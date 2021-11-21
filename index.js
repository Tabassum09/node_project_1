const express = require('express');
const common = require('./common');

const app = express();
const port = 3000;

  /**
   * fetch the campaigns and sort them by Total Amount in descending order.
   * The result campaigns returned should contain the fields Title, Total Amount, Backers Count and End Date.
   */

app.get('/api/all-campaign', async (req, res, next) => {
  try {
    // Get the campaign
    const campaign = await common.getCampaign();
    // Sort the campaign
    campaign.sort((a, b) => {
      return b.totalAmount - a.totalAmount;
    });
    // Returning the relevant data.
    const result = [];
    campaign.forEach(e => {
      const {
        code,
        categoryId,
        location,
        ngoCode,
        ngoName,
        daysLeft,
        percentage,
        featured,
        priority,
        campaignType,
        shortDesc,
        imageSrc,
        created,
        procuredAmount,
        totalProcured,
        ...updatedObject
      } = e;
      result.push(updatedObject);
    });

    res.send(result);
  } catch (err) {
    // show some custom error for internal debugging.
    next();
  }
});

  /**
   * Fetch campaigns and filter active campaigns. A campaign is active if the end date is greater
   * than or equal to today.
   * Filter the list further to get the campaigns that are created within the last 30 days
   */

app.get('/api/active-campaign', async (req, res, next) => {
  try {
    // Get the campaign
    const campaign = await common.getCampaign();
    const activeCampaign = [];
    // Iterating the campaign
    campaign.forEach(e => {
      // Last 30 days from today.
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      // Today date
      const todayDate = new Date();
      const d1 = new Date(startDate);
      const d2 = new Date(todayDate);
      // Campaign endDate
      const campaignEndDate = new Date(e.endDate);
      // Campaign created date
      const campaignCreatedDate = new Date(e.created);
      // if campaign endDate is greater than and equal to todayDate && 
      // campaign created date is greater than and equal to last 30 days &&
      // campaign created date is less than and equal to todayDate &&
      if (
        campaignEndDate >= d2 &&
        campaignCreatedDate >= d1 &&
        campaignCreatedDate <= d2
      ) {
        activeCampaign.push(e);
      }
    });
    // Sort the active campaign by Date.
    activeCampaign.sort((a, b) => {
      return new Date(b.endDate) - new Date(a.endDate);
    });
    res.send(activeCampaign);
  } catch (err) {
    // show some custom error for internal debugging.
    next();
  }
});


 /**
   * Fetch campaigns and filter closed campaigns. A campaign is closed if the end date is less than
   * today, or Procured Amount is greater than or equal to Total Amount.
   */

app.get('/api/closed-campaign', async (req, res, next) => {
  try {
    // Get the campaign
    const campaign = await common.getCampaign();
    const closedCampaign = [];
    // Iterating the campaign
    campaign.forEach(e => {
      // Today date
      const date = new Date();
      const todayDate = new Date(date);
      // Campaign endDate
      const campaignEndDate = new Date(e.endDate);
      // Campaign procuredAmount
      const campaignProcuredAmount = e.procuredAmount;
      // Campaign totalAmount
      const campaignTotalAmount = e.totalAmount;
       // if campaign endDate is less than and equal to todayDate && 
      // campaign procuredAmount is greater then and equal to totalAmount 
      if (campaignEndDate <= todayDate && campaignProcuredAmount >= campaignTotalAmount) {
        closedCampaign.push(e);
      }
    });
    res.send(closedCampaign);
  } catch (err) {
    // show some custom error for internal debugging.
    next();
  }
});

app.listen(port, () => console.log(`App is listening on port ${port}!`));
