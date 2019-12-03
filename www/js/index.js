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

// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.fixed-action-btn');
//     var instances = M.FloatingActionButton.init(elems, {
//       direction: 'left'
//     });
//   });

function getDivTarget(){
    return document.getElementById("taskName").value;
}

var deleteButtonId = 1;
var taskID = "row" + deleteButtonId;

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
                         <input type="text" class="timepicker">
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

        var textValue = $("#taskNameField").val();
        var textDescriptionValue = $("#textDescriptionField").val();
        var instance = M.Datepicker.getInstance(datePickerElem);
        

    });
    
}

function deleteTask(){
    document.getElementById($("")).outerHTML = "";
}

function addValue(key,value){
    window.localStorage.setItem(key,value);
}

app.initialize();
