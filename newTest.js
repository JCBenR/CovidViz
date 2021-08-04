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

Promise.all([
    d3.json("combo.json"),
    // d3.csv("utah-history.csv"),
    // d3.csv("unemploymentByState.csv")
]).then((data) => {
    // var utahNums = files[0];
    // var uempNums = files[1];

    /*GET LIST OF STATES */
    var stateList = [];
    for (const s of data) {
        console.log(s);
        stateList.push(s.State);
    }
    // console.log(stateList);

    /*CREATE DROP DOWN OF STATES */

    let drp = document.createElement('select');
    let dd = document.getElementById('dropDowns');
    dd.appendChild(drp);
    stateList.forEach(e => {
        var el = document.createElement('option');
        el.textContent = e;
        el.value = e;
        drp.appendChild(el);
    });

    /*CREATE LIST OF MONTHS */
    var covMonths = []
    uempNums.columns.forEach(m => {
        covMonths.push(m);
    })
    covMonths.shift();
    console.log(covMonths);

    let mdrp = document.createElement('select');
    dd.appendChild(mdrp);

    /*CREATE DROP DOWN OF MONTHS */
    covMonths.forEach(m => {
        var el = document.createElement('option');
        el.textContent = m;
        el.value = m;
        mdrp.appendChild(el);
    });

    let ut = 'Utah';
    let utahCovNums = uempNums.filter(obj => obj.State == ut)
    console.log(utahCovNums[0]);
    console.log(utahNums[3]);
    // for (const dt of stateCovidNums) {
    //     console.log(`${dt.State} ${dt["Jan 2020"]}`);
    // }
})
    .catch((e) => {
        console.log(e);
    });

