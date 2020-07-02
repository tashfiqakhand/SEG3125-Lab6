var bodyParser = require('body-parser');

//var data = [{item: 'firstname'}, {item: 'use'}, {item: 'Ui'}, {item: 'quality'},  {item: 'comments'}, {item: 'often'}];
var urlencodedParser = bodyParser.urlencoded({extended:false});
var fs = require('fs');

function readData(fileName){
    let dataRead = fs.readFileSync('./data/' + fileName + '.json');
    let infoRead = JSON.parse(dataRead);
    return infoRead;
}

function writeData(info, fileName){
    data = JSON.stringify(info);
    fs.writeFileSync('./data/' + fileName + '.json', data);
}

function combineCounts(name, value){
    // console.log(value);
    info = readData(name);
     // will be useful for text entry, since the item typed in might not be in the list
    var found = 0;
    for (var i=0; i<info.length; i++){
        if (info[i][name] === value){
            info[i].count = parseInt(info[i].count) + 1;
            found = 1;
        }
    }
    if (found === 0){
        info.push({[name] : value, count: 1});
    }
    writeData(info, name);
}

module.exports = function(app){
  app.get('/analysis', function(req, res){
   var q1 = readData("q1");
   var q2 = readData("q2");
   var q3 = readData("q3");
   var q4 = readData("q4");
   var q5 = readData("q5");
   var q6 = readData("q6");
   res.render('results', {data: [q1, q2, q3, q4, q5, q6]});
   console.log([q1, q2, q3, q4, q5, q6]);
});

  app.get('/survey', function(req, res){
    // res.render('index', {ans: data});
    res.sendFile(__dirname+'/views/index.html');
  });

  app.post('/survey', urlencodedParser, function(req, res){
    // data.push(req.body);
    // res.json(data);
    //res.render('results', {ans: req.body});


    console.log(req.body);
        var json = req.body;
        for (var key in json){
            console.log(key + ": " + json[key]);
            // in the case of checkboxes, the user might check more than one
            if ((key === "q4") && (json[key].length === 2)){
              for (var item in json[key]) {
                    combineCounts(key, json[key][item]);
                }
            }
            else {
                combineCounts(key, json[key]);
            }
        }
        // mystery line... (if I take it out, the SUBMIT button does change)
        // if anyone can figure this out, let me know!
        res.sendFile(__dirname + "/views/index.html");
  });

};
