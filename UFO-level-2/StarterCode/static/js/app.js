// from data.js
var tableData = data;

// Console.log the data from data.js to see the contents of each record
console.log("UFO Data", JSON.parse(JSON.stringify(tableData, null, 4)));

// Create an array with the column names from the given data 
var columns = ["datetime","city","state","country","shape","durationMinutes","comments"]

// Get a reference to the table body
var tbody = d3.select("tbody");

// Loop through the array of given data and append each row to table on to the webpage 
function loadData(tableData){
    tbody.style("color","white")
    tableData.forEach(ufo =>{
        var row = tbody.append("tr")
        columns.forEach(column => {

            if(column =="city" ){
                // Capitalize first letter of first word in the city name
                name = ufo[column];
                nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
                // console.log(`name cap is ${nameCapitalized}`);
                row.append("td").text(nameCapitalized);

            } else if (column == "country" || column =="state") {

                row.append("td").text(ufo[column].toUpperCase());
        
            } else {
                row.append("td").text(ufo[column]);
            }
        });
    });
}

// Call the function to load the data 
loadData(tableData)

// Get a D3 reference to the filter button on the page with the id property set to `filter-btn`
var filterButton = d3.select("#filter-btn");
// Get a reference to the reset button on the page with the id property set to `reset-btn`
var resetButton = d3.select("#reset-btn");

// Prepare input variables corresponding to the form entry locations and id tags
var inputDate = d3.select("#datetime");
var inputCity = d3.select("#city");
var inputState = d3.select("#state");
var inputCountry = d3.select("#country");
var inputShape = d3.select("#shape");

// Define a function that filters original table using inputs from Web page options
function filterData() {
    // Do not update page until filtering is complete (all desired options selected)
    d3.event.preventDefault();

    // Get the actual values from the Webpage entries
    var Date = inputDate.property("value").trim();
    var City = inputCity.property("value").toLowerCase().trim();
    var State = inputState.property("value").toLowerCase().trim();
    var Country = inputCountry.property("value").toLowerCase().trim();
    var Shape = inputShape.property("value").trim();
    
    console.log(`The date filter is ${Date}`)
    console.log(`The city filter is ${City}`)
    console.log(`The state filter is ${State}`)
    console.log(`The country filter is ${Country}`)
    console.log(`The shape is ${Shape}`)

    // Apply choices to the original data set
    var reducedData = tableData.filter( function (reported) {
        return ( (reported.datetime === Date || Date == "") &&
                (reported.city === City || City == "")  &&
                (reported.state === State || State == "") &&
                (reported.country === Country || Country == "") &&
                (reported.shape === Shape || Shape =="") )
    })
    // During development, write data to console to verify data
    console.log(`The reduced data are`);
    console.log(reducedData);

    // Check for nonzero length of reducedData before writing to new table
    // Clear original data from table, reinitiate table and write reduced data
    // values into table using previous code in loadData function
    if( reducedData.length !== 0) {

        tbody.text("");
        tableData = reducedData;
        loadData(tableData);

    } else {

        tbody.text("");
        tbody.style("color", "red");
        tbody.append("tr").append("td").text("No results found!");
         }
}

// Now wait for filter button to be clicked and then filter data accordingly
filterButton.on("click", filterData);

// // Perform reset:  clear table and re-run loadData() with original data set
resetButton.on("click",  () => {
    tbody.text("");
    tableData = data;
    loadData(tableData);
    console.log("Table reset") } )
