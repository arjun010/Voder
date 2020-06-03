# Voder
*Augmenting Visualizations with Interactive Data Facts to Facilitate Interpretation and Communication*

## Running Locally

Run a web server:

```bash
python -m http.server 8000
```

Go to http://localhost:8000/ to run the system (preloaded with the cars dataset).

## Generating data fact-related files for other csv datasets

1. Add your dataset in a csv format in the folders `dataGenerator/csvs` and `dataFiles/csvs` (already has sample datasets)

2. Create a json file specifying the metadata of your dataset in `dataGenerator/dataTypeMaps` (already has files for sample datasets). Make sure you specify the "type" field for each attribute and the "isItemAttr" field for the label attribute (e.g. Car Name).

3. To generate the data facts and mappings between facts, visualizations, and annotations, within the `dataGenerator` folder, execute `python mainDataFileGenerator.py csvs/fileName.csv dataTypeMaps/fileName.json`. This will create two json files under the `dataFiles` foder (`filename-mainDataMap.json` with all the facts and visualizations, and `fileName-metadataMap.json` which is a modified version of the dataTypeMap file passed earlier).

4. In `js/src/main.js`, update the paths to the data files passed to the variables `dataFileToUse`, `mainDataMapFileUrl`, and `metadataMapFileUrl` to point to the required csv file and the files generated in Step 4.

5. Go to the root folder, and run a local server (`python -m http.server 8000`) and go to http://localhost:8000/

## Citation

**[Augmenting Visualizations with Interactive Data Facts to Facilitate Interpretation and Communication][project]**  
Arjun Srinivasan, Steven M. Drucker, Alex Endert, John Stasko<br/>
*IEEE Transactions on Visualization and Computer Graphics (TVCG), Jan 2019*<br/>

[project]:https://arjun010.github.io/individual-projects/voder.html
