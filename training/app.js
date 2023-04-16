import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"

//
// DATA
//
const csvFile = "./data/heart_disease_edited_2.csv"
const trainingLabel = "Heart_stroke"  
const ignored = ["education"]  

var positive_true=0;
var negative_true=0;
var positive_false=0;
var negative_false=0;



//
// laad csv data als json
//





function loadData() {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => trainModel(results.data)
    })
}

//
// MACHINE LEARNING - Decision Tree
//
function trainModel(data) {
    // todo : splits data in traindata en testdata
    // Shuffle the data randomly
    data.sort(() => (Math.random() - 0.5))
    // Split the data into train and test sets
    let trainData = data.slice(0, Math.floor(data.length * 0.8))
    let testData = data.slice(Math.floor(data.length * 0.8))
    //console.log(trainData)
    //console.log(testData)
    var l_data= data.length
    var l_train= trainData.length
    var l_test= testData.length
    console.log(l_test/l_data)*100

    

    // maak het algoritme aan
    let decisionTree = new DecisionTree({
        ignoredAttributes: ignored,
        //maxTreeDepth:5,
        trainingSet: trainData,
        categoryAttr: trainingLabel
    })

    // Teken de boomstructuur - DOM element, breedte, hoogte, decision tree
    let json = decisionTree.toJSON()
    let visual = new VegaTree('#view', 2300, 1000, json)
    // console.log(decisionTree.toJSON())
    console.log(decisionTree.stringify())

    // bereken de accuracy met behulp van alle test data
    let correctPredictions = 0
    for (let i = 0; i < testData.length; i++) {


    const WithoutLabel = { ...testData[i] }
    delete WithoutLabel.Heart_stroke

     console.log(WithoutLabel)
        console.log("Test: "+ decisionTree.predict(WithoutLabel))
        console.log("Label: "+ testData[i][trainingLabel])
        console.log("###############################")
  

        if (decisionTree.predict(WithoutLabel) == testData[i][trainingLabel]) {
            correctPredictions+=1
            if (decisionTree.predict(WithoutLabel)==1){
                //console.log("Positief TRUE")
              positive_true+=1
             $("#positive_true").html(positive_true)
            }
            if (decisionTree.predict(WithoutLabel)==0){
                //console.log("Negatief TRUE")
                negative_true+=1
                $("#negative_true").html(negative_true)
            }
        }

        else {
            if (decisionTree.predict(WithoutLabel)==1){
                //console.log("Positief FALSE")
                positive_false+=1
                $("#positive_false").html(positive_false)
            }
            if (decisionTree.predict(WithoutLabel)==0){
                //console.log("Negatief FALSE")
                negative_false+=1
                $("#negative_false").html(negative_false)
            }

        }
      
    }
    
    let accuracy = correctPredictions / testData.length*100
    accuracy= accuracy.toFixed(2)
    console.log(`Accuracy: % ${accuracy}`)
    document.getElementById("accuracy").innerHTML = "Accuracy: %"+accuracy;
}

loadData()


