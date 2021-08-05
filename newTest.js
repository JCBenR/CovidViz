let changeTitle = () => {
    document.getElementById("Title").innerHTML = "New Stats";
}
changeTitle();

let months = ["Jan 2020", "Feb 2020", "Mar 2020", "Apr 2020", "May 2020", "Jun 2020", "Jul 2020", "Aug 2020", 
    "Sep 2020", "Oct 2020", "Nov 2020", "Dec 2020", "Jan 2021", "Feb 2021", "Mar 2021", "Apr 2021", "May 2021", "June 2021"];

let stateAbrev = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}
let covidData;
var stateList = [];
let selectedStates = [];
let maxValue = 1_200_000;
let width = 600;
let height = 600;
let month = months[0];
let states;

Promise.all([
    d3.json("combo.json"),
]).then((data) => {
    /*GET LIST OF STATES */
    covidData = data[0];

    console.log(data[0][0]);


    makeStateList();
    //var states = parseStates(covidData);
    console.log(stateList);


    var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;


// set the ranges
//var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
//var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    //.scale(x)
    .orient("bottom")


var yAxis = d3.svg.axis()
   // .scale(y)
    .orient("left")
    .ticks(10);


// add the SVG element
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// scale the range of the data
x.domain(data.map(function(d) { return d[0][0].State; }));
y.domain([0, d3.max(data, function(d) { return d[0][0].Population; })]);

// add axis
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
  .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.55em")
    .attr("transform", "rotate(-90)" );

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 5)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Frequency");

    //console.log(Object.keys(stateAbrev));
let yearData = [];
    months.forEach(m => {
        let yrObj = {
            m: m,
            data: []
        }
        for (const x of covidData) {
            try {
                let newObj = {
                    State: x.State,
                    Pop: x.Population,
                    Cases: x.data[m][0],
                    Rate: x.data[m][1]
                }
                yrObj.data.push(newObj);
                // console.log(newObj);
            } catch (error) {
                // console.log(error);
            }
        }
        yearData.push(yrObj); 
    })
    console.log(yearData);
    // var dataset = d3.stack()(Object.keys(stateAbrev).map(function(newData) {
        
    //     return covidData.map(function(d) {
    //         console.log(month);
    //         console.log(d.data[month][0]);
    //         //return {x: d.data[month][0], y: +d[newData]};
    //     });
    //     }));
})
    .catch((e) => {
        console.error(e);
    });



const makeStateList = () => {
    d3.select('#stateList').selectAll('p')
        .data(covidData)
        .join(
            enter => {
                enter.append('p')
                    .text((d, i) => d.State)
                    .on('click', handleClick);
            }
        );
}

function parseStates(data){
    var states = [];
    for(let i = 0; i < 51; i++){
        states.push(data[i].State);
    }
    return states;
}

function parseUnemploymentRate(data, months){
    var unemploymentRates = [];
    for(let i = 0; i < 51; i++){
        for(let j = 0; j < 18; j++){
            covidCases.push(data[months[j]]);
        }
    }
    return covidCases;
}

function parseCovidCases(data, months){
    var covidCases = {};
    for(let i = 0; i < 51; i++){
        for(let j = 0; j < 18; j++){
            covidCases.push(data[months[j]]);

        }
    }
    return covidCases;
}

function handleClick(e, d){
    let elem = d3.select(this); //wrap as a nice D3 object
    elem.classed('selected', !elem.classed('selected'));

    if (elem.classed('selected')) {
        let canvasWidth = parseFloat(d3.select('#canvas').style('width'));
        let canvasHeight = parseFloat(d3.select('#canvas').style('height'));
        let stateData = {};
        stateData.name = d;
        stateData.x = canvasWidth * Math.random();
        stateData.y = canvasHeight * Math.random();
        selectedStates.push(stateData);
        console.log(covidData.AK);
    } else { //unselected
        selectedStates = selectedStates.filter(x => x.name != d);
    }
    console.log('clicked ', d);
    console.log(selectedStates)
    updateGraph();
}

const updateGraph = () => {
    console.log("updating...");
    bars();
}

let canvas = d3.select("#canvas")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

let bars = () => canvas.selectAll("rect")

                .data(selectedStates)
                .enter()
                    .append("rect")
                    .attr("width", 25)
                    .attr("height", 200)
                    .attr("fill", function(d) {return colorScale(d);}     
                    )


const colorScale = d3.scaleLinear()
    .domain([0, maxValue])
    .range(['#0b661a', '#dbc70d', '#db330d'])

const widthScale = d3.scaleLinear()
    .domain([50, maxValue])
    .range([0, width])

const selectAll = (e) => {
    if (e.className === "selectAll") {
        selectedStates = [...covidData];
        let sl = document.getElementById("stateList").getElementsByTagName("p");
        for (const x of sl) {
            x.className = "selected";
        }
        e.innerHTML = "Deselect All";
        e.className = "deselectAll";
    }
    else {
        selectedStates = [];
        let sl = document.getElementById("stateList").getElementsByTagName("p");
        for (const x of sl) {
            x.className = "";
        }
        e.innerHTML = "Select All";
        e.className = "selectAll";
    }
}

var tooltip = d3.select("#canvas")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")


var mouseover = function(d) {
    tooltip.style("opacity", 1)
}

var mousemove = function(d) {
    tooltip.html(`State: ${d.State} <br/>
                Population: ${d.Population} <br/>
                Cases: ${d.data[month][0]} <br/>
                UnEmp Rate: ${d.data[month][1]}`
        // "State: " + d.State + <br/> +
        //     "Population: " + d.Population + <br/> +
        //     "Cases: " + d.data[month][0] + <br/> +
        //     "UnEmp Rate: " + d.data[month][1]     
      )
      .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
      .style("top", (d3.mouse(this)[1]) + "px")
  }

  var mouseleave = function(d) {
    tooltip.transition()
      .duration(200)
      .style("opacity", 0)
  }