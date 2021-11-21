# node_project_1

1. Add an endpoint to get a list of campaigns.
Make a call to external API https://testapi.donatekart.com/api/campaign to fetch the
campaigns and sort them by Total Amount in descending order and return the
campaigns. The result returned should contain the fields Title, Total Amount, Backers
Count and End Date.
2. Add an endpoint to get active campaigns that are created within the last 1 month.
Make a call to external API https://testapi.donatekart.com/api/campaign to fetch
campaigns and filter active campaigns. A campaign is active if the end date is greater
than or equal to today. Filter the list further to get the campaigns that are created within
the last 30 days.
3. Add an endpoint to get closed campaigns.
Make a call to external API https://testapi.donatekart.com/api/campaign to fetch
campaigns and filter closed campaigns. A campaign is closed if the end date is less than
today, or Procured Amount is greater than or equal to Total Amount.


Please after download/ clone do 

npm install

It will get all the dependencies . 

