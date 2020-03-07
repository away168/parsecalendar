#!/usr/bin/env node

console.log( "Hello!");

var fs = require('fs');

fs.readFile("inputData", 'utf8', processContents);

console.log('after calling readFile');

function processContents(err, contents) {
    i = 0;
    foundEmail = false;

    lines = contents.split('\n');

    for (line of lines) {
        i++;
        console.log(i + ": " + line);
        keyvalue = line.split(':');
        key = keyvalue[0];
        value = keyvalue[1];
        
        if (key == "email")
        {
            if (value.trim() == "andrew.way@armory.io")
            {
                foundEmail = true;
                console.log ("    email found!");
            }
        }
        if (key == "responseStatus")
        {
            console.log (value)

            if (value.trim() == "accepted" && foundEmail)
            {
                console.log ("   I accepted this event");
            }
        }
    }
}