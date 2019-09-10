require("./less/style.less");
const $ = require("jquery");

import * as d3 from 'd3';

const total_rapes = 40035;
const nodes = [
    { 
        name: "Rapes per annum",
        value: total_rapes * 9,
        description: `One in nine rapes are reported, according to <a href="http://content.time.com/time/world/article/0,8599,2057744,00.html">Time</a>. According to the Gauteng Gender Based Violence Indicators Project (2010), this is a very conservative number, with that report estimating that "overall only one in 25 rapes had been reported to the police".`
    },
    {
        name: "Reported",
        value: total_rapes,
        description: `Sourced from the <a href="https://www.saps.gov.za/services/crimestats.php">South African Police Service 2018/2019 Crime Statistics</a>`
    },
    {
        name: "Arrests",
        value: total_rapes * 0.578,
        description: `A 2017 report produced by the South African Medical Research Council, entitled <a href="http://www.mrc.ac.za/sites/default/files/files/2017-10-30/RAPSSAreport.pdf">"Rape Justice in South Africa"</a>, studied 2012 rape cases to calculate rape case attrition. Nationally, 57.8% of rape cases led to an arrest or charge in court.`
    },
    {
        name: "Accepted for Prosecution",
        value: total_rapes * 0.345,
        description: `34.5% of cases are accepted for prosecution, according to <a href="http://www.mrc.ac.za/sites/default/files/files/2017-10-30/RAPSSAreport.pdf">"Rape Justice in South Africa"</a>.`
    },
    {
        name: "Started Trial",
        value: total_rapes * 0.185,
        description: `18.5% of cases reach trial, according to <a href="http://www.mrc.ac.za/sites/default/files/files/2017-10-30/RAPSSAreport.pdf">"Rape Justice in South Africa"</a>.`
    },
    {
        name: "Guilty Convictions",
        value: total_rapes * 0.086,
        description: `Only 8.6% of cases reported to police result in a guilty conviction, according to <a href="http://www.mrc.ac.za/sites/default/files/files/2017-10-30/RAPSSAreport.pdf">"Rape Justice in South Africa"</a>.`
    }
]

const max = d3.max(nodes, d => d.value);

const scale = d3.scaleLinear().domain([ 0, max ]).range([ 1, 100 ]);
const number_format = d3.format(",.2r");

d3.select("body").append("h1").text("Rape Convictions in South Africa");

const master_node_container = d3.select("body")
    .append("div")
    .attr("id", "master_node_container")
    ;

master_node_container
    .append("div")
    .attr("id", "master_node")
    .style("width", "100vw")
    ;

const nodes_el = d3.select("body")
    .append("div")
    .attr("id", "nodes")
    ;

const containers = nodes_el
    .selectAll("div")
    .data(nodes)
    .enter()
    .append("div")
    .attr("class", "node-container")
    .attr("data-value", d => scale(d.value))
    ;

containers
    .append("h2")
    .text(d => d.name)
    ;

containers
    .append("p")
    .attr("class", "value")
    .text(d => number_format(d.value))
    ;

containers
    .append("div")
    .attr("class", "break")
    ;

containers
    .append("p")
    .attr("class", "description")
    .html(d => d.description)
    ;


d3.select("body")
    .append("footer")
    .html(`Produced by <a href="https://10layer.com">Jason Norwood-Young</a>. Thanks to <a href="https://africacheck.org/factsheets/guide-rape-statistics-in-south-africa/">Africa Check's South Africa rape statistics guide</a> as the source of many of these numbers.`);

$.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight(); var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height(); return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(function() {
    $(document).on("scroll resize", e => {
        let vals = [];
        $(".node-container").each((i, el) => {
            if ($(el).isInViewport()) {
                vals.push($(el).data("value"));
            }
        });
        let w = d3.max(vals);
        $("#master_node").css("width", `${w}vw`);
    })
});