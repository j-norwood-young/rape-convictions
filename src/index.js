require("./less/style.less");
const $ = require("jquery");

import * as d3 from 'd3';

const number_format = d3.format(",.0f");
const total_rapes = 40035;
const nodes = [
    { 
        name: "Rapes per annum",
        value: total_rapes * 9,
        description: `While ${ number_format(total_rapes) } were reported to the South African Police Service in 2017/2018, the actual number of rapes is suspected to be much higher. An estimated one in nine rapes are reported, according to <a href="http://content.time.com/time/world/article/0,8599,2057744,00.html">Time</a>, which is the conservative number we use in this report. Research by the Gauteng Gender Based Violence Indicators Project (2010) estimates that "overall only one in 25 rapes had been reported to the police". This would put the total at ${ number_format(total_rapes * 25) } per annum.`
    },
    {
        name: "Reported",
        value: total_rapes,
        description: `South Africa had the <a href="https://en.wikipedia.org/wiki/Rape_statistics#South_Africa">highest rapes per capita in the world in 2010</a>, at 95.9 per 100,000. The number has since dropped to 70.5, but is still shockingly high. Source: <a href="https://www.saps.gov.za/services/crimestats.php">South African Police Service 2018/2019 Crime Statistics</a>`
    },
    {
        name: "Arrests",
        value: total_rapes * 0.578,
        description: `A 2017 report produced by the South African Medical Research Council, entitled <a href="http://www.mrc.ac.za/sites/default/files/files/2017-10-30/RAPSSAreport.pdf">"Rape Justice in South Africa"</a>, studied 2012 rape cases to calculate rape case attrition. Nationally, 57.8% of rape cases led to an arrest or charge in court.`
    },
    {
        name: "Accepted for Prosecution",
        value: total_rapes * 0.345,
        description: `Only 34.5% of cases opened are ever accepted for prosecution, according to <a href="http://www.mrc.ac.za/sites/default/files/files/2017-10-30/RAPSSAreport.pdf">"Rape Justice in South Africa"</a>. A report on <a href="https://genderlinks.org.za/programme-web-menu/publications/the-war-at-home-gbv-indicators-project-2011-08-16/">gender-based violence in Gauteng</a> found that one in 13 women reported non-partner rape and only one in 25 rapes were reported to the police.`
    },
    {
        name: "Trial Commenced",
        value: total_rapes * 0.185,
        description: `18.5% of cases reach trial, according to <a href="http://www.mrc.ac.za/sites/default/files/files/2017-10-30/RAPSSAreport.pdf">"Rape Justice in South Africa"</a>. Rape is <a href="www.justice.gov.za/legislation/acts/2007-032.pdf#page=10">defined quite broadly in South Africa</a>: "Any person (‘A’) who unlawfully and intentionally commits an act of sexual penetration with a complainant (‘B’), without the consent of B, is guilty of the offence of rape." `
    },
    {
        name: "Guilty Convictions",
        value: total_rapes * 0.086,
        description: `Only 8.6% of cases reported to police result in a guilty conviction, according to <a href="http://www.mrc.ac.za/sites/default/files/files/2017-10-30/RAPSSAreport.pdf">"Rape Justice in South Africa"</a>. Of those convictions, 72.6% of the rapists would ever see jail time. That means that of the ${ number_format(total_rapes * 9) } rapes, only ${ number_format(total_rapes * 0.086 * 0.726) } (${ number_format((total_rapes * 0.086 * 0.726) / (total_rapes * 9) * 100) }%) resulted in prison for the perpetrator.`
    }
]

const max = d3.max(nodes, d => d.value);

const scale = d3.scaleLinear().domain([ 0, max ]).range([ 1, 100 ]);

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

const text = containers.append("div").attr("class", "text-container");

text
    .append("h2")
    .text(d => d.name)
    ;

text
    .append("p")
    .attr("class", "value")
    .text(d => number_format(d.value))
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
        let w = d3.min(vals);
        $("#master_node").css("width", `${w}vw`);
    })
});