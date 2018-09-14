__author__ = 'arjun010'

def getOutlierDataFactObject():
    dfObject = {}
    dfObject['id'] = ""
    dfObject['type'] = "OutlierFact"
    dfObject['relatedVisObjects'] = []
    dfObject['defaultHtml'] = ""
    dfObject['activeHtml'] = ""
    dfObject['tier'] = "" # 1, 2
    dfObject['interestingness'] = 0.0
    dfObject['taskCategory'] = "Anomaly"
    dfObject['annotationMap'] = {
        "stroke" : "",
        "quadrant_lines" : "",
        "hull" : "",
        "text_highlight" : "",
        "regression_line" : "",
        "opacity" : "",
        "item_label":""
    }

    dfObject['primaryTargetObjectType'] = "" # category, item, value
    dfObject['secondaryTargetObjectType'] = "" # category, item, value
    dfObject['primaryTargetObject'] = ""
    dfObject['secondaryTargetObject'] = ""

    return dfObject

def getExtremeValueDataFactObject():
    dfObject = {}
    dfObject['id'] = ""
    dfObject['type'] = "ExtremeValueFact"
    dfObject['relatedVisObjects'] = []
    dfObject['defaultHtml'] = ""
    dfObject['activeHtml'] = ""
    dfObject['tier'] = "" # 1, 2
    dfObject['interestingness'] = 0.0
    dfObject['taskCategory'] = "Extremum"
    dfObject['annotationMap'] = {
        "stroke" : "",
        "quadrant_lines" : "",
        "hull" : "",
        "text_highlight" : "",
        "regression_line" : "",
        "opacity" : "",
        "item_label":""
    }

    dfObject['extremeFunction'] = "" # MIN, MAX
    dfObject['primaryTargetObjectType'] = "" # category, item, value
    dfObject['secondaryTargetObjectType'] = "" # category, item, value
    dfObject['primaryTargetObject'] = ""
    dfObject['secondaryTargetObject'] = ""

    return dfObject

def getRelativeValueDataFactObject():
    dfObject = {}
    dfObject['id'] = ""
    dfObject['type'] = "RelativeValueFact"
    dfObject['relatedVisObjects'] = []
    dfObject['defaultHtml'] = ""
    dfObject['activeHtml'] = ""
    dfObject['tier'] = "" # 1, 2
    dfObject['interestingness'] = 0.0
    dfObject['taskCategory'] = "Distribution"
    dfObject['annotationMap'] = {
        "stroke" : "",
        "quadrant_lines" : "",
        "hull" : "",
        "text_highlight" : "",
        "regression_line" : "",
        "opacity" : "",
        "item_label":""
    }

    dfObject['primaryTargetObjectType'] = "" # category, item, value
    dfObject['secondaryTargetObjectType'] = "" # category, item, value
    dfObject['sourceCategory'] = ""
    dfObject['targetCategory'] = ""
    dfObject['diffFactor'] = None

    return dfObject

def getDerivedValueDataFactObject():
    dfObject = {}
    dfObject['id'] = ""
    dfObject['type'] = "DerivedValueFact"
    dfObject['relatedVisObjects'] = []
    dfObject['defaultHtml'] = ""
    dfObject['activeHtml'] = ""
    dfObject['tier'] = "" # 1
    dfObject['interestingness'] = 0.0
    dfObject['taskCategory'] = "DerivedValue"
    dfObject['annotationMap'] = {
        "stroke" : "",
        "quadrant_lines" : "",
        "hull" : "",
        "text_highlight" : "",
        "regression_line" : "",
        "opacity" : "",
        "item_label":""
    }

    dfObject['primaryTargetObjectType'] = "" # category, item, value
    dfObject['secondaryTargetObjectType'] = "" # category, item, value
    dfObject['value'] = None

    return dfObject

def getCorrelationDataFactObject():
    dfObject = {}
    dfObject['id'] = ""
    dfObject['type'] = "CorrelationFact"
    dfObject['relatedVisObjects'] = []
    dfObject['defaultHtml'] = ""
    dfObject['activeHtml'] = ""
    dfObject['tier'] = "" # 1
    dfObject['interestingness'] = 0.0
    dfObject['taskCategory'] = "Correlation"
    dfObject['annotationMap'] = {
        "stroke" : "",
        "quadrant_lines" : "",
        "hull" : "",
        "text_highlight" : "",
        "regression_line" : "",
        "opacity" : "",
        "item_label":""
    }

    dfObject['primaryTargetObjectType'] = "" # category, item, value
    dfObject['secondaryTargetObjectType'] = "" # category, item, value
    dfObject['value'] = None

    return dfObject

def getCategoryCorrelationDataFactObject():
    dfObject = {}
    dfObject['id'] = ""
    dfObject['type'] = "CategoryCorrelationFact"
    dfObject['relatedVisObjects'] = []
    dfObject['defaultHtml'] = ""
    dfObject['activeHtml'] = ""
    dfObject['tier'] = "" # 1
    dfObject['interestingness'] = 0.0
    dfObject['taskCategory'] = "Correlation"
    dfObject['annotationMap'] = {
        "stroke" : "",
        "quadrant_lines" : "",
        "hull" : "",
        "text_highlight" : "",
        "regression_line" : "",
        "opacity" : "",
        "item_label":""
    }

    dfObject['primaryTargetObjectType'] = "" # category, item, value
    dfObject['secondaryTargetObjectType'] = "" # category, item, value
    dfObject['value'] = None

    return dfObject

def getQuadrantDistributionDataFactObject():
    dfObject = {}
    dfObject['id'] = ""
    dfObject['type'] = "QuadrantDistributionFact"
    dfObject['relatedVisObjects'] = []
    dfObject['defaultHtml'] = ""
    dfObject['activeHtml'] = ""
    dfObject['tier'] = "" # 1
    dfObject['interestingness'] = 0.0
    dfObject['taskCategory'] = "Distribution"
    dfObject['annotationMap'] = {
        "stroke" : "",
        "quadrant_lines" : "",
        "hull" : "",
        "text_highlight" : "",
        "regression_line" : "",
        "opacity" : "",
        "item_label":""
    }

    dfObject['primaryTargetObjectType'] = "" # category, item, value
    dfObject['secondaryTargetObjectType'] = "" # category, item, value
    dfObject['quadrant'] = None

    return dfObject

def getRangeDistributionDataFactObject():
    dfObject = {}
    dfObject['id'] = ""
    dfObject['type'] = "RangeDistributionFact"
    dfObject['relatedVisObjects'] = []
    dfObject['defaultHtml'] = ""
    dfObject['activeHtml'] = ""
    dfObject['tier'] = "" # 1
    dfObject['interestingness'] = 0.0
    dfObject['taskCategory'] = "Distribution"
    dfObject['annotationMap'] = {
        "stroke" : "",
        "quadrant_lines" : "",
        "hull" : "",
        "text_highlight" : "",
        "regression_line" : "",
        "opacity" : "",
        "item_label":""
    }

    dfObject['primaryTargetObjectType'] = "" # category, item, value
    dfObject['secondaryTargetObjectType'] = "" # category, item, value
    dfObject['value'] = None

    return dfObject

if __name__ == '__main__':
    pass