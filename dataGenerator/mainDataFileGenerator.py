__author__ = 'arjun010'

import sys, json, csv
from itertools import combinations
from visObject import *
from visListGenerator import *
reload(sys)
sys.setdefaultencoding('utf8')

# generates the mainDataMap and saves it as a js file
def generateMainDataFile(dataList, metadataMap):
    mainDataMap = {} # the map that will be used to drive the entire session
    dataFactMap = {}

    globalDataFactCounter = 0

    itemAttribute = None # itemAttribute is used in charts like scatterplot and tick plot to enable referring to individual data items
    for attribute in metadataMap:
        if 'isItemAttr' in metadataMap[attribute]:
            if metadataMap[attribute]['isItemAttr'] == "y":
                itemAttribute = attribute
                break

    attributeCombinations = getAttributeCombinations(metadataMap.keys()) # get all attribute combinations to use them as keys in mainDataMap
    for attributeCombination in attributeCombinations:    
        visObjects, dataFactObjects = getPossibleVisualizations(attributeCombination, dataList, metadataMap) # populate map with list of possible visualizations (and their data facts) for each attribute combination
        mainDataMap[",".join(attributeCombination)] = {
            "visObjects" : visObjects,
            "dfObjects" : dataFactObjects
        }
        # for dfObject in mainDataMap[",".join(attributeCombination)]["dfObjects"]:
        #     dfObject['id'] = globalDataFactCounter
        #     globalDataFactCounter += 1

        #     dataFactMap[dfObject['id']] = dfObject

    # print mainDataMap
    # outputJSFile = '../dataFiles/'+sys.argv[1].split("/")[1].split(".")[0]+'.js'
    # with open(outputJSFile, 'wb') as outfile:
    #     outfile.write("var mainDataMap = ")
    #     json.dump(mainDataMap, outfile)
    #     outfile.write(";")
    #     outfile.write("\n\n\n")
    #     outfile.write("var metadataMap = ")
    #     json.dump(metadataMap, outfile, indent=1)
    #     outfile.write(";")

    outputJSONFile = '../dataFiles/'+sys.argv[1].split("/")[1].split(".")[0]+'-mainDataMap.json'
    with open(outputJSONFile, 'wb') as outfile:
        json.dump(mainDataMap, outfile)
        # outfile.write(";")
        # outfile.write("\n\n\n")
        # outfile.write("var metadataMap = ")
        # json.dump(metadataMap, outfile, indent=1)
        # outfile.write(";")
    outputJSONFile = '../dataFiles/'+sys.argv[1].split("/")[1].split(".")[0]+'-metadataMap.json'
    with open(outputJSONFile, 'wb') as outfile:
        json.dump(metadataMap, outfile, indent=1)

    # outputJSONFile = '../dataFiles/'+sys.argv[1].split("/")[1].split(".")[0]+'-dataFactMap.json'
    # with open(outputJSONFile, 'wb') as outfile:
    #     json.dump(dataFactMap, outfile, indent=1)

# given a list of attributes, returns all of [1,2,3] combinations
def getAttributeCombinations(attributes):
    attributeCombinations = []
    for i in range(1,4):
        for combination in combinations(attributes,i):
            attributeCombinations.append(sorted(list(combination)))

    return attributeCombinations

if __name__ == '__main__':
    dataFile = sys.argv[1]
    metadataMapFile = sys.argv[2]

    metadataMap = json.load(open(metadataMapFile)) # load the data type map from a json file

    dataList = []
    dataFileReader = csv.reader(open(dataFile,'rb'))
    attributes = dataFileReader.next()

    for line in dataFileReader: # populate dataList with a list of data objects representing the CSV file rows
        dataObj = {}
        for attribute in attributes:
            attributeIndex = attributes.index(attribute)
            dataValue = line[attributeIndex]
            dataObj[attribute] = dataValue

            if metadataMap[attribute]['type']=="quantitative":
                if dataObj[attribute]=="":
                    dataObj[attribute] = 0.0
                else:
                    dataObj[attribute] = float(dataObj[attribute])
            else:
                if dataObj[attribute]=="":
                    dataObj[attribute] = "MissingValue"

            if "domain" in metadataMap[attribute]:
                if dataObj[attribute] not in metadataMap[attribute]["domain"]:
                    if metadataMap[attribute]['type']=="quantitative":
                        # print attribute,dataObj[attribute]
                        metadataMap[attribute]["domain"].append(float(dataObj[attribute]))
                    else:
                        metadataMap[attribute]["domain"].append(dataObj[attribute])
            else:
                metadataMap[attribute]["domain"] = [dataObj[attribute]]

        dataList.append(dataObj)

    generateMainDataFile(dataList, metadataMap)