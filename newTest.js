let changeTitle = () => {
    document.getElementById("Title").innerHTML = "Covid and Unemployment Numbers by State";
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
let month = months[0];
let states;
let monthIdx = 0;
let yearData = [];

Promise.all([
    d3.json("combo.json"),
]).then((data) => {
     covidData = data[0];
    makeStateList();
    createMonthDropDown();
    
    var ddMonth = document.getElementById("monthDD");
    ddMonth.addEventListener("change", () => {
        monthIdx = months.indexOf(ddMonth.value);
        drawGraph();
    })
})
.catch((e) => {
    for (const x of Object.entries(e)) {
        console.error(x);
    }
});

async function drawGraph(){
    try {
        d3.select("svg").remove();
    } catch (error) {
        console.error(error);
    }
    


    yearData = [];
    await months.forEach(m => {
        let yrObj = {
            m: m,
            data: []
        }
        for (const x of selectedStates) {
            try {
                let newObj = {
                    State: x.State,
                    ABBR: x.ABBR,
                    Pop: parseInt(x.Population.replace(/,/g, '')),
                    Cases: x.data[m][0],
                    //CasePer: ,
                    Rate: x.data[m][1],
                    UnEmp: Math.ceil(findEmpData(x.Population, x.data[m][1]))
                }
                yrObj.data.push(newObj);
            } catch (error) {
            }
        }
        yearData.push(yrObj);
    })
    console.log(yearData.filter(obj => {return obj.m === month;})[0]);
    const dataStack = d3.stack().keys(["Cases", "UnEmp"]);
    let sf = [];
    await yearData.forEach(e => {

        let dsf = dataStack(e.data);
        sf.push(dsf);
    });

    var margin = { top: 20, right: 20, bottom: 70, left: 40 },
        width = 1050 - margin.left - margin.right,
        height = 750 - margin.top - margin.bottom;


    var svg = d3.select("#canvas")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
    var labelGroup = svg.append("g").attr("id", "legend2");
    labelGroup.append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "red")
    labelGroup.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "blue")
    labelGroup.append("text").attr("x", 220).attr("y", 130).text("Number of Unemployed").style("font-size", "15px").attr("alignment-baseline","middle")
    labelGroup.append("text").attr("x", 220).attr("y", 160).text("Number of Covid Cases").style("font-size", "15px").attr("alignment-baseline","middle")
    labelGroup.attr("transform", "translate(" + (margin.left + 570)  + "," + (margin.top - 150) + ")");


    var currYear = yearData.filter(obj => { return obj.m === month; })[0];

    var currYearData = sf[monthIdx];

    console.log(currYearData);

    var x = d3.scaleBand()
        .domain(currYearData[0].map(function (d) { return d.data.ABBR; }))
        .range([margin.left, width - margin.right])

    var y = d3.scaleLinear()
        .domain([0, d3.max(currYearData, (d) => {
            return d3.max(d, (d) => {
                return parseInt(d[1]) + parseInt(d[0]);
            });
        })]).nice()
        .range([height - margin.bottom, margin.top])

    console.log("********");
    console.log(d3.max(currYearData, (d) => {
        return d3.max(d, (d) => {
            return parseInt(d[1]) + parseInt(d[0]);
        });
    }));

    var xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i => i).tickSizeOuter(0))

    var yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, currYearData.format))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("x", -margin.left)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(sf.y));

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    var groups = svg.selectAll("g.cat")
        .data(currYearData)
        .enter().append("g")
        .attr("class", "cat")
        .style("fill", function (d, i) { return colors[i]; });

    console.log(">>>>>>>>>>");
    // console.log(typeof groups);

    var rect = groups.selectAll("rect")
        .data(function (d) {
            console.log();
            return d;
        })
        .enter()
        .append("rect")
        .attr("x", function (d) { console.log(d);
            return x(d.data.ABBR);})
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1])) 
        .attr("width", x.bandwidth())
};

/**
 * function transforms population from string to number, then changes rate to percent decimal (ie, 5.1 >> .0051), then multiplies the two to get the total number of unemployed in the state
 * @param {*} pop population in string format
 * @param {*} rate rate in decimal format (ie 5.1)
 * @returns total number of unemployed in the state
 */
const findEmpData = (pop, rate) => {
    pop = parseInt(pop.replace(/,/g, ''));
    rate = rate / 100;
    return pop * rate;
}
var colors = ["blue", "red"];

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
        stateData = d;
        stateData.x = canvasWidth * Math.random();
        stateData.y = canvasHeight * Math.random();
        selectedStates.push(stateData);
        //console.log(covidData.AK);
    } else { //unselected
        selectedStates = selectedStates.filter(x => x != d);
    }
    console.log('clicked ', d);
    console.log(selectedStates)
    drawGraph();
}

function selectAllStates(e) {
    if (e.className === "selectAll") {
        selectedStates = covidData;
        let sl = document.getElementById("stateList").getElementsByTagName("p");
        for (const x of sl) {
            x.className = "selected";
        }
        e.innerHTML = "Deselect All";
        e.className = "deselectAll";
        drawGraph();
    }
    else {
        selectedStates = [];
        let sl = document.getElementById("stateList").getElementsByTagName("p");
        for (const x of sl) {
            x.className = "";
        }
        e.innerHTML = "Select All";
        e.className = "selectAll";
        drawGraph();
    }
    
}

function createMonthDropDown() {
    let dd = document.getElementById('dropDowns');
    let mdrp = document.createElement('select');
    mdrp.setAttribute('id', 'monthDD');
    dd.appendChild(mdrp);

    /*CREATE DROP DOWN OF MONTHS */
    months.forEach(m => {
        var el = document.createElement('option');
        el.textContent = m;
        el.value = m;
        mdrp.appendChild(el);
    });

}

function parseStates(data) {
    var states = [];
    for (let i = 0; i < 51; i++) {
        states.push(data[i].State);
    }
    return states;
}

function parseUnemploymentRate(data, months) {
    var unemploymentRates = [];
    for (let i = 0; i < 51; i++) {
        for (let j = 0; j < 18; j++) {
            covidCases.push(data[months[j]]);
        }
    }
    return covidCases;
}

function parseCovidCases(data, months) {
    var covidCases = {};
    for (let i = 0; i < 51; i++) {
        for (let j = 0; j < 18; j++) {
            covidCases.push(data[months[j]]);

        }
    }
    return covidCases;
}