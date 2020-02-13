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

console.log(map);
var title = document.getElementById("title-container");
console.log(title.textContent);

function tooltipHtml(n, d){	/* function to create html content string in tooltip div. */
    return "<h4>"+n+"</h4><table>"+
        "<tr><td>Low</td><td>"+(d.low)+"</td></tr>"+
        "<tr><td>Average</td><td>"+(d.avg)+"</td></tr>"+
        "<tr><td>High</td><td>"+(d.high)+"</td></tr>"+
        "</table>";
}

var sampleData ={};	/* Sample random data. */	

["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
"ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
"MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
"CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
"WI", "MO", "AR", "OK", "KS", "LS", "VA"]
    .forEach(function(d){
        var votes = map.get()
        if(Math.round(100*Math.random()) > 50) {
            var low=Math.round(50 + 50*Math.random()), 
                mid=Math.round(50 + 50*Math.random()), 
                high=Math.round(50 + 50*Math.random());
            sampleData[d]={low:d3.min([low,mid,high]), high:d3.max([low,mid,high]), 
                    avg:Math.round((low+mid+high)/3), color:d3.interpolate("#FFFFFF", "#0015BC")((low/100))}; 
            //sampleData[d] = {color:d3.interpolate("#FFFFFF", "#0015BC")};
        } else {
            var low=Math.round(50*Math.random()), 
                mid=Math.round(50*Math.random()), 
                high=Math.round(50*Math.random());
            sampleData[d]={low:d3.min([low,mid,high]), high:d3.max([low,mid,high]), 
                    avg:Math.round((low+mid+high)/3), color:d3.interpolate("#E9141D", "#FFFFFF")((low/100))}; 
        }
    });
/* draw states on id #statesvg */	
uStates.draw("#statesvg", sampleData, tooltipHtml);

d3.select(self.frameElement).style("height", "600px");

//console.log(map);

