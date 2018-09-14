# Voder
Code for Voder

#### Instructions for running locally (Temporary)

1. Add your dataset in a csv format in the folders `dataGenerator/csvs` and `dataFiles/csvs` (already has example datasets to play with)

2. Create a json file specifying the metadata of your dataset in `dataGenerator/dataTypeMaps` (already has files for example datasets but suggest looking at baseball-DARPA.json). Make sure you specify the "type" field for each attribute and the "isItemAttr" field for the label attribute (e.g., Player Name).

3. To generate the data facts and mappings between facts, visualizations, and annotations, within the `dataGenerator` folder, execute `python mainDataFileGenerator.py csvs/fileName.csv dataTypeMaps/fileName.json`. This will create two json files under the `dataFiles` foder (`filename-mainDataMap.json` with all the facts and visualizations, and `fileName-metadataMap.json` which is a modified version of the dataTypeMap file passed earlier).

4. In `js/src/main.js`, update the paths to the data files passed to the variables `dataFileToUse`, `mainDataMapFileUrl`, and `metadataMapFileUrl`.

5. Go to the root folder, and run a local server (`python -m SimpleHTTPServer 8000`) and go to http://localhost:8000/
