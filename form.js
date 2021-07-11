// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBUfZ2esGuQ52HDzcbjOK5keRvbWYZV5Fg",
    authDomain: "corona-project-a6cb3.firebaseapp.com",
    databaseURL: "https://corona-project-a6cb3-default-rtdb.firebaseio.com",
    projectId: "corona-project-a6cb3",
    storageBucket: "corona-project-a6cb3.appspot.com",
    messagingSenderId: "88433165526",
    appId: "1:88433165526:web:fcfffa0cdde6fce9707577"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var UserInputsRef=firebase.database().ref('UserInputs')
  document.getElementById('testForm').addEventListener('submit',submitForm);
  function submitForm(e){
    e.preventDefault();
    var state =getInputVal('state');
    state=state.toLowerCase();
    readState(state);
    var fname=getInputVal('firstname');
    var lname=getInputVal('lastname');
    var mobile=getInputVal('mobile');
    var email=getInputVal('email');
    var profession=getInputVal('profession');
    var dateofbirth=getInputVal('dateofbirth');
    var symptomsList = getSelectedCheckboxValues('symptoms');
    var selectedOption =document.querySelector('input[name=option]:checked').value;
    saveMessages(lname+" "+fname,mobile,email,profession,dateofbirth,state,symptomsList,selectedOption)
  }
  function getSelectedCheckboxValues(name){
    var checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`)
    var values=[];
    chackboxes.forEach((checkbox)=>{
      values.push(checkbox.value)
    })
    return values;
  }
  function saveMessages(name,mobile,email,profession,dateofbirth,state,selectedOption){
    var newUserInputsRef=UserInputsRef.push();
    newUserInputsRef.set({
      name:name,
      mobile:mobile,
      email:email,
      dateofbirth:dateofbirth,
      state:state,
      profession:profession,
      selectedOption:selectedOption
    })
  }
  function readState(state){
    var centers;
    var ref = firebase.database().ref(state);
    ref.on('value', (data)=>{
     centers = data.val();
     document.getElementById("result").innerHTML ="<br>"+centers;
})

}
function getInputVal(id){
    return document.getElementById(id).value;
}