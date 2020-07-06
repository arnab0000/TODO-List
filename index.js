//require express
const express = require('express');

//require port
const port = 8000;

//linking database by using mongoose
const db = require('./config/mongoose');

//linking schema 
const Todo = require('./models/todo')

//firing up express
const app = express();

//setting up view engine as ejs
app.set('view engine', 'ejs');

//linking views folder
app.set('views', './views');

//middleware or parser
app.use(express.urlencoded());

//linking js and css file
app.use(express.static('assests'))


//rendering home page
app.get('/', function(request, response){
    Todo.find({},function(err, todo){
        if(err){
            console.log('Error in fecthing data from DB');
            return;
        }
        return response.render('home', { todo_list: todo})
    })
});

//populating data base
app.post('/create-entry', function(request, response){
    Todo.create(request.body, function(err, newTodo){
        if(err){
            console.log("Error in creating entry", err)
            return;
        }
        console.log('***********', newTodo);
        return response.redirect('back')
    });
});


//firing the server
app.listen(port, function(err){
    if(err){
        console.log(`ERROR: ${err}`);
        return
    }
    console.log(`server is up and running on port: ${port}`)
})