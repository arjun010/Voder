/**
 * Created by arjun010 on 10/30/17.
 */
(function() {
    DerivedValueInsight = function (derivationFunction, categoryAttribute, valueAttribute, value) {
        this.id = globalVars.insightCounter++;
        this.derivationFunction = derivationFunction;
        this.categoryAttribute = categoryAttribute;
        this.valueAttribute = valueAttribute;
        this.value = value;
        this.html = getDerivedValueInsightHTML(this);
        this.suggestedVisList = [];
        this.appliedTransform = derivationFunction;
    };

    function getDerivedValueInsightHTML(insightObj) {
        var html = insightObj.derivationFunction + " of " + insightObj.valueAttribute + " across all " + insightObj.categoryAttribute + " is " + insightObj.value;
        return html;
    }

    ExtremeValueInsight = function(extremeType, targetObj, targetType, valueLabel, appliedTransform){
        this.id = globalVars.insightCounter++;
        this.extremeType = extremeType;
        this.targetType = targetType;
        this.targetObj = targetObj;
        this.valueLabel = valueLabel;
        this.html = getExtremeValueInsightHTML(this);
        this.suggestedVisList = [];
        this.appliedTransform = appliedTransform;
    };

    function getExtremeValueInsightHTML(insightObj){
        let html;
        if(insightObj.targetType=="category"){
            html = insightObj.targetObj.category + " has " + insightObj.extremeType + " value for " + insightObj.valueLabel;
        }else if(insightObj.targetType=="item"){
            html = insightObj.target + " has " + insightObj.extremeType + " value for " + insightObj.valueLabel;
        }else if(insightObj.targetType=="mix"){
            html = insightObj.targetObj.category + " has item (" + insightObj.targetObj.item + ") with " + insightObj.extremeType + " value for " + insightObj.valueLabel;
        }
        return html;
    }

    RelativeDistributionInsight = function (sourceCategory, targetCategory, relativeDifference, valueLabel, appliedTransform) {
        this.id = globalVars.insightCounter++;
        this.sourceCategory = sourceCategory;
        this.targetCategory = targetCategory;
        this.relativeDifference = relativeDifference;
        this.valueLabel = valueLabel;
        this.html = getRelativeDistributionInsightHTML(this);
        this.suggestedVisList = [];
        this.appliedTransform = appliedTransform;
    };

    function getRelativeDistributionInsightHTML(insightObj) {
        let html;
        if (insightObj.relativeDifference > 0.0) {
            html = insightObj.valueLabel + " for " + insightObj.targetCategory + " is " + Math.abs(insightObj.relativeDifference) + " times more than " + insightObj.sourceCategory;
        } else if (insightObj.relativeDifference < 0.0) {
            html = insightObj.valueLabel + " for " + insightObj.targetCategory + " is " + Math.abs(insightObj.relativeDifference) + " times less than " + insightObj.sourceCategory;
        }
        return html;
    }

    OutlierInsight = function(targetObj, targetType, valueLabel, appliedTransform){
        this.id = globalVars.insightCounter++;
        this.targetObj = targetObj;
        this.targetType = targetType;
        this.valueLabel = valueLabel;
        this.html = getOutlierInsightHTML(this);
        this.suggestedVisList = [];
        this.appliedTransform = appliedTransform;
    };

    function getOutlierInsightHTML(insightObj){
        let html;
        if(insightObj.targetType=="category"){
            html = insightObj.valueLabel + " for " + insightObj.targetObj.category + " appears to be an outlier.";
        }else if(insightObj.targetType=="item"){
            html = "";
        }else if(insightObj.targetType=="mix"){
            html = "";
        }
        return html;
    }

})();