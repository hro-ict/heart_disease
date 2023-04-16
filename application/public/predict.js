import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"


var predict_heart;
var title;
var text= "Please consult a specialist doctor for a definitive diagnosis."
// var icon;
Swal.fire({
    title: 'INFO!',
    text: 'This application is a test created to determine your risk of heart disease using artificial intelligence. After answering all the questions, you can see your risk of heart disease. But this test is not for a definitive diagnosis. Please consult a specialist doctor for a definitive diagnosis.',
    icon: 'info',
    confirmButtonText: 'OK',
    backdrop: false
  })
  
  
//   $.fn.serializeObject = function() {
//       var o = {};
//       var a = this.serializeArray();
//       $.each(a, function() {
//           if (o[this.name]) {
//               if (!o[this.name].push) {
//                   o[this.name] = [o[parseInt(this.name)]];
//               }
//               o[this.name].push(this.value || '');
//           } else {
//               o[this.name] = this.value || '';
//           }
//       });
//       return o;
//   };
  
  
  
  
  
  $( "form" ).on( "submit", function( event ) {
  event.preventDefault();
  const predict_diasese = {
    Gender: parseInt($("#Gender").val()),
    age: parseInt($("#age").val()),
    currentSmoker: parseInt($("#currentSmoker").val()),
    BPMeds: parseInt( $("#BPMeds").val()),
    prevalentStroke: parseInt($("#prevalentStroke").val()),
    prevalentHyp: parseInt($("#prevalentHyp").val()),
    diabetes:parseInt($("#diabetes").val()),
    totChol: parseInt($("#totChol").val()) ,
    sysBP: parseInt($("#sysBP").val()),
    diaBP: parseInt($("#diaBP").val()),
    BMI: parseInt($("#BMI").val()),
    heartRate: parseInt($("#heartRate").val()),
    glucose: parseInt($("#glucose").val()),
  }

  console.log(predict_diasese)

  //console.log( $( this ).serialize() );
//   var dat= JSON.stringify($("form").serializeObject())
//   predict_heart= JSON.parse(dat)
  //console.log(predict_heart)
  
  fetch("./model_3.json")
          .then((response) => response.json())
          .then((model) => {
              let decisionTree = new DecisionTree(model)
              //console.log(predict_heart)
              let prediction = decisionTree.predict(predict_diasese)
              console.log("predicted " + prediction)  
              if (prediction==1){
               title= "High risk of heart disease"
              
               
                  Swal.fire({
                    title:title,
                    text:text,
                    icon: "warning"
                  })
              }
              if (prediction==0) {
                title= "Low risk of heart disease"
                
               Swal.fire({
                title:title,
                text:text,
                icon:"success"
              })
              }
          })
  
  
  });
  
  //show cigarettes per day if user current smoker
      $("#currentSmoker").change(function(){
          var value= $(this).val()
          if (value=="1"){
              $(".cigsPerDay").removeClass("d-none");
              //$("#cigsPerDay").addAttr("required");
              $('#cigsPerDay').prop('required', true);

          }
          else {
              $(".cigsPerDay").addClass("d-none")
              //$("#cigsPerDay").removeAttr("required");
              $('#cigsPerDay').prop('required', false);

          }
      })


      $("#prevalentHyp").change(function(){
        var value= $(this).val()
        if (value=="1"){
            $(".BPMeds").removeClass("d-none");
            

        }
        else {
            $(".BPMeds").addClass("d-none")

        }
    })



      
      

