       // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAjuxGqPGu3Fx2Fl2Agh_U3yBx5qkijaDQ",
    authDomain: "train-scheduler-15110.firebaseapp.com",
    databaseURL: "https://train-scheduler-15110.firebaseio.com",
    projectId: "train-scheduler-15110",
    storageBucket: "train-scheduler-15110.appspot.com",
    messagingSenderId: "765209984586",
    appId: "1:765209984586:web:3331f036e0987a6a"
  };

     // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      // Create a variable to reference the database
      var dataRef = firebase.database();

      // set all to blanks
      var trainName = "";
      var trainDestination = "";
      var firstTrainTime = "";
      var trainFrequency = "";

      // button added
      $("#submit").on("click", function (event) {

          event.preventDefault();

          // Capture user inputs and store them into variables
          trainName = $("#train-name").val().trim();
          trainDestination = $("#destination").val().trim();
          firstTrainTime = $("#train-time").val().trim();
          trainFrequency = $("#train-frequency").val().trim();

          // push to firebase
          dataRef.ref().push({
              trainName: trainName,
              trainDestination: trainDestination,
              firstTrainTime: firstTrainTime,
              trainFrequency: trainFrequency,
              //not sure about dateadded--remove?
              dateAdded: firebase.database.ServerValue.TIMESTAMP
          });

          // logs to console
          console.log(trainName);
          console.log(trainDestination);
          console.log(firstTrainTime);
          console.log(trainFrequency);
      });

      // clear html boxes??

      dataRef.ref().on("child_added", function (childSnapshot) {

          var sv = childSnapshot.val();

          console.log(sv.trainName);
          console.log(sv.trainDestination);
          console.log(sv.firstTrainTime);
          console.log(sv.trainFrequency);


          // full list of items to the well
          $("#full-train-list").append("<tr>" + "<td>" +
              childSnapshot.val().trainName + "</td>" +
              " <td>" + childSnapshot.val().trainDestination +
              " </td>" + "<td>" + childSnapshot.val().firstTrainTime +
              " </td>" + "<td>" + childSnapshot.val().trainFrequency +
              " </td></tr>");

          // Handle the errors
      }, function (errorObject) {
          console.log("Errors handled: " + errorObject.code);
      });

 //below commented out code will only populate table with most recent entry  
    // $("#name-table").text(sv.empName);
    // $("#role-table").text(sv.empRole);
    // $("#start-date-table").text(sv.empStart);
    // $("#monthly-rate-table").text(sv.empRate);

//below is the formatting of the table from the HTML for reference
  //   <tr>
  //         <td id="name-table"></td>
  //         <td id="role-table"></td>
  //         <td id="start-date-table"></td>
  //         <td id="months-worked-table"></td>
  //         <td id="monthly-rate-table"></td>
  //         <td id="total-table"></td>
  //       </tr>

  //   dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
  //   // Change the HTML to reflect
  //   $("#name-display").text(snapshot.val().name);
  //   $("#email-display").text(snapshot.val().email);
  //   $("#age-display").text(snapshot.val().age);
  //   $("#comment-display").text(snapshot.val().comment);
  // });



  // console.log(moment().format("MMM Do YY");
