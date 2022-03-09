// Set margins and dimensions 
const margin = { top: 50, right: 50, bottom: 50, left: 200 };
const width = 900; //- margin.left - margin.right;
const height = 650; //- margin.top - margin.bottom;

// Append svg object to the body of the page to house Scatterplot1
const svg1 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]); 

// Initializes brush for Scatterplot1 and points. We will need these to be global. 
let brush1; 
let myCircles1; 

// Append svg object to the body of the page to house Scatterplot2
const svg2 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]); 

//Initializes brush for Scatterplot2 and points.
let brush2; 
let myCircles2; 

// Append svg object to the body of the page to house bar chart 
const svg3 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]); 

//Initializes the bars. 
let brush3;

// Define color scale
const color = d3.scaleOrdinal()
                .domain(["setosa", "versicolor", "virginica"])
                .range(["#FF7F50", "#21908dff", "#fde725ff"]);

// Plotting 
d3.csv("data/iris.csv").then((data) => {
  
  // We will need scales for all of the following charts to be global
  let x1, y1, x2, y2, x3, y3;  

  // We will need keys to be global
  let xKey1, yKey1, xKey2, yKey2, xKey3, yKey3;

  // Scatterplot1
  {
    xKey1 = "Sepal_Length";
    yKey1 = "Petal_Length";

    // Find max x
    let maxX1 = d3.max(data, (d) => { return d[xKey1]; });

    // Create X scale
    x1 = d3.scaleLinear()
                .domain([0,maxX1])
                .range([margin.left, width-margin.right]); 
    
    // Add x axis 
    svg1.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(x1))   
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                      .attr("x", width - margin.right)
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey1)
      );

    // Finx max y 
    let maxY1 = d3.max(data, (d) => { return d[yKey1]; });

    // Create Y scale
    y1 = d3.scaleLinear()
                .domain([0, maxY1])
                .range([height - margin.bottom, margin.top]); 

    // Add y axis 
    svg1.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(y1)) 
        .attr("font-size", '20px') 
        .call((g) => g.append("text")
                      .attr("x", 0)
                      .attr("y", margin.top)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(yKey1)
      );

    // Add points
    myCircles1 = svg1.selectAll("circle")
                            .data(data)
                            .enter()
                              .append("circle")
                              .attr("id", (d) => d.id)
                              .attr("cx", (d) => x1(d[xKey1]))
                              .attr("cy", (d) => y1(d[yKey1]))
                              .attr("r", 8)
                              .style("fill", (d) => color(d.Species))
                              .style("opacity", 0.5);

    // Defines brush1
    brush1 = d3.brush()
               .extent([[margin.left, margin.bottom], 
                        [width - margin.right, height - margin.top]])
               .on("brush", updateChart1)
               .on("start", clear);


    // Adds brush1 to svg1
    svg1.call(brush1)
               
    
  }

  // Creates Scatterplot 2 which shows Sepal width on x-axis and Petal width on y-axis
  {
    // Scatterplot2 code here
    xKey2 = "Sepal_Width";
    yKey2 = "Petal_Width";

    // Find max x
    let maxX2 = d3.max(data, (d) => { return d[xKey2]; });

    // Create X scale
    x2 = d3.scaleLinear()
                .domain([0,maxX2])
                .range([margin.left, width-margin.right]); 
    
    // Add x axis 
    svg2.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(x2))   
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                      .attr("x", width - margin.right)
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey2)
      );

    // Finx max y 
    let maxY2 = d3.max(data, (d) => { return d[yKey2]; });

    // Create Y scale
    y2 = d3.scaleLinear()
                .domain([0, maxY2])
                .range([height - margin.bottom, margin.top]); 

    // Add y axis 
    svg2.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(y2)) 
        .attr("font-size", '20px') 
        .call((g) => g.append("text")
                      .attr("x", 0)
                      .attr("y", margin.top)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(yKey2)
      );

    // Add points
    myCircles2 = svg2.selectAll("circle")
                        .data(data)
                            .enter()
                              .append("circle")
                              .attr("id", (d) => d.id)
                              .attr("cx", (d) => x2(d[xKey2]))
                              .attr("cy", (d) => y2(d[yKey2]))
                              .attr("r", 8)
                              .style("fill", (d) => color(d.Species))
                              .style("opacity", 0.5);

    // Defines brush2
    brush2 = d3.brush()
               .extent([[margin.left, margin.bottom], 
                        [width - margin.right, height - margin.top]])
               .on("brush", updateChart2)
               .on("start", clear);

    // Adds brush2 to svg2
    svg2.call(brush2)
       
  }

  // Creates a barchart with counts of different species
  {
    const data1 = [
      {Species: 'setosa', Count: 50},
      {Species: 'versicolor', Count: 50},
      {Species: 'virginica', Count: 50}
    ];

    //const map1 = d3.flatRollup(data, v => v.length, d => d.Species);

    xKey3 = "Species";
    yKey3 = "Count";

    // find max Y
    let maxY3 = d3.max(data1, function(d) { return d[yKey3]; });

   
    // set y scale
    y3 = d3.scaleLinear() //have linear data
                .domain([0,maxY3])  //  inputs
                .range([height-margin.bottom,margin.top]); // outputs

    // add y axis
    svg3.append("g") // g is placeholder for svg
       .attr("transform", `translate(${margin.left}, 0)`) // moves axes to screen left
       .call(d3.axisLeft(y3)) // set the scale of the axis
       .attr("font-size", '20px') // set font style
       .call((g) => g.append("text")
                      .attr("x", 0)
                      .attr("y", margin.top - 10)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(yKey3));

    // set x scale
    x3 = d3.scaleBand() // set scale of data
                .domain(d3.range(data1.length)) // inputs
                .range([margin.left, width - margin.right]) //outputs
                .padding(0.1);  //set badding for the bar chart
   

    // TODO: What does each line of this code do? 
    //add x axis
    svg3.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) // move axis to bottom
        .call(d3.axisBottom(x3) // set scale of axis
                .tickFormat(i => data1[i][xKey3]))  // set names of bars
        .attr("font-size", '20px') //set font style
        .call((g) => g.append("text")
                      .attr("x", width - margin.right) // makes the x axis the correct width
                      .attr("y", margin.bottom - 4) // makes the y axis the correct height
                      .attr("fill", "black") // black text
                      .attr("text-anchor", "end") // right aligns the text
                      .text(xKey3)); // passes the correct text

    //Add the bars
    bars = svg3.selectAll(".bar")
      .data(data1)
      .enter()
      .append('rect')
       .attr("class", "bar") //add class
       .attr("x", (d,i) => x3(i)) // use x axis to tansform datum
       .attr("y", (d) => y3(d[yKey3])) // use y axis to tansform datum
       .attr("height", (d) => (height - margin.bottom) - y3(d[yKey3])) // set height
       .attr("width", x3.bandwidth()) //set with
       .style("fill", (d) => color(d.Species))
       .style("opacity", 0.5);

  }

  //Brushing Code---------------------------------------------------------------------------------------------
    
  // Call to removes existing brushes 
  function clear() {
      svg1.call(brush1.move, null);
      
      // Clears the existing brush from svg2
      svg2.call(brush2.move, null);
  }

  // Call when Scatterplot1 is brushed 
  function updateChart1(brushEvent) {
      
      // Retrieves coordinates of brushed region 
      let extent = brushEvent.selection
  
      // Gives bold outline to all points within the brush region in Scatterplot1
      myCircles1.classed("selected", function(d){ return isBrushed(extent, x1(d[xKey1]), y1(d[yKey1]))})

      // Gives bold outline to all points in Scatterplot2 corresponding to points within the brush region in Scatterplot1
      myCircles2.classed("selected", function(d){ return isBrushed(extent, x1(d[xKey1]), y1(d[yKey1]))})
    
  }

  // Call when Scatterplot2 is brushed 
  function updateChart2(brushEvent) {
    
    // Finds coordinates of brushed region
    let extent = brushEvent.selection

    // Starts an empty set that you can store names of selected species in 
    let selected_species = new Set();
  
    // Gives bold outline to all points within the brush region in Scatterplot2 & collected names of brushed species
    myCircles2.classed("selected", function(d){
        let selected = isBrushed(extent, x2(d[xKey2]), y2(d[yKey2]));
        if (selected) {
            selected_species.add(d.Species)
        }
        return selected;
    })

    // Gives bold outline to all points in Scatterplot1 corresponding to points within the brush region in Scatterplot2
    myCircles1.classed("selected", function(d){ return isBrushed(extent, x2(d[xKey2]), y2(d[yKey2]))});

    // Gives bold outline to all bars in bar chart with corresponding to species selected by Scatterplot2 brush
    bars.classed("selected", function(d) { return selected_species.has(d[xKey3])});

  }

    //Finds dots within the brushed region
    function isBrushed(brush_coords, cx, cy) {
        if (brush_coords === null) return;

        var x0 = brush_coords[0][0],
            x1 = brush_coords[1][0],
            y0 = brush_coords[0][1],
            y1 = brush_coords[1][1];
        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1; // This return TRUE or FALSE depending on if the points is in the selected area
    }
});
