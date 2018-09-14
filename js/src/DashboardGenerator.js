/**
 * Created by arjun010 on 3/4/18.
 */
(function(){

    dashboardGenerator = {};

    dashboardGenerator.generateSlideShowLayout = function(){
        //let savedVisualizations = globalVars.mainSessionMap['visualizations'];
        let savedVisualizations = globalVars.bookmarkedVisObjects;

        $("#presentModeContent").html("");
        let mainTableHTML = "<table id='slideShowTable'>"
        for(var i in savedVisualizations){
            let visObject = savedVisualizations[i];
            let visDivId = 'visDiv_'+i;
            let dfDivId = 'dfDiv_'+i;

            mainTableHTML += "<tr>";
            mainTableHTML += "<td class='visDivtd'><div id='"+visDivId+"' class='visDiv'></div></td>";
            mainTableHTML += "<td class='dfDivtd'><div id='"+dfDivId+"' class='dfDiv'></div></td>";
            mainTableHTML += "</tr>";

        }
        mainTableHTML += "</table>";
        $("#presentModeContent").html(mainTableHTML);

        renderVisualizations_SlideLayout();
        renderAssociatedFacts_SlideLayout();
        //bindAnnotationEventsToAccordions();
    };

    dashboardGenerator.generateDashboardLayout = function(){
        let savedVisualizations = globalVars.bookmarkedVisObjects;

        $("#presentModeContent").html("<table id='dashboardTable'><tr><td id='visArea' style='width: 80%;'></td><td id='dataFactArea' style='width: 20%;'></td></tr></table>");
        let visAreaHTML = "";
        for(var i in savedVisualizations){
            let visObject = savedVisualizations[i];
            let visDivId = 'visDiv_'+i;

            visAreaHTML += "<div class='dashboardVisThumbnail' id='"+visDivId+"'></div>";
        }
        $("#visArea").html(visAreaHTML);

        renderVisualizations_DashboardLayout();
        renderAssociatedFacts_DashboardLayout();
    };

    function renderVisualizations_SlideLayout(){
        //let savedVisualizations = globalVars.mainSessionMap['visualizations'];
        let savedVisualizations = globalVars.bookmarkedVisObjects;

        d3.selectAll(".visDiv").each(function(d){
            let divId = this.id;
            let visIndex = parseInt(divId.split("_")[1]);
            let visObject = savedVisualizations[visIndex];
            visRenderer.renderVisualization("#"+divId,visObject,{})
        });
    }

    function renderVisualizations_DashboardLayout(){
        //let savedVisualizations = globalVars.mainSessionMap['visualizations'];
        let savedVisualizations = globalVars.bookmarkedVisObjects;

        d3.selectAll(".dashboardVisThumbnail").each(function(d){
            let divId = this.id;
            let visIndex = parseInt(divId.split("_")[1]);
            let visObject = savedVisualizations[visIndex];
            visRenderer.renderVisualization("#"+divId,visObject,{})
        });
    }

    function renderAssociatedFacts_SlideLayout(){
        //let savedVisualizations = globalVars.mainSessionMap['visualizations'];
        let savedVisualizations = globalVars.bookmarkedVisObjects;
        //let dataFactMap = globalVars.mainSessionMap['dataFactMap']
        let dataFactMap = globalVars.bookmarkedDataFactMap;

        d3.selectAll(".dfDiv").each(function(d) {
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

            let editingMode = $("input[name='presentModeEditOption']:checked").val();
            if(editingMode=="on"){
                updateAcceptedDataFactsDiv_Edit(divId,curVisRelatedDataFacts);
            }else{
                updateAcceptedDataFactsDiv_ViewOnly(divId, curVisRelatedDataFacts)
            }
        });
    }

    function renderAssociatedFacts_DashboardLayout(){
        let savedVisualizations = globalVars.bookmarkedVisObjects;
        let dataFactMap = globalVars.bookmarkedDataFactMap;

        let dataFactList = [];
        for(var dataFactId in dataFactMap){
            dataFactList.push(dataFactMap[dataFactId]['dfObject']);
        }
        updateDataFactsDiv_Dasbhboard_ViewOnly(dataFactList);
    }

    function updateDataFactsDiv_Dasbhboard_ViewOnly(dataFacts){
        let savedVisualizations = globalVars.bookmarkedVisObjects;
        let dataFactMap = globalVars.bookmarkedDataFactMap;

        d3.select("#dataFactArea").selectAll("div").remove();
        let factStyle = $("input[name='presentModeFactStyleOption']:checked").val();
        if(factStyle=="bullet") {
            var dataFactRows = d3.select("#dataFactArea").selectAll("div")
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
                        return '<i style="font-size: 8px;margin-right: 1%;" class="fa fa-circle"></i> ' + d.activeHtml + '<i style="margin-left: 2%;" class="fa fa-sticky-note"></i>';
                    } else {
                        return '<i style="font-size: 8px;margin-right: 1%;" class="fa fa-circle"></i> ' + d.activeHtml;
                    }
                    //return "<table style='width: 100%;'><tr style='width: 100%;'><td style='width:90%;border: none;'>"+d.activeHtml+"</td><td style='border: none;'><button class='removeButton' value='"+JSON.stringify(d)+"'>Remove</button></td></tr></table>"
                });

            d3.selectAll(".accordion").on("mouseover", function (dataFact) {
                let dfId = this.parentNode.id.split("_")[1];
                let dfObj = dataFactMap[dfId]['dfObject'];
                d3.selectAll(".dashboardVisThumbnail").each(function () {
                    let visDivId = this.id;
                    let visObj = savedVisualizations[parseInt(visDivId.split("_")[1])];
                    if(utils.isVisObjectInList(visObj,dataFactMap[dfId]['dfObject']['relatedVisObjects'])!=-1){
                        visAnnotator.annotateVis(dfObj,visObj,visDivId)
                    }
                })
            }).on("mouseout", function () {
                visAnnotator.clearAnnotations();
            });
        }else{
            var dataFactRows = d3.select("#dataFactArea").selectAll("div")
                .data(dataFacts)
                .enter()
                .append("span")
                .attr("id", function (d) {
                    return "dataFact_" + d.id;
                })
                .attr("class","dataFactSentence")
                .html(function (d) {
                    return d.activeHtml + ". ";
                });
            d3.selectAll(".dataFactSentence").on("mouseover", function (dataFact) {
                let dfId = this.id.split("_")[1];
                let dfObj = dataFactMap[dfId]['dfObject'];
                d3.selectAll(".dashboardVisThumbnail").each(function () {
                    let visDivId = this.id;
                    let visObj = savedVisualizations[parseInt(visDivId.split("_")[1])];
                    if(utils.isVisObjectInList(visObj,dataFactMap[dfId]['dfObject']['relatedVisObjects'])!=-1){
                        visAnnotator.annotateVis(dfObj,visObj,visDivId)
                    }
                })
            }).on("mouseout", function () {
                visAnnotator.clearAnnotations();
            });
        }
    }

    function updateAcceptedDataFactsDiv_ViewOnly(dfDivId, dataFacts){
        //let savedVisualizations = globalVars.mainSessionMap['visualizations'];
        let savedVisualizations = globalVars.bookmarkedVisObjects;
        //let dataFactMap = globalVars.mainSessionMap['dataFactMap']
        let dataFactMap = globalVars.bookmarkedDataFactMap;

        d3.select("#"+dfDivId).selectAll("div").remove();

        let factStyle = $("input[name='presentModeFactStyleOption']:checked").val();
        if(factStyle=="bullet"){
            var dataFactRows = d3.select("#"+dfDivId).selectAll("div")
                .data(dataFacts)
                .enter()
                .append("div")
                .attr("id",function(d){
                    return "dataFact_"+d.id;
                });

            dataFactRows.append("div")
                .attr("class",function(d){
                    if(d.type=="ManualFact"){
                        return "accordion acceptedDataFact manualDataFact viewOnly"
                    }else{
                        return "accordion acceptedDataFact viewOnly"
                    }
                })
                .html(function(d){
                    if(d.type=="ManualFact"){
                        return '<i style="font-size: 8px;margin-right: 1%;" class="fa fa-circle"></i>'+d.activeHtml+'<i style="margin-left: 2%;" class="fa fa-sticky-note"></i>';
                    }else{
                        return '<i style="font-size: 8px;margin-right: 1%;" class="fa fa-circle"></i>'+d.activeHtml;
                    }
                    //return "<table style='width: 100%;'><tr style='width: 100%;'><td style='width:90%;border: none;'>"+d.activeHtml+"</td><td style='border: none;'><button class='removeButton' value='"+JSON.stringify(d)+"'>Remove</button></td></tr></table>"
                });

            dataFactRows.append("div")
                .attr("class","panel")
                .html(function(d) {
                    return "";
                });


            d3.selectAll(".accordion").on("mouseover",function(dataFact){
                let dfId = this.parentNode.id.split("_")[1];
                let dfObj = dataFactMap[dfId]['dfObject'];
                let rowIndex = parseInt(this.parentNode.parentNode.id.split("_")[1]);
                let visDivId = "visDiv_"+rowIndex;
                let visObj = savedVisualizations[rowIndex];

                visAnnotator.annotateVis(dfObj,visObj,visDivId);
            }).on("mouseout",function(){
                visAnnotator.clearAnnotations();
            });
        }else{
            var dataFactRows = d3.select("#"+dfDivId).selectAll("div")
                .data(dataFacts)
                .enter()
                .append("span")
                .attr("id",function(d){
                    return "dataFact_"+d.id;
                })
                .attr("class","dataFactSentence")
                .html(function(d){
                    return d.activeHtml + ". ";
                });


            d3.selectAll(".dataFactSentence").on("mouseover",function(dataFact){
                let dfId = this.id.split("_")[1];
                let dfObj = dataFactMap[dfId]['dfObject'];
                let rowIndex = parseInt(this.parentNode.id.split("_")[1]);
                let visDivId = "visDiv_"+rowIndex;
                let visObj = savedVisualizations[rowIndex];

                visAnnotator.annotateVis(dfObj,visObj,visDivId);
            }).on("mouseout",function(){
                visAnnotator.clearAnnotations();
            });
        }
    };

    function updateAcceptedDataFactsDiv_Edit(dfDivId, dataFacts){
        //let savedVisualizations = globalVars.mainSessionMap['visualizations'];
        let savedVisualizations = globalVars.bookmarkedVisObjects;
        //let dataFactMap = globalVars.mainSessionMap['dataFactMap']
        let dataFactMap = globalVars.bookmarkedDataFactMap;

        d3.select("#"+dfDivId).selectAll("div").remove();

        var dataFactRows = d3.select("#"+dfDivId).selectAll("div")
            .data(dataFacts)
            .enter()
            .append("div")
            .attr("id",function(d){
                return "dataFact_"+d.id;
            });

        dataFactRows.append("div")
            .attr("class",function(d){
                if(d.type=="ManualFact"){
                    return "accordion acceptedDataFact manualDataFact"
                }else{
                    return "accordion acceptedDataFact"
                }
            })
            .html(function(d){
                let rowIndex = parseInt(this.parentNode.parentNode.id.split("_")[1]);
                let visObj = savedVisualizations[rowIndex];

                let annotationHTML = visAnnotator.getPossibleAnnotationOptionsHTML(d, visObj);
                if(annotationHTML!=""){
                    return "<table style='width: 100%;'><tr style='width: 100%;'><td style='width:90%;border: none;' class='factText' associatedDataFactId='"+ d.id +"' contenteditable='true'><i class='fa fa-pencil'></i>"+d.activeHtml+"</td><td class='acceptedFactButtons' style='border: none;'><i class='fa fa-magic' style='padding-left: 15%;' title='Click to see annotation options.'></i><i class='removeButton fa fa-remove' style='float: right;' value='"+JSON.stringify(d)+"'></i></td></tr></table>"
                }else{
                    if(d.type=="ManualFact"){
                        return "<table style='width: 100%;'><tr style='width: 100%;'><td style='width:90%;border: none;' class='factText' associatedDataFactId='"+ d.id +"' contenteditable='true'><i class='fa fa-pencil'></i>"+d.activeHtml+"</td><td class='acceptedFactButtons' style='border: none;'><i class='fa fa-sticky-note' style='padding-left: 15%;'></i><i class='removeButton fa fa-remove' style='float: right;' value='"+JSON.stringify(d)+"'></i></td></tr></table>"
                    }else{
                        return "<table style='width: 100%;'><tr style='width: 100%;'><td style='width:90%;border: none;' class='factText' associatedDataFactId='"+ d.id +"' contenteditable='true'><i class='fa fa-pencil'></i>"+d.activeHtml+"</td><td class='acceptedFactButtons' style='border: none;'><i class='removeButton fa fa-remove' style='float: right;' value='"+JSON.stringify(d)+"'></i></td></tr></table>"
                    }
                }
            });

        dataFactRows.append("div")
            .attr("class","panel")
            .html(function(d) {
                let rowIndex = parseInt(this.parentNode.parentNode.id.split("_")[1]);
                let visObj = savedVisualizations[rowIndex];

                let annotationHTML = visAnnotator.getPossibleAnnotationOptionsHTML(d, visObj);
                return annotationHTML;
            });

        $(".removeButton").click(function(evt){
            let removedBookmarkDataFact = JSON.parse($(this).attr("value"));
            for(var bookmarkedDataFactId in globalVars.bookmarkedDataFactMap){
                if(removedBookmarkDataFact.id == bookmarkedDataFactId){
                    delete globalVars.bookmarkedDataFactMap[bookmarkedDataFactId];
                    let layout = $("input[name='presentModeLayoutOption']:checked").val();
                    if(layout=="slideShow"){
                        dashboardGenerator.generateSlideShowLayout();
                    }else{
                        dashboardGenerator.generateDashboardLayout();
                    }
                }
            }
        });

        bindEventsToInsightAccordions();
        bindEventsToAnnotationOptions();

        $(".factText").focusin(function(evt){
            $(this).addClass("editing");
        });

        $(".factText").focusout(function(evt){
            $(this).removeClass("editing");
        });

        $(".factText").on("keyup",function(evt){
            let associatedDataFactId = $(this).attr("associatedDataFactId");
            globalVars.bookmarkedDataFactMap[associatedDataFactId]['dfObject']['activeHtml'] = $(this).text();
            //console.log("here", $(this).text())
        });


        d3.selectAll(".accordion").on("mouseover",function(dataFact){
            let dfId = this.parentNode.id.split("_")[1];
            let dfObj = dataFactMap[dfId]['dfObject'];
            let rowIndex = parseInt(this.parentNode.parentNode.id.split("_")[1]);
            let visDivId = "visDiv_"+rowIndex;
            let visObj = savedVisualizations[rowIndex];

            visAnnotator.annotateVis(dfObj,visObj,visDivId);
        }).on("mouseout",function(){
            visAnnotator.clearAnnotations();
        });
    };

    function bindEventsToInsightAccordions(){
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight){
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }
        }

        $(".acceptButton").click(function(evt){
            evt.stopPropagation();
        });
        $(".rejectButton").click(function(evt){
            evt.stopPropagation();
        });

    }

    function bindEventsToAnnotationOptions(){
        $(".annotationOption").change(function(evt){
            let annotation = $(this).val();
            let checkedProperty = $(this).prop("checked");
            let dataFactId = $(this).attr("associatedDFid");

            if(checkedProperty==true){
                globalVars.dataFactMap[dataFactId]['annotationMap'][annotation] = "checked";
                if(dataFactId in globalVars.bookmarkedDataFactMap){
                    globalVars.bookmarkedDataFactMap[dataFactId]['dfObject']['annotationMap'][annotation] = "checked";
                }
            }else{
                globalVars.dataFactMap[dataFactId]['annotationMap'][annotation] = "";
                if(dataFactId in globalVars.bookmarkedDataFactMap){
                    globalVars.bookmarkedDataFactMap[dataFactId]['dfObject']['annotationMap'][annotation] = "";
                }
            }
        });
    }

    $('input[type=radio][name=presentModeEditOption]').change(function() {
        let editModeStatus = this.value;
        if(editModeStatus=="off"){
            $("input[name='presentModeFactStyleOption']").attr("disabled",false);
        }else{
            $("input[name='presentModeFactStyleOption']").attr("disabled",true);
        }

        let layout = $("input[name='presentModeLayoutOption']:checked").val();
        if(layout=="slideShow"){
            dashboardGenerator.generateSlideShowLayout();
        }else{
            dashboardGenerator.generateDashboardLayout();
        }
    });

    $('input[type=radio][name=presentModeLayoutOption]').change(function() {
        let layout = this.value;
        if(layout=="slideShow"){
            dashboardGenerator.generateSlideShowLayout();
        }else{
            dashboardGenerator.generateDashboardLayout();
        }
    });

    $('input[type=radio][name=presentModeFactStyleOption]').change(function() {
        let layout = $("input[name='presentModeLayoutOption']:checked").val();
        if(layout=="slideShow"){
            dashboardGenerator.generateSlideShowLayout();
        }else{
            dashboardGenerator.generateDashboardLayout();
        }
    });

})();