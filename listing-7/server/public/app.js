"use strict";

//
// Render a chart to a particular element on the page.
//
function renderChart (bindto, data) {
    var chart = c3.generate({
        bindto: bindto,
        data: { // Prepare the data to display in the chart.
            xFormat: "%d/%m/%Y %H:%M", // Format of the Date column, used by C3 to parse the data series for the X axis.
            json: data,
            keys: {
                x: "Date",  
                value: [
                    "PM10 (ug/m^3)"
                ]
            }
        },
        axis: {
            x: {
                type: 'timeseries',
            }
        }
    });
};

$(function () {

    $.get("/rest/data") // Hit the REST API and pull down the data from the server.
        .then(function (data) {
            renderChart("#chart", data);
        })
        .catch(function (err) {
            console.error(err);
        });
});

