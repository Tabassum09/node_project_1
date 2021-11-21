const axios = require('axios');

const campaign = {};

  /**
   * This function fetch the campaign.
   * @return The campaign details 
   * @throws error if campaign not found.
   */

campaign.getCampaign = async function getCampaign() {
  try {
    const response = await axios.get('https://testapi.donatekart.com/api/campaign');
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = campaign;
