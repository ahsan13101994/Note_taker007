// Required Modules
const fs = require("fs");
const notesList = require("../db/db.json");

module.exports = function(app){

// Add to database
    function addToDb(notes){
        notes = JSON.stringify(notes);
        fs.writeFileSync("./db/db.json", notes, function(err){
            if (err) {return console.log(err);}
        });
    }

// List of Notes
    app.get("/api/notes", function(req, res){
        res.json(notesList);
    });

// Posting 
    app.post("/api/notes", function(req, res){
    //creating Notes ID
        if (notesList.length == 0){
            req.body.id = "0";

        } else{
            req.body.id = JSON.stringify(JSON.parse(notesList[notesList.length - 1].id) + 1);
        }
        
        console.log("req.body.id: " + req.body.id);
        notesList.push(req.body);
        addToDb(notesList);
        res.json(req.body);
    });

    // DELETEING NOTES USING ID
    app.delete("/api/notes/:id", function(req, res){
        let id = req.params.id.toString();
        console.log(id);
        for (i=0; i < notesList.length; i++){
           
            if (notesList[i].id == id){
                res.send(notesList[i]);
                notesList.splice(i,1);
                break;
            }
        }

    // Write notes data to database
        addToDb(notesList);

    });
};