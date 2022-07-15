/**
 * Quiz Logic
 *
 */

import {questions} from './questions.js' //get hard coded questions

/**
 * @namespace main object (QuizApp)
 */
    const quizApp = {

        settings: {
            answers : 4,
            maxQuestions: 10,
            acceptingAnswers: true,
            time: 5, //In minutes
        },
    
        // quiz start state properties 
        questionsAvailable: [...questions],
        generatedQuestions : [], //questions that will show to user from dataset
        currentPositon: 0,
        rightAnswers: 0,
        wrongAnswers: 0,
        score: 0,
        isQuizOver: false,
        Logged: true,
        //Logged: localStorage.getItem('isLogged'),   (NOT USED FOR REVIEW REASONS)

        docutmentViews: {
            allQuesitons: document.getElementById('internalwrapper'),
            question: document.getElementById('question'),
            choices: Array.from(document.getElementsByClassName('choice-text')), //create array of litral object of all this class name
            back: document.getElementsByClassName('back')[0],
            next: document.getElementsByClassName('next')[0],
            question_no: document.getElementById('question-no'),
            quiz_name: document.getElementById('quiz-name'),
            start: document.getElementById('start'),
            scorewrapper: document.getElementById('scorewrapper'),
            score_text: document.getElementsByClassName('score-text'),
            stop: document.getElementById('stop'),
            timer: document.getElementById('timer'),
            start: document.getElementById('start'),
            welcome: document.getElementById('welcome'),
        },
    
        /**
         * Check if logged or Not
         */
        isLogged: function(){

            //Add logging validation here later
            if(this.Logged){
                this.startQuiz(); 
                if(localStorage.getItem('userName')){
                    let userName = localStorage.getItem('userName');
                    this.docutmentViews.welcome.innerText = 'Welcome : ' + userName;
                } else {
                    this.docutmentViews.welcome.innerText = 'Please register first to get username';
                }
            }
        },



        /**
         * after validations, start the quiz
         */
        startQuiz: function(){

            this.docutmentViews.start.innerText = "Reset",
            this.generateQuestions(this.settings.maxQuestions);
            this.displayQuestion(this.currentPositon);
            this.counter(this.settings.time);


        },

        /**
         * display a question on call.
         * @param {*} position  question number 
         */
        displayQuestion: function(position){

            if ( this.currentPositon < this.settings.maxQuestions && this.currentPositon >= 0  ){

                this.docutmentViews.quiz_name.innerText = "Quiz Topic ( " + this.questionsAvailable[this.currentPositon].category + ' )';
                console.log(this.questionsAvailable[this.currentPositon].category)
                this.docutmentViews.question_no.innerHTML = 'Question No: ' + (this.currentPositon+1) + ' / ' + this.settings.maxQuestions ;
                this.docutmentViews.question.innerHTML = this.generatedQuestions[position].Q;

            }
            
            this.docutmentViews.choices.forEach((choice) => {
                const number = choice.dataset['number'];
                if ( this.currentPositon < this.settings.maxQuestions && this.currentPositon >= 0  ){
                choice.innerHTML = this.generatedQuestions[position].Choices[number];
                }
            });
        },


        nextQuestion:function(){ 
                if ( this.currentPositon < this.settings.maxQuestions + 1 && this.currentPositon >= 0  ){
                    this.currentPositon +=1;
                    this.displayQuestion(this.currentPositon);
                }
        },

        backQuestion:function(){ 
                if (  this.currentPositon <= this.settings.maxQuestions  && this.currentPositon> 0  ){
                    this.currentPositon -=1 ;
                    this.displayQuestion(this.currentPositon);
                    }
        },


        resetState: function(){

                this.questionsAvailable =  [...questions];
                this.generatedQuestions =  []; //questions that will show to user from dataset
                this.currentPositon =  0;
                this.score = 0;

                this.startQuiz();

        },

        /**
         * shuffle elements in array using de-facto unbiased shuffle algorithm
         * @param {*} array 
         * @returns a shuffled array
         */
        shuffle: function(array){ 
            {
                let currentIndex = array.length,  randomIndex;
                // While there remain elements to shuffle.
                while (currentIndex != 0) {
                  // Pick a remaining element.
                  randomIndex = Math.floor(Math.random() * currentIndex);
                  currentIndex--;
                  // And swap it with the current element.
                  [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
                }
                return array;
            }
        },

        /**
         * shuffle questions object order on call
         */
        shuffleQuesitons: function(){
            if(this.questionsAvailable.length !== 0){
                return this.shuffle(this.questionsAvailable);
            }
        },

        /**
         * 
         * @param {*} i takes elmenet Number
         * @returns {question} object contating a question
         */
        getQuestionData: function(i){
            const questions = this.shuffleQuesitons();
            let question = {
                Q : questions[i].question,
                Choices : this.shuffle([ questions[i].correct_answer,questions[i].incorrect_answers[0],
                            questions[i].incorrect_answers[1],questions[i].incorrect_answers[2]]),
                correctAnswer: questions[i].correct_answer, //Correct Answer
                selectedAnswer: '',
            }
            return question;
        },
        
        /**
         * generate a controlled number of questions to display
         * @param {*} count 
         * @returns 
         */
        generateQuestions: function(count){
            let i = 0;
            let generatedQuestions = [];
            while (i < count) {
                generatedQuestions.push(this.getQuestionData(i)); //populate array of questions according to settings
                localStorage.setItem('Q_SelectedAnswer'+i , '');
                localStorage.setItem('Q_Check'+i, '');

                if(i<count){
                    i++;
                }
            }
            return this.generatedQuestions = generatedQuestions;      
        },

        checkScore: function(){
            let score = 0;
            for(let i=0; i<this.currentPositon;i++){
                if(localStorage.getItem('Q_Check'+i) == 'correct'){
                    score +=1;
                }
            }
            return score;
        },

        counter: function(sec){
            let seconds = sec * 60;

            function pad ( val ) { return val > 9 ? val : "0" + val; }
            let timer = setInterval( function(){
            document.getElementById("seconds").innerHTML=pad(--seconds%60);
            document.getElementById("minutes").innerHTML=pad(parseInt(seconds/60,10));
            if(seconds == 0 ){
                quizApp.finishQuiz();
                clearInterval(timer);
            }
            }, 1000);
            
        },

        finishQuiz: function(){

            this.docutmentViews.timer.style.display = "none";
            this.docutmentViews.allQuesitons.style.display = "none";
            this.docutmentViews.scorewrapper.style.display = "block";
            this.docutmentViews.score_text[0].innerText = 'Your Score is : ' + this.checkScore() ;
            
        },
         
    }

    
    quizApp.isLogged()

    quizApp.docutmentViews.choices.forEach((choice) => {

        {
            choice.addEventListener('click', (e) => {
                const selectedChoice = e.target;

                let chosenAnswer = selectedChoice.dataset["number"]; //get the chosen answer number

                localStorage.setItem('Q_SelectedAnswer'+quizApp.currentPositon , chosenAnswer); //save its value in localstorage
                
                

                if ( quizApp.currentPositon < quizApp.settings.maxQuestions && quizApp.currentPositon >= 0  ){
                    console.log(quizApp.currentPositon);
                    const CheckAnswer =
                    selectedChoice.innerText == quizApp.generatedQuestions[quizApp.currentPositon].correctAnswer ? 'correct' : 'incorrect';
                    localStorage.setItem( 'Q_Check' +quizApp.currentPositon , CheckAnswer);

                    quizApp.generatedQuestions[quizApp.currentPositon].selectedAnswer = selectedChoice.dataset['number'];
                }
                quizApp.nextQuestion();
            });
        }
    });

    quizApp.docutmentViews.next.addEventListener('click',()=>{quizApp.nextQuestion()}) 
    quizApp.docutmentViews.back.addEventListener('click',()=>{quizApp.backQuestion()}) 
    quizApp.docutmentViews.stop.addEventListener('click',()=>{quizApp.finishQuiz()})
    quizApp.docutmentViews.start.addEventListener('click',()=>{quizApp.resetState()})

    onbeforeunload = event => { confirm('Due to limitation in this task requirments, leaving this page will cause your data to be lost'); };

