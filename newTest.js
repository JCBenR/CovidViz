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
Promise.all([
    d3.json("combo.json"),
    // d3.csv("utah-history.csv"),
    // d3.csv("unemploymentByState.csv")
]).then((data) => {
    // var utahNums = files[0];
    // var uempNums = files[1];

    /*GET LIST OF STATES */
    covidData = data[0];

    for (const s of data[0]) {
        stateList.push(s.State);
    }

    makeStateList();
    // console.log(stateList);

    /*CREATE DROP DOWN OF STATES */

    // let drp = document.createElement('select');
    // let dd = document.getElementById('dropDowns');
    // dd.appendChild(drp);
    // stateList.forEach(e => {
    //     var el = document.createElement('option');
    //     el.textContent = e;
    //     el.value = e;
    //     drp.appendChild(el);
    // });

    // /*CREATE LIST OF MONTHS */
    // var covMonths = []
    // uempNums.columns.forEach(m => {
    //     covMonths.push(m);
    // })
    // covMonths.shift();
    // console.log(covMonths);

    // let mdrp = document.createElement('select');
    // dd.appendChild(mdrp);

    // /*CREATE DROP DOWN OF MONTHS */
    // covMonths.forEach(m => {
    //     var el = document.createElement('option');
    //     el.textContent = m;
    //     el.value = m;
    //     mdrp.appendChild(el);
    // });
})
    .catch((e) => {
        console.log(e);
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

function handleClick(e, d){
    let elem = d3.select(this); //wrap as a nice D3 object
    elem.classed('selected', !elem.classed('selected'));

    if(elem.classed('selected')){
        let canvasWidth = parseFloat(d3.select('#canvas').style('width'));
        let canvasHeight = parseFloat(d3.select('#canvas').style('height'));
        let stateData = {};
        stateData.name = d;
        stateData.x = canvasWidth * Math.random();
        stateData.y = canvasHeight * Math.random();
        selectedStates.push(stateData);
    } else { //unselected
        selectedStates = selectedStates.filter( x => x.name != d);
    }

    console.log('clicked ', d);
    console.log(selectedStates);
    //updateGraph();
}

