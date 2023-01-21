const listOfTasks = $('#tasks-list');
const currentDay = $('#currentDay')

//here I am going to set display of current day on the top of the site
//I created function which adds new text as the interval goes creating live clock on the front of the page
let runningClock = function(){
    currentDay.text(moment().format("MMMM Do YYYY, h:mm:ss a"))
}
runningClock();//calling my clock function
setInterval(runningClock, 1000);//intervall of 1000ms is equal to one seconds interval

for (let i = 9; i < 18; i++){ //this loop is to create layout of hour in task organizer the numbers are working hours
    
    
    let hour = moment(i, 'H'); // I  need this variable so then I can work with text inside time div as moment
    let row = $('<div>');
    row.addClass('row');//creates bootstrap row
    let mainContent = $('<div>');

    //getter from local storage- idk yeh how ill name it and how ill call it but i need to call on storage before 
    mainContent.addClass('col-7 col-sm-7 col-md-8 col-lg-9 content')
    .attr('contenteditable','true')
    .text(localStorage.getItem('task'))    
    //bootstrap column sizing
    let time = $('<div>');
    time.addClass('col-2 col-sm-2 col-md-2 col-lg-1 hour').text(hour.format('h a')) // time frome moment.js as a text on website
    let buttonSpace = $('<div>')
    buttonSpace.addClass('col-3 col-sm-3 col-md-2 col-lg-2') //space to place button
    let saveButton = $('<button>')//button
    saveButton.addClass('btn saveBtn').html('<i class="fa-solid fa-floppy-disk fa-3x"></i>')//button given bootstrap classes and fav icon
    listOfTasks.append(row);//row appended to the list of tasts div
    row.append(time, mainContent, buttonSpace); //sections appended into the row
    buttonSpace.append(saveButton)
//adding color coding based on time by simple if statement
    if(moment().format('H') < i ){       
        mainContent.addClass('future')
    } else if (moment().format('H') > i){
        mainContent.addClass('past')
    } else {mainContent.addClass('present')}    
}

//local storage; number 9 reflects the amount of rows on the page to iterate over
for(let y = 0; y < 9; y++){
    // get mainConent's contents from local storage
    let oldTask = localStorage.getItem(y);
    listOfTasks.children().eq(y).children('.content').text(oldTask);
    
    //on click function that saves data from the div into the local storage
    listOfTasks.children().eq(y).on('click', '.btn',function(){
    let taskValue = listOfTasks.children().eq(y).children('.content').html()
    localStorage.setItem(y, taskValue )
    alert('Your task was saved! :)')
    })
//listOfTasks.children().eq(y).children('.content').val()
}

//this block of code should hopefully ensure that second day the list will be cleared up
let timeNow = moment().format('H');
localStorage.setItem('time', timeNow);
let oldTime= localStorage.getItem('time');
if (timeNow < oldTime){
    localStorage.clear()
}