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
            console.log(stateList);

            /*CREATE DROP DOWN OF STATES */
            let drp = document.createElement('select');
            document.body.appendChild(drp);
            stateList.forEach(e => {
                var el = document.createElement('option');
                el.textContent = e;
                el.value = e;
                drp.appendChild(el);
            });

            let ut = 'Utah';
            let utahCovNums = uempNums.filter(obj => obj.State = ut)
            console.log(utahCovNums[2]);
            console.log(utahNums[3]);
            // for (const dt of stateCovidNums) {
            //     console.log(`${dt.State} ${dt["Jan 2020"]}`);
            // }
        })
        .catch((e) => {
            console.log(e);
        });