var provider = new firebase.auth.GoogleAuthProvider();
function signIn(){
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function(){

		firebase.auth().signInWithPopup(provider).then(function(result) {

		if (result.credential) var token = result.credential.accessToken;

		var user = result.user;
		console.log(user.displayName);
		
		firebase.auth().onAuthStateChanged(function(user){
			if(user){
				console.log(user.displayName);
				loadData();
			}
			else console.log("log out");
		});
		}).catch(function(error) {
			console.log(error);
			//error.code error.message error.email error.credential
		});

		}).catch(function(error){
			console.log(error);
	});
}

function addBookLoad(){
	var user = firebase.auth().currentUser;
	if(user){
		document.title =  "Welcome "+user.displayName;
		alert("Welcome " + user.displayName);
	}
	else{
		console.log(user.displayName);
	}
}

function signOut(){
	if(firebase.auth().currentUser){
		firebase.auth().signOut().then(function(){
			location.href = "index.html";
			alert("Logged out successfully!");
		}).catch(function(error){
			console.log(error.message);
		});
	}
}

function loadData(){
	var user = firebase.auth().currentUser;
	if(user) location.href = "addBook.html";
	else console.log("error");
}

function fun() {
    var x = document.getElementById("mnav");
    if (x.className === "topnav") x.className += " responsive";
    else x.className = "topnav";
}