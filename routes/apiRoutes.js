// Required Modules
const fs = require("fs");

module.exports = function(app){
// Add to database
    function addToDb(notes){
        notes = JSON.stringify(notes);
        fs.writeFileSync("./db/db.json", notes, function(err){
            if (err) { return console.log(err); }
        });
    }

 // Write notes data to database
        addToDb(notesList);

    });
};