import * as d3 from "d3"
var nodes = [
  { id: 'Node 1', radius: 20 },
  { id: 'Node 2', radius: 25 },
  { id: 'Node 3', radius: 30 },
  { id: 'Node 4', radius: 35 },
  { id: 'Node 5', radius: 40 },
  { id: 'Node 6', radius: 45 },
  { id: 'Node 7', radius: 50 },
  { id: 'Node 8', radius: 55 },
  { id: 'Node 9', radius: 60 },
  { id: 'Node 10', radius: 65 },
  { id: 'Node 11', radius: 70 },
  { id: 'Node 12', radius: 75 }
];

var links = [
  { source: 'Node 1', target: 'Node 2' },
  { source: 'Node 2', target: 'Node 3' },
  { source: 'Node 3', target: 'Node 4' },
  { source: 'Node 4', target: 'Node 5' },
  { source: 'Node 5', target: 'Node 6' },
  { source: 'Node 6', target: 'Node 7' },
  { source: 'Node 7', target: 'Node 8' },
  { source: 'Node 8', target: 'Node 9' },
  { source: 'Node 9', target: 'Node 10' },
  { source: 'Node 10', target: 'Node 11' },
  { source: 'Node 11', target: 'Node 12' },
  { source: 'Node 12', target: 'Node 1' }
];

function draw() {
  var width = 960,
    height = 500;

  var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius(function (d) {
      return d.radius;
    }));

  // 使用 div 代替 svg
  var div = d3.select("#d3-graph");

  var link = div.append("div")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter().append("line");

  var node = div.append("div")
    .attr("class", "nodes")
    .selectAll("div")
    .data(nodes)
    .enter().append("div")
    .attr("class", "node")
    .text(function (d) { return d.id; });

  simulation
    .nodes(nodes)
    .on("tick", ticked);

  simulation.force("link")
    .links(links);

  function ticked() {
    link
      .attr("x1", function (d) { return d.source.x; })
      .attr("y1", function (d) { return d.source.y; })
      .attr("x2", function (d) { return d.target.x; })
      .attr("y2", function (d) { return d.target.y; });

    node
      .style("left", function (d) { return d.x + 'px'; })
      .style("top", function (d) { return d.y + 'px'; });
  }
}

export { draw }
