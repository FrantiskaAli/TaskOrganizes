const listOfTasks = $('#tasks-list');


for (let i = 9; i < 18; i++){ //this loop is to create layout of hour in task organizer
    
    
    let hour = moment(i, 'H'); // I  need this variable so then I can work with text inside time div as moment
    let row = $('<div>');
    row.addClass('row');//creates bootstrap row
    let mainContent = $('<div>');

    //getter from local storage- idk yeh how ill name it and how ill call it but i need to call on storage before 
    mainContent.addClass('col-10 content')
    .attr('contenteditable','true')
    .text(localStorage.getItem('task'))    
    //bootstrap column sizing
    let time = $('<div>');
    time.addClass('col-1 hour').text(hour.format('h a')) // time frome moment.js as a text on website
    let buttonSpace = $('<div>')
    buttonSpace.addClass('col-1') //space to place button
    let saveButton = $('<button>')//
    saveButton.addClass('btn saveBtn').html('<i class="fa-solid fa-floppy-disk fa-3x"></i>')//button given bootstrap classes
    listOfTasks.append(row);
    row.append(time, mainContent, buttonSpace);
    buttonSpace.append(saveButton)

    if(moment().format('H') < i ){
        mainContent.addClass('future')
    } else if (moment().format('H') > i){
        mainContent.addClass('past')
    } else {mainContent.addClass('present')}  



    
}
//local storage;
for(let y = 0; y < 9; y++){
    //some = get from local storage
    let oldTask = localStorage.getItem(y);
    listOfTasks.children().eq(y).children('.content').text(oldTask);
    console.log(listOfTasks.children().eq(y).children('.content').html());
    listOfTasks.children().eq(y).on('click', '.btn',function(){
    let taskValue = listOfTasks.children().eq(y).children('.content').html()
    localStorage.setItem(y, taskValue )
    
    })
//listOfTasks.children().eq(y).children('.content').val()
}
