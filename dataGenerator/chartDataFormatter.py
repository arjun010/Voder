__author__ = 'arjun010'

def getDataForBarChartWithCount(dataList, attribute):
    labelCountMap = {}
    for dataObject in dataList:
        label = dataObject[attribute]
        if label not in labelCountMap:
            labelCountMap[label] = 1.0
        else:
            labelCountMap[label] += 1.0

    labelCountList = []
    for label in labelCountMap:
        labelCountList.append({
            "categoryLabel" : label,
            "value" : labelCountMap[label]
        })

    return labelCountList

def getDataForBarChartWithSum(dataList, labelAttribute, valueAttribute):
    labelSumMap = {}
    for dataObject in dataList:
        label = dataObject[labelAttribute]
        value = dataObject[valueAttribute]
        if label not in labelSumMap:
            labelSumMap[label] = float(value)
        else:
            labelSumMap[label] += float(value)

    labelSumList = []
    for label in labelSumMap:
        labelSumList.append({
            "categoryLabel" : label,
            "value" : labelSumMap[label]
        })

    return labelSumList

def getDataForBarChartWithAvg(dataList, labelAttribute, valueAttribute):
    labelSumMap = {}
    labelCountMap = {}
    for dataObject in dataList:
        label = dataObject[labelAttribute]
        value = dataObject[valueAttribute]
        if label not in labelSumMap:
            labelSumMap[label] = float(value)
            labelCountMap[label] = 1.0
        else:
            labelSumMap[label] += float(value)
            labelCountMap[label] += 1.0

    labelAvgList = []
    for label in labelSumMap:
        labelAvgList.append({
            "categoryLabel" : label,
            "value" : labelSumMap[label]/labelCountMap[label]
        })

    return labelAvgList

def getDataForSingleAxisTickPlot(dataList, yAttr, itemAttr):
    reshapedDataList = []
    for dataObj in dataList:
        label = ""
        value = dataObj[yAttr]
        item = dataObj[itemAttr]
        reshapedDataList.append({
            "categoryLabel" : label,
            "value" : float(value),
            "itemLabel" : item
        })

    return reshapedDataList

def getDataForTwoAxisTickPlot(dataList, xAttr, yAttr, itemAttr):
    reshapedDataList = []
    for dataObj in dataList:
        label = dataObj[xAttr]
        value = dataObj[yAttr]
        item = dataObj[itemAttr]
        reshapedDataList.append({
            "categoryLabel" : label,
            "value" : float(value),
            "itemLabel" : item
        })

    return reshapedDataList

def getDataForColoredTickPlot(dataList, xAttr, yAttr, colorAttr, itemAttr):
    reshapedDataList = []
    for dataObj in dataList:
        label = dataObj[xAttr]
        value = dataObj[yAttr]
        colorAttrValue = dataObj[colorAttr]
        item = dataObj[itemAttr]
        reshapedDataList.append({
            "categoryLabel" : label,
            "value" : float(value),
            "colorAttrValue" : colorAttrValue,
            "itemLabel" : item
        })

    return reshapedDataList

def getDataForScatterplot(dataList, metadataMap, xAttr, yAttr, itemAttr):
    reshapedDataList = []
    for dataObj in dataList:
        if metadataMap[xAttr]['type'] == "quantitative":
            xVal = float(dataObj[xAttr])
        else:
            xVal = dataObj[xAttr]
        yVal = float(dataObj[yAttr])
        item = dataObj[itemAttr]
        reshapedDataList.append({
            "xVal" : xVal,
            "yVal" : yVal,
            "itemLabel" : item
        })

    return reshapedDataList

def getDataForColoredScatterplot(dataList, metadataMap, xAttr, yAttr, colorAttr, itemAttr):
    reshapedDataList = []
    for dataObj in dataList:
        if metadataMap[xAttr]['type'] == "quantitative":
            xVal = float(dataObj[xAttr])
        else:
            xVal = dataObj[xAttr]
        yVal = float(dataObj[yAttr])
        colorAttrVal = dataObj[colorAttr]
        item = dataObj[itemAttr]
        reshapedDataList.append({
            "xVal" : xVal,
            "yVal" : yVal,
            "colorAttrValue" : colorAttrVal,
            "itemLabel" : item
        })

    return reshapedDataList

def getDataForSizedScatterplot(dataList, metadataMap, xAttr, yAttr, sizeAttr, itemAttr):
    reshapedDataList = []
    for dataObj in dataList:
        if metadataMap[xAttr]['type'] == "quantitative":
            xVal = float(dataObj[xAttr])
        else:
            xVal = dataObj[xAttr]
        yVal = float(dataObj[yAttr])
        sizeVal = float(dataObj[sizeAttr])
        item = dataObj[itemAttr]
        reshapedDataList.append({
            "xVal" : xVal,
            "yVal" : yVal,
            "sizeAttrValue" : sizeVal,
            "itemLabel" : item
        })

    return reshapedDataList

def getDataForAggregatedScatterplotByAvg(dataList,metadataMap,xAttr,yAttr,sizeAttr):
    reshapedDataList = []
    sumMap = {}
    countMap = {}

    xLabelValues = metadataMap[xAttr]['domain']
    yLabelValues = metadataMap[yAttr]['domain']
    for xLabel in xLabelValues:
        sumMap[xLabel] = {}
        countMap[xLabel] = {}
        for yLabel in yLabelValues:
            sumMap[xLabel][yLabel] = 0.0
            countMap[xLabel][yLabel] = 0.0

    for dataObj in dataList:
        xLabel = dataObj[xAttr]
        yLabel = dataObj[yAttr]
        value = float(dataObj[sizeAttr])
        sumMap[xLabel][yLabel] += value
        countMap[xLabel][yLabel] += 1.0

    for xLabel in sumMap:
        for yLabel in sumMap[xLabel]:
            if countMap[xLabel][yLabel]>0.0:
                reshapedDataList.append({
                    "xLabel" : xLabel,
                    "yLabel" : yLabel,
                    "sizeAttrValue" : sumMap[xLabel][yLabel]/countMap[xLabel][yLabel]
                })
            else:
                reshapedDataList.append({
                    "xLabel" : xLabel,
                    "yLabel" : yLabel,
                    "sizeAttrValue" : 0.0
                })

    return  reshapedDataList

def getDataForAggregatedScatterplotBySum(dataList,metadataMap,xAttr,yAttr,sizeAttr):
    reshapedDataList = []
    sumMap = {}

    xLabelValues = metadataMap[xAttr]['domain']
    yLabelValues = metadataMap[yAttr]['domain']
    for xLabel in xLabelValues:
        sumMap[xLabel] = {}
        for yLabel in yLabelValues:
            sumMap[xLabel][yLabel] = 0.0

    for dataObj in dataList:
        xLabel = dataObj[xAttr]
        yLabel = dataObj[yAttr]
        value = float(dataObj[sizeAttr])
        sumMap[xLabel][yLabel] += value

    for xLabel in sumMap:
        for yLabel in sumMap[xLabel]:
            reshapedDataList.append({
                "xLabel" : xLabel,
                "yLabel" : yLabel,
                "sizeAttrValue" : sumMap[xLabel][yLabel]
            })

    return  reshapedDataList

def getDataForAggregatedScatterplotByCount(dataList,metadataMap,xAttr,yAttr):
    reshapedDataList = []
    countMap = {}

    xLabelValues = metadataMap[xAttr]['domain']
    yLabelValues = metadataMap[yAttr]['domain']
    for xLabel in xLabelValues:
        countMap[xLabel] = {}
        for yLabel in yLabelValues:
            countMap[xLabel][yLabel] = 0.0

    for dataObj in dataList:
        xLabel = dataObj[xAttr]
        yLabel = dataObj[yAttr]
        countMap[xLabel][yLabel] += 1.0

    for xLabel in countMap:
        for yLabel in countMap[xLabel]:
            if countMap[xLabel][yLabel]>0.0:
                reshapedDataList.append({
                    "xLabel" : xLabel,
                    "yLabel" : yLabel,
                    "sizeAttrValue" : countMap[xLabel][yLabel]
                })
            else:
                reshapedDataList.append({
                    "xLabel" : xLabel,
                    "yLabel" : yLabel,
                    "sizeAttrValue" : 0.0
                })

    return  reshapedDataList

if __name__ == '__main__':
    pass