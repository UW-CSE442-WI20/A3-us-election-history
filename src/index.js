var obj = require("./election-data.json");
//console.log(obj);

//console.log(obj.length);

var map = new Map();
for (var i = 0; i < obj.length; i++) {
    var year = obj[i].year;
    if (!map.has(year)) {
        // insert year with votes data
        var map2 = new Map();
        var state = obj[i].state_po;
        var votes = [obj[i].candidatevotes, obj[i].totalvotes, obj[i].party];
        map2.set(state, votes)
        map.set(year, map2);
    } else {
        var map2 = map.get(year);
        var state = obj[i].state_po;
        var votes = [obj[i].candidatevotes, obj[i].totalvotes, obj[i].party];
        if (!map2.has(state)) {
            map2.set(state, votes);
        }
    }
}

var partyMap = new Map();
for (var i = 0; i < obj.length; i++) {
    var year = obj[i].year;
    if (!map.has(year)) {
        var arr = [];
        var percentage = (obj[i].candidatevotes * 1.0 / obj[i].totalvotes);
        var party = obj[i].party;
        //arr.push([party, percentage]);
        partyMap.set(year, arr);
    } else {
        var arr = partyMap.get(year);
        var percentage = (obj[i].candidatevotes * 1.0 / obj[i].totalvotes);
        var party = obj[i].party;
        //arr.push([party.percentage]);
        partyMap.set(year, arr);
    }
}

console.log(partyMap);

//console.log(map);

//console.log(map);
//var title = document.getElementById("title-container");
//console.log(title.textContent);
//console.log(sliderTime.value().getYear() + 1900);
function tooltipHtml(n, d){	/* function to create html content string in tooltip div. */
    return "<h4>"+n+"</h4><table>"+
        "<tr><td>Low</td><td>"+(d.low)+"</td></tr>"+
        "<tr><td>Average</td><td>"+(d.avg)+"</td></tr>"+
        "<tr><td>High</td><td>"+(d.high)+"</td></tr>"+
        "</table>";
}

const title = document.getElementById('title-container').addEventListener('change', populateMap);

function populateMap() {

    var sampleData ={};	/* Sample random data. */	

    var currentYear = sliderTime.value().getYear() + 1900;
    console.log(currentYear);
    ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
    "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
    "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
    "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
    "WI", "MO", "AR", "OK", "KS", "LA", "VA"]
        .forEach(function(d){
            var map2 = map.get(currentYear);
            //console.log(map2);
            //console.log(map2);
            //console.log(map2.get(d));
            var info = map2.get(d);
            console.log(d);
            console.log(info);
            //console.log(d);
            //console.log(d);
            //console.log(info);
            var party = info[2];
            var votes = info[0];
            var totalvotes = info[1];
            var winningPercent = (1.0 * info[0]) / info[1];
            winningPercent = Math.min(1, 4.25*(winningPercent - .2));
            console.log(party);
            if(party == "democrat") {
                /*var low=Math.round(50 + 50*Math.random()), 
                    mid=Math.round(50 + 50*Math.random()), 
                    high=Math.round(50 + 50*Math.random());
                sampleData[d]={low:d3.min([low,mid,high]), high:d3.max([low,mid,high]), 
                        avg:Math.round((low+mid+high)/3), color:d3.interpolate("#FFFFFF", "#0015BC")((low/100))}; 
                */
                sampleData[d] = {low:info[0], high:2, avg:3, color:d3.interpolate("#FFFFFF", "#0015BC")(winningPercent)};
            } else {
                /*var low=Math.round(50*Math.random()), 
                    mid=Math.round(50*Math.random()), 
                    high=Math.round(50*Math.random());
                sampleData[d]={low:d3.min([low,mid,high]), high:d3.max([low,mid,high]), 
                        avg:Math.round((low+mid+high)/3), color:d3.interpolate("#E9141D", "#FFFFFF")((low/100))}; 
                */
                sampleData[d] = {low:info[0], high:2, avg:3, color:d3.interpolate("#FFFFFF", "#E9141D")(winningPercent)};
            }
        });
    /* draw states on id #statesvg */	
    console.log(sampleData);
    //setTimeout(function () {
    uStates.draw("#statesvg", sampleData, tooltipHtml);
    //}, 1500);
   // d3.select(self.frameElement).style("height", "600px");
}

populateMap();

sliderTime.on('onchange', val => {
    d3.select('#title-container').text("US Election Results in "+d3.timeFormat('%Y')(sliderTime.value()));
  	  d3.select('#key-title').text("Major Candidates (Winner in Bold)");
  	  d3.select('#republican-container').text("Hello");
  	  d3.select('#republican-container').style("font-weight", 900);
      d3.select('#democrat-container').text("Hillary Clinton");
      //console.log('made a call to on change, about to populate map');
	  populateMap();
});

//console.log(map);

