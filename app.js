function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      var foundPerson = searchByName(people);
      mainMenu(foundPerson[0], people);
    break;
    
    case 'no':
      var foundPerson = searchByOtherCriteria(people);
    break;
    
    default:
    app(people);
    break;
  }
}

function mainMenu(person, people){
  if(!person){
    alert("Could not find that individual.");
    return app(people);
  }
   
   var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
   
    case "info":
      displayPerson(person);
    break;

    case "family":
      searchForFamilyMembers(person, people);
    break;

    case "descendants":
      var allDescendants = displayDescendants(person, people);
      displayPeople(allDescendants);
      searchAgain();
    break;

    case "restart":
      app(people);
    break;

    case "quit":
    return; 

    default:
    return mainMenu(person, people); 
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  var foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })

 return foundPerson;
}

function searchByOtherCriteria(people){
  var found = promptFor("Do you know the person's age?", yesNo);
  
  if(found === "yes"){
    people = searchByAge(people);
  }

  found = promptFor("Do you know the person's height?", yesNo);
  if(found === "yes"){
   people = searchByHeight(people);
  }

  found = promptFor("Do you know the person's occupation?", yesNo);
  if(found === "yes"){
    people = searchByOccupation(people);
  }

  found = promptFor("Do you know the person's eye color?", yesNo);
  if(found === "yes"){
    people = searchByEyeColor(people);
  }

  found = promptFor("Do you know the person's gender?", yesNo);
  if(found === "yes"){
    people = searchByGender(people);
  }

  found = promptFor("Do you know the person's weight?", yesNo);
  if(found === "yes"){
    people = searchByWeight(people);
  }
  searchAgain();
}

function getAge(){
  var age = date() - person.dob
}

function searchByAge(people){
  var age = promptFor("What is the person's age?", chars);
  var foundPerson = people.filter(function(person){
    if(person.age === age){
      return true;
    }
    else{
      return false;
    }
  })
  displayPeople(foundPerson);
  return foundPerson;
}

function searchByGender(people){
  var gender = promptFor("What is the person's gender?", chars);
  var foundPerson = people.filter(function(person){
    if(person.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
  displayPeople(foundPerson);
  return foundPerson;
}

function searchByHeight(people){
  var height = promptFor("What is the person's height in inches?", chars);
  var foundPerson = people.filter(function(person){
    if(person.height === height){
      return true;
    }
    else{
      return false;
    }
  })
  displayPeople(foundPerson);
  return foundPerson;
}

function searchByWeight(people){
  var weight = promptFor("What is the person's weight in lbs?", chars);
  var foundPerson = people.filter(function(person){
    if(person.weight === weight){
      return true;
    }
    else{
      return false;
    }
  })
  displayPeople(foundPerson);
  return foundPerson;
}

function searchByEyeColor(people){
  var eyeColor = promptFor("What is the person's eye color?", chars);
  var foundPerson = people.filter(function(person){
    if(person.eyeColor === eyeColor){
      return true;
    }
    else {
      return false;
    }
  })

  displayPeople(foundPerson);
  return foundPerson;
}

function searchByOccupation(people){
  var occupation = promptFor("What is the person's occupation?", chars);
  var foundPerson = people.filter(function(person){
    if(person.occupation === occupation){
      return true;
    }
    else{
      return false;
    }
  })
  displayPeople(foundPerson);
  return foundPerson;
}

function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";  
  personInfo += "Birthday: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";
  personInfo += "Spouse: " + person.currentSpouse + "\n";

  alert(personInfo);
  searchAgain();
}

function searchAgain(input){
  var searchAgain = promptFor("Did you find who you were looking for?", yesNo);
  if(searchAgain === "yes"){
    alert("Glad we could help!");
    return true;
  }
  if(searchAgain === "no"){
    alert("Please try searching again!");
    return true;
  }
}


function searchForFamilyMembers(foundPerson, people){ 
  var parents= people.filter(function(person){
    if(foundPerson.parents[0] === person.id || foundPerson.parents[1] === person.id){
      return true;
    }

    else{
      return false;
    }
  })
   var siblings = people.filter(function(person){
    if(foundPerson.parents[0] === person.parents[0]){
      return true;
    }
    else if (foundPerson.parents[1] === person.parents[1]){
      return true;
    }
    else{
      return false;
    }
  })
  var currentSpouse = people.filter(function(person){
    if(foundPerson.currentSpouse === person.id){
      return true;
    }
    else{
      return false;
    }
  })
  var children = people.filter(function(person){
    if(foundPerson.id === person.parents[0] || foundPerson.id === person.parents[1]){
      return true;
    }
    else{
      return false;
    }
  })

  var familyMembers = parents.concat(siblings, currentSpouse, children);

  displayPeople(familyMembers);
  searchAgain();
}


function displayDescendants(foundPerson, people){
  var totalDescendants = [];
  var descendants = people.filter(function(person){
    if(foundPerson.id === person.parents[0] || foundPerson.id === person.parents[1]){
      return true;
    }
  })
  
  for(var i=0; i<descendants.length; i++){
    totalDescendants = displayDescendants(descendants[i], people);
  }
  var allDescendants = descendants.concat(totalDescendants);
 
 return allDescendants;
}

function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}


function chars(input){
  return true; // default validation only
}