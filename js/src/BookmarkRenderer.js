/**
 * Created by arjun010 on 3/18/18.
 */
(function () {
    bookmarkRenderer = {};
    bookmarkRenderer.generateBookmarksTable = function(){
        let savedVisualizations = globalVars.bookmarkedVisObjects;

        $("#bookmarksModalBody").html("");
        let mainTableHTML = "<table id='bookmarksTable'>"
        for(var i in savedVisualizations){
            let visObject = savedVisualizations[i];
            let visDivId = 'bookmarksTableVisDiv_'+i;
            let dfDivId = 'bookmarksTableDfDiv_'+i;

            mainTableHTML += "<tr>";
            mainTableHTML += "<td class='visDivtd bookmarkedVisDiv'><div id='"+visDivId+"' class='visDiv'></div></td>";
            mainTableHTML += "<td class='dfDivtd'><div id='"+dfDivId+"' class='dfDiv'></div></td>";
            mainTableHTML += "</tr>";

        }
        mainTableHTML += "</table>";
        $("#bookmarksModalBody").html(mainTableHTML);

        renderVisualizations();
        renderAssociatedFacts();
    };

    var renderVisualizations = function(){
        let savedVisualizations = globalVars.bookmarkedVisObjects;

        d3.select("#bookmarksTable").selectAll(".visDiv").each(function(d){
            let divId = this.id;
            let visIndex = parseInt(divId.split("_")[1]);
            let visObject = savedVisualizations[visIndex];

            console.log(divId,visObject,$("#"+divId).width(),$("#"+divId).height())
            visRenderer.renderVisualization("#"+divId,visObject,{})
        });
    };

    var renderAssociatedFacts = function(){
        let savedVisualizations = globalVars.bookmarkedVisObjects;
        let dataFactMap = globalVars.bookmarkedDataFactMap;

        d3.select("#bookmarksTable").selectAll(".dfDiv").each(function(d) {
            let divId = this.id;
            let visIndex = parseInt(divId.split("_")[1]);
            let curVisObject = savedVisualizations[visIndex];

            let curVisRelatedDataFacts = [];
            for (var dataFactId in dataFactMap) {
                let dataFactObject = dataFactMap[dataFactId]['dfObject'];
                let associatedVisObject = dataFactMap[dataFactId]['associatedVisObjectMap']['associatedVisObject'];
                //console.log(dataFactObject,associatedVisObject)
                if (utils.visObjectsAreEquivalent(curVisObject, associatedVisObject) == 1) {
                    curVisRelatedDataFacts.push(dataFactObject);
                }
            }
            updateBookmarkedDataFactsDiv(divId, curVisRelatedDataFacts)
        });
    };

    function updateBookmarkedDataFactsDiv(dfDivId, dataFacts) {
        let savedVisualizations = globalVars.bookmarkedVisObjects;
        let dataFactMap = globalVars.bookmarkedDataFactMap;

        d3.select("#" + dfDivId).selectAll("div").remove();
        var dataFactRows = d3.select("#" + dfDivId).selectAll("div")
            .data(dataFacts)
            .enter()
            .append("div")
            .attr("id", function (d) {
                return "dataFact_" + d.id;
            });

        dataFactRows.append("div")
            .attr("class", function (d) {
                if (d.type == "ManualFact") {
                    return "accordion acceptedDataFact manualDataFact viewOnly"
                } else {
                    return "accordion acceptedDataFact viewOnly"
                }
            })
            .html(function (d) {
                if (d.type == "ManualFact") {
                    return '<i style="font-size: 8px;margin-right: 1%;" class="fa fa-circle"></i>' + d.activeHtml + '<i style="margin-left: 2%;" class="fa fa-sticky-note"></i>';
                } else {
                    return '<i style="font-size: 8px;margin-right: 1%;" class="fa fa-circle"></i>' + d.activeHtml;
                }
                //return "<table style='width: 100%;'><tr style='width: 100%;'><td style='width:90%;border: none;'>"+d.activeHtml+"</td><td style='border: none;'><button class='removeButton' value='"+JSON.stringify(d)+"'>Remove</button></td></tr></table>"
            });

        dataFactRows.append("div")
            .attr("class", "panel")
            .html(function (d) {
                return "";
            });
    }

})();