// output is the value that Zapier is expecting when the js returns
if (inputData.attendees === undefined)
{
  output = {responseStatus: "unknown"};
  return output;
}

// parse attendees if possible  -- attendees is simply a multi-line string that has typically the following format: 
// email: andrew.way@amory.io
// self: true/false
// responseStatus: accepted/declined/needsAction/?
// <random spacing>

var lines = inputData.attendees.split('\n');

var keyvalue = "";
var key = "";
var value = ""
var foundEmail = false; 

for (var line of lines) {
      if (!line.includes(':')){
        continue;
      }
      // find/create key/value pairs
      var keyvalue = line.split(':');
      var key = keyvalue[0];
      var value = keyvalue[1];
      if (key === undefined || value === undefined)
      {
        continue;
      }
      // sometimes the value is preceded with a space, sometimes it isn't... or so i think.
      if (value.startsWith(' '))
      {
        value = value.trim();
      }
      console.log("key: " + key + " value: " + value);  // for debugging 

      // find email --> and make sure its myself. 
      if (key == "email")
      {
          if (value == "andrew.way@armory.io")
          {
              foundEmail = true;
              console.log("  found my email");
          }
         continue;
      }

      // if i found my email and see the responseStatus then lets return it.
      if (key == "responseStatus" && foundEmail)
      {
          if (value == "declined")
          {
             console.log("   I see that I did NOT accept it");
          }
          console.log("    I found myself and will stop processing : " + value);
          output = {repsonseStatus: value};
          break;
      }
}
return output;