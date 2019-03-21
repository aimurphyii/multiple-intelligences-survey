
// now we are going to build out the data object for our chart
var data = {
  labels: ['ling','log','music','bod','spat','inter','intra',],
  datasets: [
    {
      label: 'Intelligence Ratio',
      data: [5, 3, 5, 4, 1, 2, 5],
      backgroundColor: [
        'rgba(204, 68, 75, 0.25)',
        'rgba(255, 111, 188, 0.25)',
        'rgba(133, 253, 255, 0.25)',
        'rgba(112, 255, 200, 0.25)',
        'rgba(89, 99, 232, 0.25)',
        'rgba(224, 255, 98, 0.25)',
        'rgba(232, 170, 89, 0.25)',
      ],
    }
  ]
};
// we are going to make the chart
function createChart() {
  // we decalred context and looking for the id on the chart, and now we are getting 2d context--grabbing mychart adn using ctx to make it a chart
  var ctx = document.getElementById('myChart').getContext('2d');

  // now we are going to build the chart with all the stuff we collected for it like songChart and ctx... new Chart is able to run because we linked to it in the script src in head
  // params are ctx and a big damn object with at least type and data

  myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    // options: options
  });
  // change the boolean now that we drew our chart
  chartDrawn = true;
}
createChart();