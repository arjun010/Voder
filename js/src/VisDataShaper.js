/**
 * Created by arjun010 on 12/28/17.
 */
(function(){
    visDataShaper = {};

    visDataShaper.getDataForBarChartWithCount = function(dataList, attribute){
        let labelCountMap = {};
        for(var dataObject of dataList){
            let label = dataObject[attribute];
            if(!(label in labelCountMap)){
                labelCountMap[label] = 1.0;
            }else{
                labelCountMap[label] += 1.0;
            }
        }
        let labelCountList = [];
        for(var label in labelCountMap){
            labelCountList.push({
               "categoryLabel" : label,
                "value" : labelCountMap[label]
            });
        }

        return labelCountList;
    };

    visDataShaper.getDataForBarChartWithSum = function(dataList, labelAttribute, valueAttribute){
        let labelSumMap = {};
        for(var dataObject of dataList){
            let label = dataObject[labelAttribute];
            let value = isNaN(dataObject[valueAttribute]) || dataObject[valueAttribute]=="" ? 0.0 : parseFloat(dataObject[valueAttribute]); // checking for missing and non-numeric values
            if(!(label in labelSumMap)){
                labelSumMap[label] = parseFloat(value);
            }else{
                labelSumMap[label] += parseFloat(value);
            }
        }
        let labelSumList = [];
        for(var label in labelSumMap){
            labelSumList.push({
                "categoryLabel" : label,
                "value" : labelSumMap[label]
            })
        }

        return labelSumList;
    };

    visDataShaper.getDataForBarChartWithAvg = function(dataList, labelAttribute, valueAttribute){
        let labelSumMap = {},labelCountMap = {};
        for(var dataObject of dataList){
            let label = dataObject[labelAttribute];
            let value = isNaN(dataObject[valueAttribute]) || dataObject[valueAttribute]=="" ? 0.0 : parseFloat(dataObject[valueAttribute]); // checking for missing and non-numeric values
            if(!(label in labelSumMap)){
                labelSumMap[label] = parseFloat(value);
                labelCountMap[label] = 1.0;
            }else{
                labelSumMap[label] += parseFloat(value);
                labelCountMap[label] += 1.0;
            }
        }
        let labelSumList = [];
        for(var label in labelSumMap){
            labelSumList.push({
                "categoryLabel" : label,
                "value" : labelSumMap[label]/labelCountMap[label]
            })
        }

        return labelSumList;
    };

    visDataShaper.getDataForSingleAxisTickPlot = function (dataList, yAttr, itemAttr) {
        let reshapedDataList = [];
        for(var dataObject of dataList){
            let label = "";
            let value = isNaN(dataObject[yAttr]) || dataObject[yAttr]=="" ? 0.0 : parseFloat(dataObject[yAttr]); // checking for missing and non-numeric values
            let item = dataObject[itemAttr];
            reshapedDataList.push({
                "categoryLabel" : label,
                "value" : parseFloat(value),
                "itemLabel" : item
            })
        }

        return reshapedDataList;
    };

    visDataShaper.getDataForTwoAxisTickPlot = function(dataList, xAttr, yAttr, itemAttr){
        let reshapedDataList = [];
        for(var dataObject of dataList){
            let label = dataObject[xAttr];
            let value = isNaN(dataObject[yAttr]) || dataObject[yAttr]=="" ? 0.0 : parseFloat(dataObject[yAttr]); // checking for missing and non-numeric values
            let item = dataObject[itemAttr];
            reshapedDataList.push({
                "categoryLabel" : label,
                "value" : parseFloat(value),
                "itemLabel" : item
            })
        }

        utils.sortObj(reshapedDataList,'categoryLabel')

        return reshapedDataList;
    };

    visDataShaper.getDataForColoredTickPlot = function(dataList, xAttr, yAttr, colorAttr, itemAttr){
        let reshapedDataList = [];
        for(var dataObject of dataList){
            let label = dataObject[xAttr]
            let value = isNaN(dataObject[yAttr]) || dataObject[yAttr]=="" ? 0.0 : parseFloat(dataObject[yAttr]); // checking for missing and non-numeric values
            let colorAttrValue = dataObject[colorAttr]
            let item = dataObject[itemAttr]
            reshapedDataList.push({
                "categoryLabel" : label,
                "value" : parseFloat(value),
                "colorAttrValue" : colorAttrValue,
                "itemLabel" : item
            })
        }

        return reshapedDataList;
    }

    visDataShaper.getDataForScatterplot = function(dataList, metadataMap, xAttr, yAttr, itemAttr){
        let reshapedDataList = [];
        for(var dataObject of dataList){
            let xVal;
            if(metadataMap[xAttr]['type'] == "quantitative"){
                xVal = isNaN(dataObject[xAttr]) || dataObject[xAttr]=="" ? 0.0 : parseFloat(dataObject[xAttr]); // checking for missing and non-numeric values
            }else{
                xVal = dataObject[xAttr];
            }
            let yVal = isNaN(dataObject[yAttr]) || dataObject[yAttr]=="" ? 0.0 : parseFloat(dataObject[yAttr]); // checking for missing and non-numeric values
            let item = dataObject[itemAttr];
            reshapedDataList.push({
                "xVal" : xVal,
                "yVal" : yVal,
                "itemLabel" : item
            })
        }

        return reshapedDataList;
    };

    visDataShaper.getDataForColoredScatterplot = function(dataList, metadataMap, xAttr, yAttr, colorAttr, itemAttr){
        let reshapedDataList = [];
        for(var dataObject of dataList){
            let xVal;
            if(metadataMap[xAttr]['type'] == "quantitative"){
                xVal = isNaN(dataObject[xAttr]) || dataObject[xAttr]=="" ? 0.0 : parseFloat(dataObject[xAttr]); // checking for missing and non-numeric values
            }else{
                xVal = dataObject[xAttr]
            }
            let yVal = isNaN(dataObject[yAttr]) || dataObject[yAttr]=="" ? 0.0 : parseFloat(dataObject[yAttr]); // checking for missing and non-numeric values
            let item = dataObject[itemAttr];
            let colorAttrVal = dataObject[colorAttr];
            reshapedDataList.push({
                "xVal" : xVal,
                "yVal" : yVal,
                "colorAttrValue" : colorAttrVal,
                "itemLabel" : item
            })
        }

        return reshapedDataList;
    };

    visDataShaper.getDataForColoredScatterplotWithAvg = function(dataList, metadataMap, xAttr, yAttr, colorAttr, itemAttr){
        let reshapedDataList = [];
        let sumMap = {};
        let countMap = {};

        let xLabelValues = metadataMap[xAttr]['domain'];
        let colorLabelValues = metadataMap[colorAttr]['domain'];
        for(var xLabel of xLabelValues){
            sumMap[xLabel] = {};
            countMap[xLabel] = {};
            for(var colorLabel of colorLabelValues){
                sumMap[xLabel][colorLabel] = 0.0;
                countMap[xLabel][colorLabel] = 0.0;
            }
        }

        for(var dataObj of dataList){
            let xLabel = dataObj[xAttr]
            let colorLabel = dataObj[colorAttr]
            let value = isNaN(dataObj[yAttr]) || dataObj[yAttr]=="" ? 0.0 : parseFloat(dataObj[yAttr]); // checking for missing and non-numeric values
            if(xLabel!="" && colorLabel!="") {
                sumMap[xLabel][colorLabel] += value
                countMap[xLabel][colorLabel] += 1.0
            }
        }

        //reshapedDataList.push({
        //    "xVal" : "",
        //    "yVal" : "",
        //    "colorAttrValue" : colorLabelValues[0]
        //})
        for(var xLabel in sumMap){
            for(var colorLabel in sumMap[xLabel]){
                if(countMap[xLabel][colorLabel]>0.0){
                    reshapedDataList.push({
                        "xVal" : xLabel,
                        "yVal" : sumMap[xLabel][colorLabel]/countMap[xLabel][colorLabel],
                        "colorAttrValue" : colorLabel
                    })
                }
            }
        }

        return reshapedDataList;
    };

    visDataShaper.getDataForColoredTickPlotWithAvg = function(dataList, metadataMap, xAttr, yAttr, colorAttr, itemAttr){
        let reshapedDataList = [];
        let sumMap = {};
        let countMap = {};

        let xLabelValues = metadataMap[xAttr]['domain'];
        let colorLabelValues = metadataMap[colorAttr]['domain'];
        for(var xLabel of xLabelValues){
            sumMap[xLabel] = {};
            countMap[xLabel] = {};
            for(var colorLabel of colorLabelValues){
                sumMap[xLabel][colorLabel] = 0.0;
                countMap[xLabel][colorLabel] = 0.0;
            }
        }

        for(var dataObj of dataList){
            let xLabel = dataObj[xAttr]
            let colorLabel = dataObj[colorAttr]
            let value = isNaN(dataObj[yAttr]) || dataObj[yAttr]=="" ? 0.0 : parseFloat(dataObj[yAttr]); // checking for missing and non-numeric values
            if(xLabel!="" && colorLabel!="") {
                sumMap[xLabel][colorLabel] += value
                countMap[xLabel][colorLabel] += 1.0
            }
        }

        for(var xLabel in sumMap){
            for(var colorLabel in sumMap[xLabel]){
                if(countMap[xLabel][colorLabel]>0.0){
                    reshapedDataList.push({
                        "categoryLabel" : xLabel,
                        "value" : sumMap[xLabel][colorLabel]/countMap[xLabel][colorLabel],
                        "colorAttrValue" : colorLabel
                    })
                }
            }
        }

        return reshapedDataList;
    };

    visDataShaper.getDataForColoredScatterplotWithSum = function(dataList, metadataMap, xAttr, yAttr, colorAttr, itemAttr){
        let reshapedDataList = [];
        let sumMap = {};
        let countMap = {};

        let xLabelValues = metadataMap[xAttr]['domain'];
        let colorLabelValues = metadataMap[colorAttr]['domain'];
        for(var xLabel of xLabelValues){
            sumMap[xLabel] = {};
            countMap[xLabel] = {};
            for(var colorLabel of colorLabelValues){
                sumMap[xLabel][colorLabel] = 0.0;
                countMap[xLabel][colorLabel] = 0.0;
            }
        }

        for(var dataObj of dataList){
            let xLabel = dataObj[xAttr]
            let colorLabel = dataObj[colorAttr]
            let value = isNaN(dataObj[yAttr]) || dataObj[yAttr]=="" ? 0.0 : parseFloat(dataObj[yAttr]); // checking for missing and non-numeric values
            sumMap[xLabel][colorLabel] += value
            countMap[xLabel][colorLabel] += 1.0
        }

        //reshapedDataList.push({
        //    "xVal" : "",
        //    "yVal" : "",
        //    "colorAttrValue" : colorLabelValues[0]
        //})
        for(var xLabel in sumMap){
            for(var colorLabel in sumMap[xLabel]){
                if(countMap[xLabel][colorLabel]>0.0){
                    reshapedDataList.push({
                        "xVal" : xLabel,
                        "yVal" : sumMap[xLabel][colorLabel],
                        "colorAttrValue" : colorLabel
                    })
                }
            }
        }

        return reshapedDataList;
    };

    visDataShaper.getDataForColoredTickPlotWithSum = function(dataList, metadataMap, xAttr, yAttr, colorAttr, itemAttr){
        let reshapedDataList = [];
        let sumMap = {};
        let countMap = {};

        let xLabelValues = metadataMap[xAttr]['domain'];
        let colorLabelValues = metadataMap[colorAttr]['domain'];
        for(var xLabel of xLabelValues){
            sumMap[xLabel] = {};
            countMap[xLabel] = {};
            for(var colorLabel of colorLabelValues){
                sumMap[xLabel][colorLabel] = 0.0;
                countMap[xLabel][colorLabel] = 0.0;
            }
        }

        for(var dataObj of dataList){
            let xLabel = dataObj[xAttr]
            let colorLabel = dataObj[colorAttr]
            let value = isNaN(dataObj[yAttr]) || dataObj[yAttr]=="" ? 0.0 : parseFloat(dataObj[yAttr]); // checking for missing and non-numeric values
            if(xLabel!="" && colorLabel!="") {
                sumMap[xLabel][colorLabel] += value
                countMap[xLabel][colorLabel] += 1.0
            }
        }

        for(var xLabel in sumMap){
            for(var colorLabel in sumMap[xLabel]){
                if(countMap[xLabel][colorLabel]>0.0){
                    reshapedDataList.push({
                        "categoryLabel" : xLabel,
                        "value" : sumMap[xLabel][colorLabel],
                        "colorAttrValue" : colorLabel
                    })
                }
            }
        }

        return reshapedDataList;
    };

    visDataShaper.getDataForSizedScatterplot = function(dataList, metadataMap, xAttr, yAttr, sizeAttr, itemAttr){
        let reshapedDataList = [];
        for(var dataObject of dataList){
            let xVal;
            if(metadataMap[xAttr]['type'] == "quantitative"){
                xVal = isNaN(dataObject[xAttr]) || dataObject[xAttr]=="" ? 0.0 : parseFloat(dataObject[xAttr]); // checking for missing and non-numeric values
            }else{
                xVal = dataObject[xAttr]
            }
            let yVal = isNaN(dataObject[yAttr]) || dataObject[yAttr]=="" ? 0.0 : parseFloat(dataObject[yAttr]); // checking for missing and non-numeric values
            let item = dataObject[itemAttr];
            let sizeVal = isNaN(dataObject[sizeAttr]) || dataObject[sizeAttr]=="" ? 0.0 : parseFloat(dataObject[sizeAttr]); // checking for missing and non-numeric values
            reshapedDataList.push({
                "xVal" : xVal,
                "yVal" : yVal,
                "sizeAttrValue" : sizeVal,
                "itemLabel" : item
            });
        }

        return reshapedDataList;
    };

    visDataShaper.getDataForAggregatedScatterplotByAvg = function(dataList,metadataMap,xAttr,yAttr,sizeAttr){
        let reshapedDataList = [];
        let sumMap = {};
        let countMap = {};

        let xLabelValues = metadataMap[xAttr]['domain'];
        let yLabelValues = metadataMap[yAttr]['domain'];
        for(var xLabel of xLabelValues){
            sumMap[xLabel] = {};
            countMap[xLabel] = {};
            for(var yLabel of yLabelValues){
                sumMap[xLabel][yLabel] = 0.0;
                countMap[xLabel][yLabel] = 0.0;
            }
        }

        for(var dataObj of dataList){
            let xLabel = dataObj[xAttr]
            let yLabel = dataObj[yAttr]
            let value = isNaN(dataObj[sizeAttr]) || dataObj[sizeAttr]=="" ? 0.0 : parseFloat(dataObj[sizeAttr]); // checking for missing and non-numeric values
            //if(xLabel!="" && yLabel!=""){
                sumMap[xLabel][yLabel] += value;
                countMap[xLabel][yLabel] += 1.0;
            //}
        }

        reshapedDataList.push({
            "xLabel" : "",
            "yLabel" : "",
            "sizeAttrValue" : 0.0
        });
        for(var xLabel in sumMap){
            for(var yLabel in sumMap[xLabel]){
                if(countMap[xLabel][yLabel]>0.0){
                    reshapedDataList.push({
                        "xLabel" : xLabel,
                        "yLabel" : yLabel,
                        "sizeAttrValue" : sumMap[xLabel][yLabel]/countMap[xLabel][yLabel]
                    })
                } else{
                    reshapedDataList.push({
                        "xLabel" : xLabel,
                        "yLabel" : yLabel,
                        "sizeAttrValue" : 0.0
                    })
                }
            }
        }
        reshapedDataList.push({
            "xLabel" : " ",
            "yLabel" : " ",
            "sizeAttrValue" : 0.0
        });

        return  reshapedDataList;
    };

    visDataShaper.getDataForAggregatedScatterplotBySum = function(dataList,metadataMap,xAttr,yAttr,sizeAttr){
        let reshapedDataList = [];
        let sumMap = {};
        let countMap = {};

        let xLabelValues = metadataMap[xAttr]['domain'];
        let yLabelValues = metadataMap[yAttr]['domain'];
        for(var xLabel of xLabelValues){
            sumMap[xLabel] = {};
            countMap[xLabel] = {};
            for(var yLabel of yLabelValues){
                sumMap[xLabel][yLabel] = 0.0;
                countMap[xLabel][yLabel] = 0.0;
            }
        }

        for(var dataObj of dataList){
            let xLabel = dataObj[xAttr]
            let yLabel = dataObj[yAttr]
            let value = isNaN(dataObj[sizeAttr]) || dataObj[sizeAttr]=="" ? 0.0 : parseFloat(dataObj[sizeAttr]); // checking for missing and non-numeric values
            sumMap[xLabel][yLabel] += value
            countMap[xLabel][yLabel] += 1.0
        }

        reshapedDataList.push({
            "xLabel" : "",
            "yLabel" : "",
            "sizeAttrValue" : 0.0
        });
        for(var xLabel in sumMap){
            for(var yLabel in sumMap[xLabel]){
                if(countMap[xLabel][yLabel]>0.0){
                    reshapedDataList.push({
                        "xLabel" : xLabel,
                        "yLabel" : yLabel,
                        "sizeAttrValue" : sumMap[xLabel][yLabel]
                    })
                } else{
                    reshapedDataList.push({
                        "xLabel" : xLabel,
                        "yLabel" : yLabel,
                        "sizeAttrValue" : 0.0
                    })
                }
            }
        }
        reshapedDataList.push({
            "xLabel" : " ",
            "yLabel" : " ",
            "sizeAttrValue" : 0.0
        });

        return  reshapedDataList;
    };

    visDataShaper.getDataForAggregatedScatterplotByCount = function(dataList,metadataMap,xAttr,yAttr){
        let reshapedDataList = [];
        let countMap = {};

        let xLabelValues = metadataMap[xAttr]['domain'];
        let yLabelValues = metadataMap[yAttr]['domain'];
        for(var xLabel of xLabelValues){
            countMap[xLabel] = {};
            for(var yLabel of yLabelValues){
                countMap[xLabel][yLabel] = 0.0;
            }
        }

        for(var dataObj of dataList){
            let xLabel = dataObj[xAttr]
            let yLabel = dataObj[yAttr]
            countMap[xLabel][yLabel] += 1.0
        }

        reshapedDataList.push({
            "xLabel" : "",
            "yLabel" : "",
            "sizeAttrValue" : 0.0
        });
        for(var xLabel in countMap){
            for(var yLabel in countMap[xLabel]){
                if(countMap[xLabel][yLabel]>0.0){
                    reshapedDataList.push({
                        "xLabel" : xLabel,
                        "yLabel" : yLabel,
                        "sizeAttrValue" : countMap[xLabel][yLabel]
                    })
                } else{
                    reshapedDataList.push({
                        "xLabel" : xLabel,
                        "yLabel" : yLabel,
                        "sizeAttrValue" : 0.0
                    })
                }
            }
        }
        reshapedDataList.push({
            "xLabel" : " ",
            "yLabel" : " ",
            "sizeAttrValue" : 0.0
        });

        return  reshapedDataList;
    };

    visDataShaper.getDataForStackedBarChart = function(dataList, metadataMap, xAttr, colorAttr){
        let reshapedDataList = [];
        let countMap = {};

        let xLabelValues = metadataMap[xAttr]['domain'];
        let colorLabelValues = metadataMap[colorAttr]['domain'];
        for(var xLabel of xLabelValues){
            countMap[xLabel] = {};
            for(var colorLabel of colorLabelValues){
                countMap[xLabel][colorLabel] = 0.0;
            }
        }

        for(var dataObj of dataList){
            let xLabel = dataObj[xAttr]
            let colorLabel = dataObj[colorAttr]
            countMap[xLabel][colorLabel] += 1.0
        }

        let reshapedData = {
            "dataList" : [],
            "keys" : colorLabelValues
        }
        for(var xLabel in countMap){
            let dataListObject = {
                "xLabel" : xLabel,
                "totalOfKeys" : 0.0
            };
            for(var colorLabel in countMap[xLabel]){
                dataListObject["totalOfKeys"] += countMap[xLabel][colorLabel];
                dataListObject[colorLabel] = countMap[xLabel][colorLabel];
            }
            reshapedData.dataList.push(dataListObject);
        }

        return reshapedData;
    };

    visDataShaper.getDataForSingleAxisBoxPlot = function(dataList,metadataMap,yAttribute,itemAttribute){
        let reshapedData = {};

        let boxPlotData = [[yAttribute,[]]], boxPlotDataWithItemLabels=[[yAttribute,[]]];
        let dataMap = {};

        let min = Infinity, max = -Infinity;
        for(var dataObj of dataList){
            // if(!isNaN(+dataList[i][yAttribute])){
                if(+dataObj[yAttribute]<min){
                    min = +dataObj[yAttribute];
                }
                if(+dataObj[yAttribute]>max){
                    max = +dataObj[yAttribute];
                }
                boxPlotData[0][1].push(+dataObj[yAttribute]);
                boxPlotDataWithItemLabels[0][1].push({'value':+dataObj[yAttribute],'itemLabel':dataObj[itemAttribute]});
            // }
        }

        utils.sortObj(boxPlotDataWithItemLabels[0][1],"value");

        reshapedData = {
            "dataList" : boxPlotData,
            "dataListWithItemLabels" : boxPlotDataWithItemLabels,
            "min" : min,
            "max" : max
        };

        return reshapedData;
    };

    visDataShaper.getDataForHistogram = function(dataList,metadataMap,yAttribute){
        let reshapedData = [];
        for(var dataObj of dataList){
            reshapedData.push(+dataObj[yAttribute]);
        }
        return reshapedData;
    }

})();