let changeTitle = () => {
    document.getElementById("Title").innerHTML= "New Stats";
}
changeTitle();

d3.csv("utah-history.csv")
.then(res => {
    console.log(res[0]);
})
.catch((error) => {
    console.log(error);
});

utahCovidData();
