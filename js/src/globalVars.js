/**
 * Created by arjun010 on 11/4/17.
 */
(function(){
    globalVars = {};
    globalVars.dataList = null;
    globalVars.dataTypeMap = null;
    globalVars.itemAttribute = null;
    globalVars.insightMap = null;
    globalVars.insightCounter = 0;
    globalVars.activeVisObject = null;
    globalVars.activeVisAttributes = [];
    globalVars.metadataMap = null;
    globalVars.mainSessionMap = null;
    globalVars.dataFactMap = {};
    globalVars.displayedDataFactIds = [];

    globalVars.activeVisObjectList = [];

    globalVars.dataFactCounter = 0;

    globalVars.bookmarkedVisObjects = [];
    globalVars.bookmarkedDataFactMap = {}; // id : [visObj]

    globalVars.taskCategoryInterestMap = {
        "Distribution" : 0.0,
        "Correlation" : 0.0,
        "Anomaly" : 0.0,
        "Extremum" : 0.0,
        "DerivedValue" : 0.0
    };

    globalVars.taskInterestMap = {
        "OutlierFact":0.0,
        "ExtremeValueFact":0.0,
        "RelativeValueFact":0.0,
        "DerivedValueFact":0.0,
        "CorrelationFact":0.0,
        "CategoryCorrelationFact":0.0,
        "QuadrantDistributionFact":0.0,
        "RangeDistributionFact":0.0
    };

    globalVars.categoriesOfInterest = [];
    globalVars.itemsOfInterest = [];
    globalVars.attributesOfInterest = [];

})();