// Initialize Firebase
var config = {
    apiKey: "AIzaSyD_7h0KDhKEvMtIH1aAwm2GNW5ewnk5MH0",
    authDomain: "train-scheduler-2-9dab3.firebaseapp.com",
    databaseURL: "https://train-scheduler-2-9dab3.firebaseio.com",
    storageBucket: "train-scheduler-2-9dab3.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();
  
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
    var trainFreq = $("#frequency-input").val().trim();
  
    var newTrain = {
        name: trainName,
        destination: trainDest,
        time: trainTime,
        frequency: trainFreq
    };
  
    database.ref().push(newTrain);
  
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
  
    alert("Train successfully added");
  
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});
  
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().frequency;
  
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);

    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var trainRemainder = diffTime % trainFreq;
    console.log(trainRemainder);

    var tMinutesTillTrain = trainFreq - trainRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextArrival = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));
  
    var minAway = nextArrival - currentTime;
    console.log(minAway);
  
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(nextArrival),
        $("<td>").text(minAway)
    );
  
    $("#train-table > tbody").append(newRow);
});