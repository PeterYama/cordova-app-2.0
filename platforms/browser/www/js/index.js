var taskID = 1;
var db = window.localStorage;
var  cardsArray = {cards:[]}




var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
            $("#addBtn").click(function(){
                renderHomeView();
            })
          
        },
};

function renderHomeView() {
    
    $('.fixed-action-btn').hide();
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
                         <input type="text" id="timepickerElm"class="timepicker">
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
    // const calendar = document.querySelector('.datepicker');
    // M.Datepicker.init(calendar);

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
        var task = addToJSON( taskID,textValue,textDescriptionValue,instanceOfDate,instanceOfTime);
        cardsArray['cards'].push(task);
        console.log("cardsArray = "+ cardsArray)
        pushToStorage('cards',cardsArray['cards']);
        taskID += 1; //auto incrementing task ID
        console.log("taskID =  "+ taskID)
        renderTaskCard();
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
    `  <div class="row">
            <div class="col s12 m7">
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text" >
                    <span class="card-title" id="card-title"></span>
                    <p id="card-content"></p>
                    </div>

                    <div class="card-action">
                        <a href="#" id="card-time"></a>
                        <a href="#" id="card-date"></a>
                    </div>
                </div>
            </div>
        </div>`

        var temp = getItemFromStorage('cards');
        debugger;
        temp.forEach(element => {
            $(document).ready(function(){
                $("#card-title").append(element.textValue);
                $("#card-content").append(element.textDescription);
                $("#card-time").append(element.date.slice(0,10));
                $("#card-date").append(element.time);
                document.getElementById('newTaskDiv').innerHTML += taskCard;
           })
        });
        $('.fixed-action-btn').show();
}

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
