/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    // TODO: search by name
    var foundPerson = searchByName(people);
    mainMenu(foundPerson[0], people);
    break;
    case 'no':
    var foundPerson = searchByOtherCriteria(people);
    // TODO: search by traits
    break;
    default:
    app(people); // restart app
    break;
  }
}

//function declarePerson(){
//  var person = {
//  
//  }
//}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
   
   var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
   // displayPerson(person);
    case "info":
    // TODO: get person's info
    displayPerson(person);
    break;
    case "family":
    searchForFamilyMembers(person);
    // TODO: get person's family
    break;
    case "descendants":
    displayDescendants(person);
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
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
  // TODO: find the person using the name they entered
 return foundPerson;

//return displayPerson(); ?
//var result = firstName.filter(searchByName) += lastName.filter(searchByName);
}



function searchByOtherCriteria(people){
var userInput = prompt("What do you know about this person? Date of Birth? Age? Height? Occupation? Eye color? Gender? Weight?");
    switch(userInput){
      case "Date of Birth":
          prompt("Please enter the person's date of birth, mm/dd/yyyy"); //get rid of all these prompts or the prompts in the functions?
          var foundPerson =  searchByBirthday(); 
        //return people?/person? something?
          break;
      case "Age":
          prompt("Please enter the person's age");
          var foundPerson = searchByAge();
      case "Height":
          prompt("Please enter the person's height in inches");
          var foundPerson = searchByHeight();
          break;
      case "Occupation":
          prompt("Please enter the person's occupation"); 
          var foundPerson = searchByOccupation();    
          break;
      case "Eye color":
          prompt("Please enter the person's eye color");
          var foundPerson = searchByEyeColor();
          break;
      case "Gender":
          prompt("Please enter the person's gender");
          var foundPerson = searchByGender([3]);
          break;
      case "Weight":
          prompt("Please enter the person's weight in lbs");
          var foundPerson = searchByWeight();
          break;
      default:
        console.log("this is the default case");
        break; 
    } 
}

function searchByDob(people){
  var dob = promptFor("What is the person's date of birth? mm/dd/yyyy", chars);
  var foundPerson = people.filter(function(person){
    if(person.dob === dob){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
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
  return foundPerson;
}

function searchByEyeColor(people){
  var eyeColor = promptFor("What is the person's eye color?", chars);
  var foundPerson = people.filter(function(person){
    if(person.eyeColor === eyeColor){
      return true;
    }
    return false;
  })
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
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
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
}

function searchForFamilyMembers(person){
  var family = "Person's Family: " + person.parents;

  alert(family);
}


function displayDescendants(person){
  var descendants = ""

  alert(descendants);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

//for(i=0; i<person.length; i++){
 // person[i].firstName;
//}

//if parent id===id && spouse id === id, they're family
//check for siblings, must have same parents id
//if parents id=== id, they're descendents 
//display first and last name of each person
//search for children
//search for parents
//search for current spouse
//function searchForFamilyMembers
//must use recursion
//
    