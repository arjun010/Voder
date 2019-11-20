/**
 * Created by arjun010 on 11/4/17.
 */
(function () {
    visRenderer = {};

    visRenderer.renderVisualization = function(divId, orgVisObject, options){
        let visObject = utils.cloneObj(orgVisObject);
        if(visObject.type==("BarWithCount")){
            visObject.shapedData = visDataShaper.getDataForBarChartWithCount(globalVars.dataList, visObject.x.attribute)
            renderBarChart(divId,visObject,options);
        }else if(visObject.type==("BarWithSum")){
            visObject.shapedData = visDataShaper.getDataForBarChartWithSum(globalVars.dataList,visObject.x.attribute,visObject.y.attribute);
            renderBarChart(divId,visObject,options);
        }else if(visObject.type==("BarWithAvg")){
            visObject.shapedData = visDataShaper.getDataForBarChartWithAvg(globalVars.dataList,visObject.x.attribute,visObject.y.attribute);
            renderBarChart(divId,visObject,options);
        }if(visObject.type==("DonutWithCount")){
            visObject.shapedData = visDataShaper.getDataForBarChartWithCount(globalVars.dataList, visObject.x.attribute)
            renderDonutChart(divId,visObject,options);
        }else if(visObject.type==("DonutWithSum")){
            visObject.shapedData = visDataShaper.getDataForBarChartWithSum(globalVars.dataList,visObject.x.attribute,visObject.y.attribute);
            renderDonutChart(divId,visObject,options);
        }else if(visObject.type==("DonutWithAvg")){
            visObject.shapedData = visDataShaper.getDataForBarChartWithAvg(globalVars.dataList,visObject.x.attribute,visObject.y.attribute);
            renderDonutChart(divId,visObject,options);
        }else if(visObject.type=="SingleAxisTickPlot"){
            visObject.shapedData = visDataShaper.getDataForSingleAxisTickPlot(globalVars.dataList,visObject.y.attribute,globalVars.itemAttribute);
            renderTickChart(divId,visObject,options);
        }else if(visObject.type=="TwoAxisTickPlot"){
            visObject.shapedData = visDataShaper.getDataForTwoAxisTickPlot(globalVars.dataList,visObject.x.attribute,visObject.y.attribute,globalVars.itemAttribute);
            renderTickChart(divId,visObject,options);
        }else if(visObject.type=="TickPlotWithColor"){
            visObject.shapedData = visDataShaper.getDataForColoredTickPlot(globalVars.dataList,visObject.x.attribute,visObject.y.attribute,visObject.color.attribute,globalVars.itemAttribute);
            renderColoredTickChart(divId,visObject,options);
        }else if(visObject.type=="Scatterplot"){
            visObject.shapedData = visDataShaper.getDataForScatterplot(globalVars.dataList,globalVars.metadataMap,visObject.x.attribute,visObject.y.attribute,globalVars.itemAttribute);
            renderScatterplot(divId,visObject,options);
        }else if(visObject.type=="ScatterplotWithColor"){
            visObject.shapedData = visDataShaper.getDataForColoredScatterplot(globalVars.dataList,globalVars.metadataMap,visObject.x.attribute,visObject.y.attribute,visObject.color.attribute,globalVars.itemAttribute);
            renderColoredScatterplot(divId,visObject,options);
        }else if(visObject.type=="ScatterplotWithSize"){
            visObject.shapedData = visDataShaper.getDataForSizedScatterplot(globalVars.dataList,globalVars.metadataMap,visObject.x.attribute,visObject.y.attribute,visObject.size.attribute,globalVars.itemAttribute);
            renderSizedScatterplot(divId,visObject,options);
        }else if(visObject.type=="AggregatedScatterplotWithCountSize"){
            visObject.shapedData = visDataShaper.getDataForAggregatedScatterplotByCount(globalVars.dataList,globalVars.metadataMap,visObject.x.attribute,visObject.y.attribute);
            renderAggregateScatterplot(divId,visObject,options);
        }else if(visObject.type=="AggregatedScatterplotWithAvgSize"){
            visObject.shapedData = visDataShaper.getDataForAggregatedScatterplotByAvg(globalVars.dataList,globalVars.metadataMap,visObject.x.attribute,visObject.y.attribute,visObject.size.attribute);
            renderAggregateScatterplot(divId,visObject,options);
        }else if(visObject.type=="AggregatedScatterplotWithSumSize"){
            visObject.shapedData = visDataShaper.getDataForAggregatedScatterplotBySum(globalVars.dataList,globalVars.metadataMap,visObject.x.attribute,visObject.y.attribute,visObject.size.attribute);
            renderAggregateScatterplot(divId,visObject,options);
        }else if(visObject.type=="StackedBarChart"){
            visObject.shapedData = visDataShaper.getDataForStackedBarChart(globalVars.dataList,globalVars.metadataMap,visObject.x.attribute,visObject.color.attribute);
            renderStackedBarChart(divId,visObject,options);
        }else if(visObject.type=="ScatterplotWithColorByAvg"){
            visObject.shapedData = visDataShaper.getDataForColoredScatterplotWithAvg(globalVars.dataList,globalVars.metadataMap,visObject.x.attribute,visObject.y.attribute,visObject.color.attribute,globalVars.itemAttribute);
            renderColoredScatterplot(divId,visObject,options);
        }else if(visObject.type=="ScatterplotWithColorBySum"){
            visObject.shapedData = visDataShaper.getDataForColoredScatterplotWithSum(globalVars.dataList,globalVars.metadataMap,visObject.x.attribute,visObject.y.attribute,visObject.color.attribute,globalVars.itemAttribute);
            renderColoredScatterplot(divId,visObject,options);
        }else if(visObject.type=="TickPlotWithColorByAvg"){
            visObject.shapedData = visDataShaper.getDataForColoredTickPlotWithAvg(globalVars.dataList,globalVars.metadataMap,visObject.x.attribute,visObject.y.attribute,visObject.color.attribute,globalVars.itemAttribute);
            renderColoredTickChart(divId,visObject,options);
        }else if(visObject.type=="TickPlotWithColorBySum"){
            visObject.shapedData = visDataShaper.getDataForColoredTickPlotWithSum(globalVars.dataList,globalVars.metadataMap,visObject.x.attribute,visObject.y.attribute,visObject.color.attribute,globalVars.itemAttribute);
            renderColoredTickChart(divId,visObject,options);
        }else if(visObject.type=="SingleAxisBoxPlot"){
            visObject.shapedData = visDataShaper.getDataForSingleAxisBoxPlot(globalVars.dataList,globalVars.metadataMap,visObject.y.attribute,globalVars.itemAttribute);
            renderSingleAxisBoxPlot(divId,visObject,options)
        }else if(visObject.type=="Histogram"){
            visObject.shapedData = visDataShaper.getDataForHistogram(globalVars.dataList,globalVars.metadataMap,visObject.y.attribute);
            renderHistogram(divId,visObject,options)
        }

        //else if(visObject.type.toLowerCase()=="twoaxistickplot" || visObject.type.toLowerCase()=="singleaxistickplot"){
        //    renderTickChart(divId, visObject, options);
        //}else if(visObject.type.toLowerCase()=="tickplotwithcolor"){
        //    renderColoredTickChart(divId, visObject, options);
        //}else if(visObject.type.toLowerCase().indexOf("donut")!=-1){
        //    renderDonutChart(divId, visObject, options);
        //}else if(visObject.type.toLowerCase()=="scatterplotwithcolor"){
        //    renderColoredScatterplot(divId, visObject, options);
        //}else if(visObject.type.toLowerCase()=="scatterplot"){
        //    renderScatterplot(divId, visObject, options);
        //}else if(visObject.type.toLowerCase()=="scatterplotwithsize"){
        //    renderSizedScatterplot(divId, visObject, options);
        //}else if(visObject.type.toLowerCase()=="aggregatedscatterplotwithavgsize" || visObject.type.toLowerCase()=="aggregatedscatterplotwithsvgsize"){
        //    renderAggregateScatterplot(divId, visObject, options);
        //}
    };

    function renderScatterplot(divId, visObject, options){
        d3.select(divId).selectAll("svg").remove();

        var divWidth = $(divId).width() * 0.9;
        var divHeight = $(divId).height() * 0.9;

        var heightBuffer = typeof options.heightBuffer !== 'undefined' ? options.heightBuffer : 50;
        var widthBuffer = typeof options.widthBuffer !== 'undefined' ? options.widthBuffer : 50;

        var svg = d3.select(divId).append("svg").attr("width",divWidth+widthBuffer).attr("height",divHeight),
            margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = +svg.attr("width") - margin.left - margin.right - widthBuffer,
            height = +svg.attr("height") - margin.top - margin.bottom - heightBuffer;

        if(globalVars.metadataMap[visObject.x.attribute]['type']!="quantitative"){
            //var x = d3.scalePoint().range([0, width]);
            //x.domain(visObject.shapedData.map(function(d) { return d.xVal; }));
            var x = d3.scaleBand().rangeRound([0, width])
            x.domain(visObject.shapedData.map(function(d) { return d.xVal; }));
        }else{
            var x = d3.scaleLinear()
                .range([0, width]);

            let xValsExtent = d3.extent(visObject.shapedData, function(d) { return d.xVal; });
            if(xValsExtent[0]<0){
                x.domain(xValsExtent).nice();
            }else{
                x.domain([0,xValsExtent[1]]).nice();
            }
        }

        var xAxis = d3.axisBottom(x).tickArguments([, "s"])//.tickFormat(d3.format(".0s"));

        var y = d3.scaleLinear()
            .range([height, 0]);

        let yValsExtent = d3.extent(visObject.shapedData, function(d) { return d.yVal; });
        if(yValsExtent[0]<0){
            y.domain(yValsExtent).nice();
        }else{
            y.domain([0,yValsExtent[1]]).nice();
        }

        var yAxis = d3.axisLeft(y).tickArguments([, "s"])//.tickFormat(d3.format(".0s"));


        let XaxisData = visObject.shapedData.map(function(d) { return d.xVal; });
        let YaxisData = visObject.shapedData.map(function(d) { return d.yVal; });
        let regression=leastSquaresequation(XaxisData,YaxisData);

        let line = d3.line()
            .x(function(d) { return x(d.xVal); })
            .y(function(d) { return y(regression(d.xVal)); });



        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6)
            // .attr("transform", function(){
            //     if(globalVars.metadataMap[visObject.x.attribute]['type']!="quantitative"){
            //         return "rotate(-90)";
            //     }
            // })
            .style("text-anchor", "end")
            .style("fill","black")
            .text(visObject.x.attribute);

        g.select(".x.axis")
            .selectAll("text")
            .attr("class","xAxisLabel");

        g.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style("fill","black")
            .text(visObject.y.attribute)

        g.append("g").attr("id","dotGroup").selectAll(".dot")
            .data(visObject.shapedData)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 3.5)
            .attr("cx", function(d) {
                if(globalVars.metadataMap[visObject.x.attribute]['type']!="quantitative"){
                    return x(d.xVal)+ x.bandwidth()/2;
                }else{
                    return x(d.xVal);
                }
            })
            .attr("cy", function(d) { return y(d.yVal); })
            .style("fill","white")
            .style("fill-opacity",0)
            .append("title")
            .text(function(d){
                return d.itemLabel;
            });

        g.selectAll(".itemLabel")
            .data(visObject.shapedData)
            .enter().append("text")
            .attr("class", "itemLabel")
            .style("display","none")
            .attr("x", function(d) {
                if(globalVars.metadataMap[visObject.x.attribute]['type']!="quantitative"){
                    return x(d.xVal)+ x.bandwidth()/1.8;
                }else{
                    return x(d.xVal);
                }
            })
            .attr("y", function(d) {
                return y(+d.yVal);
            })
            .text(function(d){
                return d['itemLabel'];
            });

        g.append("path")
            .datum(visObject.shapedData)
            .attr("class", "annotation regressionLine")
            .attr("d", line)
            .style("display","none");

        let midXVal = globalVars.metadataMap[visObject.x.attribute]['domain'][parseInt(globalVars.metadataMap[visObject.x.attribute]['domain'].length/2)];
        let midYVal = globalVars.metadataMap[visObject.y.attribute]['domain'][parseInt(globalVars.metadataMap[visObject.y.attribute]['domain'].length/2)];
        g.append("line").attr("class",'annotation quadrantLine').attr('x1',x(x.domain()[0])).attr('x2',x(x.domain()[1])).attr("y1",y(midYVal)).attr("y2",y(midYVal)).style("display","none");
        g.append("line").attr("class",'annotation quadrantLine').attr('x1',x(midXVal)).attr('x2',x(midXVal)).attr("y1",y(y.domain()[0])).attr("y2",y(y.domain()[1])).style("display","none");
    };

    function renderColoredScatterplot(divId, visObject, options){
        d3.select(divId).selectAll("svg").remove();

        var divWidth = $(divId).width() * 0.9;
        var divHeight = $(divId).height() * 0.9;

        var heightBuffer = typeof options.heightBuffer !== 'undefined' ? options.heightBuffer : 50;
        var widthBuffer = typeof options.widthBuffer !== 'undefined' ? options.widthBuffer : 50;

        var svg = d3.select(divId).append("svg").attr("width",divWidth+widthBuffer).attr("height",divHeight),
            margin = {top: 20, right: 20, bottom: 0, left: 40},
            width = +svg.attr("width") - margin.left - margin.right - widthBuffer,
            height = +svg.attr("height") - margin.top - margin.bottom - heightBuffer;

        if(globalVars.metadataMap[visObject.x.attribute]['type']!="quantitative"){
            //var x = d3.scalePoint().range([0, width-widthBuffer]);
            var x = d3.scaleBand().rangeRound([0, width])
            x.domain(visObject.shapedData.map(function(d) { return d.xVal; }));

        }else{
            var x = d3.scaleLinear().range([0, width]);

            let xValsExtent = d3.extent(visObject.shapedData, function(d) { return d.xVal; });
            if(xValsExtent[0]<0){
                x.domain(xValsExtent).nice();
            }else{
                x.domain([0,xValsExtent[1]]).nice();
            }
        }

        var xAxis = d3.axisBottom(x).tickArguments([, "s"]);

        var y = d3.scaleLinear()
            .range([height, 0]);

        let yValsExtent = d3.extent(visObject.shapedData, function(d) { return d.yVal; });
        if(yValsExtent[0]<0){
            y.domain(yValsExtent).nice();
        }else{
            y.domain([0,yValsExtent[1]]).nice();
        }

        var yAxis = d3.axisLeft(y).tickArguments([, "s"])

        let color = d3.scaleOrdinal(d3.schemeCategory10);

        let XaxisData = visObject.shapedData.map(function(d) { return d.xVal; });
        let YaxisData = visObject.shapedData.map(function(d) { return d.yVal; });
        let regression=leastSquaresequation(XaxisData,YaxisData);

        let regressionLineFunction = d3.line()
            .x(function(d) { return x(d.xVal); })
            .y(function(d) { return y(regression(d.xVal)); });

        var mainG = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        mainG.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", function(){
                if(globalVars.metadataMap[visObject.x.attribute]['type']!="quantitative"){
                    return width-widthBuffer;
                }else{
                    return width;
                }
            })
            .attr("y", -6)
            .style("text-anchor", "end")
            .style("fill","black")
            // .style("font-weight","bold")
            .text(visObject.x.attribute);

        mainG.select(".x.axis")
            .selectAll("text")
            .attr("class","xAxisLabel");

        mainG.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style("fill","black")
            // .style("font-weight","bold")
            .text(function(){
                if(visObject.y.transform==""){
                    return visObject.y.attribute
                }else{
                    return visObject.y.transform + "(" + visObject.y.attribute + ")"
                }
            });

        mainG.append("g").attr("id","dotGroup").selectAll(".dot")
            .data(visObject.shapedData)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("r", function(d){
                if(isNaN(d.yVal) || d.yVal==""){
                    return 0.0;
                }else{
                    return 3.5;
                }
            })
            .attr("cx", function(d) {
                if(globalVars.metadataMap[visObject.x.attribute]['type']=="quantitative"){
                    return x(d.xVal);
                }else{
                    return x(d.xVal)+x.bandwidth()/2;
                }
            })
            .attr("cy", function(d) { return y(d.yVal); })
            .style("fill","white")
            .style("fill-opacity",0)
            .style("stroke",function(d){
                return color(d.colorAttrValue);
            })
            .append("title")
            .text(function(d){
                return d.itemLabel;
            });

        mainG.selectAll(".itemLabel")
            .data(visObject.shapedData)
            .enter().append("text")
            .attr("class", "itemLabel")
            .style("display","none")
            .attr("x", function(d) {
                if(globalVars.metadataMap[visObject.x.attribute]['type']!="quantitative"){
                    return x(d.xVal)+ x.bandwidth()/1.8;
                }else{
                    return x(d.xVal);
                }
            })
            .attr("y", function(d) {
                return y(+d.yVal);
            })
            .text(function(d){
                return d['itemLabel'];
            });

        let midXVal = globalVars.metadataMap[visObject.x.attribute]['domain'][parseInt(globalVars.metadataMap[visObject.x.attribute]['domain'].length/2)];
        let midYVal = globalVars.metadataMap[visObject.y.attribute]['domain'][parseInt(globalVars.metadataMap[visObject.y.attribute]['domain'].length/2)];
        mainG.append("line").attr("class",'annotation quadrantLine').attr('x1',x(x.domain()[0])).attr('x2',x(x.domain()[1])).attr("y1",y(midYVal)).attr("y2",y(midYVal)).style("display","none");
        mainG.append("line").attr("class",'annotation quadrantLine').attr('x1',x(midXVal)).attr('x2',x(midXVal)).attr("y1",y(y.domain()[0])).attr("y2",y(y.domain()[1])).style("display","none");

        let colorLegendText = svg.append("text")
            .attr("x", width + margin.right + 20)
            .attr("y", 5)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .style("font-size",12)
            .style("font-weight","bold")
            .text(function() { 
                return visObject.color.attribute;
            });

        var legend = mainG.selectAll(".legend")
            .data(color.domain())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(0," + i * 15 + ")"; });

        legend.append("rect")
            .attr("x", width + margin.right - 10)
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", color);

        legend.append("text")
            .attr("class","legendText")
            .attr("x", width + margin.right + 2)
            .attr("y", 5)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .style("font-size",10)
            .text(function(d) { return d; })
            .append("title")
            .text(function(d){
                return d;
            });


        let groupDataMap = {};
        for(var dataObj of visObject.shapedData){
            if(dataObj.colorAttrValue in groupDataMap){
                //groupDataMap[dataObj.colorAttrValue].push([x(dataObj.xVal),y(dataObj.yVal)]);
                groupDataMap[dataObj.colorAttrValue]["points"].push([x(dataObj.xVal),y(dataObj.yVal)]);
                groupDataMap[dataObj.colorAttrValue]['xVals'].push(dataObj.xVal);
                groupDataMap[dataObj.colorAttrValue]['yVals'].push(dataObj.yVal);
                groupDataMap[dataObj.colorAttrValue]['shapedData'].push(dataObj);
            }else{
                groupDataMap[dataObj.colorAttrValue] = {
                    "points" : [[x(dataObj.xVal),y(dataObj.yVal)]],
                    "shapedData" : [dataObj],
                    "xVals" : [dataObj.xVal],
                    "yVals" : [dataObj.yVal]
                };
            }
        }

        for(var categoryLabel in groupDataMap){
            //var groupPath = "M" + d3.polygonHull(groupHullDataMap[categoryLabel]).join("L") + "Z";

            //mainG.append("path")
            //    .attr("class", "annotation hull")
            //    .attr("d", groupPath)
            //    .style("fill",color(categoryLabel));

            var convexHullPath = mainG.append('path')
                .attr("class", "annotation hull")
                .style("fill",color(categoryLabel))
                .attr("categoryLabel",categoryLabel)
                .style("display","none");

            var convexHull = (groupDataMap[categoryLabel]['points'].length < 3) ? groupDataMap[categoryLabel]['points'] : d3.polygonHull(groupDataMap[categoryLabel]['points']);
            convexHullPath.attr ('d', smoothHull(convexHull));

            let regression=leastSquaresequation(groupDataMap[categoryLabel]['xVals'],groupDataMap[categoryLabel]['yVals']);

            let line = d3.line()
                .x(function(d) { return x(d.xVal); })
                .y(function(d) { return y(regression(d.xVal)); });

            mainG.append("path")
                .datum(groupDataMap[categoryLabel].shapedData)
                .attr("class", "annotation hullRegressionLine")
                .attr("d", line)
                .attr("categoryLabel",categoryLabel)
                //.style("stroke",color(categoryLabel))
                .style("display","none");

        };

        //var hull = main.append("path")
        //    .attr("class", "annotation hull");
        //
        //hull.datum(d3.geom.hull(vertices)).attr("d", function(d) { return "M" + d.join("L") + "Z"; });

        mainG.append("path")
            .datum(visObject.shapedData)
            .attr("class", "annotation regressionLine")
            .attr("d", regressionLineFunction)
            .style("display","none");

    };

    function renderSizedScatterplot(divId, visObject, options){
        d3.select(divId).selectAll("svg").remove();

        var divWidth = $(divId).width() * 0.9;
        var divHeight = $(divId).height() * 0.9;

        var heightBuffer = typeof options.heightBuffer !== 'undefined' ? options.heightBuffer : 50;
        var widthBuffer = typeof options.widthBuffer !== 'undefined' ? options.widthBuffer : 50;

        var svg = d3.select(divId).append("svg").attr("width",divWidth+widthBuffer).attr("height",divHeight),
            margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = +svg.attr("width") - margin.left - margin.right - widthBuffer,
            height = +svg.attr("height") - margin.top - margin.bottom - heightBuffer;

        if(globalVars.metadataMap[visObject.x.attribute]['type']!="quantitative"){
            //var x = d3.scalePoint().range([0, width-widthBuffer/2]);
            //x.domain(visObject.shapedData.map(function(d) { return d.xVal; }));
            var x = d3.scaleBand().rangeRound([0, width])
            x.domain(visObject.shapedData.map(function(d) { return d.xVal; }));

        }else{
            var x = d3.scaleLinear()
                .range([0, width-widthBuffer/2]);
            let xValsExtent = d3.extent(visObject.shapedData, function(d) { return d.xVal; });
            if(xValsExtent[0]<0){
                x.domain(xValsExtent).nice();
            }else{
                x.domain([0,xValsExtent[1]]).nice();
            }
        }

        var xAxis = d3.axisBottom(x);

        var y = d3.scaleLinear()
            .range([height, 0]);

        let yValsExtent = d3.extent(visObject.shapedData, function(d) { return d.yVal; });
        if(yValsExtent[0]<0){
            y.domain(yValsExtent).nice();
        }else{
            y.domain([0,yValsExtent[1]]).nice();
        }

        var yAxis = d3.axisLeft(y);

        let sizeScale = d3.scaleLinear().range([3,8]);
        sizeScale.domain(d3.extent(visObject.shapedData, function(d) { return d.sizeAttrValue; })).nice();

        var mainG = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        mainG.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width-widthBuffer/2)
            .attr("y", -6)
            .style("text-anchor", "end")
            .style("fill","black")
            .text(visObject.x.attribute);

        mainG.select(".x.axis")
            .selectAll("text")
            .attr("class","xAxisLabel");

        mainG.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style("fill","black")
            .text(visObject.y.attribute)

        mainG.append("g").attr("id","dotGroup").selectAll(".dot")
            .data(visObject.shapedData)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", function(d){return sizeScale(d.sizeAttrValue);})
            .attr("cx", function(d) {
                if(globalVars.metadataMap[visObject.x.attribute]['type']!="quantitative"){
                    return x(d.xVal)+ x.bandwidth()/2;
                }else{
                    return x(d.xVal);
                }
            })
            .attr("cy", function(d) { return y(d.yVal); })
            .style("fill","white")
            .style("fill-opacity",0)
            .append("title")
            .text(function(d){
                return d.itemLabel;
            });

        let sizeLegendText = svg.append("text")
            .attr("x", width + 5)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .style("font-size",10)
            .style("font-weight", "bold")
            .text(function() {
                return "Size: "+visObject.size.transform + "(" + visObject.size.attribute + ")";
            });

        let midXVal = globalVars.metadataMap[visObject.x.attribute]['domain'][parseInt(globalVars.metadataMap[visObject.x.attribute]['domain'].length/2)];
        let midYVal = globalVars.metadataMap[visObject.y.attribute]['domain'][parseInt(globalVars.metadataMap[visObject.y.attribute]['domain'].length/2)];
        mainG.append("line").attr("class",'annotation quadrantLine').attr('x1',x(x.domain()[0])).attr('x2',x(x.domain()[1])).attr("y1",y(midYVal)).attr("y2",y(midYVal)).style("display","none");
        mainG.append("line").attr("class",'annotation quadrantLine').attr('x1',x(midXVal)).attr('x2',x(midXVal)).attr("y1",y(y.domain()[0])).attr("y2",y(y.domain()[1])).style("display","none");
    };

    function renderAggregateScatterplot(divId, visObject, options){
        d3.select(divId).selectAll("svg").remove();

        var divWidth = $(divId).width() * 0.9;
        var divHeight = $(divId).height() * 0.9;

        var heightBuffer = typeof options.heightBuffer !== 'undefined' ? options.heightBuffer : 50;
        var widthBuffer = typeof options.widthBuffer !== 'undefined' ? options.widthBuffer : 50;

        var svg = d3.select(divId).append("svg").attr("width",divWidth+widthBuffer).attr("height",divHeight),
            margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = +svg.attr("width") - margin.left - margin.right - widthBuffer,
            height = +svg.attr("height") - margin.top - margin.bottom - heightBuffer;

        var x = d3.scalePoint().range([0, width-widthBuffer/2]);
        x.domain(visObject.shapedData.map(function(d) { return d.xLabel; }));

        var xAxis = d3.axisBottom(x);

        var y = d3.scalePoint().range([height, 0]);
        y.domain(visObject.shapedData.map(function(d) { return d.yLabel; }));

        var yAxis = d3.axisLeft(y)

        let sizeScale = d3.scaleLinear().range([5,15]);
        console.log(options,options.isThumbnail)
        if(options.isThumbnail==true){
            sizeScale.range([3,8]);
        }

        sizeScale.domain(d3.extent(visObject.shapedData, function(d) { return d.sizeAttrValue; })).nice();

        var mainG = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        mainG.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);            

        mainG.select(".x.axis")
            .selectAll("text")
            .attr("class","xAxisLabel")
            .attr("transform","rotate(-90)")
            .style("text-anchor","end")
            .attr("y", -5)
            .attr("x", -10);

        svg.append("text")
            .attr("class", "label")
            .attr("x", width-widthBuffer/2)
            .attr("y", -6)
            .style("text-anchor", "end")
            .style("fill","black")
            .style("font-weight", "bold")
            .text(function(){
                if(visObject.x.transform!=undefined || visObject.x.transform!=""){
                    if(visObject.x.attribute!=""){
                        return visObject.x.transform+"("+visObject.x.attribute+")";
                    }else{
                        return visObject.x.transform;
                    }
                }else{
                    return visObject.x.attribute;
                }
            });

        mainG.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style("fill","black")
            .style("font-weight", "bold")
            .text(function(){
                if(visObject.y.transform!=undefined || visObject.y.transform!=""){
                    if(visObject.y.attribute!=""){
                        return visObject.y.transform+"("+visObject.y.attribute+")";
                    }else{
                        return visObject.y.transform;
                    }
                }else{
                    return visObject.y.attribute;
                }
            });

        mainG.select(".y.axis")
            .selectAll("text")
            .attr("class","yAxisLabel");

        mainG.append("g").attr("id","dotGroup").selectAll(".dot")
            .data(visObject.shapedData)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", function(d){
                if(d.sizeAttrValue == 0.0){
                    return 0;
                }else{
                    return sizeScale(d.sizeAttrValue);
                }
            })
            .attr("cx", function(d) { return x(d.xLabel); })
            .attr("cy", function(d) { return y(d.yLabel); })
            .style("fill","white")
            .style("fill-opacity",0)
            .append("title")
            .text(function(d){
                return d.sizeAttrValue.toFixed(2);
            });

        let sizeLegendText = svg.append("text")
            .attr("x", width + 5)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .style("font-size",10)
            .style("font-weight", "bold")
            .text(function() { 
                return visObject.size.transform + "(" + visObject.size.attribute + ")";                
            });
    };

    function renderDonutChart(divId, visObject, options){
        d3.select(divId).selectAll("svg").remove();

        let width = $(divId).width() * 0.9;
        let height = $(divId).height() * 0.9;
        //let width = +svg.attr("width") - margin.left - margin.right - widthBuffer,
        //    height = +svg.attr("height") - margin.top - margin.bottom - heightBuffer;

        let radius = Math.min(width, height) / 3;
        let thickness = radius/2;
        let color = d3.scaleOrdinal(d3.schemeCategory10);

        let svg = d3.select(divId)
            .append('svg')
            .attr('class', 'pie')
            .attr('width', width)
            .attr('height', height);

        let g = svg.append('g')
            .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

        let arc = d3.arc()
            .innerRadius(radius - thickness)
            .outerRadius(radius);

        let pie = d3.pie()
            .value(function(d) { return d.value; })
            .sort(null);

        let outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);

        let valueSum = 0.0;
        for(var dataObj of visObject.shapedData){
            valueSum += dataObj.value;
        }

        let path = g.selectAll('path')
                .data(pie(visObject.shapedData))
                .enter()
                .append("g")
                .append('path')
                .attr("class","pieSlice")
                .attr('d', arc)
                .attr('fill', (d,i) => color(i))
                .each(function(d, i) { this._current = i; })
                .append("title")
                .text(function(d){
                    return d.data.categoryLabel+": "+ d.data.value + " (" + (d.data.value/valueSum).toFixed(2)*100 + "%)";
                });


        /* ------- TEXT LABELS -------*/
        var key = function(d){ return d.data.categoryLabel; };
        var text = g.selectAll("text")
            .data(pie(visObject.shapedData), key);

        text.enter()
            .append("text")
            .attr("class","pieSliceText")
            .attr("dy", ".35em")
            .attr("transform", function(d) {
                var pos = outerArc.centroid(d);
                pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
                return "translate("+ pos +")";
            })
            .style("text-anchor", function(d){
                return midAngle(d) < Math.PI ? "start":"end";
            })
            .text(function(d) {
                return d.data.categoryLabel;
            });

        function midAngle(d){
            return d.startAngle + (d.endAngle - d.startAngle)/2;
        }

        /* ------- SLICE TO TEXT POLYLINES -------*/

        var polyline = g.selectAll("polyline")
            .data(pie(visObject.shapedData), key);

        polyline.enter()
            .append("polyline")
            .attr("points", function(d){
                var pos = outerArc.centroid(d);
                pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                return [arc.centroid(d), outerArc.centroid(d), pos];
            });

        // arc attribute
        let titleText = svg.append("text")
            .attr("x",width/3)
            .attr("y",height*0.05)
            .style("font-size",12)
            .style("font-weight","bold")
            .text(function(){
                let displayText = visObject.x.attribute;
                if(visObject.y.attribute==""){
                    displayText += ", COUNT"
                }else{
                    displayText += ", "+visObject.y.transform+"("+visObject.y.attribute+")";
                }
                return displayText;
            })

    }

    function renderStackedBarChart(divId, visObject, options){
        //var svg = d3.select("svg"),
        //    margin = {top: 20, right: 20, bottom: 30, left: 40},
        //    width = +svg.attr("width") - margin.left - margin.right,
        //    height = +svg.attr("height") - margin.top - margin.bottom,
        //    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        d3.select(divId).selectAll("svg").remove();

        var divWidth = $(divId).width() * 0.9;
        var divHeight = $(divId).height() * 0.9;

        var heightBuffer = typeof options.heightBuffer !== 'undefined' ? options.heightBuffer : 50;
        var widthBuffer = typeof options.widthBuffer !== 'undefined' ? options.widthBuffer : 50;

        //$(divId).css("overflow","hidden");
        //if((divWidth+widthBuffer)<visObject.shapedData.length*20){
        //    divWidth = visObject.shapedData.length*20;
        //    $(divId).css("overflow","auto");
        //}
        //$(divId).width(divWidth+widthBuffer)
        //$(divId).height(divHeight+heightBuffer)

        var svg = d3.select(divId).append("svg").attr("width",divWidth+widthBuffer).attr("height",divHeight),
            margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = +svg.attr("width") - margin.left - margin.right - widthBuffer,
            height = +svg.attr("height") - margin.top - margin.bottom - heightBuffer,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleBand()
            .rangeRound([10, width-widthBuffer])
            .paddingInner(0.05)
            .align(0.1);

        var y = d3.scaleLinear()
            .rangeRound([height, 0]);

        var colorScale = d3.scaleOrdinal(d3.schemeCategory10)
        var keys = visObject.shapedData.keys;

        x.domain(visObject.shapedData.dataList.map(function(d) { return d.xLabel; }));
        y.domain([0, d3.max(visObject.shapedData.dataList, function(d) { return d.totalOfKeys; })]).nice();
        colorScale.domain(keys);

        g.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(visObject.shapedData.dataList))
            .enter()
            .append("g")
            .attr("fill", function(d) { return colorScale(d.key); })
            .selectAll("rect")
            .data(function(d) { return d; })
            .enter().append("rect")
            .attr("class","stackedBarPortion")
            .attr("x", function(d) {return x(d.data.xLabel);})
            .attr("y", function(d) { return y(d[1]); })
            .attr("xLabel",function(d){return d.data.xLabel;})
            .attr("height", function(d) { return y(d[0]) - y(d[1]); })
            .attr("width", x.bandwidth());

        d3.selectAll(".stackedBarPortion").each(function(d){
            let fillColor = d3.select(this.parentNode).attr("fill");
            for(var key of keys){
                if(fillColor==colorScale(key)){
                    d3.select(this).attr("colorLabel",key).attr("xLabel", d.data.xLabel)
                    break;
                }
            }
        })

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            //.attr("y", 0)
            //.attr("x", -9)
            //.attr("dy", ".35em")
            //.attr("transform", "rotate(-90)")
            .style("text-overflow", "ellipsis")
            //.style("text-anchor", "end");            

        g.select(".axis--x")
            .selectAll("text")
            .attr("class","xAxisLabel")
            .attr("y", -5)
            .attr("x", -10)
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "end");

        // text label for the x axis
        svg.append("text")
            .attr("transform", "translate(" + ((width+widthBuffer)/2) + " ," + (height + margin.top +heightBuffer) + ")")
            .style("text-anchor", "middle")
            .style("font-size",12)
            .style("font-weight","bold")
            .text(visObject.x.attribute);

        //g.append("g")
        //    .attr("class", "axis")
        //    .call(d3.axisLeft(y).ticks(null, "s"))
        //    .append("text")
        //    .attr("x", 2)
        //    .attr("y", y(y.ticks().pop()) + 0.5)
        //    .attr("dy", "0.32em")
        //    .attr("fill", "#000")
        //    .attr("font-weight", "bold")
        //    .attr("text-anchor", "start")
        //    .text("Population");

        g.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(10)")
            .call(d3.axisLeft(y).ticks(10,"s"))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end");

        // text label for the y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size",12)
            .style("font-weight","bold")
            .text(function(){
                if(visObject.y.transform!=undefined || visObject.y.transform!=""){
                    if(visObject.y.attribute!=""){
                        return visObject.y.transform+"("+visObject.y.attribute+")";
                    }else{
                        return visObject.y.transform;
                    }
                }else{
                    return visObject.y.attribute;
                }
            });

        var legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 24)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", colorScale);

        legend.append("text")
            .attr("class","legendText")
            .attr("x", width)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .style("font-size",10)
            .text(function(d) { return d; })
            .append("title")
            .text(function(d){
                return d;
            });

    }

    function renderBarChart(divId, visObject, options){
        d3.select(divId).selectAll("svg").remove();

        var divWidth = $(divId).width() * 0.9;
        var divHeight = $(divId).height() * 0.9;

        var heightBuffer = typeof options.heightBuffer !== 'undefined' ? options.heightBuffer : 50;
        var widthBuffer = typeof options.widthBuffer !== 'undefined' ? options.widthBuffer : 50;

        $(divId).css("overflow","hidden");
        if((divWidth+widthBuffer)<visObject.shapedData.length*20){
            divWidth = visObject.shapedData.length*20;
            $(divId).css("overflow","auto");
        }
        //$(divId).width(divWidth+widthBuffer)
        //$(divId).height(divHeight+heightBuffer)

        var svg = d3.select(divId).append("svg").attr("width",divWidth+widthBuffer).attr("height",divHeight),
            margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = +svg.attr("width") - margin.left - margin.right - widthBuffer,
            height = +svg.attr("height") - margin.top - margin.bottom - heightBuffer;

        var x = d3.scaleBand().rangeRound([10, width]).padding(0.1),
            y = d3.scaleLinear().rangeRound([height, 0]);

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(visObject.shapedData.map(function(d) { return d.categoryLabel; }));

        let yValsExtent = d3.extent(visObject.shapedData, function(d) { return +d.value; });
        if(yValsExtent[0]<0){
            y.domain(yValsExtent).nice();
        }else{
            y.domain([0,yValsExtent[1]]).nice();
        }

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("class","barText")
            .attr("y", function(d){
                if(isNaN(d)==true){
                    return 0;
                }else{
                    return 16;
                }
            }) 
            .attr("x", -5)
            .attr("dy", ".35em")
            .attr("transform", function(d){
                if(isNaN(d)==true){
                    return "rotate(-90)"
                }else{
                    return;
                }
            }) 
            .style("text-overflow", "ellipsis")
            .style("text-anchor", function(d){
                if(isNaN(d)==true){
                    return "end"
                }else{
                    return "start";
                }
            });

        // text label for the x axis
        svg.append("text")
            .attr("transform", "translate(" + ((width+widthBuffer)/2) + " ," + (height + margin.top + heightBuffer + 20) + ")")
            .style("text-anchor", "middle")
            .style("font-size",12)
            .style("font-weight","bold")
            .text(visObject.x.attribute);

        g.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(10)")
            .call(d3.axisLeft(y).ticks(10,"s"))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end");

        // text label for the y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size",12)
            .style("font-weight","bold")
            .text(function(){
                if(visObject.y.transform!=undefined || visObject.y.transform!=""){
                    if(visObject.y.attribute!=""){
                        return visObject.y.transform+"("+visObject.y.attribute+")";
                    }else{
                        return visObject.y.transform;
                    }
                }else{
                    return visObject.y.attribute;
                }
            });

        g.selectAll(".bar")
            .data(visObject.shapedData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.categoryLabel); })
            .attr("y", function(d) { return y(+d.value); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(+d.value); })
            .append("title")
            .text(function(d){
                var tooltipStr = d.categoryLabel + ": " + d.value.toFixed(2);
                return tooltipStr;
            });
    }

    function renderTickChart(divId, visObject, options){
        d3.select(divId).selectAll("svg").remove();

        var divWidth = $(divId).width() * 0.9;
        var divHeight = $(divId).height() * 0.9;

        var heightBuffer = typeof options.heightBuffer !== 'undefined' ? options.heightBuffer : 50;
        var widthBuffer = typeof options.widthBuffer !== 'undefined' ? options.widthBuffer : 50;

        //$(divId).css("overflow","hidden");
        //if((divWidth+widthBuffer)<visObject.shapedData.length*20){
        //    divWidth = visObject.shapedData.length*20;
        //    $(divId).css("overflow","auto");
        //}
        //$(divId).width(divWidth+widthBuffer)
        //$(divId).height(divHeight+heightBuffer)

        var svg = d3.select(divId).append("svg").attr("width",divWidth+widthBuffer).attr("height",divHeight),
            margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = +svg.attr("width") - margin.left - margin.right - widthBuffer,
            height = +svg.attr("height") - margin.top - margin.bottom - heightBuffer;

        var x = d3.scaleBand().rangeRound([10, width]).padding(0.1),
            y = d3.scaleLinear().rangeRound([height, 0]);

        if(visObject.type=="SingleAxisTickPlot"){
            x.rangeRound([10,width*0.25]);
        }

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(visObject.shapedData.map(function(d) { return d.categoryLabel; }));
        let yValsExtent = d3.extent(visObject.shapedData, function(d) { return d.value; });
        if(yValsExtent[0]<0){
            y.domain(yValsExtent).nice();
        }else{
            y.domain([0,yValsExtent[1]]).nice();
        }

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("class","xAxisLabel")
            .attr("y", 0)
            .attr("x", -9)
            .attr("dy", ".35em")
            .attr("transform","rotate(-90)")
            .style("text-overflow", "ellipsis")
            .style("text-anchor", "end");

        // text label for the x axis
        svg.append("text")
            .attr("transform", "translate(" + ((width+widthBuffer)/2) + " ," + (height + margin.top + heightBuffer + 20) + ")")
            .style("text-anchor", "middle")
            .style("font-size",12)
            .style("font-weight","bold")
            .text(visObject.x.attribute);

        g.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(10)")
            .call(d3.axisLeft(y).ticks(10,"s"))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end");

        // text label for the y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size",12)
            .style("font-weight","bold")
            .text(function(){
                if(visObject.y.transform!=undefined || visObject.y.transform!=""){
                    if(visObject.y.attribute!=""){
                        return visObject.y.transform+"("+visObject.y.attribute+")";
                    }else{
                        return visObject.y.transform;
                    }
                }else{
                    return visObject.y.attribute;
                }
            });

        g.selectAll(".barStrip")
            .data(visObject.shapedData)
            .enter().append("rect")
            .attr("class", "barStrip")
            //.style("stroke","steelblue")
            .attr("x", function(d) { return x(d.categoryLabel); })
            .attr("y", function(d) { return y(+d.value); })
            .attr("width", x.bandwidth())
            .attr("height", 1)
            .append("title")
            .text(function(d){
                //let dataObjStr = "";
                //for(var attr in d.dataObj){
                //    dataObjStr += attr + ": " + d.dataObj[attr] + "\n";
                //}
                //console.log(dataObjStr, d)
                //return dataObjStr;
                return d['itemLabel']
            });

        g.selectAll(".itemLabel")
            .data(visObject.shapedData)
            .enter().append("text")
            .attr("class", "itemLabel")
            .style("display","none")
            .attr("x", function(d) { return x(d.categoryLabel)+x.bandwidth()*1.1; })
            .attr("y", function(d) { return y(+d.value); })
            .text(function(d){
                return d['itemLabel'];
            });
    }

    function renderColoredTickChart(divId, visObject, options){
        d3.select(divId).selectAll("svg").remove();

        var divWidth = $(divId).width() * 0.9;
        var divHeight = $(divId).height() * 0.9;

        var heightBuffer = typeof options.heightBuffer !== 'undefined' ? options.heightBuffer : 50;
        var widthBuffer = typeof options.widthBuffer !== 'undefined' ? options.widthBuffer : 50;

        //$(divId).css("overflow","hidden");
        //if((divWidth+widthBuffer)<visObject.shapedData.length*20){
        //    divWidth = visObject.shapedData.length*20;
        //    $(divId).css("overflow","auto");
        //}
        //$(divId).width(divWidth+widthBuffer)
        //$(divId).height(divHeight+heightBuffer)

        var svg = d3.select(divId).append("svg").attr("width",divWidth+widthBuffer).attr("height",divHeight),
            margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = +svg.attr("width") - margin.left - margin.right - widthBuffer,
            height = +svg.attr("height") - margin.top - margin.bottom - heightBuffer;

        var x = d3.scaleBand().rangeRound([10, width]).padding(0.1),
            y = d3.scaleLinear().rangeRound([height, 0]);

        if(globalVars.metadataMap[visObject.x.attribute]['type']!="quantitative"){
            x.rangeRound([10,width-widthBuffer]);
        }

        let color = d3.scaleOrdinal(d3.schemeCategory10);

        if(visObject.type=="SingleAxisTickPlot"){
            x.rangeRound([10,width*0.25]);
        }

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(visObject.shapedData.map(function(d) { return d.categoryLabel; }));
        let yValsExtent = d3.extent(visObject.shapedData, function(d) { return d.value; });
        if(yValsExtent[0]<0){
            y.domain(yValsExtent).nice();
        }else{
            y.domain([0,yValsExtent[1]]).nice();
        }

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("class","xAxisLabel")
            .attr("y", 0)
            .attr("x", -9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(-90)")
            .style("text-overflow", "ellipsis")
            .style("text-anchor", "end");

        // text label for the x axis
        svg.append("text")
            .attr("transform", "translate(" + ((width+widthBuffer)/2) + " ," + (height + margin.top + heightBuffer + 20) + ")")
            .style("text-anchor", "middle")
            .style("font-size",12)
            .style("font-weight","bold")
            .text(visObject.x.attribute);

        g.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(10)")
            .call(d3.axisLeft(y).tickArguments([, "s"]))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end");

        // text label for the y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size",12)
            .style("font-weight","bold")
            .text(function(){
                if(visObject.y.transform!=undefined || visObject.y.transform!=""){
                    if(visObject.y.attribute!=""){
                        return visObject.y.transform+"("+visObject.y.attribute+")";
                    }else{
                        return visObject.y.transform;
                    }
                }else{
                    return visObject.y.attribute;
                }
            });

        g.selectAll(".barStrip")
            .data(visObject.shapedData)
            .enter().append("rect")
            .attr("class", "barStrip")
            .attr("x", function(d) { return x(d.categoryLabel); })
            .attr("y", function(d) { return y(+d.value); })
            .attr("width", x.bandwidth())
            .attr("height", 1)
            .style("fill",function(d){
                return color(d.colorAttrValue);
            })
            .style("stroke",function(d){
                return color(d.colorAttrValue);
            })
            .append("title")
            .text(function(d){
                return d['itemLabel']
            });

        g.selectAll(".itemLabel")
            .data(visObject.shapedData)
            .enter().append("text")
            .attr("class", "itemLabel")
            .style("display","none")
            .attr("x", function(d) { return x(d.categoryLabel)+x.bandwidth()*1.1; })
            .attr("y", function(d) { return y(+d.value); })
            .text(function(d){
                return d['itemLabel'];
            });

        let colorLegendText = svg.append("text")
            .attr("x", width + 10)
            .attr("y", 5)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .style("font-size",10)
            .style("font-weight","bold")
            .text(function() { 
                return visObject.color.attribute;
            });

        var legend = g.selectAll(".legend")
            .data(color.domain())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 22)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        legend.append("text")
            .attr("class","legendText")
            .attr("x", width)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .style("font-size",10)
            .text(function(d) { return d; })
            .append("title")
            .text(function(d){
                return d;
            });
    }

    function renderSingleAxisBoxPlot(divId, visObject, options){
        var labels = false; // show the text labels beside individual boxplots?

        let divWidth = $(divId).width() * 0.9;
        let divHeight = $(divId).height() * 0.9;

        let margin = {top: 10, right: 20, bottom: 40, left: 30};
        let width = divWidth - margin.left - margin.right;
        let height = divHeight - margin.top - margin.bottom;
            
        let data = visObject.shapedData.dataList;
        let min = visObject.shapedData.min;
        let max = visObject.shapedData.max;
        // console.log(data,min,max);
          
        var chart = d3.box()
            .whiskers(iqr(1.5))
            .height(height) 
            .domain([min, max])
            .showLabels(labels);

        var svg = d3.select(divId).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("class", "box")    
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.05)
            .align(0.1);

        x.domain(data.map(function(d) { return d[0] } ))

        var xAxis = d3.axisBottom(x)
            // .scale(x)
            // .orient("bottom");

        // the y-axis
        var y = d3.scaleLinear()
            .domain([min, max])
            .range([height + margin.top, 0 + margin.top]);
        
        var yAxis = d3.axisLeft(y).tickArguments([, "s"])//.tickFormat(d3.format(".0s"))
        // .scale(y)
        // .orient("left");

        // draw the boxplots    
        svg.selectAll(".box")      
          .data(data)
          .enter().append("g")
          .attr("transform", function(d) { return "translate(" +  (x(d[0])+x.bandwidth()/4)  + "," + margin.top + ")"; } )
          .call(chart.width(x.bandwidth()/2));       
     
         // draw y axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text") // and text1
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .style("font-size", "16px") 
              .text("Revenue in €");

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
          .call(xAxis)
          .append("text")             // text label for the x axis
            .attr("x", (width / 2) )
            .attr("y",  10 )
            .attr("dy", ".71em")
            .style("text-anchor", "middle")
            .style("font-size", "16px") 
            .text("Quarter"); 

        // Returns a function to compute the interquartile range.
        function iqr(k) {
          return function(d, i) {
            var q1 = d.quartiles[0],
                q3 = d.quartiles[2],
                iqr = (q3 - q1) * k,
                i = -1,
                j = d.length;
            while (d[++i] < q1 - iqr);
            while (d[--j] > q3 + iqr);
            return [i, j];
          };
        }

        d3.selectAll("circle.outlier").each(function(outlierIndex){
            let itemLabel = visObject.shapedData.dataListWithItemLabels[0][1][outlierIndex]['itemLabel'];
            d3.select(this)
                .attr("itemLabel",itemLabel)
                .append("title")
                .text(function(outlierIndex){
                  return itemLabel;
                });

            //console.log(itemLabel,d3.select(this).attr("cx"),d3.select(this).attr("cy"),d3.select(this).attr("cx")+d3.select(this).attr("r")*2,d3.select(this).attr("cy"))
            //svg.append("text")
            //    .attr("x",d3.select(this).attr("cx")+d3.select(this).attr("r")*2)
            //    .attr("y",d3.select(this).attr("cy"))
            //    .style("text-anchor","start")
            //    .text(function(d){
            //        return itemLabel;
            //    })
        });
        //    .on("mouseover",function(outlierIndex){
        //    let itemLabel = visObject.shapedData.dataListWithItemLabels[0][1][outlierIndex]['itemLabel'];
        //    console.log(itemLabel);
        //});

    }

    function renderHistogram(divId, visObject, options){
        let divWidth = $(divId).width() * 0.9;
        let divHeight = $(divId).height() * 0.9;

        let margin = {top: 10, right: 0, bottom: 30, left: 20},
            width = divWidth - margin.left - margin.right,
            height = divHeight - margin.top - margin.bottom;

        // set the ranges
        let x = d3.scaleLinear()
            .domain([0, d3.max(visObject.shapedData.map(function(d){return +d;}))])
            .rangeRound([0, width]);
        let y = d3.scaleLinear()
            .range([height, 0]);

        // set the parameters for the histogram
        let histogram = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(20));


        let svg = d3.select(divId).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        let itemCount = visObject.shapedData.length;

        // group the data for the bars
        let bins = histogram(visObject.shapedData);

        // Scale the range of the data in the y domain
        y.domain([0, d3.max(bins, function(d) { return d.length; })]);

        // append the bar rectangles to the svg element
        svg.selectAll("rect")
            .data(bins)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", 1)
            .attr("transform", function(d) {
                return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
            .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
            .attr("height", function(d) { return height - y(d.length); })
            .append("title")
            .text(function(d){
                return d.length + " (" + ((d.length/itemCount)*100).toFixed(2) +"%)";
            });

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            //.call(d3.axisBottom(x).ticks(10,"s"));
            .call(d3.axisBottom(x).tickArguments([, "s"]));

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));
    }


    var leastSquaresequation = function(XaxisData, Yaxisdata) {
        var ReduceAddition = function(prev, cur) { return prev + cur; };

        // finding the mean of Xaxis and Yaxis data
        var xBar = XaxisData.reduce(ReduceAddition) * 1.0 / XaxisData.length;
        var yBar = Yaxisdata.reduce(ReduceAddition) * 1.0 / Yaxisdata.length;

        var SquareXX = XaxisData.map(function(d) { return Math.pow(d - xBar, 2); })
            .reduce(ReduceAddition);

        var ssYY = Yaxisdata.map(function(d) { return Math.pow(d - yBar, 2); })
            .reduce(ReduceAddition);

        var MeanDiffXY = XaxisData.map(function(d, i) { return (d - xBar) * (Yaxisdata[i] - yBar); })
            .reduce(ReduceAddition);

        var slope = MeanDiffXY / SquareXX;
        var intercept = yBar - (xBar * slope);

        // returning regression function
        return function(x){
            return x*slope+intercept
        }
    }

    // Point/Vector Operations
    var hullPadding = 0;

    var vecFrom = function (p0, p1) {               // Vector from p0 to p1
        return [ p1[0] - p0[0], p1[1] - p0[1] ];
    }

    var vecScale = function (v, scale) {            // Vector v scaled by 'scale'
        return [ scale * v[0], scale * v[1] ];
    }

    var vecSum = function (pv1, pv2) {              // The sum of two points/vectors
        return [ pv1[0] + pv2[0], pv1[1] + pv2[1] ];
    }

    var vecUnit = function (v) {                    // Vector with direction of v and length 1
        var norm = Math.sqrt (v[0]*v[0] + v[1]*v[1]);
        return vecScale (v, 1/norm);
    }

    var vecScaleTo = function (v, length) {         // Vector with direction of v with specified length
        return vecScale (vecUnit(v), length);
    }

    var unitNormal = function (pv0, p1) {           // Unit normal to vector pv0, or line segment from p0 to p1
        if (p1 != null) pv0 = vecFrom (pv0, p1);
        var normalVec = [ -pv0[1], pv0[0] ];
        return vecUnit (normalVec);
    };

    var lineFn = d3.line()
        .curve (d3.curveCatmullRomClosed)
        .x (function(d) { return d.p[0]; })
        .y (function(d) { return d.p[1]; });

    var smoothHull = function (polyPoints) {
        // Returns the SVG path data string representing the polygon, expanded and smoothed.

        var pointCount = polyPoints.length;

        // Handle special cases
        if (!polyPoints || pointCount < 1) return "";
        if (pointCount === 1) return smoothHull1 (polyPoints);
        if (pointCount === 2) return smoothHull2 (polyPoints);

        var hullPoints = polyPoints.map (function (point, index) {
            var pNext = polyPoints [(index + 1) % pointCount];
            return {
                p: point,
                v: vecUnit (vecFrom (point, pNext))
            };
        });

        // Compute the expanded hull points, and the nearest prior control point for each.
        for (var i = 0;  i < hullPoints.length;  ++i) {
            var priorIndex = (i > 0) ? (i-1) : (pointCount - 1);
            var extensionVec = vecUnit (vecSum (hullPoints[priorIndex].v, vecScale (hullPoints[i].v, -1)));
            hullPoints[i].p = vecSum (hullPoints[i].p, vecScale (extensionVec, hullPadding));
        }

        return lineFn (hullPoints);
    }


    var smoothHull1 = function (polyPoints) {
        // Returns the path for a circular hull around a single point.

        var p1 = [polyPoints[0][0], polyPoints[0][1] - hullPadding];
        var p2 = [polyPoints[0][0], polyPoints[0][1] + hullPadding];

        return 'M ' + p1
            + ' A ' + [hullPadding, hullPadding, '0,0,0', p2].join(',')
            + ' A ' + [hullPadding, hullPadding, '0,0,0', p1].join(',');
    };


    var smoothHull2 = function (polyPoints) {
        // Returns the path for a rounded hull around two points.

        var v = vecFrom (polyPoints[0], polyPoints[1]);
        var extensionVec = vecScaleTo(v, hullPadding);

        var extension0 = vecSum (polyPoints[0], vecScale(extensionVec, -1));
        var extension1 = vecSum (polyPoints[1], extensionVec);

        var tangentHalfLength = 1.2 * hullPadding;
        var controlDelta    = vecScaleTo (unitNormal(v), tangentHalfLength);
        var invControlDelta = vecScale (controlDelta, -1);

        var control0 = vecSum (extension0, invControlDelta);
        var control1 = vecSum (extension1, invControlDelta);
        var control3 = vecSum (extension0, controlDelta);

        return 'M ' + extension0
            + ' C ' + [control0, control1, extension1].join(',')
            + ' S ' + [          control3, extension0].join(',')
            + ' Z';
    };

})();