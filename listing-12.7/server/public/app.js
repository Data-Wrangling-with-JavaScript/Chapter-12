"use strict";

//
// Render a chart to a particular element on the page.
//
function renderChart (bindto, chartData) {
    var chart = c3.generate({
        bindto: bindto,
        data: chartData,
        axis: {
            x: {
                type: 'timeseries',
            }
        }
    });
    return chart; // We are actually going to use the returned chart object this time!
};

$(function () {

    var socket = io(); // Make the socket IO connection to the server.

    $.get("/rest/data") // Hit the REST API and pull down the initial data from the server.
        .then(function (data) {
            var chartData = { // Setup chart data that we can update later.
                xFormat: "%d/%m/%Y %H:%M",
                json: data,
                keys: {
                    x: "Date",  
                    value: [
                        "PM10 (ug/m^3)"
                    ]
                }
            };

            var chart = renderChart("#chart", chartData); // Do the initial render of the chart.

            socket.on("incoming-data", function (incomingDataRecord) { // Handling data that is incoming over the socket IO connection.
                chartData.json.push(incomingDataRecord); // Add the incoming data to our existing chart data.
                while (chartData.json.length > 24) { // Only keep the most recent 24 hours worth of records.
                    chartData.json.shift(); // Remove the oldest data records.
                }

                chart.load(chartData); // Reload the chart's data.
            });
        })
        .catch(function (err) {
            console.error(err);
        });
});

