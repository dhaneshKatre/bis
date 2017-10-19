var provider = new firebase.auth.GoogleAuthProvider();
function signIn(){
	firebase.auth().signInWithPopup(provider).then(function(result){
		firebase.auth().onAuthStateChanged(function(){
			var user = firebase.auth().currentUser;
			if(user){
				console.log("success");
				document.title = "Welcome " + user.displayName;
				loadData();
			}
			else console.log("Logged out");
		}).catch(function(error){
			console.log(error.message);
		});

	}).catch(function(error){

	});
}

function signOut(){
	if(firebase.auth().currentUser){
		firebase.auth().signOut().then(function(){
			document.getElementById("lo").style.display = "none";
			document.getElementById("mi").style.display = "block";
			document.getElementById("form").style.display = "none";
			var container = document.getElementById("mp");
			while (container.hasChildNodes()) {
			    container.removeChild(container.lastChild);
			}
			alert("Logged out successfully!");
			location.href = "/";
		}).catch(function(error){
			console.log(error.message);
		});
	}
}

function loadData(){
	if(firebase.auth().currentUser){
		document.getElementById("mi").style.display = "none";
		document.getElementById("lo").style.display = "block";
		document.getElementById("form").style.display = "block";
	}
}

var fil = document.getElementById("bookImage");
var file;
fil.addEventListener('change',function(e){
	file = e.target.files[0];
});

function addTabs(){
	var count = document.getElementById("tc").value;
	var container = document.getElementById("mp");
	while (container.hasChildNodes()) {
	    container.removeChild(container.lastChild);
	}
	for(i=0;i<count;i++){
		container.appendChild(document.createTextNode("tab "+(i+1)));
		var input = document.createElement("textarea");
		input.name = "tab"+(i+1);
		input.className = "tA";
		container.appendChild(input);
	}
	var input = document.createElement("input");
	input.type = "button";
	input.onclick = function(){
		var lang = ((document.getElementById("lang")||{}).value)||"";
		var genre = ((document.getElementById("genre")||{}).value)||"";
		var name = ((document.getElementById("bookName")||{}).value)||"";
		var author = ((document.getElementById("authorName")||{}).value)||"";
		var describ = (( document.getElementById("decription")||{}).value)||"";
		var tabArray = document.getElementsByClassName("tA");

		var Content = "{";
		Array.prototype.forEach.call(tabArray,function(t){
			Content += "\"" + t.name + "\":\"" + t.value + "\",";
		});
		Content = Content.substring(0, (Content.length - 1));
		Content += "}";
		Content = JSON.parse(Content);

		var storageRef = firebase.storage().ref("/Books").child(lang).child(genre).child(name + ".jpg");
		storageRef.put(file).then(function(snapshot){
			window.alert('Data Successfully Added');
			document.getElementById("morf").reset();
		});

		var fdb = firebase.database().ref('Books');
		fdb.child(lang).child(genre).child(name).set({
			'Author':author,
			'Describ':describ,
			Content
		});
	};
	input.name = "submitData";
	input.value = "Submit";
	input.className = "button";
	container.appendChild(input);
}

var hasShownAlert = false;
function displayAlert(){
	if(!hasShownAlert){
		alert("This is gonna add specified text areas there. Please input neatly.");
		hasShownAlert = true;
	}
}

function fun() {
    var x = document.getElementById("mnav");
    if (x.className === "topnav") x.className += " responsive";
    else x.className = "topnav";
}