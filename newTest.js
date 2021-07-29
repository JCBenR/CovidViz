let changeTitle = () => {
    document.getElementById("Title").innerHTML = "New Stats";
}
changeTitle();

// d3.csv("utah-history.csv")
// .then(res => {
//     console.log(res[0]);
// })
// .catch((error) => {
//     console.log(error);
// });

// Promise.all([
//     d3.csv("utah-history.csv"),
//     d3.csv("unemploymentByState.csv")
// ]).then((files) => {
//         var utahNums = files[0];
//         var uempNums = files[1];

//         for (const dp of data) {
//             stateCovidNums.push(dp);
//         }
//         console.log(stateCovidNums);
//         for (const dt of stateCovidNums) {
//             console.log(`${dt.State} ${dt["Jan 2020"]}`);
//         }
//     })
//     .catch((e) => {
//         console.log(e);
//     });


    Promise.all([
        d3.csv("utah-history.csv"),
        d3.csv("unemploymentByState.csv")
    ]).then((files) => {
            var utahNums = files[0];
            var uempNums = files[1];

            /*GET LIST OF STATES */
            var stateList = [];
            for (const s of uempNums) {
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