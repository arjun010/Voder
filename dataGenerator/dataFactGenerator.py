__author__ = 'arjun010'
from dataFactObject import *
from correlation_pearson.code import CorrelationPearson
import numpy as np
from si_prefix import si_format

highExtremeKeywords = ["best","good","high","highest","increase","increasing","extreme"]
lowExtremeKeywords = ["worst","bad","low","lowest","least","decrease","decreasing","extreme"]
correlationKeywords = ["correlation","correlate","compare"]
distributionKeywords = ["distribution","spread","range","compare"]
outlierKeywords = ["outlier","outliers","anomaly","anomalies"]

def getCommonFacts_BarAndDonutChartWithCount_N(categoryAttr,dataList):
    valueAttrLabel = "COUNT"
    sortedDataList = sorted(dataList, key=lambda x: x['value'])

    potentialDataFacts = []

    #=====================
    #  ExtremeValueFacts
    #=====================
    # category with lowest value
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MIN"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[0]['categoryLabel']
    potentialDataFact['tier'] = 1
    potentialDataFact['defaultHtml'] = "<b>"+potentialDataFact['primaryTargetObject'] + "</b> has the <b>least</b> number of items"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [categoryAttr]
    potentialDataFact['keywords'] = lowExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    # category with second lowest value
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MIN"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[1]['categoryLabel']
    potentialDataFact['tier'] = 2
    potentialDataFact['defaultHtml'] = "<b>"+potentialDataFact['primaryTargetObject'] + "</b> has the <b>second lowest</b> number of items"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [categoryAttr]
    potentialDataFact['keywords'] = lowExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    # category with highest value
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MAX"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[-1]['categoryLabel']
    potentialDataFact['tier'] = 1
    potentialDataFact['defaultHtml'] = "<b>"+potentialDataFact['primaryTargetObject'] + "</b> has the <b>most</b> number of items"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [categoryAttr]
    potentialDataFact['keywords'] = highExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    # category with second highest value
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MAX"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[-2]['categoryLabel']
    potentialDataFact['tier'] = 2
    potentialDataFact['defaultHtml'] = "<b>"+potentialDataFact['primaryTargetObject'] + "</b> has the <b>second highest</b> number of items"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [categoryAttr]
    potentialDataFact['keywords'] = highExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    #=====================
    #  RelativeValueDistributionFacts
    #=====================
    if len(sortedDataList)<=100: # ignoring computation of facts if this length is more than 25 since this increases time and size like crazy
        relativeValueDistributionDiffThreshold = 1.5
        relativeValueDistributionDiffList = []

        for i in range(0,len(sortedDataList)-1):
            for j in range(i+1,len(sortedDataList)):
                sourceDataObj = sortedDataList[i]
                targetDataObj = sortedDataList[j]
                sourceVal = sourceDataObj['value']
                targetVal = targetDataObj['value']

                if sourceVal>0.0: # ignoring 0 values for now TODO: change logic if necessary
                    diffFactor = (targetVal-sourceVal)*1.0/sourceVal
                    if diffFactor>relativeValueDistributionDiffThreshold:
                        relativeValueDistributionDiffList.append({
                            "sourceCategory" : sourceDataObj['categoryLabel'],
                            "targetCategory" : targetDataObj['categoryLabel'],
                            "diffFactor" : diffFactor
                        })

        relativeValueDistributionDiffList.sort(key=lambda x: x["diffFactor"])
        for i in range(0,len(relativeValueDistributionDiffList)):
            distributionDiffListObj = relativeValueDistributionDiffList[i]

            potentialDataFact = getRelativeValueDataFactObject()
            potentialDataFact['primaryTargetObjectType'] = 'category'
            potentialDataFact['sourceCategory'] = distributionDiffListObj['sourceCategory']
            potentialDataFact['targetCategory'] = distributionDiffListObj['targetCategory']
            potentialDataFact['diffFactor'] = round(distributionDiffListObj['diffFactor'],2)
            potentialDataFact['tier'] = 3
            potentialDataFact['attributes'] = [categoryAttr]
            potentialDataFact['keywords'] = distributionKeywords

            # potentialDataFact['annotationMap']['stroke'] = "checked"
            potentialDataFact['annotationMap']['opacity'] = "checked"
            # potentialDataFact['annotationMap']['text_highlight'] = "checked"

            potentialDataFact['defaultHtml'] = "Number of items in <b>" + potentialDataFact['targetCategory'] + "</b> is <b>" + str(potentialDataFact['diffFactor']) + " times</b> the number of items in <b>" + potentialDataFact['sourceCategory']+"</b>"
            potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
            if i == len(relativeValueDistributionDiffList)-1:
                potentialDataFact['tier'] = 1
            elif i == len(relativeValueDistributionDiffList)-2:
                potentialDataFact['tier'] = 2
            potentialDataFacts.append(potentialDataFact)

    #=====================
    # DerivedValueFacts
    #=====================
    # overall sum
    sumAcrossCategories = 0.0
    for dataObj in sortedDataList:
        sumAcrossCategories += dataObj['value']

    potentialDataFact = getDerivedValueDataFactObject()
    potentialDataFact['primaryTargetObjectType'] = 'value'
    potentialDataFact['value'] = round(sumAcrossCategories,2)
    potentialDataFact['defaultHtml'] = "Total number of items across all " + categoryAttr + "s is " + str(potentialDataFact['value'])
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['tier'] = 1
    potentialDataFact['attributes'] = [categoryAttr]
    # potentialDataFacts.append(potentialDataFact)

    # average across categories
    avgAcrossCategoryValues = round(sumAcrossCategories/len(sortedDataList),2)
    potentialDataFact = getDerivedValueDataFactObject()
    potentialDataFact['primaryTargetObjectType'] = 'value'
    potentialDataFact['value'] = round(avgAcrossCategoryValues,2)
    potentialDataFact['defaultHtml'] = "Average number of items across all " + categoryAttr + "s is " + str(potentialDataFact['value'])
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['tier'] = 1
    potentialDataFact['attributes'] = [categoryAttr]
    # potentialDataFacts.append(potentialDataFact)

    return potentialDataFacts

def getCommonFacts_BarAndDonutChartWithAvg_NxQ(categoryAttr,valueAttr,valueAttrTransform,dataList):
    if valueAttrTransform!=None:
        valueAttrLabel = valueAttrTransform+"("+valueAttr+")"
    else:
        valueAttrLabel = valueAttr
    sortedDataList = sorted(dataList, key=lambda x: x['value'])

    potentialDataFacts = []

    #=====================
    #  ExtremeValueFacts
    #=====================
    # category with lowest value
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MIN"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[0]['categoryLabel']
    potentialDataFact['tier'] = 1
    potentialDataFact['defaultHtml'] = "<b>"+potentialDataFact['primaryTargetObject'] + "</b> has <b>lowest average " + valueAttr + "</b>"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [categoryAttr, valueAttr]
    potentialDataFact['keywords'] = lowExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    # category with second lowest value
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MIN"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[1]['categoryLabel']
    potentialDataFact['tier'] = 2
    potentialDataFact['defaultHtml'] = "<b>" + potentialDataFact['primaryTargetObject'] + "</b> has <b>second lowest average " + valueAttr + "</b>"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [categoryAttr, valueAttr]
    potentialDataFact['keywords'] = lowExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    # category with highest value
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MAX"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[-1]['categoryLabel']
    potentialDataFact['tier'] = 1
    potentialDataFact['defaultHtml'] = "<b>" + potentialDataFact['primaryTargetObject'] + "</b> has <b>highest average " + valueAttr + "</b>"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [categoryAttr, valueAttr]
    potentialDataFact['keywords'] = highExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    # category with second highest value
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MAX"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[-2]['categoryLabel']
    potentialDataFact['tier'] = 2
    potentialDataFact['defaultHtml'] = "<b>" + potentialDataFact['primaryTargetObject'] + "</b> has <b>second highest average " + valueAttr + "</b>"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [categoryAttr, valueAttr]
    potentialDataFact['keywords'] = highExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    #=====================
    #  RelativeValueDistributionFacts
    #=====================
    if len(sortedDataList)<=100: # ignoring computation of facts if this length is more than 25 since this increases time and size like crazy
        relativeValueDistributionDiffThreshold = 1.5
        relativeValueDistributionDiffList = []

        for i in range(0,len(sortedDataList)-1):
            for j in range(i+1,len(sortedDataList)):
                sourceDataObj = sortedDataList[i]
                targetDataObj = sortedDataList[j]
                sourceVal = sourceDataObj['value']
                targetVal = targetDataObj['value']

                if sourceVal>0.0: # ignoring 0 values for now TODO: change logic if necessary
                    diffFactor = (targetVal-sourceVal)*1.0/sourceVal
                    if diffFactor>relativeValueDistributionDiffThreshold:
                        relativeValueDistributionDiffList.append({
                            "sourceCategory" : sourceDataObj['categoryLabel'],
                            "targetCategory" : targetDataObj['categoryLabel'],
                            "diffFactor" : diffFactor
                        })

        relativeValueDistributionDiffList.sort(key=lambda x: x["diffFactor"])
        for i in range(0,len(relativeValueDistributionDiffList)):
            distributionDiffListObj = relativeValueDistributionDiffList[i]

            potentialDataFact = getRelativeValueDataFactObject()
            potentialDataFact['primaryTargetObjectType'] = 'category'
            potentialDataFact['sourceCategory'] = distributionDiffListObj['sourceCategory']
            potentialDataFact['targetCategory'] = distributionDiffListObj['targetCategory']
            potentialDataFact['diffFactor'] = round(distributionDiffListObj['diffFactor'],2)
            potentialDataFact['tier'] = 3
            potentialDataFact['attributes'] = [categoryAttr, valueAttr]
            potentialDataFact['keywords'] = distributionKeywords

            potentialDataFact['defaultHtml'] = "<b>Average " + valueAttr + "</b> of <b>" + potentialDataFact['targetCategory'] + "</b> is " + str(potentialDataFact['diffFactor']) + " times <b>" + potentialDataFact['sourceCategory'] +"</b>"
            potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']

            # potentialDataFact['annotationMap']['stroke'] = "checked"
            potentialDataFact['annotationMap']['opacity'] = "checked"
            # potentialDataFact['annotationMap']['text_highlight'] = "checked"

            if i == len(relativeValueDistributionDiffList)-1:
                potentialDataFact['tier'] = 1
            elif i == len(relativeValueDistributionDiffList)-2:
                potentialDataFact['tier'] = 2
            potentialDataFacts.append(potentialDataFact)

    #=====================
    # DerivedValueFact : Overall Average
    #=====================
    avgAcrossCategories = 0.0
    for dataObj in sortedDataList:
        avgAcrossCategories += dataObj['value']
    avgAcrossCategories = round(avgAcrossCategories/len(sortedDataList),2)
    potentialDataFact = getDerivedValueDataFactObject()
    potentialDataFact['primaryTargetObjectType'] = 'value'
    potentialDataFact['value'] = round(avgAcrossCategories,2)
    potentialDataFact['defaultHtml'] = "Average " + valueAttr + " across all " + categoryAttr + "s is " + str(potentialDataFact['value'])
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['tier'] = 1
    potentialDataFact['attributes'] = [categoryAttr, valueAttr]
    # potentialDataFacts.append(potentialDataFact)

    return potentialDataFacts

def getCommonFacts_BarAndDonutChartWithSum_NxQ(categoryAttr,valueAttr,valueAttrTransform,dataList):
    if valueAttrTransform!=None:
        valueAttrLabel = valueAttrTransform+"("+valueAttr+")"
    else:
        valueAttrLabel = valueAttr
    sortedDataList = sorted(dataList, key=lambda x: x['value'])

    potentialDataFacts = []

    #=====================
    #  ExtremeValueFacts
    #=====================
    # category with lowest value
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MIN"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[0]['categoryLabel']
    potentialDataFact['tier'] = 1
    potentialDataFact['defaultHtml'] = "<b>" + potentialDataFact['primaryTargetObject'] + "</b> has <b> lowest total " + valueAttr + "</b>"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [categoryAttr, valueAttr]
    potentialDataFact['keywords'] = lowExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    # category with second lowest value
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MIN"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[1]['categoryLabel']
    potentialDataFact['tier'] = 2
    potentialDataFact['defaultHtml'] = "<b>" + potentialDataFact['primaryTargetObject'] + "</b> has <b>second lowest total " + valueAttr + "</b>"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [categoryAttr, valueAttr]
    potentialDataFact['keywords'] = lowExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    # category with highest value
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MAX"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[-1]['categoryLabel']
    potentialDataFact['tier'] = 1
    potentialDataFact['defaultHtml'] = "<b>" + potentialDataFact['primaryTargetObject'] + "</b> has <b>highest total " + valueAttr + "</b>"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [categoryAttr, valueAttr]
    potentialDataFact['keywords'] = highExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    # category with second highest value
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MAX"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[-2]['categoryLabel']
    potentialDataFact['tier'] = 2
    potentialDataFact['defaultHtml'] = "<b>" + potentialDataFact['primaryTargetObject'] + "</b> has <b>second highest total " + valueAttr + "</b>"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [categoryAttr, valueAttr]
    potentialDataFact['keywords'] = highExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    #=====================
    #  RelativeValueDistributionFacts
    #=====================
    if len(sortedDataList)<=100: # ignoring computation of facts if this length is more than 25 since this increases time and size like crazy
        relativeValueDistributionDiffThreshold = 1.5
        relativeValueDistributionDiffList = []

        for i in range(0,len(sortedDataList)-1):
            for j in range(i+1,len(sortedDataList)):
                sourceDataObj = sortedDataList[i]
                targetDataObj = sortedDataList[j]
                sourceVal = sourceDataObj['value']
                targetVal = targetDataObj['value']

                if sourceVal>0.0: # ignoring 0 values for now TODO: change logic if necessary
                    diffFactor = (targetVal-sourceVal)*1.0/sourceVal
                    # if "Mean Earnings"==valueAttr:
                    #     if "Outlying" in sourceDataObj['categoryLabel']:
                    #         print sourceDataObj, targetDataObj, diffFactor, categoryAttr, valueAttrLabel
                    if diffFactor>relativeValueDistributionDiffThreshold:
                        # print "===",categoryAttr, valueAttrLabel,"==="
                        relativeValueDistributionDiffList.append({
                            "sourceCategory" : sourceDataObj['categoryLabel'],
                            "targetCategory" : targetDataObj['categoryLabel'],
                            "diffFactor" : diffFactor
                        })

        relativeValueDistributionDiffList.sort(key=lambda x: x["diffFactor"])
        for i in range(0,len(relativeValueDistributionDiffList)):
            distributionDiffListObj = relativeValueDistributionDiffList[i]

            potentialDataFact = getRelativeValueDataFactObject()
            potentialDataFact['primaryTargetObjectType'] = 'category'
            potentialDataFact['sourceCategory'] = distributionDiffListObj['sourceCategory']
            potentialDataFact['targetCategory'] = distributionDiffListObj['targetCategory']
            potentialDataFact['diffFactor'] = round(distributionDiffListObj['diffFactor'],2)
            potentialDataFact['tier'] = 3
            potentialDataFact['keywords'] = distributionKeywords

            potentialDataFact['defaultHtml'] = valueAttrLabel + " of " + potentialDataFact['targetCategory'] + " is " + str(potentialDataFact['diffFactor']) + " times " + potentialDataFact['sourceCategory']
            potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
            potentialDataFact['attributes'] = [categoryAttr, valueAttr]

            # potentialDataFact['annotationMap']['stroke'] = "checked"
            potentialDataFact['annotationMap']['opacity'] = "checked"
            # potentialDataFact['annotationMap']['text_highlight'] = "checked"

            if i == len(relativeValueDistributionDiffList)-1:
                potentialDataFact['tier'] = 1
            elif i == len(relativeValueDistributionDiffList)-2:
                potentialDataFact['tier'] = 2
            
            potentialDataFacts.append(potentialDataFact)

    #=====================
    # DerivedValueFacts
    #=====================
    # overall sum
    sumAcrossCategories = 0.0
    for dataObj in sortedDataList:
        sumAcrossCategories += dataObj['value']

    potentialDataFact = getDerivedValueDataFactObject()
    potentialDataFact['primaryTargetObjectType'] = 'value'
    potentialDataFact['value'] = round(sumAcrossCategories,2)
    potentialDataFact['defaultHtml'] = "Total " + valueAttrLabel + " across all " + categoryAttr + "s is " + str(potentialDataFact['value'])
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['tier'] = 1
    potentialDataFact['attributes'] = [categoryAttr, valueAttr]
    # potentialDataFacts.append(potentialDataFact)

    # average across categories
    avgAcrossCategoryValues = round(sumAcrossCategories/len(sortedDataList),2)
    potentialDataFact = getDerivedValueDataFactObject()
    potentialDataFact['primaryTargetObjectType'] = 'value'
    potentialDataFact['value'] = round(avgAcrossCategoryValues,2)
    potentialDataFact['defaultHtml'] = "Average " + valueAttrLabel + " across all " + categoryAttr + "s is " + str(potentialDataFact['value'])
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['tier'] = 1
    potentialDataFact['attributes'] = [categoryAttr, valueAttr]
    # potentialDataFacts.append(potentialDataFact)

    return potentialDataFacts

def getCommonFacts_TickAndDotPlot_NxQ(categoryAttr,valueAttr, valueAttrTransform, dataList):
    if valueAttrTransform!=None:
        valueAttrLabel = valueAttrTransform+"("+valueAttr+")"
    else:
        valueAttrLabel = valueAttr
    sortedDataList = sorted(dataList, key=lambda x: x['value'])

    potentialDataFacts = []

    #=====================
    # ExtremeValueFacts (Category containing Item)
    #=====================

    # lowest value item
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MIN"
    potentialDataFact['primaryTargetObjectType'] = "item"
    potentialDataFact['secondaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[0]['itemLabel']
    potentialDataFact['secondaryTargetObject'] = sortedDataList[0]['categoryLabel']
    potentialDataFact['tier'] = 1
    potentialDataFact['defaultHtml'] = "<b>" + potentialDataFact['secondaryTargetObject'] + "</b> has item (" + potentialDataFact['primaryTargetObject'] + ") with <b>lowest</b> value for <b>" + valueAttrLabel + "</b>"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [categoryAttr, valueAttr]
    potentialDataFact['keywords'] = lowExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['item_label'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)
    
    # second lowest value item
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MIN"
    potentialDataFact['primaryTargetObjectType'] = "item"
    potentialDataFact['secondaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[1]['itemLabel']
    potentialDataFact['secondaryTargetObject'] = sortedDataList[1]['categoryLabel']
    potentialDataFact['tier'] = 2
    potentialDataFact['defaultHtml'] = "<b>" + potentialDataFact['secondaryTargetObject'] + "</b> has item (" + potentialDataFact['primaryTargetObject'] + ") with <b>second lowest</b> value for <b>" + valueAttrLabel + "</b>"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [categoryAttr, valueAttr]
    potentialDataFact['keywords'] = lowExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['item_label'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    # highest value item
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MAX"
    potentialDataFact['primaryTargetObjectType'] = "item"
    potentialDataFact['secondaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[-1]['itemLabel']
    potentialDataFact['secondaryTargetObject'] = sortedDataList[-1]['categoryLabel']
    potentialDataFact['tier'] = 1
    potentialDataFact['defaultHtml'] = "<b>"+ potentialDataFact['secondaryTargetObject'] + "</b> has item (" + potentialDataFact['primaryTargetObject'] + ") with <b>highest</b> value for <b>" + valueAttrLabel + "</b>"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [categoryAttr, valueAttr]
    potentialDataFact['keywords'] = highExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['item_label'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    # second highest value item
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MAX"
    potentialDataFact['primaryTargetObjectType'] = "item"
    potentialDataFact['secondaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[-2]['itemLabel']
    potentialDataFact['secondaryTargetObject'] = sortedDataList[-2]['categoryLabel']
    potentialDataFact['tier'] = 2
    potentialDataFact['defaultHtml'] = "<b>"+potentialDataFact['secondaryTargetObject'] + "</b> has item (" + potentialDataFact['primaryTargetObject'] + ") with <b>second highest</b> value for <b>" + valueAttrLabel+"</b>"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [categoryAttr, valueAttr]
    potentialDataFact['keywords'] = highExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['item_label'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    return potentialDataFacts

def getDataFacts_TickPlot_Q(valueAttr, dataList):
    valueAttrLabel = valueAttr
    sortedDataList = sorted(dataList, key=lambda x: x['value'])

    potentialDataFacts = []

    #=====================
    # ExtremeValueFacts (Category containing Item)
    #=====================

    # lowest value item
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MIN"
    potentialDataFact['primaryTargetObjectType'] = "item"
    potentialDataFact['primaryTargetObject'] = sortedDataList[0]['itemLabel']
    potentialDataFact['tier'] = 1
    potentialDataFact['defaultHtml'] = "<b>"+potentialDataFact['primaryTargetObject'] + "</b> has <b>lowest</b> value for <b>" + valueAttrLabel + "</b>"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [valueAttr]
    potentialDataFact['keywords'] = lowExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['item_label'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    # second lowest value item
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MIN"
    potentialDataFact['primaryTargetObjectType'] = "item"
    potentialDataFact['primaryTargetObject'] = sortedDataList[1]['itemLabel']
    potentialDataFact['tier'] = 2
    potentialDataFact['defaultHtml'] = "<b>"+potentialDataFact['primaryTargetObject'] + "</b> has <b>second lowest</b> value for <b>" + valueAttrLabel + "</b>"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [valueAttr]
    potentialDataFact['keywords'] = lowExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['item_label'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    # highest value item
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MAX"
    potentialDataFact['primaryTargetObjectType'] = "item"
    potentialDataFact['primaryTargetObject'] = sortedDataList[-1]['itemLabel']
    potentialDataFact['tier'] = 1
    potentialDataFact['defaultHtml'] = "<b>"+potentialDataFact['primaryTargetObject'] + "</b> has <b>highest</b> value for <b>" + valueAttrLabel + "</b>"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [valueAttr]
    potentialDataFact['keywords'] = highExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['item_label'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    # second highest value item
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MAX"
    potentialDataFact['primaryTargetObjectType'] = "item"
    potentialDataFact['primaryTargetObject'] = sortedDataList[-2]['itemLabel']
    potentialDataFact['tier'] = 2
    potentialDataFact['defaultHtml'] = "<b>"+potentialDataFact['primaryTargetObject'] + "</b> has <b>second highest</b> value for <b>" + valueAttrLabel + "</b>"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [valueAttr]
    potentialDataFact['keywords'] = highExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['item_label'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    return potentialDataFacts

def getDataFacts_Scatterplot_QxQ(xAttr,yAttr,dataList,metadataMap):
    potentialDataFacts = []
    xValues = []
    yValues = []

    midXVal = float(sorted(metadataMap[xAttr]['domain'])[len(metadataMap[xAttr]['domain'])/2])
    midYVal = float(sorted(metadataMap[yAttr]['domain'])[len(metadataMap[yAttr]['domain'])/2])

    groupMap = {
        "Q1":0,
        "Q2":0,
        "Q3":0,
        "Q4":0
    }

    for dataObj in dataList:
        xVal = dataObj['xVal']
        yVal = dataObj['yVal']
        
        xValues.append(xVal)
        yValues.append(yVal)
        
        if xVal<=midXVal and yVal<=midYVal: # Q3
            groupMap["Q3"] += 1.0
        elif xVal<=midXVal and yVal>midYVal: # Q2
            groupMap["Q2"] += 1.0            
        elif xVal>midXVal and yVal<=midYVal: #Q4
            groupMap["Q4"] += 1.0
        elif xVal>midXVal and yVal>midYVal: #Q1
            groupMap["Q1"] += 1.0

    correlation = CorrelationPearson()
    correlationCoef = correlation.result(xValues,yValues)

    potentialDataFact = getCorrelationDataFactObject()
    potentialDataFact['primaryTargetObjectType'] = 'value'
    potentialDataFact['value'] = round(correlationCoef,2)
    potentialDataFact['tier'] = 1

    if correlationCoef <= -0.7:
        potentialDataFact['defaultHtml'] = "<b>"+xAttr + "</b> and <b>" + yAttr + "</b> have a <b>strong inverse correlation</b>"
        potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
        potentialDataFact['attributes'] = [xAttr,yAttr]
        potentialDataFact['keywords'] = correlationKeywords
        potentialDataFact['annotationMap']['regression_line'] = "checked"
        potentialDataFacts.append(potentialDataFact)
    elif correlationCoef <= -0.5 and correlationCoef > -0.7 :
        potentialDataFact['defaultHtml'] = "<b>"+xAttr + "</b> and <b>" + yAttr + "</b> have a <b>moderate inverse correlation</b>"
        potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
        potentialDataFact['attributes'] = [xAttr,yAttr]
        potentialDataFact['keywords'] = correlationKeywords
        potentialDataFact['annotationMap']['regression_line'] = "checked"
        potentialDataFact['tier'] = 2
        potentialDataFacts.append(potentialDataFact)
    elif correlationCoef >= 0.5 and correlationCoef < 0.7:
        potentialDataFact['defaultHtml'] = "<b>"+xAttr + "</b> and <b>" + yAttr + "</b> have a <b>moderate correlation</b>"
        potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
        potentialDataFact['attributes'] = [xAttr,yAttr]
        potentialDataFact['keywords'] = correlationKeywords
        potentialDataFact['annotationMap']['regression_line'] = "checked"
        potentialDataFact['tier'] = 2
        potentialDataFacts.append(potentialDataFact)
    elif correlationCoef >= 0.7:
        potentialDataFact['defaultHtml'] = "<b>"+xAttr + "</b> and <b>" + yAttr + "</b> have a <b>strong correlation</b>"
        potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
        potentialDataFact['attributes'] = [xAttr,yAttr]
        potentialDataFact['keywords'] = correlationKeywords
        potentialDataFact['annotationMap']['regression_line'] = "checked"
        potentialDataFacts.append(potentialDataFact)

    groupCountThreshold = 0.5
    if groupMap['Q1']/len(dataList) >= groupCountThreshold:
            potentialDataFact = getQuadrantDistributionDataFactObject()
            potentialDataFact['primaryTargetObjectType'] = "valueList"
            potentialDataFact['primaryTargetObject'] = [midXVal,midYVal]
            potentialDataFact['tier'] = 1
            potentialDataFact['quadrant'] = 1
            potentialDataFact['defaultHtml'] = 'Most items in the dataset have <b>high ' + xAttr + '</b> and <b>high ' + yAttr + '</b>'
            potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
            potentialDataFact['attributes'] = [xAttr,yAttr]
            potentialDataFact['keywords'] = correlationKeywords
            
            # potentialDataFact['annotationMap']['quadrant_lines'] = "checked"
            # potentialDataFact['annotationMap']['stroke'] = "checked"
            potentialDataFact['annotationMap']['opacity'] = "checked"            

            potentialDataFacts.append(potentialDataFact)
    elif groupMap['Q2']/len(dataList) >= groupCountThreshold:
            potentialDataFact = getQuadrantDistributionDataFactObject()
            potentialDataFact['primaryTargetObjectType'] = "valueList"
            potentialDataFact['primaryTargetObject'] = [midXVal,midYVal]
            potentialDataFact['tier'] = 1
            potentialDataFact['quadrant'] = 2
            potentialDataFact['defaultHtml'] = 'Most items in the dataset have <b>low ' + xAttr + '</b> and <b>high ' + yAttr + '</b>'
            potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
            potentialDataFact['attributes'] = [xAttr,yAttr]
            potentialDataFact['keywords'] = correlationKeywords
            
            # potentialDataFact['annotationMap']['quadrant_lines'] = "checked"
            # potentialDataFact['annotationMap']['stroke'] = "checked"
            potentialDataFact['annotationMap']['opacity'] = "checked"            

            potentialDataFacts.append(potentialDataFact)
    elif groupMap['Q3']/len(dataList) >= groupCountThreshold:
            potentialDataFact = getQuadrantDistributionDataFactObject()
            potentialDataFact['primaryTargetObjectType'] = "valueList"
            potentialDataFact['primaryTargetObject'] = [midXVal,midYVal]
            potentialDataFact['tier'] = 1
            potentialDataFact['quadrant'] = 3
            potentialDataFact['defaultHtml'] = 'Most items in the dataset have <b>low ' + xAttr + '</b> and <b>low ' + yAttr + '</b>'
            potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
            potentialDataFact['attributes'] = [xAttr,yAttr]
            potentialDataFact['keywords'] = correlationKeywords
            
            # potentialDataFact['annotationMap']['quadrant_lines'] = "checked"
            # potentialDataFact['annotationMap']['stroke'] = "checked"
            potentialDataFact['annotationMap']['opacity'] = "checked"            

            potentialDataFacts.append(potentialDataFact)
    elif groupMap['Q4']/len(dataList) >= groupCountThreshold:
            potentialDataFact = getQuadrantDistributionDataFactObject()
            potentialDataFact['primaryTargetObjectType'] = "valueList"
            potentialDataFact['primaryTargetObject'] = [midXVal,midYVal]
            potentialDataFact['tier'] = 1
            potentialDataFact['quadrant'] = 4
            potentialDataFact['defaultHtml'] = 'Most items in the dataset have <b>high ' + xAttr + '</b> and <b>low ' + yAttr + '</b>'
            potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
            potentialDataFact['attributes'] = [xAttr,yAttr]
            potentialDataFact['keywords'] = correlationKeywords
            
            # potentialDataFact['annotationMap']['quadrant_lines'] = "checked"
            # potentialDataFact['annotationMap']['stroke'] = "checked"
            potentialDataFact['annotationMap']['opacity'] = "checked"            

            potentialDataFacts.append(potentialDataFact)

    return potentialDataFacts

def getCommonDataFacts_StackedBarAndAggregatedDotPlotWithCount_NxN(primaryAttr,secondaryAttr,dataList):
    sortedDataList = sorted(dataList,key=lambda x: x['sizeAttrValue'])
    firstNonZeroIndex = None
    for i in range(0,len(sortedDataList)):
        dataObj = sortedDataList[i]
        if dataObj['sizeAttrValue']>0:
            firstNonZeroIndex = i
            break
    sortedDataList = sortedDataList[firstNonZeroIndex:] # filtering so that min values don't use 0

    potentialDataFacts = []

    # ==============================
    # ExtremeValue - CategoryAndCategory based on combined item count
    # ==============================

    # least items
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MIN"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['secondaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[0]['xLabel']
    potentialDataFact['secondaryTargetObject'] = sortedDataList[0]['yLabel']
    potentialDataFact['tier'] = 1
    potentialDataFact['defaultHtml'] = 'The <b>smallest group</b> of items in the dataset have <b>' + primaryAttr + ": " + potentialDataFact['primaryTargetObject'] + "</b> and <b>" + secondaryAttr + ": " + potentialDataFact['secondaryTargetObject'] + "</b>"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [primaryAttr,secondaryAttr]
    potentialDataFact['keywords'] = lowExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    # most items
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MAX"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['secondaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[-1]['xLabel']
    potentialDataFact['secondaryTargetObject'] = sortedDataList[-1]['yLabel']
    potentialDataFact['tier'] = 1
    potentialDataFact['defaultHtml'] = 'The <b>largest group</b> of items in the dataset have <b>' + primaryAttr + ": " + potentialDataFact['primaryTargetObject'] + "</b> and <b>" + secondaryAttr + ": " + potentialDataFact['secondaryTargetObject'] + "</b>"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [primaryAttr,secondaryAttr]
    potentialDataFact['keywords'] = highExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    return potentialDataFacts

def getStackedBarCharDataFacts_NxN(primaryAttr, secondaryAttr, dataList):
    sortedDataList = sorted(dataList,key=lambda x: x['sizeAttrValue'])
    firstNonZeroIndex = None
    for i in range(0,len(sortedDataList)):
        dataObj = sortedDataList[i]
        if dataObj['sizeAttrValue']>0:
            firstNonZeroIndex = i
            break
    sortedDataList = sortedDataList[firstNonZeroIndex:] # filtering so that min values don't use 0

    potentialDataFacts = []

    countDataMap = {}
    for dataObj in sortedDataList:
        primaryAttrCategory = dataObj['xLabel']
        secondaryAttrCategory = dataObj['yLabel']
        value = dataObj['sizeAttrValue']
        if primaryAttrCategory not in countDataMap:
            countDataMap[primaryAttrCategory] = {
                'countObjs' : [],
                'totalCount' : value
            }
        else:
            countDataMap[primaryAttrCategory]['totalCount'] += value
        countDataMap[primaryAttrCategory]['countObjs'].append({
            "secondaryCategory" : secondaryAttrCategory,
            "count" : value
        })
        countDataMap[primaryAttrCategory]['countObjs'].sort(key=lambda x: x['count'])

    primaryAttrCountDataList = []
    for primaryAttrCategory in countDataMap:
        primaryAttrCountDataList.append({
            "category" : primaryAttrCategory,
            "count" : countDataMap[primaryAttrCategory]['totalCount']
        })
    sortedPrimaryAttrCountDataList = sorted(primaryAttrCountDataList,key=lambda x: x['count'])

    #=====================
    # ExtremeValueDataFact - category and category (based on primary category count)
    #=====================

    # most items
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['type'] = "ExtremeValueFactWithDistribution"
    potentialDataFact['extremeFunction'] = "MAX"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['secondaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedPrimaryAttrCountDataList[-1]['category']
    potentialDataFact['secondaryTargetObject'] = countDataMap[potentialDataFact['primaryTargetObject']]['countObjs'][-1]['secondaryCategory']
    potentialDataFact['tier'] = 1
    potentialDataFact['defaultHtml'] = potentialDataFact['primaryTargetObject'] + ' has most number of items. Most items in <b>' + potentialDataFact['primaryTargetObject'] + "</b> belong to <b>" + potentialDataFact['secondaryTargetObject'] + "</b> for <b>" + secondaryAttr + "</b>"
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [primaryAttr,secondaryAttr]
    potentialDataFact['keywords'] = highExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    return potentialDataFacts

def getDataFactsForAggregatedScatterplotByAvg_NxNxQ(xAttr, yAttr, sizeAttr, dataList):
    sortedDataList = sorted(dataList,key=lambda x: x['sizeAttrValue'])
    firstNonZeroIndex = None
    for i in range(0,len(sortedDataList)):
        dataObj = sortedDataList[i]
        if dataObj['sizeAttrValue']>0:
            firstNonZeroIndex = i
            break
    sortedDataList = sortedDataList[firstNonZeroIndex:] # filtering so that min values don't use 0

    potentialDataFacts = []

    # ==============================
    # ExtremeValue - CategoryAndCategory based on AVG val
    # ==============================

    # least items
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MIN"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['secondaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[0]['xLabel']
    potentialDataFact['secondaryTargetObject'] = sortedDataList[0]['yLabel']
    potentialDataFact['tier'] = 1
    potentialDataFact['defaultHtml'] = 'Items with ' + xAttr + ': <b>' + potentialDataFact['primaryTargetObject'] + '</b> and ' + yAttr + ': <b>' + potentialDataFact['secondaryTargetObject'] + '</b> have <b>lowest average ' + sizeAttr + '</b>'
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [xAttr,yAttr,sizeAttr]
    potentialDataFact['keywords'] = lowExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MIN"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['secondaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[1]['xLabel']
    potentialDataFact['secondaryTargetObject'] = sortedDataList[1]['yLabel']
    potentialDataFact['tier'] = 2
    potentialDataFact['defaultHtml'] = 'Items with ' + xAttr + ': <b>' + potentialDataFact['primaryTargetObject'] + '</b> and ' + yAttr + ': <b>' + potentialDataFact['secondaryTargetObject'] + '</b> have <b>second lowest average ' + sizeAttr + '</b>'
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [xAttr,yAttr,sizeAttr]
    potentialDataFact['keywords'] = lowExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    # most items
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MAX"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['secondaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[-1]['xLabel']
    potentialDataFact['secondaryTargetObject'] = sortedDataList[-1]['yLabel']
    potentialDataFact['tier'] = 1
    potentialDataFact['defaultHtml'] = 'Items with ' + xAttr + ': <b>' + potentialDataFact['primaryTargetObject'] + '</b> and ' + yAttr + ': <b>' + potentialDataFact['secondaryTargetObject'] + '</b> have <b>highest average ' + sizeAttr + '</b>'
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [xAttr,yAttr,sizeAttr]
    potentialDataFact['keywords'] = highExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MAX"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['secondaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[-2]['xLabel']
    potentialDataFact['secondaryTargetObject'] = sortedDataList[-2]['yLabel']
    potentialDataFact['tier'] = 2
    potentialDataFact['defaultHtml'] = 'Items with ' + xAttr + ': <b>' + potentialDataFact['primaryTargetObject'] + '</b> and ' + yAttr + ': <b>' + potentialDataFact['secondaryTargetObject'] + '</b> have <b>second highest average ' + sizeAttr + '</b>'
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [xAttr,yAttr,sizeAttr]
    potentialDataFact['keywords'] = highExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    return potentialDataFacts

def getDataFactsForAggregatedScatterplotBySum_NxNxQ(xAttr, yAttr, sizeAttr, dataList):
    sortedDataList = sorted(dataList,key=lambda x: x['sizeAttrValue'])
    firstNonZeroIndex = None
    for i in range(0,len(sortedDataList)):
        dataObj = sortedDataList[i]
        if dataObj['sizeAttrValue']>0:
            firstNonZeroIndex = i
            break
    sortedDataList = sortedDataList[firstNonZeroIndex:] # filtering so that min values don't use 0

    potentialDataFacts = []

    # ==============================
    # ExtremeValue - CategoryAndCategory based on AVG val
    # ==============================

    # least items
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MIN"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['secondaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[0]['xLabel']
    potentialDataFact['secondaryTargetObject'] = sortedDataList[0]['yLabel']
    potentialDataFact['tier'] = 1
    potentialDataFact['defaultHtml'] = 'Items with ' + xAttr + ': <b>' + potentialDataFact['primaryTargetObject'] + '</b> and ' + yAttr + ': <b>' + potentialDataFact['secondaryTargetObject'] + '</b> have <b>lowest total ' + sizeAttr + '</b>'
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [xAttr,yAttr,sizeAttr]
    potentialDataFact['keywords'] = lowExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MIN"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['secondaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[1]['xLabel']
    potentialDataFact['secondaryTargetObject'] = sortedDataList[1]['yLabel']
    potentialDataFact['tier'] = 2
    potentialDataFact['defaultHtml'] = 'Items with ' + xAttr + ': <b>' + potentialDataFact['primaryTargetObject'] + '</b> and ' + yAttr + ': <b>' + potentialDataFact['secondaryTargetObject'] + '</b> have <b>second lowest total ' + sizeAttr + '</b>'
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [xAttr,yAttr,sizeAttr]
    potentialDataFact['keywords'] = lowExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    # most items
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MAX"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['secondaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[-1]['xLabel']
    potentialDataFact['secondaryTargetObject'] = sortedDataList[-1]['yLabel']
    potentialDataFact['tier'] = 1
    potentialDataFact['defaultHtml'] = 'Items with ' + xAttr + ': <b>' + potentialDataFact['primaryTargetObject'] + '</b> and ' + yAttr + ': <b>' + potentialDataFact['secondaryTargetObject'] + '</b> have <b>highest total ' + sizeAttr + '</b>'
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [xAttr,yAttr,sizeAttr]
    potentialDataFact['keywords'] = highExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MAX"
    potentialDataFact['primaryTargetObjectType'] = "category"
    potentialDataFact['secondaryTargetObjectType'] = "category"
    potentialDataFact['primaryTargetObject'] = sortedDataList[-2]['xLabel']
    potentialDataFact['secondaryTargetObject'] = sortedDataList[-2]['yLabel']
    potentialDataFact['tier'] = 2
    potentialDataFact['defaultHtml'] = 'Items with ' + xAttr + ': <b>' + potentialDataFact['primaryTargetObject'] + '</b> and ' + yAttr + ': <b>' + potentialDataFact['secondaryTargetObject'] + '</b> have <b>second highest total ' + sizeAttr + '</b>'
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [xAttr,yAttr,sizeAttr]
    potentialDataFact['keywords'] = highExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    return potentialDataFacts

def getDataFactsForSizedScatterplot_QxQxQ(xAttr,yAttr,sizeAttr,dataList,metadataMap):
    potentialDataFacts = []
    groupMap = {
        "Q1":{
            "points":[],
            "largeSizePoints":[],
            "smallSizePoints":[]
        },
        "Q2":{
            "points":[],
            "largeSizePoints":[],
            "smallSizePoints":[]
        },
        "Q3":{
            "points":[],
            "largeSizePoints":[],
            "smallSizePoints":[]
        },
        "Q4":{
            "points":[],
            "largeSizePoints":[],
            "smallSizePoints":[]
        }
    }

    midXVal = float(sorted(metadataMap[xAttr]['domain'])[len(metadataMap[xAttr]['domain'])/2])
    midYVal = float(sorted(metadataMap[yAttr]['domain'])[len(metadataMap[yAttr]['domain'])/2])
    midSizeVal = float(sorted(metadataMap[sizeAttr]['domain'])[len(metadataMap[sizeAttr]['domain'])/2])

    for dataObj in dataList:
        xVal = dataObj['xVal']
        yVal = dataObj['yVal']
        
        if xVal<=midXVal and yVal<=midYVal: # Q3
            groupMap["Q3"]["points"].append(dataObj['itemLabel'])
            if(dataObj['sizeAttrValue']>=midSizeVal):
                groupMap["Q3"]["largeSizePoints"].append(dataObj['itemLabel'])
            elif(dataObj['sizeAttrValue']<=midSizeVal):
                groupMap["Q3"]["smallSizePoints"].append(dataObj['itemLabel'])
        elif xVal<=midXVal and yVal>midYVal: # Q2
            groupMap["Q2"]["points"].append(dataObj['itemLabel'])
            if(dataObj['sizeAttrValue']>=midSizeVal):
                groupMap["Q2"]["largeSizePoints"].append(dataObj['itemLabel'])
            elif(dataObj['sizeAttrValue']<=midSizeVal):
                groupMap["Q3"]["smallSizePoints"].append(dataObj['itemLabel'])
        elif xVal>midXVal and yVal<=midYVal: #Q4
            groupMap["Q4"]["points"].append(dataObj['itemLabel'])
            if(dataObj['sizeAttrValue']>=midSizeVal):
                groupMap["Q4"]["largeSizePoints"].append(dataObj['itemLabel'])
            elif(dataObj['sizeAttrValue']<=midSizeVal):
                groupMap["Q3"]["smallSizePoints"].append(dataObj['itemLabel'])
        elif xVal>midXVal and yVal>midYVal: #Q1
            groupMap["Q1"]["points"].append(dataObj['itemLabel'])
            if(dataObj['sizeAttrValue']>=midSizeVal):
                groupMap["Q1"]["largeSizePoints"].append(dataObj['itemLabel'])
            elif(dataObj['sizeAttrValue']<=midSizeVal):
                groupMap["Q3"]["smallSizePoints"].append(dataObj['itemLabel'])

    groupCountThreshold = 0.7
    try:
        if float(len(groupMap["Q1"]['largeSizePoints']))/float(len(groupMap["Q1"]['points'])) >= groupCountThreshold:
            potentialDataFact = getQuadrantDistributionDataFactObject()
            potentialDataFact['type'] = "QxQxQ_QuadrantDistributionFact"
            potentialDataFact['sizeFocus'] = 'large'
            potentialDataFact['primaryTargetObjectType'] = "valueList"
            potentialDataFact['primaryTargetObject'] = [midXVal,midYVal,midSizeVal]
            potentialDataFact['tier'] = 1
            potentialDataFact['quadrant'] = 1
            potentialDataFact['defaultHtml'] = 'Most items with <b>high ' + xAttr + '</b> and <b>high ' + yAttr + '</b> also have <b>high ' + sizeAttr + '</b>'
            potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
            potentialDataFact['attributes'] = [xAttr,yAttr,sizeAttr]
            potentialDataFact['keywords'] = distributionKeywords
            
            # potentialDataFact['annotationMap']['quadrant_lines'] = "checked"
            # potentialDataFact['annotationMap']['stroke'] = "checked"
            potentialDataFact['annotationMap']['opacity'] = "checked"

            potentialDataFacts.append(potentialDataFact)
        if float(len(groupMap["Q2"]['largeSizePoints']))/float(len(groupMap["Q2"]['points'])) >= groupCountThreshold:
            potentialDataFact = getQuadrantDistributionDataFactObject()
            potentialDataFact['type'] = "QxQxQ_QuadrantDistributionFact"
            potentialDataFact['sizeFocus'] = 'large'
            potentialDataFact['primaryTargetObjectType'] = "valueList"
            potentialDataFact['primaryTargetObject'] = [midXVal,midYVal,midSizeVal]
            potentialDataFact['tier'] = 1
            potentialDataFact['quadrant'] = 2
            potentialDataFact['defaultHtml'] = 'Most items with <b>low ' + xAttr + '</b> and <b>high ' + yAttr + '</b> have <b>high ' + sizeAttr + '</b>'
            potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
            potentialDataFact['attributes'] = [xAttr,yAttr,sizeAttr]
            potentialDataFact['keywords'] = distributionKeywords
            
            # potentialDataFact['annotationMap']['quadrant_lines'] = "checked"
            # potentialDataFact['annotationMap']['stroke'] = "checked"
            potentialDataFact['annotationMap']['opacity'] = "checked"

            potentialDataFacts.append(potentialDataFact)
        if float(len(groupMap["Q3"]['largeSizePoints']))/float(len(groupMap["Q3"]['points'])) >= groupCountThreshold:
            potentialDataFact = getQuadrantDistributionDataFactObject()
            potentialDataFact['type'] = "QxQxQ_QuadrantDistributionFact"
            potentialDataFact['sizeFocus'] = 'large'
            potentialDataFact['primaryTargetObjectType'] = "valueList"
            potentialDataFact['primaryTargetObject'] = [midXVal,midYVal,midSizeVal]
            potentialDataFact['tier'] = 1
            potentialDataFact['quadrant'] = 3
            potentialDataFact['defaultHtml'] = 'Most items with <b>low ' + xAttr + '</b> and <b>low ' + yAttr + '</b> have <b>high ' + sizeAttr + '</b>'
            potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
            potentialDataFact['attributes'] = [xAttr,yAttr,sizeAttr]
            potentialDataFact['keywords'] = distributionKeywords
            
            # potentialDataFact['annotationMap']['quadrant_lines'] = "checked"
            # potentialDataFact['annotationMap']['stroke'] = "checked"
            potentialDataFact['annotationMap']['opacity'] = "checked"

            potentialDataFacts.append(potentialDataFact)
        if float(len(groupMap["Q4"]['largeSizePoints']))/float(len(groupMap["Q4"]['points'])) >= groupCountThreshold:
            potentialDataFact = getQuadrantDistributionDataFactObject()
            potentialDataFact['type'] = "QxQxQ_QuadrantDistributionFact"
            potentialDataFact['sizeFocus'] = 'large'
            potentialDataFact['primaryTargetObjectType'] = "valueList"
            potentialDataFact['primaryTargetObject'] = [midXVal,midYVal,midSizeVal]
            potentialDataFact['tier'] = 1
            potentialDataFact['quadrant'] = 4
            potentialDataFact['defaultHtml'] = 'Most items with <b>high ' + xAttr + '</b> and <b>low ' + yAttr + '</b> have <b>high ' + sizeAttr + '</b>'
            potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
            potentialDataFact['attributes'] = [xAttr,yAttr,sizeAttr]
            potentialDataFact['keywords'] = distributionKeywords
            
            # potentialDataFact['annotationMap']['quadrant_lines'] = "checked"
            # potentialDataFact['annotationMap']['stroke'] = "checked"
            potentialDataFact['annotationMap']['opacity'] = "checked"

            potentialDataFacts.append(potentialDataFact)


        if float(len(groupMap["Q1"]['smallSizePoints']))/float(len(groupMap["Q1"]['points'])) >= groupCountThreshold:
            potentialDataFact = getQuadrantDistributionDataFactObject()
            potentialDataFact['type'] = "QxQxQ_QuadrantDistributionFact"
            potentialDataFact['sizeFocus'] = 'small'
            potentialDataFact['primaryTargetObjectType'] = "valueList"
            potentialDataFact['primaryTargetObject'] = [midXVal,midYVal,midSizeVal]
            potentialDataFact['tier'] = 1
            potentialDataFact['quadrant'] = 1
            potentialDataFact['defaultHtml'] = 'Most items with <b>high ' + xAttr + '</b> and <b>high ' + yAttr + '</b> have <b>low ' + sizeAttr + '</b>'
            potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
            potentialDataFact['attributes'] = [xAttr,yAttr,sizeAttr]
            potentialDataFact['keywords'] = distributionKeywords
            
            # potentialDataFact['annotationMap']['quadrant_lines'] = "checked"
            # potentialDataFact['annotationMap']['stroke'] = "checked"
            potentialDataFact['annotationMap']['opacity'] = "checked"

            potentialDataFacts.append(potentialDataFact)
        if float(len(groupMap["Q2"]['smallSizePoints']))/float(len(groupMap["Q2"]['points'])) >= groupCountThreshold:
            potentialDataFact = getQuadrantDistributionDataFactObject()
            potentialDataFact['type'] = "QxQxQ_QuadrantDistributionFact"
            potentialDataFact['sizeFocus'] = 'small'
            potentialDataFact['primaryTargetObjectType'] = "valueList"
            potentialDataFact['primaryTargetObject'] = [midXVal,midYVal,midSizeVal]
            potentialDataFact['tier'] = 1
            potentialDataFact['quadrant'] = 2
            potentialDataFact['defaultHtml'] = 'Most items with <b>low ' + xAttr + '</b> and <b>high ' + yAttr + '</b> have <b>low ' + sizeAttr + '</b>'
            potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
            potentialDataFact['attributes'] = [xAttr,yAttr,sizeAttr]
            potentialDataFact['keywords'] = distributionKeywords
            
            # potentialDataFact['annotationMap']['quadrant_lines'] = "checked"
            # potentialDataFact['annotationMap']['stroke'] = "checked"
            potentialDataFact['annotationMap']['opacity'] = "checked"

            potentialDataFacts.append(potentialDataFact)
        if float(len(groupMap["Q3"]['smallSizePoints']))/float(len(groupMap["Q3"]['points'])) >= groupCountThreshold:
            potentialDataFact = getQuadrantDistributionDataFactObject()
            potentialDataFact['type'] = "QxQxQ_QuadrantDistributionFact"
            potentialDataFact['sizeFocus'] = 'small'
            potentialDataFact['primaryTargetObjectType'] = "valueList"
            potentialDataFact['primaryTargetObject'] = [midXVal,midYVal,midSizeVal]
            potentialDataFact['tier'] = 1
            potentialDataFact['quadrant'] = 3
            potentialDataFact['defaultHtml'] = 'Most items with <b>low ' + xAttr + '</b> and <b>low ' + yAttr + '</b> also have <b>low ' + sizeAttr + '</b>'
            potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
            potentialDataFact['attributes'] = [xAttr,yAttr,sizeAttr]
            potentialDataFact['keywords'] = distributionKeywords
            
            # potentialDataFact['annotationMap']['quadrant_lines'] = "checked"
            # potentialDataFact['annotationMap']['stroke'] = "checked"
            potentialDataFact['annotationMap']['opacity'] = "checked"

            potentialDataFacts.append(potentialDataFact)
        if float(len(groupMap["Q4"]['smallSizePoints']))/float(len(groupMap["Q4"]['points'])) >= groupCountThreshold:
            potentialDataFact = getQuadrantDistributionDataFactObject()
            potentialDataFact['type'] = "QxQxQ_QuadrantDistributionFact"
            potentialDataFact['sizeFocus'] = 'small'
            potentialDataFact['primaryTargetObjectType'] = "valueList"
            potentialDataFact['primaryTargetObject'] = [midXVal,midYVal,midSizeVal]
            potentialDataFact['tier'] = 1
            potentialDataFact['quadrant'] = 4
            potentialDataFact['defaultHtml'] = 'Most items with <b>high ' + xAttr + '</b> and <b>low ' + yAttr + '</b> have <b>low ' + sizeAttr + '</b>'
            potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
            potentialDataFact['attributes'] = [xAttr,yAttr,sizeAttr]
            potentialDataFact['keywords'] = distributionKeywords
            
            # potentialDataFact['annotationMap']['quadrant_lines'] = "checked"
            # potentialDataFact['annotationMap']['stroke'] = "checked"
            potentialDataFact['annotationMap']['opacity'] = "checked"

            potentialDataFacts.append(potentialDataFact)
    except:
        pass

    return potentialDataFacts

def getCommonDataFactsForColoredAndSizedScatterplot_QxQxN(xAttr, yAttr, colorAttr, dataList, metadataMap):
    potentialDataFacts = []
    groupMap = {}

    midXVal = float(sorted(metadataMap[xAttr]['domain'])[len(metadataMap[xAttr]['domain'])/2])
    midYVal = float(sorted(metadataMap[yAttr]['domain'])[len(metadataMap[yAttr]['domain'])/2])

    xValues = []
    yValues = []

    for dataObj in dataList:
        xVal = dataObj['xVal']
        yVal = dataObj['yVal']
        colorVal = dataObj['colorAttrValue']

        xValues.append(xVal)
        yValues.append(yVal)

        if colorVal not in groupMap:
            groupMap[colorVal] = {
                "Q1":{
                    "count":0
                },
                "Q2":{
                    "count":0
                },
                "Q3":{
                    "count":0
                },
                "Q4":{
                    "count":0
                },
                "totalCount" : 0,
                "xVals":[],
                "yVals":[]
            }

        groupMap[colorVal]["totalCount"] += 1.0
        if xVal<=midXVal and yVal<=midYVal: # Q3
            groupMap[colorVal]["Q3"]['count'] += 1.0
        elif xVal<=midXVal and yVal>midYVal: # Q2
            groupMap[colorVal]["Q2"]['count'] += 1.0
        elif xVal>midXVal and yVal<=midYVal: #Q4
            groupMap[colorVal]["Q4"]['count'] += 1.0
        elif xVal>midXVal and yVal>midYVal: #Q1
            groupMap[colorVal]["Q1"]['count'] += 1.0

        groupMap[colorVal]['xVals'].append(xVal)
        groupMap[colorVal]['yVals'].append(yVal)
    
    groupCountThreshold = 0.75
    for colorVal in groupMap:
        if groupMap[colorVal]['Q1']['count']/groupMap[colorVal]['totalCount'] >= groupCountThreshold:
            potentialDataFact = getQuadrantDistributionDataFactObject()
            potentialDataFact['primaryTargetObjectType'] = "category"
            potentialDataFact['primaryTargetObject'] = colorVal
            potentialDataFact['tier'] = 1
            potentialDataFact['quadrant'] = 1
            potentialDataFact['defaultHtml'] = 'Most items with ' + colorAttr + ': <b>' + colorVal + '</b> have <b>high ' + xAttr + '</b> and <b>high ' + yAttr + '</b>'
            potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
            potentialDataFact['attributes'] = [xAttr,yAttr,colorAttr]
            potentialDataFact['keywords'] = distributionKeywords

            # potentialDataFact['annotationMap']['hull'] = "checked"
            # potentialDataFact['annotationMap']['quadrant_lines'] = "checked"
            # potentialDataFact['annotationMap']['stroke'] = "checked"
            potentialDataFact['annotationMap']['opacity'] = "checked"
            # potentialDataFact['annotationMap']['text_highlight'] = "checked"

            potentialDataFacts.append(potentialDataFact)
        elif groupMap[colorVal]['Q2']['count']/groupMap[colorVal]['totalCount'] >= groupCountThreshold:
            potentialDataFact = getQuadrantDistributionDataFactObject()
            potentialDataFact['primaryTargetObjectType'] = "category"
            potentialDataFact['primaryTargetObject'] = colorVal
            potentialDataFact['tier'] = 1
            potentialDataFact['quadrant'] = 2
            potentialDataFact['defaultHtml'] = 'Most items with ' + colorAttr + ': <b>' + colorVal + '</b> have <b>low ' + xAttr + '</b> and <b>high ' + yAttr + '</b>'
            potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
            potentialDataFact['attributes'] = [xAttr,yAttr,colorAttr]
            potentialDataFact['keywords'] = distributionKeywords

            # potentialDataFact['annotationMap']['hull'] = "checked"
            # potentialDataFact['annotationMap']['quadrant_lines'] = "checked"
            # potentialDataFact['annotationMap']['stroke'] = "checked"
            potentialDataFact['annotationMap']['opacity'] = "checked"
            # potentialDataFact['annotationMap']['text_highlight'] = "checked"

            potentialDataFacts.append(potentialDataFact)
        elif groupMap[colorVal]['Q3']['count']/groupMap[colorVal]['totalCount'] >= groupCountThreshold:
            potentialDataFact = getQuadrantDistributionDataFactObject()
            potentialDataFact['primaryTargetObjectType'] = "category"
            potentialDataFact['primaryTargetObject'] = colorVal
            potentialDataFact['tier'] = 1
            potentialDataFact['quadrant'] = 3
            potentialDataFact['defaultHtml'] = 'Most items with ' + colorAttr + ': <b>' + colorVal + '</b> have <b>low ' + xAttr + '</b> and <b>low ' + yAttr + '</b>'
            potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
            potentialDataFact['attributes'] = [xAttr,yAttr,colorAttr]
            potentialDataFact['keywords'] = distributionKeywords

            # potentialDataFact['annotationMap']['hull'] = "checked"
            # potentialDataFact['annotationMap']['quadrant_lines'] = "checked"
            # potentialDataFact['annotationMap']['stroke'] = "checked"
            potentialDataFact['annotationMap']['opacity'] = "checked"
            # potentialDataFact['annotationMap']['text_highlight'] = "checked"

            potentialDataFacts.append(potentialDataFact)
        elif groupMap[colorVal]['Q4']['count']/groupMap[colorVal]['totalCount'] >= groupCountThreshold:
            potentialDataFact = getQuadrantDistributionDataFactObject()
            potentialDataFact['primaryTargetObjectType'] = "category"
            potentialDataFact['primaryTargetObject'] = colorVal
            potentialDataFact['tier'] = 1
            potentialDataFact['quadrant'] = 4
            potentialDataFact['defaultHtml'] = 'Most items with ' + colorAttr + ': <b>' + colorVal + '</b> have <b>high ' + xAttr + '</b> and <b>low ' + yAttr + '</b>'
            potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
            potentialDataFact['attributes'] = [xAttr,yAttr,colorAttr]
            potentialDataFact['keywords'] = distributionKeywords

            # potentialDataFact['annotationMap']['hull'] = "checked"
            # potentialDataFact['annotationMap']['quadrant_lines'] = "checked"
            # potentialDataFact['annotationMap']['stroke'] = "checked"
            potentialDataFact['annotationMap']['opacity'] = "checked"
            # potentialDataFact['annotationMap']['text_highlight'] = "checked"

            potentialDataFacts.append(potentialDataFact)

    return potentialDataFacts

def getDataFactsForColoredScatterplot_QxQxN(xAttr, yAttr, colorAttr, dataList, metadataMap):
    potentialDataFacts = []
    groupMap = {}

    midXVal = float(sorted(metadataMap[xAttr]['domain'])[len(metadataMap[xAttr]['domain'])/2])
    midYVal = float(sorted(metadataMap[yAttr]['domain'])[len(metadataMap[yAttr]['domain'])/2])

    xValues = []
    yValues = []

    for dataObj in dataList:
        xVal = dataObj['xVal']
        yVal = dataObj['yVal']
        colorVal = dataObj['colorAttrValue']

        xValues.append(xVal)
        yValues.append(yVal)

        if colorVal not in groupMap:
            groupMap[colorVal] = {
                "Q1":{
                    "count":0
                },
                "Q2":{
                    "count":0
                },
                "Q3":{
                    "count":0
                },
                "Q4":{
                    "count":0
                },
                "totalCount" : 0,
                "xVals":[],
                "yVals":[]
            }

        groupMap[colorVal]["totalCount"] += 1.0
        if xVal<=midXVal and yVal<=midYVal: # Q3
            groupMap[colorVal]["Q3"]['count'] += 1.0
        elif xVal<=midXVal and yVal>midYVal: # Q2
            groupMap[colorVal]["Q2"]['count'] += 1.0
        elif xVal>midXVal and yVal<=midYVal: #Q4
            groupMap[colorVal]["Q4"]['count'] += 1.0
        elif xVal>midXVal and yVal>midYVal: #Q1
            groupMap[colorVal]["Q1"]['count'] += 1.0

        groupMap[colorVal]['xVals'].append(xVal)
        groupMap[colorVal]['yVals'].append(yVal)

    correlation = CorrelationPearson()
    correlationCoef = correlation.result(xValues,yValues)    

    if correlationCoef <= -0.7:
        potentialDataFact = getCorrelationDataFactObject()
        potentialDataFact['primaryTargetObjectType'] = 'value'
        potentialDataFact['value'] = round(correlationCoef,2)
        potentialDataFact['tier'] = 1
        potentialDataFact['defaultHtml'] = "Overall, <b>" + xAttr + "</b> and <b>" + yAttr + "</b> have a <b>strong inverse correlation</b>"
        potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
        potentialDataFact['attributes'] = [xAttr,yAttr,colorAttr]
        potentialDataFact['keywords'] = correlationKeywords

        potentialDataFact['annotationMap']['regression_line'] = "checked"
        potentialDataFacts.append(potentialDataFact)
    elif correlationCoef <= -0.5 and correlationCoef > -0.7:
        potentialDataFact = getCorrelationDataFactObject()
        potentialDataFact['primaryTargetObjectType'] = 'value'
        potentialDataFact['value'] = round(correlationCoef,2)
        potentialDataFact['tier'] = 2
        potentialDataFact['defaultHtml'] = "Overall, <b>" + xAttr + "</b> and <b>" + yAttr + "</b> have a <b>moderate inverse correlation</b>"
        potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
        potentialDataFact['attributes'] = [xAttr,yAttr,colorAttr]
        potentialDataFact['keywords'] = correlationKeywords

        potentialDataFact['annotationMap']['regression_line'] = "checked"
        potentialDataFacts.append(potentialDataFact)
    elif correlationCoef >= 0.5 and correlationCoef < 0.7:
        potentialDataFact = getCorrelationDataFactObject()
        potentialDataFact['primaryTargetObjectType'] = 'value'
        potentialDataFact['value'] = round(correlationCoef,2)
        potentialDataFact['tier'] = 2
        potentialDataFact['defaultHtml'] = "Overall, <b>" + xAttr + "</b> and <b>" + yAttr + "</b> have a <b>moderate correlation</b>"
        potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
        potentialDataFact['attributes'] = [xAttr,yAttr,colorAttr]
        potentialDataFact['keywords'] = correlationKeywords

        potentialDataFact['annotationMap']['regression_line'] = "checked"
        potentialDataFacts.append(potentialDataFact)  
    elif correlationCoef >= 0.7:
        potentialDataFact = getCorrelationDataFactObject()
        potentialDataFact['primaryTargetObjectType'] = 'value'
        potentialDataFact['value'] = round(correlationCoef,2)
        potentialDataFact['tier'] = 1
        potentialDataFact['defaultHtml'] = "Overall, <b>" + xAttr + "</b> and <b>" + yAttr + "</b> have a <b>strong correlation</b>"
        potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
        potentialDataFact['attributes'] = [xAttr,yAttr,colorAttr]
        potentialDataFact['keywords'] = correlationKeywords

        potentialDataFact['annotationMap']['regression_line'] = "checked"
        potentialDataFacts.append(potentialDataFact)    

    groupCountThreshold = 0.75
    for colorVal in groupMap:
        correlation = CorrelationPearson()
        try:
            groupMap[colorVal]['correlationCoef'] = correlation.result(groupMap[colorVal]['xVals'],groupMap[colorVal]['yVals'])
            # print groupMap[colorVal]['xVals'],groupMap[colorVal]['yVals']
            # print groupMap[colorVal]['correlationCoef']
            # if groupMap[colorVal]['correlationCoef']<-0.5 or groupMap[colorVal]['correlationCoef']>0.5:
            #     print xAttr,yAttr,colorAttr
            if groupMap[colorVal]['correlationCoef'] <= -0.7:
                potentialDataFact = getCategoryCorrelationDataFactObject()
                potentialDataFact['primaryTargetObjectType'] = 'value'
                potentialDataFact['secondaryTargetObjectType'] = 'category'
                potentialDataFact['primaryTargetObject'] = round(groupMap[colorVal]['correlationCoef'],2)
                potentialDataFact['secondaryTargetObject'] = colorVal
                # potentialDataFact['value'] = round(groupMap[colorVal]['correlationCoef'],2)
                potentialDataFact['tier'] = 1
                potentialDataFact['defaultHtml'] = 'Items with ' + colorAttr + ':<b>' + colorVal + '</b> exhibit a <b>strong inverse correlation</b> between ' + xAttr + ' and ' + yAttr
                potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
                potentialDataFact['attributes'] = [xAttr,yAttr,colorAttr]
                potentialDataFact['keywords'] = correlationKeywords

                # potentialDataFact['annotationMap']['hull'] = "checked"
                potentialDataFact['annotationMap']['regression_line'] = "checked"
                # potentialDataFact['annotationMap']['stroke'] = "checked"
                potentialDataFact['annotationMap']['opacity'] = "checked"

                potentialDataFacts.append(potentialDataFact)
            elif groupMap[colorVal]['correlationCoef'] <=-0.5 and groupMap[colorVal]['correlationCoef'] >-0.7:
                potentialDataFact = getCategoryCorrelationDataFactObject()
                potentialDataFact['primaryTargetObjectType'] = 'value'
                potentialDataFact['secondaryTargetObjectType'] = 'category'
                potentialDataFact['primaryTargetObject'] = round(groupMap[colorVal]['correlationCoef'],2)
                potentialDataFact['secondaryTargetObject'] = colorVal
                # potentialDataFact['value'] = round(groupMap[colorVal]['correlationCoef'],2)
                potentialDataFact['tier'] = 2
                potentialDataFact['defaultHtml'] = 'Items with ' + colorAttr + ':<b>' + colorVal + '</b> exhibit a <b>moderate inverse correlation</b> between ' + xAttr + ' and ' + yAttr
                potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
                potentialDataFact['attributes'] = [xAttr,yAttr,colorAttr]
                potentialDataFact['keywords'] = correlationKeywords

                # potentialDataFact['annotationMap']['hull'] = "checked"
                potentialDataFact['annotationMap']['regression_line'] = "checked"
                # potentialDataFact['annotationMap']['stroke'] = "checked"
                potentialDataFact['annotationMap']['opacity'] = "checked"

                potentialDataFacts.append(potentialDataFact)
            elif groupMap[colorVal]['correlationCoef'] >= 0.5 and groupMap[colorVal]['correlationCoef'] < 0.7:
                potentialDataFact = getCategoryCorrelationDataFactObject()
                potentialDataFact['primaryTargetObjectType'] = 'value'
                potentialDataFact['secondaryTargetObjectType'] = 'category'
                potentialDataFact['primaryTargetObject'] = round(groupMap[colorVal]['correlationCoef'],2)
                potentialDataFact['secondaryTargetObject'] = colorVal
                potentialDataFact['tier'] = 2
                potentialDataFact['defaultHtml'] = 'Items with ' + colorAttr + ':<b>' + colorVal + '</b> exhibit a <b>moderate correlation</b> between ' + xAttr + ' and ' + yAttr
                potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
                potentialDataFact['attributes'] = [xAttr,yAttr,colorAttr]
                potentialDataFact['keywords'] = correlationKeywords

                # potentialDataFact['annotationMap']['hull'] = "checked"
                potentialDataFact['annotationMap']['regression_line'] = "checked"
                # potentialDataFact['annotationMap']['stroke'] = "checked"
                potentialDataFact['annotationMap']['opacity'] = "checked"
                
                potentialDataFacts.append(potentialDataFact)
            elif groupMap[colorVal]['correlationCoef'] >= 0.7:
                potentialDataFact = getCategoryCorrelationDataFactObject()
                potentialDataFact['primaryTargetObjectType'] = 'value'
                potentialDataFact['secondaryTargetObjectType'] = 'category'
                potentialDataFact['primaryTargetObject'] = round(groupMap[colorVal]['correlationCoef'],2)
                potentialDataFact['secondaryTargetObject'] = colorVal
                potentialDataFact['tier'] = 1
                potentialDataFact['defaultHtml'] = 'Items with ' + colorAttr + ':<b>' + colorVal + '</b> exhibit a <b>strong correlation</b> between ' + xAttr + ' and ' + yAttr
                potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
                potentialDataFact['attributes'] = [xAttr,yAttr,colorAttr]
                potentialDataFact['keywords'] = correlationKeywords

                # potentialDataFact['annotationMap']['hull'] = "checked"
                potentialDataFact['annotationMap']['regression_line'] = "checked"
                # potentialDataFact['annotationMap']['stroke'] = "checked"
                potentialDataFact['annotationMap']['opacity'] = "checked"
                
                potentialDataFacts.append(potentialDataFact)
        except:
            pass

    return potentialDataFacts

def getCommonDataFacts_ColoredTickPlotAndScatterplot_NxQxN(xAttr,yAttr,colorAttr,dataList,metadataMap,itemAttr):
    sortedDataList = sorted(dataList,key=lambda x: x['yVal'])
    potentialDataFacts = []

    # lowest value item
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MIN"
    potentialDataFact['primaryTargetObjectType'] = "item"
    potentialDataFact['secondaryTargetObjectType'] = "categoryList"
    potentialDataFact['primaryTargetObject'] = sortedDataList[0]['itemLabel']
    potentialDataFact['secondaryTargetObject'] = [sortedDataList[0]['colorAttrValue'],sortedDataList[0]['xVal']]
    potentialDataFact['tier'] = 1
    potentialDataFact['defaultHtml'] = "Item (<b>" + potentialDataFact['primaryTargetObject'] + "</b>) with <b>lowest</b> value for <b>" + yAttr + '</b> has ' + xAttr + ':<b>' + sortedDataList[0]['xVal'] + '</b> and ' + colorAttr + ':<b>' + sortedDataList[0]['colorAttrValue'] + '</b>'
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [xAttr,yAttr,colorAttr]
    potentialDataFact['keywords'] = lowExtremeKeywords

    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"
    # potentialDataFact['annotationMap']['item_label'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    # second lowest item
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MIN"
    potentialDataFact['primaryTargetObjectType'] = "item"
    potentialDataFact['secondaryTargetObjectType'] = "categoryList"
    potentialDataFact['primaryTargetObject'] = sortedDataList[-1]['itemLabel']
    potentialDataFact['secondaryTargetObject'] = [sortedDataList[-1]['colorAttrValue'],sortedDataList[-1]['xVal']]
    potentialDataFact['tier'] = 2
    potentialDataFact['defaultHtml'] = "Item (<b>" + potentialDataFact['primaryTargetObject'] + "</b>) with <b>second lowest</b> value for <b>" + yAttr + '</b> has ' + xAttr + ':<b>' + sortedDataList[-1]['xVal'] + '</b> and ' + colorAttr + ':<b>' + sortedDataList[-1]['colorAttrValue'] + '</b>'
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [xAttr,yAttr,colorAttr]
    potentialDataFact['keywords'] = lowExtremeKeywords
    
    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"
    # potentialDataFact['annotationMap']['item_label'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    # highest value item
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MAX"
    potentialDataFact['primaryTargetObjectType'] = "item"
    potentialDataFact['secondaryTargetObjectType'] = "categoryList"
    potentialDataFact['primaryTargetObject'] = sortedDataList[-1]['itemLabel']
    potentialDataFact['secondaryTargetObject'] = [sortedDataList[-1]['colorAttrValue'],sortedDataList[-1]['xVal']]
    potentialDataFact['tier'] = 1
    potentialDataFact['defaultHtml'] = "Item (<b>" + potentialDataFact['primaryTargetObject'] + "</b>) with <b>highest</b> value for <b>" + yAttr + '</b> has ' + xAttr + ':<b>' + sortedDataList[-1]['xVal'] + '</b> and ' + colorAttr + ':<b>' + sortedDataList[-1]['colorAttrValue'] + '</b>'
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [xAttr,yAttr,colorAttr]
    potentialDataFact['keywords'] = highExtremeKeywords
    
    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"
    # potentialDataFact['annotationMap']['item_label'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    # second highest value item
    potentialDataFact = getExtremeValueDataFactObject()
    potentialDataFact['extremeFunction'] = "MAX"
    potentialDataFact['primaryTargetObjectType'] = "item"
    potentialDataFact['secondaryTargetObjectType'] = "categoryList"
    potentialDataFact['primaryTargetObject'] = sortedDataList[-2]['itemLabel']
    potentialDataFact['secondaryTargetObject'] = [sortedDataList[-2]['colorAttrValue'],sortedDataList[-1]['xVal']]
    potentialDataFact['tier'] = 2
    potentialDataFact['defaultHtml'] = "Item (<b>" + potentialDataFact['primaryTargetObject'] + "</b>) with <b>second highest</b> value for " + yAttr + ' has ' + xAttr + ':<b>' + sortedDataList[-2]['xVal'] + '</b> and ' + colorAttr + ':<b>' + sortedDataList[-2]['colorAttrValue'] + '</b>'
    potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
    potentialDataFact['attributes'] = [xAttr,yAttr,colorAttr]
    potentialDataFact['keywords'] = highExtremeKeywords
    
    # potentialDataFact['annotationMap']['stroke'] = "checked"
    potentialDataFact['annotationMap']['opacity'] = "checked"
    # potentialDataFact['annotationMap']['text_highlight'] = "checked"
    # potentialDataFact['annotationMap']['item_label'] = "checked"

    potentialDataFacts.append(potentialDataFact)

    return potentialDataFacts

def getCommonDataFactsForTickPlotAndBoxPlotAndHistogram_Q(yAttr, dataList):
    potentialDataFacts = []
    values = []
    for dataObj in dataList:
        values.append(dataObj["value"])

    q75, q25 = np.percentile(values, [75 ,25])
    iqr = q75 - q25

    rangeDataFact = getRangeDistributionDataFactObject()
    rangeDataFact['primaryTargetObjectType'] = "valueList"
    rangeDataFact['primaryTargetObject'] = [q25,q75]
    rangeDataFact['tier'] = 1
    # rangeDataFact['defaultHtml'] = "Most values for " + yAttr + " are in the range " + str(rangeDataFact['primaryTargetObject'][0]) + ' - ' + str(rangeDataFact['primaryTargetObject'][1])
    rangeDataFact['defaultHtml'] = "Most values for <b>" + yAttr + "</b> are in the range <b>" + si_format(rangeDataFact['primaryTargetObject'][0]) + ' - ' + si_format(rangeDataFact['primaryTargetObject'][1]) + '</b>'
    rangeDataFact['activeHtml'] = rangeDataFact['defaultHtml']
    rangeDataFact['attributes'] = [yAttr]
    rangeDataFact['keywords'] = distributionKeywords

    # rangeDataFact['annotationMap']['stroke'] = "checked"
    rangeDataFact['annotationMap']['opacity'] = "checked"

    potentialDataFacts.append(rangeDataFact)

    
    outlierThreshold = 1.5
    outliers = []
    for dataObj in dataList:
        if (dataObj['value'] < (q25 - outlierThreshold*iqr)):
            outliers.append(
                {
                    "dataObj" : dataObj,
                    "distanceFromRangeBoundary": abs((q25 - outlierThreshold*iqr)-dataObj['value'])
                }
            )
        elif (dataObj['value'] > (q75 + outlierThreshold*iqr)):
            outliers.append(
                {
                    "dataObj" : dataObj,
                    "distanceFromRangeBoundary": abs(dataObj['value']-(q75 + outlierThreshold*iqr))
                }
            )

    
    sortedOutlierList = sorted(outliers, key=lambda x: x['distanceFromRangeBoundary'], reverse=True)
    for i in range(0,len(sortedOutlierList)):
        dataObj = sortedOutlierList[i]['dataObj']
        potentialDataFact = getOutlierDataFactObject()
        potentialDataFact['primaryTargetObjectType'] = "item"
        potentialDataFact['primaryTargetObject'] = dataObj['itemLabel']
        potentialDataFact['tier'] = 3
        potentialDataFact['defaultHtml'] = "<b>"+potentialDataFact['primaryTargetObject'] + "</b> appears to be an <b>outlier</b>"
        potentialDataFact['activeHtml'] = potentialDataFact['defaultHtml']
        potentialDataFact['attributes'] = [yAttr]
        potentialDataFact['keywords'] = outlierKeywords

        potentialDataFact['annotationMap']['stroke'] = "checked"
        potentialDataFact['annotationMap']['opacity'] = "checked"
        # potentialDataFact['annotationMap']['item_label'] = "checked"

        if i<2:
            potentialDataFact['tier'] = 1
        elif i>=2 and i<5:
            potentialDataFact['tier'] = 2

        potentialDataFacts.append(potentialDataFact)

    return potentialDataFacts

if __name__ == '__main__':
    pass