__author__ = 'arjun010'
from visObject import *
from chartDataFormatter import *
from dataFactGenerator import *
from itertools import combinations, permutations

def getPossibleVisualizations(attributeList, dataList, metadataMap):
    possibleVisualizations = []
    possibleDataFacts = []

    itemAttribute = None # itemAttribute is used in charts like scatterplot and tick plot to enable referring to individual data items
    for attribute in metadataMap:
        if 'isItemAttr' in metadataMap[attribute]:
            if metadataMap[attribute]['isItemAttr'] == "y":
                itemAttribute = attribute
                break

    if len(attributeList) == 1:
        attribute = attributeList[0]
        if metadataMap[attribute]['type']=="quantitative":
            singleAxisTickPlot = getSingleAxisTickPlot(attribute, itemAttribute, dataList)
            possibleVisualizations.append(singleAxisTickPlot)

            formattedData = getDataForSingleAxisTickPlot(dataList,attribute,itemAttribute)
            tickPlotDataFacts = getDataFacts_TickPlot_Q(attribute,formattedData)
            for dataFact in tickPlotDataFacts:
                dataFact['relatedVisObjects'].append(singleAxisTickPlot)
                possibleDataFacts.append(dataFact)

            singleAxisBoxPlot = getSingleAxisBoxPlot(attribute)
            possibleVisualizations.append(singleAxisBoxPlot)

            singleAxisHistogram = getHistogram(attribute)
            possibleVisualizations.append(singleAxisHistogram)

            commonDataFactsForTickAndBoxPlot = getCommonDataFactsForTickPlotAndBoxPlotAndHistogram_Q(attribute, formattedData)
            for dataFact in commonDataFactsForTickAndBoxPlot:
                dataFact['relatedVisObjects'].append(singleAxisTickPlot)
                dataFact['relatedVisObjects'].append(singleAxisBoxPlot)
                if dataFact['type']=="RangeDistributionFact":
                    dataFact['relatedVisObjects'].append(singleAxisHistogram)

                possibleDataFacts.append(dataFact)

        elif metadataMap[attribute]['type'] == "ordinal" or metadataMap[attribute]['type'] == "nominal":
            barChartWithCount = getBarChartWithCount(attribute, dataList)
            possibleVisualizations.append(barChartWithCount)

            donutChartWithCount = getDonutChartWithCount(attribute, dataList)
            possibleVisualizations.append(donutChartWithCount)

            formattedData = getDataForBarChartWithCount(dataList,attribute)
            commonDataFactsForBarAndDonutChartsWithCount = getCommonFacts_BarAndDonutChartWithCount_N(attribute,formattedData)
            for dataFact in commonDataFactsForBarAndDonutChartsWithCount:
                dataFact['relatedVisObjects'].append(barChartWithCount)
                dataFact['relatedVisObjects'].append(donutChartWithCount)
                possibleDataFacts.append(dataFact)

    elif len(attributeList) == 2:
        attribute1 = attributeList[0]
        attribute2 = attributeList[1]
        attributeTypeList = [metadataMap[attribute1]['type'],metadataMap[attribute2]['type']]

        if attributeTypeList.count("quantitative")==1 and (attributeTypeList.count("nominal")==1 or attributeTypeList.count("ordinal")==1): # N/O x Q
            if metadataMap[attribute1]['type']=="quantitative":
                yAttr = attribute1
                xAttr = attribute2
            else:
                xAttr = attribute1
                yAttr = attribute2

            #====================
            # generating two axis tick plot and dot plot
            #====================
            twoAxisTickPlot = getTwoAxisTickPlot(xAttr, yAttr, itemAttribute, dataList)
            possibleVisualizations.append(twoAxisTickPlot)

            scatterplot = getScatterplot(xAttr, yAttr, itemAttribute, dataList,metadataMap)
            possibleVisualizations.append(scatterplot)

            formattedData = getDataForTwoAxisTickPlot(dataList,xAttr,yAttr,itemAttribute)
            commonFactsForTickAndDotPlots = getCommonFacts_TickAndDotPlot_NxQ(xAttr,yAttr,None,formattedData)
            for dataFact in commonFactsForTickAndDotPlots:
                dataFact['relatedVisObjects'].append(twoAxisTickPlot)
                dataFact['relatedVisObjects'].append(scatterplot)
                possibleDataFacts.append(dataFact)

            #====================
            # generating AVG based bar and donut charts
            #====================
            barChartWithAvg = getBarChartWithAvg(xAttr, yAttr, dataList)
            possibleVisualizations.append(barChartWithAvg)

            donutChartWithAvg = getDonutChartWithAvg(xAttr, yAttr, dataList)
            possibleVisualizations.append(donutChartWithAvg)

            formattedData = getDataForBarChartWithAvg(dataList,xAttr,yAttr)

            commonDataFactsForBarAndDonutChartsWithAvg = getCommonFacts_BarAndDonutChartWithAvg_NxQ(xAttr, yAttr, "AVG", formattedData)
            for dataFact in commonDataFactsForBarAndDonutChartsWithAvg:
                dataFact['relatedVisObjects'].append(barChartWithAvg)
                dataFact['relatedVisObjects'].append(donutChartWithAvg)
                possibleDataFacts.append(dataFact)

            #====================
            # generating SUM based bar and donut charts
            #====================
            barChartWithSum = getBarChartWithSum(xAttr, yAttr, dataList)
            possibleVisualizations.append(barChartWithSum)

            donutChartWithSum = getDonutChartWithSum(xAttr, yAttr, dataList)
            possibleVisualizations.append(donutChartWithSum)

            formattedData = getDataForBarChartWithSum(dataList,xAttr,yAttr)
            commonDataFactsForBarAndDonutChartsWithSum = getCommonFacts_BarAndDonutChartWithSum_NxQ(xAttr, yAttr, "SUM", formattedData)
            for dataFact in commonDataFactsForBarAndDonutChartsWithSum:
                dataFact['relatedVisObjects'].append(barChartWithSum)
                dataFact['relatedVisObjects'].append(donutChartWithSum)
                possibleDataFacts.append(dataFact)

        elif attributeTypeList.count("quantitative")==2: # Q x Q
            # 2 permutations
            scatterplot1 = getScatterplot(attribute1,attribute2,itemAttribute,dataList,metadataMap)
            possibleVisualizations.append(scatterplot1)

            scatterplot2 = getScatterplot(attribute2,attribute1,itemAttribute,dataList,metadataMap)
            possibleVisualizations.append(scatterplot2)

            formattedData = getDataForScatterplot(dataList,metadataMap,attribute1,attribute2,itemAttribute)
            scatterplotDataFacts = getDataFacts_Scatterplot_QxQ(attribute1,attribute2,formattedData,metadataMap)
            for dataFact in scatterplotDataFacts:
                dataFact['relatedVisObjects'].append(scatterplot1)
                dataFact['relatedVisObjects'].append(scatterplot2)
                possibleDataFacts.append(dataFact)

        elif attributeTypeList.count("quantitative")==0: # N/O x N/O
            # aggregated scatterplot with count (2 permutations)
            aggregatedScatterplotWithCount1 = getAggregatedScatterplotWithCount(attribute1,attribute2,dataList)
            possibleVisualizations.append(aggregatedScatterplotWithCount1)

            aggregatedScatterplotWithCount2 = getAggregatedScatterplotWithCount(attribute2,attribute1,dataList)
            possibleVisualizations.append(aggregatedScatterplotWithCount2)

            # stacked bar chart (2 permutations)
            stackedBarChart1 = getStackedBarChart(attribute1,attribute2,dataList)
            possibleVisualizations.append(stackedBarChart1)

            stackedBarChart2 = getStackedBarChart(attribute2,attribute1,dataList)
            possibleVisualizations.append(stackedBarChart2)

            # grouped bar chart (maybe)

            formattedData1 = getDataForAggregatedScatterplotByCount(dataList,metadataMap,attribute1,attribute2)
            commonDataFactsForStackedBarAndAggregatedDotPlotWithCount = getCommonDataFacts_StackedBarAndAggregatedDotPlotWithCount_NxN(attribute1,attribute2,formattedData1)
            for dataFact in commonDataFactsForStackedBarAndAggregatedDotPlotWithCount:
                dataFact['relatedVisObjects'].append(aggregatedScatterplotWithCount1)
                dataFact['relatedVisObjects'].append(aggregatedScatterplotWithCount2)
                dataFact['relatedVisObjects'].append(stackedBarChart1)
                dataFact['relatedVisObjects'].append(stackedBarChart2)
                possibleDataFacts.append(dataFact)

            dataFactsForStackedBarChartWithCount = getStackedBarCharDataFacts_NxN(attribute1,attribute2,formattedData1)
            for dataFact in dataFactsForStackedBarChartWithCount:
                dataFact['relatedVisObjects'].append(aggregatedScatterplotWithCount1)
                dataFact['relatedVisObjects'].append(aggregatedScatterplotWithCount2)
                dataFact['relatedVisObjects'].append(stackedBarChart1)
                dataFact['relatedVisObjects'].append(stackedBarChart2)
                possibleDataFacts.append(dataFact)

            # formattedData2 = getDataForAggregatedScatterplotByCount(dataList,metadataMap,attribute2,attribute1)
            # commonDataFactsForStackedBarAndAggregatedDotPlotWithCount = getCommonDataFacts_StackedBarAndAggregatedDotPlotWithCount_NxN(attribute2,attribute1,formattedData2)
            # for dataFact in commonDataFactsForStackedBarAndAggregatedDotPlotWithCount:
            #     dataFact['relatedVisObjects'].append(aggregatedScatterplotWithCount2)
            #     dataFact['relatedVisObjects'].append(stackedBarChart2)
            #     possibleDataFacts.append(dataFact)

            # dataFactsForStackedBarChartWithCount = getStackedBarCharDataFacts_NxN(attribute2,attribute1,formattedData2)
            # for dataFact in dataFactsForStackedBarChartWithCount:
            #     dataFact['relatedVisObjects'].append(stackedBarChart2)
            #     possibleDataFacts.append(dataFact)

    elif len(attributeList) == 3:
        attribute1 = attributeList[0]
        attribute2 = attributeList[1]
        attribute3 = attributeList[2]
        attributeTypeList = [metadataMap[attribute1]['type'],metadataMap[attribute2]['type'],metadataMap[attribute3]['type']]

        if attributeTypeList.count("quantitative")==0: # 3 N/O
            pass
        elif attributeTypeList.count("quantitative")==1: # 1 Q x 2 N/O
            if metadataMap[attribute1]['type']=="quantitative":
                quantitativeAttr = attribute1
                if len(metadataMap[attribute2]['domain']) <= len(metadataMap[attribute3]['domain']):
                    smallerNOAttr = attribute2
                    largerNOAttr = attribute3
                else:
                    smallerNOAttr = attribute3
                    largerNOAttr = attribute2
            elif metadataMap[attribute2]['type']=="quantitative":
                quantitativeAttr = attribute2
                if len(metadataMap[attribute1]['domain']) <= len(metadataMap[attribute3]['domain']):
                    smallerNOAttr = attribute1
                    largerNOAttr = attribute3
                else:
                    smallerNOAttr = attribute3
                    largerNOAttr = attribute1
            elif metadataMap[attribute3]['type']=="quantitative":
                quantitativeAttr = attribute3
                if len(metadataMap[attribute1]['domain']) <= len(metadataMap[attribute2]['domain']):
                    smallerNOAttr = attribute1
                    largerNOAttr = attribute2
                else:
                    smallerNOAttr = attribute2
                    largerNOAttr = attribute1

            # N/O x Q x N/O (2 coloring variations possible for each chart)
            coloredTickPlot1 = getColoredTickPlot(largerNOAttr, quantitativeAttr, smallerNOAttr, itemAttribute, dataList)
            possibleVisualizations.append(coloredTickPlot1)

            coloredTickPlot2 = getColoredTickPlot(smallerNOAttr, quantitativeAttr, largerNOAttr, itemAttribute, dataList)
            possibleVisualizations.append(coloredTickPlot2)

            coloredScatterplot1 = getColoredScatterplot(smallerNOAttr, quantitativeAttr, largerNOAttr, itemAttribute, dataList,metadataMap)
            possibleVisualizations.append(coloredScatterplot1)

            coloredScatterplot2 = getColoredScatterplot(largerNOAttr, quantitativeAttr, smallerNOAttr, itemAttribute, dataList,metadataMap)
            possibleVisualizations.append(coloredScatterplot2)

            formattedData = getDataForColoredScatterplot(dataList,metadataMap,largerNOAttr,quantitativeAttr,smallerNOAttr,itemAttribute)
            commonDataFactsForColoredTickPlotAndScatterplot = getCommonDataFacts_ColoredTickPlotAndScatterplot_NxQxN(largerNOAttr,quantitativeAttr,smallerNOAttr,formattedData,metadataMap,itemAttribute)

            for dataFact in commonDataFactsForColoredTickPlotAndScatterplot:
                dataFact['relatedVisObjects'].append(coloredTickPlot1)
                dataFact['relatedVisObjects'].append(coloredTickPlot2)
                dataFact['relatedVisObjects'].append(coloredScatterplot1)
                dataFact['relatedVisObjects'].append(coloredScatterplot2)
                possibleDataFacts.append(dataFact)

            #========================
            coloredScatterplotByAvg1 = getColoredScatterplotByAvg(smallerNOAttr, quantitativeAttr, largerNOAttr, itemAttribute, dataList,metadataMap)
            possibleVisualizations.append(coloredScatterplotByAvg1)

            coloredScatterplotByAvg2 = getColoredScatterplotByAvg(largerNOAttr, quantitativeAttr, smallerNOAttr, itemAttribute, dataList,metadataMap)
            possibleVisualizations.append(coloredScatterplotByAvg2)

            coloredTickPlotByAvg1 = getColoredTickPlotByAvg(smallerNOAttr, quantitativeAttr, largerNOAttr, itemAttribute, dataList,metadataMap)
            possibleVisualizations.append(coloredTickPlotByAvg1)

            coloredTickPlotByAvg2 = getColoredTickPlotByAvg(largerNOAttr, quantitativeAttr, smallerNOAttr, itemAttribute, dataList,metadataMap)
            possibleVisualizations.append(coloredTickPlotByAvg2)


            # N/O x N/O x Q (2 variations for AVG and SUM)
            aggregatedAvgScatterplot1 = getAggregatedScatterplotByAvg(smallerNOAttr, largerNOAttr, quantitativeAttr, dataList,metadataMap)
            possibleVisualizations.append(aggregatedAvgScatterplot1)

            aggregatedAvgScatterplot2 = getAggregatedScatterplotByAvg(largerNOAttr, smallerNOAttr, quantitativeAttr, dataList,metadataMap)
            possibleVisualizations.append(aggregatedAvgScatterplot2)

            formattedData = getDataForAggregatedScatterplotByAvg(dataList,metadataMap,smallerNOAttr,largerNOAttr,quantitativeAttr)
            dataFactsForAggregatedScatterplotByAvg = getDataFactsForAggregatedScatterplotByAvg_NxNxQ(smallerNOAttr, largerNOAttr, quantitativeAttr, formattedData)
            for dataFact in dataFactsForAggregatedScatterplotByAvg:
                dataFact['relatedVisObjects'].append(aggregatedAvgScatterplot1)
                dataFact['relatedVisObjects'].append(aggregatedAvgScatterplot2)
                dataFact['relatedVisObjects'].append(coloredScatterplotByAvg1)
                dataFact['relatedVisObjects'].append(coloredScatterplotByAvg2)
                dataFact['relatedVisObjects'].append(coloredTickPlotByAvg1)
                dataFact['relatedVisObjects'].append(coloredTickPlotByAvg2)                
                possibleDataFacts.append(dataFact)

            coloredScatterplotBySum1 = getColoredScatterplotBySum(smallerNOAttr, quantitativeAttr, largerNOAttr, itemAttribute, dataList,metadataMap)
            possibleVisualizations.append(coloredScatterplotBySum1)

            coloredScatterplotBySum2 = getColoredScatterplotBySum(largerNOAttr, quantitativeAttr, smallerNOAttr, itemAttribute, dataList,metadataMap)
            possibleVisualizations.append(coloredScatterplotBySum2)

            coloredTickPlotBySum1 = getColoredTickPlotBySum(smallerNOAttr, quantitativeAttr, largerNOAttr, itemAttribute, dataList,metadataMap)
            possibleVisualizations.append(coloredTickPlotBySum1)

            coloredTickPlotBySum2 = getColoredTickPlotBySum(largerNOAttr, quantitativeAttr, smallerNOAttr, itemAttribute, dataList,metadataMap)
            possibleVisualizations.append(coloredTickPlotBySum2)

            aggregatedSumScatterplot1 = getAggregatedScatterplotBySum(smallerNOAttr, largerNOAttr, quantitativeAttr, dataList,metadataMap)
            possibleVisualizations.append(aggregatedSumScatterplot1)

            aggregatedSumScatterplot2 = getAggregatedScatterplotBySum(largerNOAttr, smallerNOAttr, quantitativeAttr, dataList,metadataMap)
            possibleVisualizations.append(aggregatedSumScatterplot2)

            formattedData = getDataForAggregatedScatterplotBySum(dataList,metadataMap,smallerNOAttr,largerNOAttr,quantitativeAttr)
            dataFactsForAggregatedScatterplotBySum = getDataFactsForAggregatedScatterplotBySum_NxNxQ(smallerNOAttr, largerNOAttr, quantitativeAttr, formattedData)
            
            for dataFact in dataFactsForAggregatedScatterplotBySum:
                dataFact['relatedVisObjects'].append(aggregatedSumScatterplot1)
                dataFact['relatedVisObjects'].append(aggregatedSumScatterplot2)
                dataFact['relatedVisObjects'].append(coloredScatterplotBySum1)
                dataFact['relatedVisObjects'].append(coloredScatterplotBySum2)
                dataFact['relatedVisObjects'].append(coloredTickPlotBySum1)
                dataFact['relatedVisObjects'].append(coloredTickPlotBySum2)
                possibleDataFacts.append(dataFact)

        elif attributeTypeList.count("quantitative")==2: # 2 Q x 1 N/O
            if metadataMap[attribute1]['type']=="ordinal" or metadataMap[attribute1]['type']=="nominal":
                nonQAttribute = attribute1
                quantitativeAttr1 = attribute2
                quantitativeAttr2 = attribute3
            elif metadataMap[attribute2]['type']=="ordinal" or metadataMap[attribute2]['type']=="nominal":
                nonQAttribute = attribute2
                quantitativeAttr1 = attribute1
                quantitativeAttr2 = attribute3
            elif metadataMap[attribute3]['type']=="ordinal" or metadataMap[attribute3]['type']=="nominal":
                nonQAttribute = attribute3
                quantitativeAttr1 = attribute1
                quantitativeAttr2 = attribute2

            # 2 axis variations possible for scatterplot of QxQ +color
            coloredScatterplot1 = getColoredScatterplot(quantitativeAttr1,quantitativeAttr2,nonQAttribute,itemAttribute,dataList,metadataMap)
            possibleVisualizations.append(coloredScatterplot1)

            coloredScatterplot2 = getColoredScatterplot(quantitativeAttr2,quantitativeAttr1,nonQAttribute,itemAttribute,dataList,metadataMap)
            possibleVisualizations.append(coloredScatterplot2)

            formattedData = getDataForColoredScatterplot(dataList,metadataMap,quantitativeAttr1,quantitativeAttr2,nonQAttribute,itemAttribute)
            dataFactsForColoredScatterplots = getDataFactsForColoredScatterplot_QxQxN(quantitativeAttr1,quantitativeAttr2,nonQAttribute,formattedData,metadataMap)

            for dataFact in dataFactsForColoredScatterplots:
                dataFact['relatedVisObjects'].append(coloredScatterplot1)
                dataFact['relatedVisObjects'].append(coloredScatterplot2)
                possibleDataFacts.append(dataFact)

            # 2 sizing variations possible for scatterplot of N/O x Q +size
            sizedScatterplot1 = getSizedScatterplot(nonQAttribute, quantitativeAttr1, quantitativeAttr2, itemAttribute, dataList,metadataMap)
            possibleVisualizations.append(sizedScatterplot1)

            sizedScatterplot2 = getSizedScatterplot(nonQAttribute, quantitativeAttr2, quantitativeAttr1, itemAttribute, dataList,metadataMap)
            possibleVisualizations.append(sizedScatterplot2)

            formattedData = getDataForColoredScatterplot(dataList,metadataMap,quantitativeAttr1,quantitativeAttr2,nonQAttribute,itemAttribute)
            commonDataFactsForColoredAndSizedScatterplot = getCommonDataFactsForColoredAndSizedScatterplot_QxQxN(quantitativeAttr1,quantitativeAttr2,nonQAttribute,formattedData,metadataMap)

            for dataFact in commonDataFactsForColoredAndSizedScatterplot:
                dataFact['relatedVisObjects'].append(coloredScatterplot1)
                dataFact['relatedVisObjects'].append(coloredScatterplot2)
                dataFact['relatedVisObjects'].append(sizedScatterplot1)
                dataFact['relatedVisObjects'].append(sizedScatterplot2)
                possibleDataFacts.append(dataFact)

        elif attributeTypeList.count("quantitative")==3: # 3 Q
            # 6 permutations
            for attributePermutation in permutations(attributeList,3):
                attributePermutation = list(attributePermutation)
                sizedScatterplot = getSizedScatterplot(attributePermutation[0],attributePermutation[1],attributePermutation[2],itemAttribute,dataList,metadataMap)
                possibleVisualizations.append(sizedScatterplot)

                formattedData = getDataForSizedScatterplot(dataList, metadataMap, attributePermutation[0],attributePermutation[1],attributePermutation[2],itemAttribute)
                dataFactsForSizedScatterplot = getDataFactsForSizedScatterplot_QxQxQ(attributePermutation[0],attributePermutation[1],attributePermutation[2],formattedData,metadataMap)
                for dataFact in dataFactsForSizedScatterplot:
                    dataFact['relatedVisObjects'].append(sizedScatterplot)
                    possibleDataFacts.append(dataFact)

    return possibleVisualizations, possibleDataFacts

def getSingleAxisTickPlot(yAttr, itemAttr, dataList):
    visObject = getEmptyVisObject()
    visObject['type'] = "SingleAxisTickPlot"
    visObject['mark'] = "tick"
    visObject['y']['attribute'] = yAttr
    # visObject['shapedData'] = getDataForSingleAxisTickPlot(dataList, yAttr, itemAttr)
    return visObject

def getSingleAxisBoxPlot(yAttr):
    visObject = getEmptyVisObject()
    visObject['type'] = "SingleAxisBoxPlot"
    visObject['mark'] = "box"
    visObject['y']['attribute'] = yAttr
    # visObject['shapedData'] = getDataForSingleAxisTickPlot(dataList, yAttr, itemAttr)
    return visObject

def getHistogram(yAttr):
    visObject = getEmptyVisObject()
    visObject['type'] = "Histogram"
    visObject['mark'] = "bar"
    visObject['y']['attribute'] = yAttr
    visObject['y']['transform'] = "BIN"
    # visObject['shapedData'] = getDataForSingleAxisTickPlot(dataList, yAttr, itemAttr)
    return visObject

def getBarChartWithCount(attribute, dataList):
    visObject = getEmptyVisObject()
    visObject['type'] = "BarWithCount"
    visObject['mark'] = "bar"
    visObject['x']['attribute'] = attribute
    visObject['y']['transform'] = "COUNT"
    # visObject['shapedData'] = getDataForBarChartWithCount(dataList, attribute)
    return visObject

def getDonutChartWithCount(attribute, dataList):
    visObject = getEmptyVisObject()
    visObject['type'] = "DonutWithCount"
    visObject['mark'] = "arc"
    visObject['x']['attribute'] = attribute
    visObject['y']['transform'] = "COUNT"
    visObject['color']['attribute'] = attribute
    # visObject['shapedData'] = getDataForBarChartWithCount(dataList, attribute) # same data format as bar chart
    return visObject

def getTwoAxisTickPlot(xAttr, yAttr, itemAttr, dataList):
    visObject = getEmptyVisObject()
    visObject['type'] = "TwoAxisTickPlot"
    visObject['mark'] = "tick"
    visObject['x']['attribute'] = xAttr
    visObject['y']['attribute'] = yAttr
    # visObject['shapedData'] = getDataForTwoAxisTickPlot(dataList, xAttr, yAttr, itemAttr)
    return visObject

def getBarChartWithAvg(xAttr, yAttr, dataList):
    visObject = getEmptyVisObject()
    visObject['type'] = "BarWithAvg"
    visObject['mark'] = "bar"
    visObject['x']['attribute'] = xAttr
    visObject['y']['attribute'] = yAttr
    visObject['y']['transform'] = "AVG"
    # visObject['shapedData'] = getDataForBarChartWithAvg(dataList, xAttr, yAttr)
    return visObject

def getBarChartWithSum(xAttr, yAttr, dataList):
    visObject = getEmptyVisObject()
    visObject['type'] = "BarWithSum"
    visObject['mark'] = "bar"
    visObject['x']['attribute'] = xAttr
    visObject['y']['attribute'] = yAttr
    visObject['y']['transform'] = "SUM"
    # visObject['shapedData'] = getDataForBarChartWithSum(dataList, xAttr, yAttr)
    return visObject

def getDonutChartWithAvg(xAttr, yAttr, dataList):
    visObject = getEmptyVisObject()
    visObject['type'] = "DonutWithAvg"
    visObject['mark'] = "arc"
    visObject['x']['attribute'] = xAttr
    visObject['y']['attribute'] = yAttr
    visObject['y']['transform'] = "AVG"
    visObject['color']['attribute'] = xAttr
    # visObject['shapedData'] = getDataForBarChartWithAvg(dataList, xAttr, yAttr) # same data format as bar chart
    return visObject

def getDonutChartWithSum(xAttr, yAttr, dataList):
    visObject = getEmptyVisObject()
    visObject['type'] = "DonutWithSum"
    visObject['mark'] = "arc"
    visObject['x']['attribute'] = xAttr
    visObject['y']['attribute'] = yAttr
    visObject['y']['transform'] = "SUM"
    visObject['color']['attribute'] = xAttr
    # visObject['shapedData'] = getDataForBarChartWithSum(dataList, xAttr, yAttr) # same data format as bar chart
    return visObject

def getScatterplot(xAttr, yAttr, itemAttr, dataList, metadataMap):
    visObject = getEmptyVisObject()
    visObject['type'] = "Scatterplot"
    visObject['mark'] = "point"
    visObject['x']['attribute'] = xAttr
    visObject['y']['attribute'] = yAttr
    # visObject['shapedData'] = getDataForScatterplot(dataList, metadataMap, xAttr,yAttr,itemAttr)
    return  visObject

def getColoredTickPlot(xAttr, yAttr, colorAttr, itemAttr, dataList):
    visObject = getEmptyVisObject()
    visObject['type'] = "TickPlotWithColor"
    visObject['mark'] = "tick"
    visObject['x']['attribute'] = xAttr
    visObject['y']['attribute'] = yAttr
    visObject['color']['attribute'] = colorAttr
    # visObject['shapedData'] = getDataForColoredTickPlot(dataList,xAttr,yAttr,colorAttr,itemAttr)
    return  visObject

def getColoredScatterplot(xAttr, yAttr, colorAttr, itemAttr, dataList, metadataMap):
    visObject = getEmptyVisObject()
    visObject['type'] = "ScatterplotWithColor"
    visObject['mark'] = "point"
    visObject['x']['attribute'] = xAttr
    visObject['y']['attribute'] = yAttr
    visObject['color']['attribute'] = colorAttr
    # visObject['shapedData'] = getDataForColoredScatterplot(dataList, metadataMap,xAttr,yAttr,colorAttr,itemAttr)
    return  visObject

def getColoredScatterplotByAvg(xAttr, yAttr, colorAttr, itemAttr, dataList, metadataMap):
    visObject = getEmptyVisObject()
    visObject['type'] = "ScatterplotWithColorByAvg"
    visObject['mark'] = "point"
    visObject['x']['attribute'] = xAttr
    visObject['y']['attribute'] = yAttr
    visObject['y']['transform'] = "AVG"
    visObject['color']['attribute'] = colorAttr
    return visObject

def getColoredTickPlotByAvg(xAttr, yAttr, colorAttr, itemAttr, dataList, metadataMap):
    visObject = getEmptyVisObject()
    visObject['type'] = "TickPlotWithColorByAvg"
    visObject['mark'] = "tick"
    visObject['x']['attribute'] = xAttr
    visObject['y']['attribute'] = yAttr
    visObject['y']['transform'] = "AVG"
    visObject['color']['attribute'] = colorAttr
    return visObject

def getColoredScatterplotBySum(xAttr, yAttr, colorAttr, itemAttr, dataList, metadataMap):
    visObject = getEmptyVisObject()
    visObject['type'] = "ScatterplotWithColorBySum"
    visObject['mark'] = "point"
    visObject['x']['attribute'] = xAttr
    visObject['y']['attribute'] = yAttr
    visObject['y']['transform'] = "SUM"
    visObject['color']['attribute'] = colorAttr
    return visObject

def getColoredTickPlotBySum(xAttr, yAttr, colorAttr, itemAttr, dataList, metadataMap):
    visObject = getEmptyVisObject()
    visObject['type'] = "TickPlotWithColorBySum"
    visObject['mark'] = "point"
    visObject['x']['attribute'] = xAttr
    visObject['y']['attribute'] = yAttr
    visObject['y']['transform'] = "SUM"
    visObject['color']['attribute'] = colorAttr
    return visObject

def getAggregatedScatterplotByAvg(xAttr, yAttr, sizeAttr, dataList, metadataMap):
    visObject = getEmptyVisObject()
    visObject['type'] = "AggregatedScatterplotWithAvgSize"
    visObject['mark'] = "point"
    visObject['x']['attribute'] = xAttr
    visObject['y']['attribute'] = yAttr
    visObject['size']['attribute'] = sizeAttr
    visObject['size']['transform'] = "AVG"
    # visObject['shapedData'] = getDataForAggregatedScatterplotByAvg(dataList, metadataMap, xAttr,yAttr,sizeAttr)
    return  visObject

def getAggregatedScatterplotBySum(xAttr, yAttr, sizeAttr, dataList, metadataMap):
    visObject = getEmptyVisObject()
    visObject['type'] = "AggregatedScatterplotWithSumSize"
    visObject['mark'] = "point"
    visObject['x']['attribute'] = xAttr
    visObject['y']['attribute'] = yAttr
    visObject['size']['attribute'] = sizeAttr
    visObject['size']['transform'] = "SUM"
    # visObject['shapedData'] = getDataForAggregatedScatterplotBySum(dataList, metadataMap, xAttr,yAttr,sizeAttr)
    return  visObject

def getAggregatedScatterplotWithCount(xAttr, yAttr, dataList):
    visObject = getEmptyVisObject()
    visObject['type'] = "AggregatedScatterplotWithCountSize"
    visObject['mark'] = "point"
    visObject['x']['attribute'] = xAttr
    visObject['y']['attribute'] = yAttr
    visObject['size']['transform'] = "COUNT"
    # visObject['shapedData'] = getDataForAggregatedScatterplotByCount(dataList,metadataMap,xAttr,yAttr)
    return  visObject

def getSizedScatterplot(xAttr, yAttr, sizeAttr, itemAttr, dataList, metadataMap):
    visObject = getEmptyVisObject()
    visObject['type'] = "ScatterplotWithSize"
    visObject['mark'] = "point"
    visObject['x']['attribute'] = xAttr
    visObject['y']['attribute'] = yAttr
    visObject['size']['attribute'] = sizeAttr
    # visObject['shapedData'] = getDataForSizedScatterplot(dataList, metadataMap, xAttr,yAttr,sizeAttr,itemAttr)
    return  visObject

def getStackedBarChart(xAttr,colorAttr,dataList):
    visObject = getEmptyVisObject()
    visObject['type'] = "StackedBarChart"
    visObject['mark'] = "bar"
    visObject['x']['attribute'] = xAttr
    visObject['y']['transform'] = "COUNT"
    visObject['color']['attribute'] = colorAttr
    # visObject['shapedData'] = getDataForStackedBarChart(dataList,xAttr,colorAttr)
    return  visObject

if __name__ == '__main__':
    pass