// from flask import Flask

// app = Flask(__name__)

// @app.route('/flask', methods=['GET'])
// def index():
//     return "Flask server"

// if __name__ == "__main__":
//     app.run(port=5000, debug=True)

const express = require('express');
const res = require('express/lib/response');
const app = express()
const redditdata = require('./data.json')
const path = require('path')
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid');


//serving static assets in express
app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(methodOverride('_method'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')




app.get('/',(req,res)=>{
    res.render('home')
})



app.get('/pathway',(req,res)=>{
    res.render('pathway')
})


app.get('/pathway/cpp',(req,res)=>{
    res.render('pathway/cpp')
})

app.get('/whatnext',(req,res)=>{
    res.render('whatnext')
})




let comments = [
    {
        id:uuid(),
        username:"How do you approach CODING as a beginner?",
        comment: "programming is a tool to solve problems. Now, to solve a problem, you need to actually THINK about it. You think about how to approach a problem. What are we expecting from this problem when it is solved? Such questions come to our mind. Once you figure out how to solve the problem, you actually sit and CODE it. So in short, PROGRAMMING is 80% THINKING and 20% CODING."
    },
    {
        id:uuid(),
        username:"How do I get started learning C++?",
        comment:"learn all of the syntax and semantics of the language. C++ is large and complex, but it’s not infinite. C++ is continuing to evolve, with a new standard with new features roughly every three years. So, it requires an ongoing effort to keep up with it, but it can be done."
    },
    {
        id:uuid(),
        username:"Is Angular better than React?",
        comment:"Angular is better than React if your application is enterprise-grade and you need to incorporate complex functionalities like progressive, single-page, and native web apps. However, React specializes in creating UI components and can be used in any application, including single-page apps."
    },
    {
        id:uuid(),
        username:"Do I need math for ML?",
        comment:"For beginners, you don't need a lot of Mathematics to start doing Machine Learning. The fundamental prerequisite is data analysis as described in this blog post and you can learn the maths on the go as you master more techniques and algorithms."
    },
    {
        id:uuid(),
        username:"Which IT job has no coding?",
        comment:"Tech roles like business analyst, project manager, and market research analyst are some of the examples of non-coding jobs in the IT sector."
    }
]
 
app.get("/comments", (req, res) =>{
    res.render("comments/index", {comments});
});
 
app.get("/comments/new", (req,res)=>{
    res.render('comments/new');
})

//this new comment will get submitted to a post route
app.post('/comments',(req,res)=>{
    console.log(req.body);
    const {username, comment} = req.body;
    comments.push({ username,comment,id:uuid() })
    // res.send("IT WORKED");
    res.redirect('/comments');
})
//show route
app.get('/comments/:id',(req,res)=>{
    const {id} = req.params;
    const comment = comments.find(c=>c.id=== id )
    res.render('comments/show' , {comment})
})





app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    console.log(id);
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);

    const newCommentText = req.body.comment;
    
    foundComment.comment = newCommentText;

    res.redirect('/comments')
})



app.delete('/comments/:id',(req,res)=>{
    const {id} = req.params;
    comments =  comments.filter(c=>c.id !==id);
    res.redirect('/comments');
})





app.listen(8000, ()=>{
    console.log("listening on port 8000");
})


