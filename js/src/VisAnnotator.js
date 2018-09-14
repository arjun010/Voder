/**
 * Created by arjun010 on 2/6/18.
 */
(function () {
    visAnnotator = {};

    // possible annotations: "stroke", "regression_line", "quadrant_lines", "hull", "text_highlight"

    visAnnotator.getPossibleAnnotationOptionsHTML = function(dataFact,visObject){
        let annotationOptionHTML = "";
        let strokeCheckedVal, opacityCheckedVal,textHighlightCheckedVal,quadrant_lineCheckedVal,regression_lineCheckedVal,hullCheckedVal;
        switch (visObject.type){
            case "SingleAxisTickPlot":
                annotationOptionHTML = getAnnotationOptions_SingleAxisStripPlot(dataFact,visObject);
                break;
            case "Histogram":
                annotationOptionHTML = getAnnotationOptions_Histogram(dataFact,visObject);
                break;
            case "SingleAxisBoxPlot":
                annotationOptionHTML = getAnnotationOptions_SingleAxisBoxPlot(dataFact,visObject);
                break;
            case "BarWithCount":
            case "BarWithAvg":
            case "BarWithSum":
                annotationOptionHTML = getAnnotationOptions_BarChart(dataFact,visObject);
                break;
            case "DonutWithCount":
            case "DonutWithAvg":
            case "DonutWithSum":
                annotationOptionHTML = getAnnotationOptions_DonutChart(dataFact,visObject);
                break;
            case "Scatterplot":
                annotationOptionHTML = getAnnotationOptions_Scatterplot(dataFact,visObject);
                break;
            case "ScatterplotWithColor":
                annotationOptionHTML = getAnnotationOptions_ColoredScatterplot(dataFact,visObject);
                break;
            case "ScatterplotWithSize":
                annotationOptionHTML = getAnnotationOptions_SizedScatterplot(dataFact,visObject);
                break;
            case "TwoAxisTickPlot":
                annotationOptionHTML = getAnnotationOptions_TwoAxisTickPlot(dataFact,visObject);
                break;
            case "TickPlotWithColor":
                annotationOptionHTML = getAnnotationOptions_ColoredTickPlot(dataFact,visObject);
                break;
            case "AggregatedScatterplotWithCountSize":
            case "AggregatedScatterplotWithAvgSize":
            case "AggregatedScatterplotWithSumSize":
                annotationOptionHTML = getAnnotationOptions_AggregatedScatterplot(dataFact,visObject);
                break;
            case "ScatterplotWithColorByAvg":
            case "ScatterplotWithColorBySum":
                annotationOptionHTML = getAnnotationOptions_AggregatedColoredScatterplot(dataFact,visObject);
                break;
            case "TickPlotWithColorByAvg":
            case "TickPlotWithColorBySum":
                annotationOptionHTML = getAnnotationOptions_AggregatedColoredStripPlot(dataFact,visObject);
                break;
            case "StackedBarChart":
                annotationOptionHTML = getAnnotationOptions_StackedBarChart(dataFact,visObject);
                break;
            default :
                break;
        }
        return annotationOptionHTML;
    };

    visAnnotator.annotateVis = function(dataFact,visObject,visDivId){
        visDivId = typeof visDivId !== 'undefined' ? visDivId : 'activeVisDiv';
        let strokeCheckedVal, opacityCheckedVal,textHighlightCheckedVal,quadrant_lineCheckedVal,regression_lineCheckedVal,hullCheckedVal;

        switch (visObject.type){
            case "SingleAxisTickPlot":
                applyAnnotations_SingleAxisStripPlot(dataFact,visObject,visDivId);
                break;
            case "Histogram":
                applyAnnotations_Histogram(dataFact,visObject,visDivId);
                break;
            case "SingleAxisBoxPlot":
                applyAnnotations_SingleAxisBoxPlot(dataFact,visObject,visDivId);
                break;
            case "BarWithCount":
            case "BarWithAvg":
            case "BarWithSum":
                applyAnnotations_BarChart(dataFact,visObject,visDivId);
                break;
            case "DonutWithCount":
            case "DonutWithAvg":
            case "DonutWithSum":
                applyAnnotations_DonutChart(dataFact,visObject,visDivId);
                break;
            case "Scatterplot":
                applyAnnotations_Scatterplot(dataFact,visObject,visDivId);
                break;
            case "ScatterplotWithColor":
                applyAnnotations_ColoredScatterplot(dataFact,visObject,visDivId);
                break;
            case "ScatterplotWithSize":
                applyAnnotations_SizedScatterplot(dataFact,visObject,visDivId);
                break;
            case "TwoAxisTickPlot":
                applyAnnotations_TwoAxisTickPlot(dataFact,visObject,visDivId);
                break;
            case "TickPlotWithColor":
                applyAnnotations_ColoredTickPlot(dataFact,visObject,visDivId);
                break;
            case "AggregatedScatterplotWithCountSize":
            case "AggregatedScatterplotWithAvgSize":
            case "AggregatedScatterplotWithSumSize":
                applyAnnotations_AggregatedScatterplot(dataFact,visObject,visDivId);
                break;
            case "ScatterplotWithColorByAvg":
            case "ScatterplotWithColorBySum":
                applyAnnotations_AggregatedColoredScatterplot(dataFact,visObject,visDivId);
                break;
            case "TickPlotWithColorByAvg":
            case "TickPlotWithColorBySum":
                applyAnnotations_AggregatedColoredStripPlot(dataFact,visObject,visDivId);
                break;
            case "StackedBarChart":
                applyAnnotations_StackedBarChart(dataFact,visObject,visDivId);
                break;
            default :
                break;
        }
    };

    visAnnotator.clearAnnotations = function () {
        d3.selectAll(".annotation").style("display","none");
        d3.selectAll(".itemLabel").style("display","none");

        d3.selectAll("circle.outlier").classed("faded",false);
        d3.selectAll("circle.outlier").classed("highlighted",false);
        d3.selectAll("rect.box").classed("faded",false);
        d3.selectAll("rect.box").classed("highlighted",false);

        d3.selectAll("circle.dot").classed("highlighted",false);
        d3.selectAll("circle.dot").classed("highlightedSameColor",false);
        d3.selectAll("circle.dot").classed("fadeAnnotation",false);
        d3.selectAll("circle.dot").classed("faded",false);

        d3.selectAll("rect.bar").classed("highlighted",false);
        d3.selectAll("rect.bar").classed("faded",false);
        d3.selectAll(".barText").classed("highlighted",false);
        d3.selectAll(".barText").classed("faded",false);

        d3.selectAll(".stackedBarPortion").classed("highlighted",false);
        d3.selectAll(".stackedBarPortion").classed("faded",false);

        d3.selectAll("rect.barStrip").classed("faded",false);
        d3.selectAll("rect.barStrip").classed("highlighted",false);
        d3.selectAll("rect.barStrip").classed("highlightedSameColor",false);

        d3.selectAll("path.pieSlice").classed("highlighted",false);
        d3.selectAll("path.pieSlice").classed("faded",false);
        d3.selectAll(".pieSliceText").classed("highlighted",false);
        d3.selectAll(".pieSliceText").classed("faded",false);

        d3.selectAll(".xAxisLabel").classed("highlighted",false);
        d3.selectAll(".xAxisLabel").classed("faded",false);
        d3.selectAll(".yAxisLabel").classed("highlighted",false);
        d3.selectAll(".yAxisLabel").classed("faded",false);

        d3.selectAll(".legendText").classed("faded",false);
        d3.selectAll(".legendText").classed("highlighted",false);

        //d3.select("#activeVisDiv").select(".annotation.regressionLine").style("display","none");
    };

    function getAnnotationOptions_BarChart(dataFact,visObject){
        let annotationOptionHTML = "";

        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];

        if(dataFact['type']=="RelativeValueFact" || dataFact['type']=="ExtremeValueFact"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="stroke" '+strokeCheckedVal+'> Stroke &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="opacity" '+opacityCheckedVal+'> Opacity &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="text_highlight" '+textHighlightCheckedVal+'> Text Highlight &nbsp;</label>';
        }
        return annotationOptionHTML;
    }

    function applyAnnotations_BarChart(dataFact,visObject,visDivId){
        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];
        if(dataFact['type']=="RelativeValueFact"){
            if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".bar")
                    .classed("highlighted",function(d){
                        if(strokeCheckedVal=="checked"){
                            if([dataFact.sourceCategory,dataFact.targetCategory].indexOf(d.categoryLabel)!=-1){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    })
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if([dataFact.sourceCategory,dataFact.targetCategory].indexOf(d.categoryLabel)!=-1){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    });
                d3.select("#"+visDivId).selectAll(".barText")
                    .classed("faded",function(d) {
                        if(opacityCheckedVal=="checked"){
                            if([dataFact.sourceCategory,dataFact.targetCategory].indexOf(d)!=-1){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    });
            }
            if(textHighlightCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".barText")
                    .classed("highlighted",function(d){
                        if(textHighlightCheckedVal=="checked"){
                            if([dataFact.sourceCategory,dataFact.targetCategory].indexOf(d)!=-1){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    })
            }
        }else if(dataFact['type']=="ExtremeValueFact"){
            if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".bar")
                    .classed("highlighted",function(d){
                        if(strokeCheckedVal=="checked"){
                            if(dataFact.primaryTargetObject==d.categoryLabel){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    })
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if(dataFact.primaryTargetObject==d.categoryLabel){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    })
                d3.select("#"+visDivId).selectAll(".barText")
                    .classed("faded",function(d) {
                        if(opacityCheckedVal=="checked"){
                            if(dataFact.primaryTargetObject== d){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    });
            }
            if(textHighlightCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".barText")
                    .classed("highlighted",function(d){
                        if(textHighlightCheckedVal=="checked"){
                            if(dataFact.primaryTargetObject==d){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    })
            }
        }
    }

    function getAnnotationOptions_DonutChart(dataFact,visObject){
        let annotationOptionHTML = "";

        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];

        if(dataFact['type']=="RelativeValueFact" || dataFact['type']=="ExtremeValueFact"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="stroke" '+strokeCheckedVal+'> Stroke &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="opacity" '+opacityCheckedVal+'> Opacity &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="text_highlight" '+textHighlightCheckedVal+'> Text Highlight &nbsp;</label>';
        }
        return annotationOptionHTML;
    }

    function applyAnnotations_DonutChart(dataFact,visObject,visDivId){
        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];
        if(dataFact['type']=="RelativeValueFact"){
            if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".pieSlice")
                    .classed("highlighted",function(d){
                        if(strokeCheckedVal=="checked"){
                            if([dataFact.sourceCategory,dataFact.targetCategory].indexOf(d.data.categoryLabel)!=-1){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    })
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if([dataFact.sourceCategory,dataFact.targetCategory].indexOf(d.data.categoryLabel)!=-1){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    });
                d3.select("#"+visDivId).selectAll(".pieSliceText")
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if([dataFact.sourceCategory,dataFact.targetCategory].indexOf(d.data.categoryLabel)!=-1){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    })
            }
            if(textHighlightCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".pieSliceText")
                    .classed("highlighted",function(d){
                        if(textHighlightCheckedVal=="checked"){
                            if([dataFact.sourceCategory,dataFact.targetCategory].indexOf(d.data.categoryLabel)!=-1){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    })
            }
        }else if(dataFact['type']=="ExtremeValueFact"){
            if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".pieSlice")
                    .classed("highlighted",function(d){
                        if(strokeCheckedVal=="checked"){
                            if(dataFact.primaryTargetObject==d.data.categoryLabel){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    })
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if(dataFact.primaryTargetObject==d.data.categoryLabel){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    })
                d3.select("#"+visDivId).selectAll(".pieSliceText")
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if(dataFact.primaryTargetObject==d.data.categoryLabel){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    })
            }
            if(textHighlightCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".pieSliceText")
                    .classed("highlighted",function(d){
                        if(textHighlightCheckedVal=="checked"){
                            if(dataFact.primaryTargetObject==d.data.categoryLabel){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    })
            }
        }
    }


    function getAnnotationOptions_ColoredScatterplot(dataFact,visObject){
        let annotationOptionHTML = "";
        let quadrant_lineCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['quadrant_lines'];
        let regression_lineCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['regression_line'];
        let hullCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['hull'];
        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let itemLabelCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['item_label'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];

        if(dataFact['type']=="QuadrantDistributionFact"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="quadrant_lines" '+quadrant_lineCheckedVal+'> Quadrant Lines &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="hull" '+hullCheckedVal+'> Hull &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="stroke" '+strokeCheckedVal+'> Stroke &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="opacity" '+opacityCheckedVal+'> Opacity &nbsp;</label>';
        }else if(dataFact['type']=="CorrelationFact"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="regression_line" '+regression_lineCheckedVal+'> Regression Lines &nbsp;</label>';
        }else if(dataFact['type']=="CategoryCorrelationFact"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="regression_line" '+regression_lineCheckedVal+'> Regression Lines &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="hull" '+hullCheckedVal+'> Hull &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="stroke" '+strokeCheckedVal+'> Stroke &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="opacity" '+opacityCheckedVal+'> Opacity &nbsp;</label>';
        }else if(dataFact['type']=="ExtremeValueFact"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="stroke" '+strokeCheckedVal+'> Stroke &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="opacity" '+opacityCheckedVal+'> Opacity &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="item_label" '+itemLabelCheckedVal+'> Item Label &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="text_highlight" '+textHighlightCheckedVal+'> Text Highlight &nbsp;</label>';
        }

        return annotationOptionHTML;
    }

    function applyAnnotations_ColoredScatterplot(dataFact,visObject,visDivId){
        // quadrant_lines, hull, correlation_line
        let quadrant_lineCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['quadrant_lines'];
        let regression_lineCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['regression_line'];
        let hullCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['hull'];
        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let itemLabelCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['item_label'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];

        if(dataFact['type']=="QuadrantDistributionFact"){
            if(quadrant_lineCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".annotation.quadrantLine").style("display","block");
            }
            if(hullCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".annotation.hull").each(function(d) {
                    let hullCategoryLabel = d3.select(this).attr("categoryLabel");
                    if(hullCategoryLabel==dataFact.primaryTargetObject){
                        d3.select(this).style("display","block");
                    }
                });
            }
            if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked"){
                var midXVal = globalVars.metadataMap[visObject.x.attribute]['domain'][parseInt(globalVars.metadataMap[visObject.x.attribute]['domain'].length/2)];
                var midYVal = globalVars.metadataMap[visObject.y.attribute]['domain'][parseInt(globalVars.metadataMap[visObject.y.attribute]['domain'].length/2)];
                d3.select("#"+visDivId).selectAll(".dot")
                    .classed("highlightedSameColor",function(d,i){
                        if(strokeCheckedVal=="checked"){
                            if(d.colorAttrValue==dataFact.primaryTargetObject){
                                if(dataFact.quadrant==1){
                                    if(d.xVal>=midXVal && d.yVal>=midYVal){
                                        return true;
                                    }
                                }else if(dataFact.quadrant==2){
                                    if(d.xVal<=midXVal && d.yVal>=midYVal){
                                        return true;
                                    }
                                }else if(dataFact.quadrant==3){
                                    if(d.xVal<=midXVal && d.yVal<=midYVal){
                                        return true;
                                    }
                                }else if(dataFact.quadrant==4){
                                    if(d.xVal>=midXVal && d.yVal<=midYVal){
                                        return true;
                                    }
                                }
                            }
                        }
                    }).classed("fadeAnnotation",function(d,i){
                        if(opacityCheckedVal=="checked"){
                            if(d.colorAttrValue==dataFact.primaryTargetObject){
                                if(dataFact.quadrant==1){
                                    if(d.xVal>=midXVal && d.yVal>=midYVal){
                                        return false;
                                    }else{
                                        return true;
                                    }
                                }else if(dataFact.quadrant==2){
                                    if(d.xVal<=midXVal && d.yVal>=midYVal){
                                        return false;
                                    }else{
                                        return true;
                                    }
                                }else if(dataFact.quadrant==3){
                                    if(d.xVal<=midXVal && d.yVal<=midYVal){
                                        return false;
                                    }else{
                                        return true;
                                    }
                                }else if(dataFact.quadrant==4){
                                    if(d.xVal>=midXVal && d.yVal<=midYVal){
                                        return false;
                                    }else{
                                        return true;
                                    }
                                }
                            }else{
                                return true;
                            }
                        }
                    });
            }
        }else if(dataFact['type']=="CorrelationFact"){
            if(regression_lineCheckedVal=="checked"){
                d3.select("#"+visDivId).select(".annotation.regressionLine").style("display","block");
            }
        }else if(dataFact['type']=="CategoryCorrelationFact"){
            if(hullCheckedVal=="checked") {
                d3.select("#"+visDivId).selectAll(".annotation.hull").each(function (d) {
                    let hullCategoryLabel = d3.select(this).attr("categoryLabel");
                    if (hullCategoryLabel == dataFact.secondaryTargetObject) {
                        d3.select(this).style("display", "block");
                    }
                });
            }
            if(regression_lineCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".annotation.hullRegressionLine").each(function(d) {
                    let hullCategoryLabel = d3.select(this).attr("categoryLabel");
                    if(hullCategoryLabel==dataFact.secondaryTargetObject){
                        d3.select(this).style("display","block");
                    }
                });
            }
            if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".dot")
                    .classed("highlightedSameColor",function(d,i){
                        if(strokeCheckedVal == "checked") {
                            if(d.colorAttrValue==dataFact.secondaryTargetObject){
                                return true;
                            }
                        }
                    })
                    .classed("fadeAnnotation",function(d,i) {
                        if(opacityCheckedVal == "checked") {
                            if(d.colorAttrValue==dataFact.secondaryTargetObject){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    });

                d3.select("#"+visDivId).selectAll(".legendText")
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if(d!=undefined){
                                if(dataFact.secondaryTargetObject.indexOf(d)!=-1){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    })
            }
        }else if(dataFact['type']=="ExtremeValueFact"){
            if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll("circle.dot")
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if(dataFact['primaryTargetObject']== d.itemLabel){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    })
                    .classed("highlightedSameColor",function(d){
                        if(strokeCheckedVal=="checked"){
                            if(dataFact['primaryTargetObject']== d.itemLabel){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    });
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if(d!=undefined){
                                if(dataFact.secondaryTargetObject.indexOf(d)!=-1){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    })
                d3.select("#"+visDivId).selectAll(".legendText")
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if(d!=undefined){
                                if(dataFact.secondaryTargetObject.indexOf(d)!=-1){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    })
            }
            if(textHighlightCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("highlighted",function(d){
                        if(textHighlightCheckedVal=="checked"){
                            if(d!=undefined){
                                if(dataFact.secondaryTargetObject.indexOf(d)!=-1){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                        }
                    })
                d3.select("#"+visDivId).selectAll(".legendText")
                    .classed("highlighted",function(d){
                        if(textHighlightCheckedVal=="checked"){
                            if(d!=undefined){
                                if(dataFact.secondaryTargetObject.indexOf(d)!=-1){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                        }
                    })
            }
            if(itemLabelCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".itemLabel")
                    .style("display",function(d){
                        if(dataFact['primaryTargetObject']== d.itemLabel){
                            return "block";
                        }else{
                            return "none";
                        }
                    });
            }
        }
    }

    function getAnnotationOptions_SizedScatterplot(dataFact,visObject){
        let annotationOptionHTML = "";
        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];
        let quadrant_lineCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['quadrant_lines'];

        if(dataFact['type']=="QuadrantDistributionFact"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="stroke" '+strokeCheckedVal+'> Stroke &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="opacity" '+opacityCheckedVal+'> Opacity &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="text_highlight" '+textHighlightCheckedVal+'> Text Highlight &nbsp;</label>';
        }else if(dataFact['type']=="QxQxQ_QuadrantDistributionFact"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="stroke" '+strokeCheckedVal+'> Stroke &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="opacity" '+opacityCheckedVal+'> Opacity &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="quadrant_lines" '+quadrant_lineCheckedVal+'> Quadrant Lines &nbsp;</label>';
        }
        return annotationOptionHTML;
    }

    function applyAnnotations_SizedScatterplot(dataFact,visObject,visDivId){
        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];
        let quadrant_lineCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['quadrant_lines'];

        if(dataFact['type']=="QuadrantDistributionFact"){
            if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked"){
                var midYVal = globalVars.metadataMap[visObject.y.attribute]['domain'][parseInt(globalVars.metadataMap[visObject.y.attribute]['domain'].length/2)];
                var midSizeVal = globalVars.metadataMap[visObject.size.attribute]['domain'][parseInt(globalVars.metadataMap[visObject.size.attribute]['domain'].length/2)];
                d3.select("#"+visDivId).selectAll(".dot")
                    .classed("highlighted",function(d,i){
                        if(strokeCheckedVal=="checked"){
                            if(d.xVal==dataFact.primaryTargetObject){
                                if(dataFact.quadrant==1){
                                    if(d.sizeAttrValue>=midSizeVal && d.yVal>=midYVal){
                                        return true;
                                    }
                                }else if(dataFact.quadrant==2){
                                    if(d.sizeAttrValue<=midSizeVal && d.yVal>=midYVal){
                                        return true;
                                    }
                                }else if(dataFact.quadrant==3){
                                    if(d.sizeAttrValue<=midSizeVal && d.yVal<=midYVal){
                                        return true;
                                    }
                                }else if(dataFact.quadrant==4){
                                    if(d.sizeAttrValue>=midSizeVal && d.yVal<=midYVal){
                                        return true;
                                    }
                                }
                            }
                        }
                    }).classed("fadeAnnotation",function(d,i){
                        if(opacityCheckedVal=="checked"){
                            if(d.xVal==dataFact.primaryTargetObject){
                                if(dataFact.quadrant==1){
                                    if(d.sizeAttrValue>=midSizeVal && d.yVal>=midYVal){
                                        return false;
                                    }else{
                                        return true;
                                    }
                                }else if(dataFact.quadrant==2){
                                    if(d.sizeAttrValue<=midSizeVal && d.yVal>=midYVal){
                                        return false;
                                    }else{
                                        return true;
                                    }
                                }else if(dataFact.quadrant==3){
                                    if(d.sizeAttrValue<=midSizeVal && d.yVal<=midYVal){
                                        return false;
                                    }else{
                                        return true;
                                    }
                                }else if(dataFact.quadrant==4){
                                    if(d.sizeAttrValue>=midSizeVal && d.yVal<=midYVal){
                                        return false;
                                    }else{
                                        return true;
                                    }
                                }
                            }else{
                                return true;
                            }
                        }
                    });
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if(d!=undefined){
                                if(dataFact.primaryTargetObject==d){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    })
            }
            if(textHighlightCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("highlighted",function(d){
                        if(textHighlightCheckedVal=="checked"){
                            if(d!=undefined){
                                if(dataFact.primaryTargetObject==d){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                        }
                    })
            }
        }else if(dataFact['type']=="QxQxQ_QuadrantDistributionFact"){
            if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked"){
                var midXVal = globalVars.metadataMap[visObject.x.attribute]['domain'][parseInt(globalVars.metadataMap[visObject.x.attribute]['domain'].length/2)];
                var midYVal = globalVars.metadataMap[visObject.y.attribute]['domain'][parseInt(globalVars.metadataMap[visObject.y.attribute]['domain'].length/2)];
                var midSizeVal = globalVars.metadataMap[visObject.size.attribute]['domain'][parseInt(globalVars.metadataMap[visObject.size.attribute]['domain'].length/2)];

                if(quadrant_lineCheckedVal=="checked"){
                    d3.select("#"+visDivId).selectAll(".annotation.quadrantLine").style("display","block");
                }
                if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked"){
                    d3.select("#"+visDivId).selectAll(".dot")
                        .classed("highlightedSameColor",function(d,i){
                            if(strokeCheckedVal=="checked"){
                                if(dataFact.sizeFocus=="large"){
                                    if(dataFact.quadrant==1){
                                        if(d.xVal>=midXVal && d.yVal>=midYVal && d.sizeAttrValue>=midSizeVal){
                                            return true;
                                        }
                                    }else if(dataFact.quadrant==2){
                                        if(d.xVal<=midXVal && d.yVal>=midYVal && d.sizeAttrValue>=midSizeVal){
                                            return true;
                                        }
                                    }else if(dataFact.quadrant==3){
                                        if(d.xVal<=midXVal && d.yVal<=midYVal && d.sizeAttrValue>=midSizeVal){
                                            return true;
                                        }
                                    }else if(dataFact.quadrant==4){
                                        if(d.xVal>=midXVal && d.yVal<=midYVal && d.sizeAttrValue>=midSizeVal){
                                            return true;
                                        }
                                    }
                                }else if(dataFact.sizeFocus=="small"){
                                    if(dataFact.quadrant==1){
                                        if(d.xVal>=midXVal && d.yVal>=midYVal && d.sizeAttrValue<midSizeVal){
                                            return true;
                                        }
                                    }else if(dataFact.quadrant==2){
                                        if(d.xVal<=midXVal && d.yVal>=midYVal && d.sizeAttrValue<midSizeVal){
                                            return true;
                                        }
                                    }else if(dataFact.quadrant==3){
                                        if(d.xVal<=midXVal && d.yVal<=midYVal && d.sizeAttrValue<midSizeVal){
                                            return true;
                                        }
                                    }else if(dataFact.quadrant==4){
                                        if(d.xVal>=midXVal && d.yVal<=midYVal && d.sizeAttrValue<midSizeVal){
                                            return true;
                                        }
                                    }
                                }
                            }
                        }).classed("faded",function(d,i){
                            if(opacityCheckedVal=="checked"){
                                if(dataFact.sizeFocus=="large"){
                                    if(dataFact.quadrant==1){
                                        if(d.xVal>=midXVal && d.yVal>=midYVal && d.sizeAttrValue>=midSizeVal){
                                            return false;
                                        }else{
                                            return true;
                                        }
                                    }else if(dataFact.quadrant==2){
                                        if(d.xVal<=midXVal && d.yVal>=midYVal && d.sizeAttrValue>=midSizeVal){
                                            return false;
                                        }else{
                                            return true;
                                        }
                                    }else if(dataFact.quadrant==3){
                                        if(d.xVal<=midXVal && d.yVal<=midYVal && d.sizeAttrValue>=midSizeVal){
                                            return false;
                                        }else{
                                            return true;
                                        }
                                    }else if(dataFact.quadrant==4){
                                        if(d.xVal>=midXVal && d.yVal<=midYVal && d.sizeAttrValue>=midSizeVal){
                                            return false;
                                        }else{
                                            return true;
                                        }
                                    }
                                }else if(dataFact.sizeFocus=="small"){
                                    if(dataFact.quadrant==1){
                                        if(d.xVal>=midXVal && d.yVal>=midYVal && d.sizeAttrValue<midSizeVal){
                                            return false;
                                        }else{
                                            return true;
                                        }
                                    }else if(dataFact.quadrant==2){
                                        if(d.xVal<=midXVal && d.yVal>=midYVal && d.sizeAttrValue<midSizeVal){
                                            return false;
                                        }else{
                                            return true;
                                        }
                                    }else if(dataFact.quadrant==3){
                                        if(d.xVal<=midXVal && d.yVal<=midYVal && d.sizeAttrValue<midSizeVal){
                                            return false;
                                        }else{
                                            return true;
                                        }
                                    }else if(dataFact.quadrant==4){
                                        if(d.xVal>=midXVal && d.yVal<=midYVal && d.sizeAttrValue<midSizeVal){
                                            return false;
                                        }else{
                                            return true;
                                        }
                                    }
                                }
                            }
                        });
                }
            }
        }
    }

    function getAnnotationOptions_SingleAxisStripPlot(dataFact,visObject){
        let annotationOptionHTML = "";
        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let itemLabelCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['item_label'];

        if(dataFact['type']=="ExtremeValueFact" || dataFact['type']=="OutlierFact"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="stroke" '+strokeCheckedVal+'> Stroke &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="opacity" '+opacityCheckedVal+'> Opacity &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="item_label" '+itemLabelCheckedVal+'> Label &nbsp;</label>';
        }else if(dataFact['type']=="RangeDistributionFact"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="stroke" '+strokeCheckedVal+'> Stroke &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="opacity" '+opacityCheckedVal+'> Opacity &nbsp;</label>';
        }

        return annotationOptionHTML;
    }

    function applyAnnotations_SingleAxisStripPlot(dataFact,visObject,visDivId){
        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let itemLabelCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['item_label'];

        if(dataFact['type']=="ExtremeValueFact" || dataFact['type']=="OutlierFact"){
            if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".barStrip")
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if(dataFact['primaryTargetObject']== d.itemLabel){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    })
                    .classed("highlighted",function(d){
                        if(strokeCheckedVal=="checked"){
                            if(dataFact['primaryTargetObject']== d.itemLabel){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    })
            }
            if(itemLabelCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".itemLabel")
                    .style("display",function(d){
                        if(dataFact['primaryTargetObject']== d.itemLabel){
                            return "block";
                        }else{
                            return "none";
                        }
                    });
            }
        }else if(dataFact['type']=="RangeDistributionFact"){
            d3.select("#"+visDivId).selectAll(".barStrip")
                .classed("faded",function(d){
                    if(opacityCheckedVal=="checked"){
                        if(d.value>=dataFact['primaryTargetObject'][0] && d.value<=dataFact['primaryTargetObject'][1]){
                            return false;
                        }else{
                            return true;
                        }
                    }
                })
                .classed("highlighted",function(d){
                    if(strokeCheckedVal=="checked"){
                        if(d.value>=dataFact['primaryTargetObject'][0] && d.value<=dataFact['primaryTargetObject'][1]){
                            return true;
                        }else{
                            return false;
                        }
                    }
                })
        }
    }

    function getAnnotationOptions_Histogram(dataFact,visObject){
        let annotationOptionHTML = "";
        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];

        if(dataFact['type']=="RangeDistributionFact"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="stroke" '+strokeCheckedVal+'> Stroke &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="opacity" '+opacityCheckedVal+'> Opacity &nbsp;</label>';
        }

        return annotationOptionHTML;
    }

    function applyAnnotations_Histogram(dataFact,visObject,visDivId){
        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];

        if(dataFact['type']=="RangeDistributionFact"){
            d3.select("#"+visDivId).selectAll(".bar")
                .classed("faded",function(d){
                    if(opacityCheckedVal=="checked"){
                        if(d.x0>=dataFact['primaryTargetObject'][0] && d.x1<=dataFact['primaryTargetObject'][1]){
                            return false;
                        }else{
                            return true;
                        }
                    }
                })
                .classed("highlighted",function(d){
                    if(strokeCheckedVal=="checked"){
                        if(d.x0>=dataFact['primaryTargetObject'][0] && d.x1<=dataFact['primaryTargetObject'][1]){
                            return true;
                        }else{
                            return false;
                        }
                    }
                })
        }
    }

    function getAnnotationOptions_SingleAxisBoxPlot(dataFact,visObject){
        let annotationOptionHTML = "";
        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let itemLabelCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['item_label'];

        if(dataFact['type']=="OutlierFact"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="stroke" '+strokeCheckedVal+'> Stroke &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="opacity" '+opacityCheckedVal+'> Opacity &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="item_label" '+itemLabelCheckedVal+'> Label &nbsp;</label>';
        }else if(dataFact['type']=="RangeDistributionFact"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="stroke" '+strokeCheckedVal+'> Stroke &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="opacity" '+opacityCheckedVal+'> Opacity &nbsp;</label>';
        }

        return annotationOptionHTML;
    }

    function applyAnnotations_SingleAxisBoxPlot(dataFact,visObject,visDivId){
        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let itemLabelCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['item_label'];

        if(dataFact['type']=="OutlierFact"){
            if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked") {
                d3.select("#" + visDivId).selectAll("circle.outlier")
                    .classed("faded", function (i) {
                        if (opacityCheckedVal == "checked") {
                            let outlierLabel = d3.select(this).attr("itemLabel");
                            if (dataFact['primaryTargetObject'] == outlierLabel) {
                                return false;
                            } else {
                                return true;
                            }
                        }
                    })
                    .classed("highlighted", function (i) {
                        if (strokeCheckedVal == "checked") {
                            let outlierLabel = d3.select(this).attr("itemLabel");
                            if (dataFact['primaryTargetObject'] == outlierLabel) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    })

                if(opacityCheckedVal=="checked"){
                    d3.select("#" + visDivId).select("rect.box").classed('faded',true);
                }
            }
        }else if(dataFact['type']=="RangeDistributionFact"){
            if(opacityCheckedVal=="checked"){
                d3.select("#" + visDivId).selectAll("circle.outlier").classed("faded",true);
            }
            if(strokeCheckedVal=="checked"){
                d3.select("#" + visDivId).selectAll("rect.box").classed("highlighted",true);
            }
        }
    }

    function getAnnotationOptions_Scatterplot(dataFact,visObject){
        let annotationOptionHTML = "";
        let quadrant_lineCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['quadrant_lines'];
        let regression_lineCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['regression_line'];
        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let itemLabelCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['item_label'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];

        if(dataFact['type']=="QuadrantDistributionFact"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="quadrant_lines" '+quadrant_lineCheckedVal+'> Quadrant Lines &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="stroke" '+strokeCheckedVal+'> Stroke &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="opacity" '+opacityCheckedVal+'> Opacity &nbsp;</label>';
        }else if(dataFact['type']=="CorrelationFact"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="regression_line" '+regression_lineCheckedVal+'> Regression Lines &nbsp;</label>';
        }else if(dataFact['type']=="ExtremeValueFact"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="stroke" '+strokeCheckedVal+'> Stroke &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="opacity" '+opacityCheckedVal+'> Opacity &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="item_label" '+itemLabelCheckedVal+'> Item Label &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="text_highlight" '+textHighlightCheckedVal+'> Text Highlight &nbsp;</label>';
        }
        return annotationOptionHTML;
    }

    function applyAnnotations_Scatterplot(dataFact,visObject,visDivId){
        let quadrant_lineCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['quadrant_lines'];
        let regression_lineCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['regression_line'];
        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let itemLabelCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['item_label'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];

        if(dataFact['type']=="QuadrantDistributionFact"){
            if(quadrant_lineCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".annotation.quadrantLine").style("display","block");
            }
            if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked"){
                var midXVal = globalVars.metadataMap[visObject.x.attribute]['domain'][parseInt(globalVars.metadataMap[visObject.x.attribute]['domain'].length/2)];
                var midYVal = globalVars.metadataMap[visObject.y.attribute]['domain'][parseInt(globalVars.metadataMap[visObject.y.attribute]['domain'].length/2)];
                d3.select("#"+visDivId).selectAll(".dot")
                    .classed("highlighted",function(d,i){
                        if(strokeCheckedVal=="checked"){
                            if(dataFact.quadrant==1){
                                if(d.xVal>=midXVal && d.yVal>=midYVal){
                                    return true;
                                }
                            }else if(dataFact.quadrant==2){
                                if(d.xVal<=midXVal && d.yVal>=midYVal){
                                    return true;
                                }
                            }else if(dataFact.quadrant==3){
                                if(d.xVal<=midXVal && d.yVal<=midYVal){
                                    return true;
                                }
                            }else if(dataFact.quadrant==4){
                                if(d.xVal>=midXVal && d.yVal<=midYVal){
                                    return true;
                                }
                            }
                        }
                    }).classed("fadeAnnotation",function(d,i){
                        if(opacityCheckedVal=="checked"){
                            if(dataFact.quadrant==1){
                                if(d.xVal>=midXVal && d.yVal>=midYVal){
                                    return false;
                                }else{
                                    return true;
                                }
                            }else if(dataFact.quadrant==2){
                                if(d.xVal<=midXVal && d.yVal>=midYVal){
                                    return false;
                                }else{
                                    return true;
                                }
                            }else if(dataFact.quadrant==3){
                                if(d.xVal<=midXVal && d.yVal<=midYVal){
                                    return false;
                                }else{
                                    return true;
                                }
                            }else if(dataFact.quadrant==4){
                                if(d.xVal>=midXVal && d.yVal<=midYVal){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    });
            }
        }else if(dataFact['type']=="CorrelationFact"){
            if(regression_lineCheckedVal=="checked"){
                d3.select("#"+visDivId).select(".annotation.regressionLine").style("display","block");
            }
        }else if(dataFact['type']=="ExtremeValueFact"){
            if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".dot")
                    .classed("highlighted",function(d,i){
                        if(strokeCheckedVal=="checked"){
                            if(dataFact.primaryTargetObject== d.itemLabel){
                                return true;
                            } else{
                                return false;
                            }
                        }
                    })
                    .classed("faded",function(d,i){
                        if(opacityCheckedVal=="checked"){
                            if(dataFact.primaryTargetObject== d.itemLabel){
                                return false;
                            } else{
                                return true;
                            }
                        }
                    });
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if(d!=undefined){
                                if(dataFact.secondaryTargetObject==d){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    })
            }
            if(textHighlightCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("highlighted",function(d){
                        if(textHighlightCheckedVal=="checked"){
                            if(d!=undefined){
                                if(dataFact.secondaryTargetObject==d){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                        }
                    })
            }
            if(itemLabelCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".itemLabel")
                    .style("display",function(d){
                        if(d['itemLabel']==dataFact.primaryTargetObject){
                            return "block";
                        }else{
                            return "none";
                        }
                    })
            }
        }
    }

    function getAnnotationOptions_TwoAxisTickPlot(dataFact,visObject){
        let annotationOptionHTML = "";

        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let itemLabelCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['item_label'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];

        if(dataFact['type']=="ExtremeValueFact"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="stroke" '+strokeCheckedVal+'> Stroke &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="opacity" '+opacityCheckedVal+'> Opacity &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="item_label" '+itemLabelCheckedVal+'> Item Label &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="text_highlight" '+textHighlightCheckedVal+'> Text Highlight &nbsp;</label>';
        }
        return annotationOptionHTML;
    }

    function applyAnnotations_TwoAxisTickPlot(dataFact,visObject,visDivId){
        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let itemLabelCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['item_label'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];

        if(dataFact['type']=="ExtremeValueFact"){
            if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".barStrip")
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if(dataFact['primaryTargetObject']== d.itemLabel){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    })
                    .classed("highlighted",function(d){
                        if(strokeCheckedVal=="checked"){
                            if(dataFact['primaryTargetObject']== d.itemLabel){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    })
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if(d!=undefined){
                                if(dataFact.secondaryTargetObject==d){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    })
            }
            if(textHighlightCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("highlighted",function(d){
                        if(textHighlightCheckedVal=="checked"){
                            if(d!=undefined){
                                if(dataFact.secondaryTargetObject==d){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                        }
                    })
            }
            if(itemLabelCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".itemLabel")
                    .style("display",function(d){
                        if(dataFact['primaryTargetObject']== d.itemLabel){
                            return "block";
                        }else{
                            return "none";
                        }
                    });
            }
        }
    }

    function getAnnotationOptions_ColoredTickPlot(dataFact,visObject){
        let annotationOptionHTML = "";

        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let itemLabelCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['item_label'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];

        if(dataFact['type']=="ExtremeValueFact"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="stroke" '+strokeCheckedVal+'> Stroke &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="opacity" '+opacityCheckedVal+'> Opacity &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="item_label" '+itemLabelCheckedVal+'> Item Label &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="text_highlight" '+textHighlightCheckedVal+'> Text Highlight &nbsp;</label>';
        }
        return annotationOptionHTML;
    }

    function applyAnnotations_ColoredTickPlot(dataFact,visObject,visDivId){
        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let itemLabelCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['item_label'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];

        if(dataFact['type']=="ExtremeValueFact"){
            if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".barStrip")
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if(dataFact['primaryTargetObject']== d.itemLabel){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    })
                    .classed("highlighted",function(d){
                        if(strokeCheckedVal=="checked"){
                            if(dataFact['primaryTargetObject']== d.itemLabel){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    });
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if(d!=undefined){
                                if(dataFact.secondaryTargetObject.indexOf(d)!=-1){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    })
                d3.select("#"+visDivId).selectAll(".legendText")
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if(d!=undefined){
                                if(dataFact.secondaryTargetObject.indexOf(d)!=-1){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    })
            }
            if(textHighlightCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("highlighted",function(d){
                        if(textHighlightCheckedVal=="checked"){
                            if(d!=undefined){
                                if(dataFact.secondaryTargetObject.indexOf(d)!=-1){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                        }
                    })
                d3.select("#"+visDivId).selectAll(".legendText")
                    .classed("highlighted",function(d){
                        if(textHighlightCheckedVal=="checked"){
                            if(d!=undefined){
                                if(dataFact.secondaryTargetObject.indexOf(d)!=-1){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                        }
                    })
            }
            if(itemLabelCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".itemLabel")
                    .style("display",function(d){
                        if(dataFact['primaryTargetObject']== d.itemLabel){
                            return "block";
                        }else{
                            return "none";
                        }
                    });
            }
        }
    }

    function getAnnotationOptions_AggregatedScatterplot(dataFact,visObject){
        let annotationOptionHTML = "";

        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];

        if(dataFact['type']=="ExtremeValueFact"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="stroke" '+strokeCheckedVal+'> Stroke &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="opacity" '+opacityCheckedVal+'> Opacity &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="text_highlight" '+textHighlightCheckedVal+'> Text Highlight &nbsp;</label>';
        }
        return annotationOptionHTML;
    }

    function applyAnnotations_AggregatedScatterplot(dataFact,visObject,visDivId){
        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];

        if(dataFact['type']=="ExtremeValueFact"){
            if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".dot")
                    .classed("highlighted",function(d){
                        if(strokeCheckedVal=="checked"){
                            if((d.xLabel==dataFact.primaryTargetObject && d.yLabel==dataFact.secondaryTargetObject)||(d.yLabel==dataFact.primaryTargetObject && d.xLabel==dataFact.secondaryTargetObject)){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    })
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if((d.xLabel==dataFact.primaryTargetObject && d.yLabel==dataFact.secondaryTargetObject)||(d.yLabel==dataFact.primaryTargetObject && d.xLabel==dataFact.secondaryTargetObject)){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    });
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("faded",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    })
                d3.select("#"+visDivId).selectAll(".yAxisLabel")
                    .classed("faded",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    })
            }
            if(textHighlightCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("highlighted",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                        }
                    });
                d3.select("#"+visDivId).selectAll(".yAxisLabel")
                    .classed("highlighted",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                        }
                    });
            }
        }else if(dataFact['type']=="ExtremeValueFactWithDistribution"){
            if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".dot")
                    .classed("highlighted",function(d){
                        if(strokeCheckedVal=="checked"){
                            if((d.xLabel==dataFact.primaryTargetObject && d.yLabel==dataFact.secondaryTargetObject)||(d.yLabel==dataFact.primaryTargetObject && d.xLabel==dataFact.secondaryTargetObject)){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    })
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if((d.xLabel==dataFact.primaryTargetObject)||(d.yLabel==dataFact.primaryTargetObject)){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    });
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("faded",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    })
                d3.select("#"+visDivId).selectAll(".yAxisLabel")
                    .classed("faded",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    })
            }
            if(textHighlightCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("highlighted",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                        }
                    });
                d3.select("#"+visDivId).selectAll(".yAxisLabel")
                    .classed("highlighted",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                        }
                    });
            }
        }
    }

    function getAnnotationOptions_AggregatedColoredScatterplot(dataFact,visObject){
        let annotationOptionHTML = "";

        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];

        if(dataFact['type']=="ExtremeValueFact"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="stroke" '+strokeCheckedVal+'> Stroke &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="opacity" '+opacityCheckedVal+'> Opacity &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="text_highlight" '+textHighlightCheckedVal+'> Text Highlight &nbsp;</label>';
        }
        return annotationOptionHTML;
    }

    function applyAnnotations_AggregatedColoredScatterplot(dataFact,visObject,visDivId){
        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];

        if(dataFact['type']=="ExtremeValueFact"){
            if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".dot")
                    .classed("highlighted",function(d){
                        if(strokeCheckedVal=="checked"){
                            if((d.xVal==dataFact.primaryTargetObject && d.colorAttrValue==dataFact.secondaryTargetObject)||(d.colorAttrValue==dataFact.primaryTargetObject && d.xVal==dataFact.secondaryTargetObject)){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    })
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if((d.xVal==dataFact.primaryTargetObject && d.colorAttrValue==dataFact.secondaryTargetObject)||(d.colorAttrValue==dataFact.primaryTargetObject && d.xVal==dataFact.secondaryTargetObject)){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    });
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("faded",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    })
                d3.select("#"+visDivId).selectAll(".legendText")
                    .classed("faded",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    })
            }
            if(textHighlightCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("highlighted",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                        }
                    });
                d3.select("#"+visDivId).selectAll(".legendText")
                    .classed("highlighted",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                        }
                    });
            }
        }
    }

    function getAnnotationOptions_AggregatedColoredStripPlot(dataFact,visObject){
        let annotationOptionHTML = "";

        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];

        if(dataFact['type']=="ExtremeValueFact"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="stroke" '+strokeCheckedVal+'> Stroke &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="opacity" '+opacityCheckedVal+'> Opacity &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="text_highlight" '+textHighlightCheckedVal+'> Text Highlight &nbsp;</label>';
        }
        return annotationOptionHTML;
    }

    function applyAnnotations_AggregatedColoredStripPlot(dataFact,visObject,visDivId){
        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];

        if(dataFact['type']=="ExtremeValueFact"){
            if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".barStrip")
                    .classed("highlighted",function(d){
                        if(strokeCheckedVal=="checked"){
                            if((d.categoryLabel==dataFact.primaryTargetObject && d.colorAttrValue==dataFact.secondaryTargetObject)||(d.colorAttrValue==dataFact.primaryTargetObject && d.categoryLabel==dataFact.secondaryTargetObject)){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    })
                    .classed("faded",function(d){
                        if(opacityCheckedVal=="checked"){
                            if((d.categoryLabel==dataFact.primaryTargetObject && d.colorAttrValue==dataFact.secondaryTargetObject)||(d.colorAttrValue==dataFact.primaryTargetObject && d.categoryLabel==dataFact.secondaryTargetObject)){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    });
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("faded",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    })
                d3.select("#"+visDivId).selectAll(".legendText")
                    .classed("faded",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    })
            }
            if(textHighlightCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("highlighted",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                        }
                    });
                d3.select("#"+visDivId).selectAll(".legendText")
                    .classed("highlighted",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                        }
                    });
            }
        }
    }

    function getAnnotationOptions_StackedBarChart(dataFact,visObject){
        let annotationOptionHTML = "";

        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];

        if(dataFact['type']=="ExtremeValueFact" || dataFact['type']=="ExtremeValueFactWithDistribution"){
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="stroke" '+strokeCheckedVal+'> Stroke &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="opacity" '+opacityCheckedVal+'> Opacity &nbsp;</label>';
            annotationOptionHTML += '<label><input associatedDFid="'+dataFact.id+'" type="checkbox" class="annotationOption" value="text_highlight" '+textHighlightCheckedVal+'> Text Highlight &nbsp;</label>';
        }
        return annotationOptionHTML;
    }

    function applyAnnotations_StackedBarChart(dataFact,visObject,visDivId){
        let strokeCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['stroke'];
        let opacityCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['opacity'];
        let textHighlightCheckedVal = globalVars.dataFactMap[dataFact.id]['annotationMap']['text_highlight'];
        if(dataFact['type']=="ExtremeValueFact"){
            if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".stackedBarPortion")
                    .classed("highlighted",function(d){
                        let xLabel = d3.select(this).attr("xLabel");
                        let colorLabel = d3.select(this).attr("colorLabel");
                        if(strokeCheckedVal=="checked"){
                            if((xLabel==dataFact.primaryTargetObject && colorLabel==dataFact.secondaryTargetObject)||(colorLabel==dataFact.primaryTargetObject && xLabel==dataFact.secondaryTargetObject)){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    })
                    .classed("faded",function(d){
                        let xLabel = d3.select(this).attr("xLabel");
                        let colorLabel = d3.select(this).attr("colorLabel");
                        if(opacityCheckedVal=="checked"){
                            if((xLabel==dataFact.primaryTargetObject && colorLabel==dataFact.secondaryTargetObject)||(colorLabel==dataFact.primaryTargetObject && xLabel==dataFact.secondaryTargetObject)){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    });
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("faded",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    })
                d3.select("#"+visDivId).selectAll(".legendText")
                    .classed("faded",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    })
            }
            if(textHighlightCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("highlighted",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                        }
                    });
                d3.select("#"+visDivId).selectAll(".legendText")
                    .classed("highlighted",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                        }
                    });
            }
        }else if(dataFact['type']=="ExtremeValueFactWithDistribution"){
            if(strokeCheckedVal=="checked" || opacityCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".stackedBarPortion")
                    .classed("highlighted",function(d){
                        let xLabel = d3.select(this).attr("xLabel");
                        let colorLabel = d3.select(this).attr("colorLabel");
                        if(strokeCheckedVal=="checked"){
                            if((xLabel==dataFact.primaryTargetObject && colorLabel==dataFact.secondaryTargetObject)||(colorLabel==dataFact.primaryTargetObject && xLabel==dataFact.secondaryTargetObject)){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    })
                    .classed("faded",function(d){
                        let xLabel = d3.select(this).attr("xLabel");
                        let colorLabel = d3.select(this).attr("colorLabel");
                        if(opacityCheckedVal=="checked"){
                            if((xLabel==dataFact.primaryTargetObject)||(colorLabel==dataFact.primaryTargetObject)){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    });
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("faded",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    })
                d3.select("#"+visDivId).selectAll(".legendText")
                    .classed("faded",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    })
            }
            if(textHighlightCheckedVal=="checked"){
                d3.select("#"+visDivId).selectAll(".xAxisLabel")
                    .classed("highlighted",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                        }
                    });
                d3.select("#"+visDivId).selectAll(".legendText")
                    .classed("highlighted",function(d){
                        if(d!=undefined){
                            if(opacityCheckedVal=="checked"){
                                if(d==dataFact.primaryTargetObject || d==dataFact.secondaryTargetObject){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                        }
                    });
            }
        }
    }

})();