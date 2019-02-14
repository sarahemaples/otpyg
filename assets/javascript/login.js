// Initialize Firebase
var config = {
    apiKey: "AIzaSyCswD9r_NwpQdqKraJ6hIsgSsJ3V8YuFJo",
    authDomain: "group5project1-540d2.firebaseapp.com",
    databaseURL: "https://group5project1-540d2.firebaseio.com",
    projectId: "group5project1-540d2",
    storageBucket: "group5project1-540d2.appspot.com",
    messagingSenderId: "261770648936"
  };

  firebase.initializeApp(config);

  // Declaring some globals
  var database = firebase.database();



  // Initialize Providers
  var google = new firebase.auth.GoogleAuthProvider();


  $("#login-button").on("click",(e) => {
    e.preventDefault();
    firebase.auth().signInWithPopup(google).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        $("#login-button").remove();
        console.log(user);
        // database logging
        database.ref(user.uid).set({
            name: user.displayName,
            email: user.email,
            favorites: "Add a Favorite Location!"
        })

      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

  })


  $("#fave-button").on("click", (event) => {
    event.preventDefault();
    var latestSearch = $("#fd").val();
    var user = firebase.auth().currentUser;
    console.log(user.uid);
    //logging it onto the database
    database.ref(`${user.uid}/favorites`).push(latestSearch)

    var buttonsHTML = "<input type='button' class='dynamic' value = " + latestSearch + ">" + latestSearch + "</button>"
    $("#buttons").append(buttonsHTML);
  
    $(document).on("click", ".dynamic", (e) => {
        e.preventDefault();
        console.log("clicked");
        if()
        var buttonValue = $(".dynamic").text(latestSearch);
        console.log(buttonValue);
        $("#fd").val(buttonValue);
    })

})





console.log("test12");







