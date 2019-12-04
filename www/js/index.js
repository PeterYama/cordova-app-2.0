var taskID = 1;

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
            $("#addBtn").click(function(){
                // taskTemplate();
                renderHomeView();
            })
          
        },
};

function renderHomeView() {

    var html =  
    ` 
    <div className="container">
    <div class="row">
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

            <div className="row">
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
        var instanceOfTimeAmOrPM = M.Timepicker.getInstance(timepickerElm).amOrPm;
        var instance = instanceOfTime +" "+ instanceOfTimeAmOrPM;

        var db = window.localStorage; //adding localStorage to a variable

        //creating a value object 
        var valuerArray = {
            textValue: textValue,
            textDescription:textDescriptionValue,
            date:instanceOfDate,
            time:instance
        }
        console.log(valuerArray);
        var convertedValue = JSON.stringify(valuerArray);
        console.log(valuerArray);
        db.setItem(taskID,convertedValue);

        taskID += 1; //auto incrementing task ID

        renderTaskCard();
        // myDB = new DbManager();
        // console.log(myDB);
    }); 
    
}

function renderTaskCard(){
    var taskCard = 
    `  <div class="row">
            <div class="col s12 m7">
                <div class="card blue-grey darken-1">
                    <div class="card-image">
                        <img src="img/logo.png">
                        <span class="card-title" id="card-title"></span>
                    </div>

                    <div class="card-content white-text" id="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information.
                        I am convenient because I require little markup to use effectively.</p>
                    </div>

                    <div class="card-action">
                        <a href="#" id="card-time">This is a link</a>
                        <a href="#" id="card-date">This is a link</a>
                    </div>
                </div>
            </div>
        </div>`

        var db = window.localStorage;
        var unsortedData = JSON.parse(db.getItem(1));
        console.log(unsortedData);

        var myObj = { one: { title: 'first', id: 1,
                    customKey : { first: "first",
                    second: "second" } },
                    two: { title: 'second', id: 2 },
                    three: { title: 'this is the third',
                    id: 3 } };


        $(document).ready(function(){
             $(unsortedData.textValue).appendTo("#card-title");
        })

  document.getElementById('newTaskDiv').innerHTML = taskCard;

}

// class DbManager extends window{

//     constructor(key,value){
//         var valueaArray= [key,value]
//         this.newValue = valueaArray;
//     }

//     getItem(valueaArray){
//         st.getItem(valueaArray);// Pass a key name to get its value.
//     }
//     addItem(valueaArray){
//         st.setItem(valueaArray);
//     }// Pass a key name and its value to add or update that key.
//     removeItem(){
//         st.removeItem(key);    
//     }// Pass a key name to remove that key from storage.
// }

app.initialize();
