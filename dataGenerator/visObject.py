__author__ = 'arjun010'

def getEmptyVisObject():
    visObject = {}
    visObject['mark'] = ""
    visObject['type'] = ""
    visObject['x'] = {
        "attribute" : "",
        "transform" : ""
    }
    visObject['y'] = {
        "attribute" : "",
        "transform" : ""
    }
    visObject['color'] = {
        "attribute" : ""
    }
    visObject['size'] = {
        "attribute" : "",
        "transform" : ""
    }
    visObject['shapedData'] = None
    visObject['dataFacts'] = []

    return visObject

if __name__ == '__main__':
    pass