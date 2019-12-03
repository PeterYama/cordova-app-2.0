
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
   
            $("#addbtn").click(function(){
                // taskTemplate();
                addContent();
            }),
            $("#addeditButton").click(function(){
                // taskTemplate();
                checkBoxTest();
            })
        },
        

};

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
      direction: 'left'
    });
  });

 

const taskProps = {
    name:'unsorted task',
    taskStatus:['done','undone'],
    keywords:['important','no due date','urgent']
    
}
function getDivTarget(){
    return document.getElementById("taskName").value;
}

// function generateID(){
//     return taskID += 1;
// }
var deleteButtonId = 1;
var taskID = "row" + deleteButtonId;


function addContent(){
    const markup = `<div class="row" id="${taskID}" style="background: lightgray; line-height: 80px;">
    <div class="col s8">${getDivTarget()}</div>
        <div class="col s2">
            <a class="btn" id="${deleteButtonId}" onclick="deleteTask()" >delete</a>
        </div>
        <div class="col s2">
        <p>
            <label>
                <input id="indeterminate-checkbox" type="checkbox" />
                    <span>Done</span>
            </label>
        </p>
    
        </div>
        </div>
    </div>`;
    deleteButtonId += 1;
    taskID = "row" + deleteButtonId;
    document.getElementById('newTaskDiv').innerHTML += markup;
}

function checkBoxTest(){
    const editButton = ` 
     <div class="fixed-action-btn">
            <a class="btn-floating btn-large red">
                <i class="large material-icons">mode_edit</i>
                    </a>
                        <ul>
                            <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>
                            <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
                            <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
                            <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
                         </ul>
     </div>`;

    

     document.getElementById('newTaskDiv').innerHTML += editButton;

}

function deleteTask(){
   
    document.getElementById($("")).outerHTML = "";
   
}

app.initialize();