var taskID = 1;
var db = window.localStorage;
var cardsArray = {cards:[]}
var numbeOfCards = 1;
var task;

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        popupateCards();
    },

    onDeviceReady: function() {
            $("#addBtn").click(function(){
                $('.fixed-action-btn').hide();
                renderHomeView();
            })          
        },
};

function renderHomeView() {
    
    var html =  
    ` 
    <div className="container">
    <div class="row" style="margin-top: 120px">
        <form class="col s12">
            <div class="row">
                <div class="input-field col s12">
                <textarea id="taskNameField" class="materialize-textarea"></textarea>
                <label for="textarea1">Task Name</label>
                </div>
            </div>

            <div class="row">
                <div class="input-field col s12">
                <textarea id="textDescriptionField" class="materialize-textarea peter"></textarea>
                <label for="textarea1">Task Description</label>
                </div>
            </div>
            
            <div class="row">
                    <div class="input-field col s12">
                        <input type="text" id="datePickerElem" class="datepicker">
                        <label for="textarea1">Input Date</label>
                    </div>
            </div>
            
            <div class="row">
                    <div class="input-field col s12">
                         <input type="text" id="timepickerElm" class="timepicker">
                         <label for="textarea1">Input Time</label>
                    </div>
            </div>

            <div className="row" style="margin-top: 100px">
                <div class="col s6">
                     <a class="btn light-blue pulse" style="margin-left:50px"id="cameraBtn">
                     <i class="large material-icons">camera_alt</i>
                 </a>
                </div>
                 <div class="col s6">
                    <a class="btn light-blue" id="confirmBtn">confirm
                    
                    </a>
                 </div>     
            </div>

        </form>
    </div>
</div>
`
    document.getElementById('newTaskDiv').innerHTML = html;

    $("#cameraBtn").click(function(){
        console.log("cameraButton Working")
    }),
    $(document).ready(function(){
        $('.timepicker').timepicker();
    }),
    $(document).ready(function(){
        $('.datepicker').datepicker();
    }),
    $("#confirmBtn").click(function(){


        //saving the details in a local variable that can be used later
        var textValue = $("#taskNameField").val();
        var textDescriptionValue = $("#textDescriptionField").val();
        var instanceOfDate = M.Datepicker.getInstance(datePickerElem).date;
        var instanceOfTime = M.Timepicker.getInstance(timepickerElm).time;

        //creating a value object 
        task = addToJSON( taskID,textValue,textDescriptionValue,instanceOfDate,instanceOfTime);
        cardsArray['cards'].push(task);
        console.log("cardsArray = "+ cardsArray)
        pushToStorage('cards',cardsArray['cards']);
        taskID += 1; //auto incrementing task ID
        console.log("taskID =  "+ taskID)

        $('#newTaskDiv').empty();
        $('.fixed-action-btn').show();
        

        popupateCards();

    }); 
    
}

function addToJSON( taskID,textValue,textDescriptionValue,instanceOfDate,instanceOfTime){
    
    newTask = {
        taskID: taskID,
        textValue: textValue,
        textDescription:textDescriptionValue,
        date:instanceOfDate,
        time:instanceOfTime
    }

    return newTask;
}

function pushToStorage(key,value){
    var convertedValue = JSON.stringify(value);
    db.setItem(key,convertedValue);
}

function getItemFromStorage(key){
    var unsortedItem = db.getItem(key);
    return JSON.parse(unsortedItem);
}

function delteItemFromStorage(key){
    db.removeItem(key);
}

function renderTaskCard(){

    var taskCard = 
    `   <div class="row" style="margin-top: 30px"id="card-id">
            <div class="col s12">                            
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text" >
                    <span class="card-title" id="card-title"></span>
                    <p id="card-content"></p>
                    <a class="waves-effect right waves-light btn" id="deleteButton" onClick="deleteCard(this.id)">Done</a>
                    </div>
                    <div class="card-action">
                        <a id="card-time"></a>
                        <a id="card-date"></a>
                    </div>
                </div>
            </div>
            </div>
        </div>`

        document.getElementById('newTaskDiv').innerHTML += taskCard;
}

function popupateCards(){

    var temp = getItemFromStorage('cards');

    // for(var x = 0; x  > temp.length; x++){console.log("Inside for loop, Element = "+temp[x])}

    temp.forEach(element =>{

            renderTaskCard();

            $("#card-id").attr('id',element.taskID);

            $('#deleteButton').attr('id', "deleteButton"+"-"+element.taskID);
            $("#card-title").attr('id',"card-title"+"-"+ element.taskID);
            $("#card-content").attr('id',"card-content"+"-"+element.taskID);
            $("#card-time").attr('id',"card-time"+ "-" + element.taskID);
            $("#card-date").attr('id',"card-date"+ "-"+ element.taskID);

            $("#card-title"+"-"+element.taskID).append(element.textValue);
            $("#card-content"+"-"+element.taskID).append(element.textDescription);
            $("#card-time"+"-"+element.taskID).append(element.date.slice(0,10));
            $("#card-date"+"-"+element.taskID).append(element.time);

    });

    $('.fixed-action-btn').show();
}

function deleteCard(id){
    var arrayIndex = id.split("deleteButton-").join('');
    $("#"+arrayIndex.toString()).remove();
    var temp = getItemFromStorage('cards')
    temp.splice(arrayIndex-1);
    pushToStorage('cards',temp);
}
// $(document).ready(function(){
//     $("#card-title").append(element.textValue);
//     $("#card-content").append(element.textDescription);
//     $("#card-time").append(element.date.slice(0,10));
//     $("#card-date").append(element.time);
//     document.getElementById('newTaskDiv').innerHTML += taskCard;
// })

class DbManager{

    getItem(key){
        window.localStorage.getItem(key);// Pass a key name to get its value.
    }
    addItem(key,value){
        window.localStorage.setItem(key,value);
    }// Pass a key name and its value to add or update that key.
    removeItem(){
        window.localStorage.removeItem(key);    
    }// Pass a key name to remove that key from storage.
}

app.initialize();
