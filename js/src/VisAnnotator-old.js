/**
 * Created by arjun010 on 2/20/18.
 */
/**
 * Created by arjun010 on 2/6/18.
 */
(function () {
    visAnnotator = {};

    visAnnotator.annotateVis = function (dataFact,visObject,annotationOption) {
        let visType = visObject.type;

        switch (visType){
            case "Scatterplot" :
                annotateScatterplot(dataFact, visObject,annotationOption);
                break;
            case "ScatterplotWithColor":
            case "ScatterplotWithColorByAvg":
            case "ScatterplotWithColorBySum":
                annotateColoredScatterplot(dataFact, visObject,annotationOption);
                break;
            case "SingleAxisBoxPlot":
                annotateSingleAxisBoxPlot(dataFact, visObject,annotationOption);
                break;

        }
    };

    visAnnotator.clearAnnotations = function () {
        d3.select("#activeVisDiv").selectAll(".annotation").style("display","none");

        d3.select("#activeVisDiv").selectAll("circle.outlier").classed("annotated",false);
        d3.select("#activeVisDiv").selectAll("circle.dot").classed("highlighted",false);

        //d3.select("#activeVisDiv").select(".annotation.regressionLine").style("display","none");
    };

    function annotateScatterplot(dfObject, visObject,annotationOption){
        switch (dfObject.type){
            case "CorrelationFact":
                switch (annotationOption){
                    default: // Regression Line
                        d3.select("#activeVisDiv").select(".annotation.regressionLine").style("display","block");
                        break;
                }
                break;
        }
    }

    function annotateColoredScatterplot(dfObject, visObject,annotationOption){
        switch (dfObject.type){
            case "CategoryCorrelationFact":
                switch (annotationOption){
                    default : // "Hull+Regression Line"
                        d3.select("#activeVisDiv").selectAll(".annotation.hull").each(function(d) {
                            let hullCategoryLabel = d3.select(this).attr("categoryLabel");
                            if(hullCategoryLabel==dfObject.secondaryTargetObject){
                                d3.select(this).style("display","block");
                            }
                        });
                        d3.select("#activeVisDiv").selectAll(".annotation.hullRegressionLine").each(function(d) {
                            let hullCategoryLabel = d3.select(this).attr("categoryLabel");
                            if(hullCategoryLabel==dfObject.secondaryTargetObject){
                                d3.select(this).style("display","block");
                            }
                        });

                        break;
                }
                break;
            case "QuadrantDistributionFact":
                switch (annotationOption){
                    case "Hull":
                        d3.select("#activeVisDiv").selectAll(".annotation.hull").each(function(d) {
                            let hullCategoryLabel = d3.select(this).attr("categoryLabel");
                            if(hullCategoryLabel==dfObject.primaryTargetObject){
                                d3.select(this).style("display","block");
                            }
                        });
                        break;
                    case "Hull+Lines":
                        d3.select("#activeVisDiv").selectAll(".annotation.quadrantLine").style("display","block");
                        d3.select("#activeVisDiv").selectAll(".annotation.hull").each(function(d) {
                            let hullCategoryLabel = d3.select(this).attr("categoryLabel");
                            if(hullCategoryLabel==dfObject.primaryTargetObject){
                                d3.select(this).style("display","block");
                            }
                        });
                        break;
                    case "Highlight":
                        var midXVal = globalVars.metadataMap[visObject.x.attribute]['domain'][parseInt(globalVars.metadataMap[visObject.x.attribute]['domain'].length/2)];
                        var midYVal = globalVars.metadataMap[visObject.y.attribute]['domain'][parseInt(globalVars.metadataMap[visObject.y.attribute]['domain'].length/2)];

                        d3.select("#activeVisDiv").selectAll(".dot")
                            .classed("highlighted",function(d,i){
                                if(d.colorAttrValue==dfObject.primaryTargetObject){
                                    if(dfObject.quadrant==1){
                                        if(d.xVal>=midXVal && d.yVal>=midYVal){
                                            return true;
                                        }
                                    }else if(dfObject.quadrant==2){
                                        if(d.xVal<=midXVal && d.yVal>=midYVal){
                                            return true;
                                        }
                                    }else if(dfObject.quadrant==3){
                                        if(d.xVal<=midXVal && d.yVal<=midYVal){
                                            return true;
                                        }
                                    }else if(dfObject.quadrant==4){
                                        if(d.xVal>=midXVal && d.yVal<=midYVal){
                                            return true;
                                        }
                                    }
                                }
                            });

                        break;
                    default :
                        d3.select("#activeVisDiv").selectAll(".annotation.quadrantLine").style("display","block");
                        var midXVal = globalVars.metadataMap[visObject.x.attribute]['domain'][parseInt(globalVars.metadataMap[visObject.x.attribute]['domain'].length/2)];
                        var midYVal = globalVars.metadataMap[visObject.y.attribute]['domain'][parseInt(globalVars.metadataMap[visObject.y.attribute]['domain'].length/2)];

                        d3.select("#activeVisDiv").selectAll(".dot")
                            .classed("highlighted",function(d,i){
                                if(d.colorAttrValue==dfObject.primaryTargetObject){
                                    if(dfObject.quadrant==1){
                                        if(d.xVal>=midXVal && d.yVal>=midYVal){
                                            return true;
                                        }
                                    }else if(dfObject.quadrant==2){
                                        if(d.xVal<=midXVal && d.yVal>=midYVal){
                                            return true;
                                        }
                                    }else if(dfObject.quadrant==3){
                                        if(d.xVal<=midXVal && d.yVal<=midYVal){
                                            return true;
                                        }
                                    }else if(dfObject.quadrant==4){
                                        if(d.xVal>=midXVal && d.yVal<=midYVal){
                                            return true;
                                        }
                                    }
                                }
                            });
                        break;
                }
                break;
        }
    }

    function annotateSingleAxisBoxPlot(dfObject, visObject,annotationOption){
        switch (dfObject.type){
            case "OutlierFact":
                d3.select("#activeVisDiv").selectAll(".outlier").each(function(d){
                    let itemLabel = d3.select(this).attr("itemLabel");
                    if(itemLabel==dfObject.primaryTargetObject){
                        d3.select(this).classed("annotated",true);
                    }
                });
                break;
        }
    }

    visAnnotator.getPossibleAnnotations = function (dataFact,visObject) {
        let visType = visObject.type;

        switch (visType){
            case "Scatterplot" :
                return getScatterplotAnnotations(dataFact, visObject);
                break;
            case "ScatterplotWithColor":
                return getColoredScatterplotAnnotations(dataFact, visObject);
                break;
            case "SingleAxisBoxPlot":
                return getSingleAxisBoxPlotAnnotations(dataFact, visObject);
                break;
            default :
                return ["PossibleAnnotationList"];
                break;

        }
    };

    function getScatterplotAnnotations(dfObject,visObject){
        switch (dfObject.type) {
            case "CorrelationFact":
                return ["RegressionLine"];
                break;
            default :
                return ["PossibleAnnotationList"];
                break;
        }
    }

    function getColoredScatterplotAnnotations(dfObject,visObject){
        switch (dfObject.type) {
            case "CategoryCorrelationFact":
                return ["Hull+RegressionLine"];
                break;
            case "QuadrantDistributionFact":
                return ["Highlight+Lines", "Hull+Lines" ,"Highlight" ,"Hull"];
                break;
            default :
                return ["PossibleAnnotationList"];
                break;
        }
    }

    function getSingleAxisBoxPlotAnnotations(dfObject,visObject){
        switch (dfObject.type) {
            case "OutlierFact":
                return ["Highlight"];
                break;
            default :
                return ["PossibleAnnotationList"];
                break;
        }
    }

})();