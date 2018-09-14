/**
 * Created by arjun010 on 11/5/17.
 */
(function () {
    utils = {};

    utils.cloneObj = function(obj) {
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            var copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            var copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = utils.cloneObj(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = utils.cloneObj(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    };

    utils.arraysEqual = function(arr1, arr2) {
        if(arr1.length !== arr2.length)
            return false;
        for(var i = arr1.length; i--;) {
            if(arr1[i] !== arr2[i])
                return false;
        }

        return true;
    };

    utils.getNewSpecificationVisObject = function(){
        let visObject = {};
        visObject['mark'] = "";
        visObject['x'] = {
            "attribute" : "",
            "transform" : ""
        };
        visObject['y'] = {
            "attribute" : "",
            "transform" : ""
        };
        visObject['color'] = {
            "attribute" : ""
        };
        visObject['size'] = {
            "attribute" : "",
            "transform" : ""
        };

        return visObject;
    };

    utils.visObjectMatchesVisSpecObj = function(visObject,visSpecObject){
        //console.log(visObject,visSpecObject);
        //console.log(isEquivalent(visObject.x,visSpecObject.x),isEquivalent(visObject.y,visSpecObject.y)
        //        ,isEquivalent(visObject.color,visSpecObject.color),isEquivalent(visObject.size,visSpecObject.size)
        //        ,visObject.mark==visSpecObject.mark);
        if(isEquivalent(visObject.x,visSpecObject.x) && isEquivalent(visObject.y,visSpecObject.y)
            && isEquivalent(visObject.color,visSpecObject.color) && isEquivalent(visObject.size,visSpecObject.size)
            && visObject.mark==visSpecObject.mark){
            return 1;
        }
        return -1;
    };

    utils.visObjectsAreEquivalent = function (visObject1, visObject2) {
        if(visObject1==null || visObject1==undefined || visObject2==null || visObject2==undefined){
            return -1;
        }else{
            if(isEquivalent(visObject1.x,visObject2.x) && isEquivalent(visObject1.y,visObject2.y)
                && isEquivalent(visObject1.color,visObject2.color) && isEquivalent(visObject1.size,visObject2.size)
                && visObject1.mark==visObject2.mark){
                return 1;
            }
            return -1;
        }
    };    

    isEquivalent = function(a, b) {
        // Create arrays of property names
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);

        // If number of properties is different,
        // objects are not equivalent
        if (aProps.length != bProps.length) {
            return false;
        }

        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];

            // If values of same property are not equal,
            // objects are not equivalent
            if (a[propName] !== b[propName]) {
                return false;
            }
        }

        // If we made it this far, objects
        // are considered equivalent
        return true;
    };

    utils.sortObj = function(list, key,order) {
        order = typeof order !== 'undefined' ? order : 'a';
        function compare(a, b) {
            a = a[key];
            b = b[key];
            var type = (typeof(a) === 'string' || typeof(b) === 'string') ? 'string' : 'number';
            var result;
            if (type === 'string'){
                if(key=='startDate' || key=='endDate'){
                    a = new Date(a).getTime();
                    b = new Date(b).getTime();
                    if(order=='a'){
                        result = a - b;
                    }else if(order=='d'){
                        result = b - a;
                    }
                    //if(order=='a'){
                    //    result = a < b;
                    //}else if(order=='d'){
                    //    result = a > b;
                    //}
                }else{
                    if(order=='a'){
                        result = a.localeCompare(b);
                    }else if(order=='d'){
                        result = b.localeCompare(a);
                    }
                }
            } else {
                if(order=='a'){
                    result = a - b;
                }else if(order=='d'){
                    result = b - a;
                }
            }
            return result;
        }
        return list.sort(compare);
    };

    utils.getAttributesFromVisObject = function(visObj){
        let attributes = [];
        for(var attribute of [visObj.x.attribute,visObj.y.attribute,visObj.size.attribute,visObj.color.attribute]){
            if(attribute!="" && attributes.indexOf(attribute)==-1){
                attributes.push(attribute);
            }
        }

        return attributes;
    };

    utils.getItemsFromDataFact = function(dataFactObject){
        let items = [];
        if(dataFactObject.primaryTargetObjectType == "item"){
            items.push(dataFactObject.primaryTargetObject);
        }else if(dataFactObject.primaryTargetObjectType == "itemList"){
            for(var item of dataFactObject.primaryTargetObject){
                items.push(item);
            }
        }else if(dataFactObject.secondaryTargetObjectType == "item"){
            items.push(dataFactObject.secondaryTargetObject);
        }else if(dataFactObject.secondaryTargetObjectType == "itemList"){
            for(var item of dataFactObject.secondaryTargetObject){
                items.push(item);
            }
        }
        return items;
    };

    utils.getCategoriesFromDataFact = function(dataFactObject){
        let categories = [];
        if(dataFactObject.primaryTargetObjectType == "category"){
            categories.push(dataFactObject.primaryTargetObject);
        }else if(dataFactObject.primaryTargetObjectType == "categoryList"){
            for(var category of dataFactObject.primaryTargetObject){
                categories.push(category);
            }
        }else if(dataFactObject.secondaryTargetObjectType == "category"){
            categories.push(dataFactObject.secondaryTargetObject);
        }else if(dataFactObject.secondaryTargetObjectType == "categoryList"){
            for(var category of dataFactObject.secondaryTargetObject){
                categories.push(category);
            }
        }
        return categories;
    };

    utils.searchMatchingDataFacts = function(searchString){
        // let itemAttributeIgnoreString = "name";
        // let itemAttributeIgnoreString = "model";
        let itemAttributeIgnoreString = globalVars.itemAttribute.toLowerCase();

        let matchingDataFacts = [];
        let possibleDFTargetKeys = ['primaryTargetObject','secondaryTargetObject','sourceCategory','targetCategory','attributes','keywords'];
        for(var attributeCombination in globalVars.mainSessionMap){
            for(var dataFact of globalVars.mainSessionMap[attributeCombination]['dfObjects']){
                let subStringMatchCount = 0;
                for(var targetKey of possibleDFTargetKeys){
                    let target = dataFact[targetKey];
                    if(target != undefined && isNaN(target)==true){
                        if(target instanceof Array){
                            for(var targetVal of target){
                                if(isNaN(targetVal)==true){
                                    let targetTokens = targetVal.toLowerCase().split(" ");
                                    let searchStringTokens = searchString.toLowerCase().split(" ");

                                    let matchedTokens = _.intersection(targetTokens,searchStringTokens);
                                    subStringMatchCount += matchedTokens.length;
                                    //if(matchedTokens.length>0){
                                    //    if(dataFact.tier<=globalVars.dataFactTierToShow){
                                    //        if(dataFact.defaultHtml.toLowerCase().indexOf(itemAttributeIgnoreString)==-1 && globalVars.displayedDataFactIds.indexOf(dataFact.id)==-1){
                                    //            matchingDataFacts.push(dataFact);
                                    //        }
                                    //    }
                                    //}
                                }
                            }
                        }else{
                            let targetTokens = target.toLowerCase().split(" ");
                            let searchStringTokens = searchString.toLowerCase().split(" ");

                            let matchedTokens = _.intersection(targetTokens,searchStringTokens);
                            subStringMatchCount += matchedTokens.length;
                            //if(matchedTokens.length>0){
                            //    if(dataFact.tier<=globalVars.dataFactTierToShow){
                            //        if(dataFact.defaultHtml.toLowerCase().indexOf(itemAttributeIgnoreString)==-1 && globalVars.displayedDataFactIds.indexOf(dataFact.id)==-1) {
                            //            matchingDataFacts.push(dataFact);
                            //        }
                            //    }
                            //}
                        }
                    }
                }

                let nonEmptySubStrings= 0;
                for(var subString of searchString.toLowerCase().split(" ")){
                    if(subString!=""){
                        nonEmptySubStrings+=1;
                    }
                }
                if(subStringMatchCount==nonEmptySubStrings && subStringMatchCount>0){
                    if(dataFact.tier<=globalVars.dataFactTierToShow){
                        if(dataFact.defaultHtml.toLowerCase().indexOf(itemAttributeIgnoreString)==-1 && globalVars.displayedDataFactIds.indexOf(dataFact.id)==-1) {
                            matchingDataFacts.push(dataFact);
                        }
                    }
                }
            }
        }
        return matchingDataFacts;
    };

    utils.isVisObjectInList = function(newVisObject,visObjectList){
        for(var visObj of visObjectList){
            if(utils.visObjectsAreEquivalent(visObj,newVisObject)!=-1 || utils.visObjsAreVariations(visObj, newVisObject)==true){
                return 1;
            }
        }
        return -1;
    };

    utils.updateVisMatchScore = function(sourceVisObj,targetVisObj){
        if(sourceVisObj==null || sourceVisObj==undefined || targetVisObj==null || targetVisObj==undefined){
            return;
        }else{
            targetVisObj.activeVisMatchScore = 0;
            if(sourceVisObj.x.attribute!="" && targetVisObj.x.attribute!=""){
                if(sourceVisObj.x.attribute==targetVisObj.x.attribute){
                    targetVisObj.activeVisMatchScore += 1;
                }
            }
            if(sourceVisObj.y.attribute!="" && targetVisObj.y.attribute!=""){
                if(sourceVisObj.y.attribute==targetVisObj.y.attribute){
                    targetVisObj.activeVisMatchScore += 1;
                }
            }
            if(sourceVisObj.color.attribute!="" && targetVisObj.color.attribute!=""){
                if(sourceVisObj.color.attribute==targetVisObj.color.attribute){
                    targetVisObj.activeVisMatchScore += 1;
                }
            }
            if(sourceVisObj.size.attribute!="" && targetVisObj.size.attribute!=""){
                if(sourceVisObj.size.attribute==targetVisObj.size.attribute){
                    targetVisObj.activeVisMatchScore += 1;
                }
            }
        }
    };

    utils.getUniqueAlternativeVisualizationsForFact = function(dataFact, activeVisObject){
        //console.log("==========")
        for(var visObj of dataFact.relatedVisObjects){
            utils.updateVisMatchScore(activeVisObject,visObj);
        }
        utils.sortObj(dataFact.relatedVisObjects,'activeVisMatchScore','d');
        let uniqueAlternativeVisObjs = [];
        for(var visObj of dataFact.relatedVisObjects){
            if(utils.visObjectsAreEquivalent(visObj,activeVisObject)==-1 && utils.visObjsAreVariations(visObj, activeVisObject)==false){
                //console.log(visObj.type, utils.isVisObjectInList(visObj,uniqueAlternativeVisObjs));
                if(utils.isVisObjectInList(visObj,uniqueAlternativeVisObjs)==-1){
                    uniqueAlternativeVisObjs.push(visObj);
                }
            }
        }
        //console.log(uniqueAlternativeVisObjs)
        return uniqueAlternativeVisObjs;
    };

    utils.visObjsAreVariations = function(visObj1, visObj2){
        if(visObj1==null || visObj1==undefined || visObj2==null || visObj2==undefined){
            return false;
        }else{
            if(visObj1.type == visObj2.type){
                let vis1Attrs = [], vis2Attrs = [];
                for(var vis1ObjAttr of [visObj1.x.attribute,visObj1.y.attribute,visObj1.color.attribute,visObj1.size.attribute]){
                    if(vis1ObjAttr!=""){
                        vis1Attrs.push(vis1ObjAttr);
                    }
                }
                for(var vis2ObjAttr of [visObj2.x.attribute,visObj2.y.attribute,visObj2.color.attribute,visObj2.size.attribute]){
                    if(vis2ObjAttr!=""){
                        vis2Attrs.push(vis2ObjAttr);
                    }
                }
                vis1Attrs.sort();
                vis2Attrs.sort();
                if(isEquivalent(vis1Attrs,vis2Attrs)){
                    return true;
                }else{
                    return false;
                }
            }
            return false;
        }
    };

})();