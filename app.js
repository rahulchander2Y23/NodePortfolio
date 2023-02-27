// Student Name: Rahul Chander
// Student ID: 300371570
// CSIS-3380 Node Express Project
// app.js file

// default port for listening
const PORTNUM = 3000

// import project data
const project_list = require('./data.json')

// import meta data about author
const metadata = require('./metadata.json')

// import required modules
const express = require('express'); 
const bodyParser = require('body-parser'); 
 
const app = express(); 

// set modules for use
app.use(bodyParser.urlencoded({ extended: false})); 
app.set('view engine', 'pug'); 

// This line identifies that the static assets such as CSS are in "public" folder.  Creating alias called 'static'
app.use('/static',express.static("public"));


// render default index page
app.get('/', (req, res) => { 
    res.render('index',{project_list:project_list, meta_data:metadata}); 
}); 
 
// render about page
app.get('/about', (req, res) => { 
    res.render('about',{meta_data:metadata}); 
}); 

// render project page
app.get('/projects/:project_id',(req,res)=>{
    
    num_id = Number(req.params.project_id)-1
    
   // if id is not valid, render error page, otherwise render project page
    if (isNaN(num_id) || num_id>project_list.length || num_id<0)
        res.render('error_page',{meta_data:metadata})
    else
    {
        console.log('Recd request for project#'+req.params.project_id)
        res.render('project',{some_project:project_list[num_id], meta_data:metadata})
    }
        
})


// handle page not found errors
app.use((req, res, next) => {
    const err = new Error('Page not found')
    err.status = 404
    next(err)
})

// set route for error page
app.use( (err, req, res, next) => {
    res.locals.error = err
    res.status(err.status)
    console.log(err)
    console.log('Requested route "'+req.url+'" with '+req.method+' method does not exist.')
    res.render('error_page',{meta_data:metadata})
})


// start server
app.listen(PORTNUM, () => { 
    console.log(`The application is running on localhost:${PORTNUM}!`) 
});