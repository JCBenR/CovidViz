let changeTitle = () => {
    document.getElementById("Title").innerHTML = "New Stats";
}
changeTitle();

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

Promise.all([
    d3.json("combo.json"),
]).then((data) => {
    /*GET LIST OF STATES */
    covidData = data[0];

    makeStateList();
    // console.log(stateList);

})
    .catch((e) => {
        console.log(e);
    });

// let series = d3.stack()
//                 .keys(data.)

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

function handleClick(e, d) {
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
    } else { //unselected
        selectedStates = selectedStates.filter(x => x.name != d);
    }
    console.log('clicked ', d);
    console.log(selectedStates);
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
    .attr("height", 100)
    .attr("fill", function (d) { return colorScale(d); }
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



// chart = {
//     const svg = d3.select(DOM.svg(width, height))
//         .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
//         .style("width", "100%")
//         .style("height", "auto")
//         .style("font", "10px sans-serif");

//     svg.append("g")
//       .selectAll("g")
//       .data(d3.stack().keys(data.columns.slice(1))(data))
//       .join("g")
//         .attr("fill", d => z(d.key))
//       .selectAll("path")
//       .data(d => d)
//       .join("path")
//         .attr("d", arc);

//     svg.append("g")
//         .call(xAxis);

//     svg.append("g")
//         .call(yAxis);

//     svg.append("g")
//         .call(legend);

//     return svg.node();
//   }