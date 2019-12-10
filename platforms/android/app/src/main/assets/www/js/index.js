var taskID = 1;
var db = window.localStorage;
var cardsArray = {cards:[]}
var numbeOfCards = 1;
var task;
var map;
var mapDiv = document.getElementById("map_canvas");
var button = document.getElementById("button");



var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        popupateCards();
    },

    onDeviceReady: function() {

        initMap();
            $("#addBtn").click(function(){

                $('.fixed-action-btn').hide();//hide the Plus button when it is clicked

                renderHomeView();//render the form where the user will add the task details

                $('#map_canvas').empty(); 

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
                <textarea id="textDescriptionField" class="materialize-textarea "></textarea>
                <label for="textarea1">Task Description</label>
                </div>
            </div>

            <div class="row">
                <div class="input-field col s12">
                <textarea id="location-field" class="materialize-textarea "></textarea>
                <label for="textarea1">Location</label>
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
        var locationFieldValue = $("#location-field").val();
        var instanceOfDate = M.Datepicker.getInstance(datePickerElem).date;
        var instanceOfTime = M.Timepicker.getInstance(timepickerElm).time;

        // alert('Location Field = '+ locationFieldValue)
        //creating a value object 
        task = addToJSON( taskID,textValue,textDescriptionValue,instanceOfDate,instanceOfTime,locationFieldValue);

        cardsArray['cards'].push(task);//pushing the new obj to an array
       
        pushToStorage('cards',cardsArray['cards']); //adding to the local storage

        taskID += 1; //auto incrementing task ID

        $('#newTaskDiv').empty();//clear the page before displaying the new card
        
        $('.fixed-action-btn').show();
        // getLocation();
        //display and populate the cards
        popupateCards();

    }); 
    
}

function addToJSON( taskID,textValue,textDescriptionValue,instanceOfDate,instanceOfTime,locationFieldValue){
    
    newTask = {
        taskID: taskID,
        textValue: textValue,
        textDescription:textDescriptionValue,
        date:instanceOfDate,
        time:instanceOfTime,
        location:locationFieldValue
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
                        <a id="card-time">Date: </a>
                        <a id="card-date">Time: </a>
                        <a id="card-location" onClick="getLocation(this.id)">at: </a>
                    </div>
                </div>
            </div>
            </div>
        </div>`

        document.getElementById('newTaskDiv').innerHTML += taskCard;
}

function popupateCards(){

    var temp = getItemFromStorage('cards');

    temp.forEach(element =>{

            renderTaskCard();

            $("#card-id").attr('id',element.taskID);

            //adding the auto incrementing ID to each section of the row
            //doing that way it knows what card to be populated
            $('#deleteButton').attr('id', "deleteButton"+"-"+element.taskID);
            $("#card-title").attr('id',"card-title"+"-"+ element.taskID);
            $("#card-content").attr('id',"card-content"+"-"+element.taskID);
            $("#card-time").attr('id',"card-time"+ "-" + element.taskID);
            $("#card-date").attr('id',"card-date"+ "-"+ element.taskID);
            $("#card-location").attr('id',"card-location"+"-"+ element.taskID);

            $("#card-title"+"-"+element.taskID).append(element.textValue);
            $("#card-content"+"-"+element.taskID).append(element.textDescription);
            $("#card-time"+"-"+element.taskID).append(element.date.slice(0,10));
            $("#card-date"+"-"+element.taskID).append(element.time);
            $("#card-location"+"-"+element.taskID).append(element.location);

    });

    $('.fixed-action-btn').show();
}

// delete card will get the id from the button the user has clicked
function deleteCard(id){

    $("#map_canvas").empty();
    var rowID = id.substring(13);
    $("#"+ rowID).remove();
    console.log("this.taskID = "+ this.taskID)
    console.log("rowID = "+ rowID)
    
    $(mapDiv).empty();

    var temp = getItemFromStorage('cards')
    // temp.[this.taskID-1] 

    temp.splice(rowID-1);
    pushToStorage('cards',temp);
}

function getLocation(id){

    // declaring the call back function when the map is loaded
    var onSuccess = function(position) {

        //getting the individual location from the local storage

        // initializing the map passing the location str
        initMap($('#' + id ).text())

    };

    // declaring an error function
    var err = function(err) {
        console.log("couldn't load map")
    }

    navigator.geolocation.getCurrentPosition(onSuccess,err);
}

// render map will acc the lot and long that will be displayed on the map

function renderMap(LAT,LNG){
    
    // declaring the google map obl and geting the division where it should be loaded
    map = plugin.google.maps.Map.getMap(mapDiv);

    // creating a map obj that will be passed to map 
    mapObj = {
        target: {lat: LAT, lng: LNG},
        zoom: 17,
        tilt: 60,
        bearing: 140,
        duration: 5000
    }
    
    // addint a marker to the map
    var marker = map.addMarker({
        position: {lat: LAT, lng: LNG},
        title: "Your Task Location",
        animation: plugin.google.maps.Animation.BOUNCE
      });

    //passig the map obg to initialize the map
    map.animateCamera(mapObj);
    marker.showInfoWindow();

}
function initMap(adr){
    
    // this method will get the address string and get the coordinates
    // initializing geocoder obj
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': adr}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();

            // rendering the map passing the latitude and loingitude acquired from this function
            renderMap(latitude,longitude);

            } 
        }); 
}

app.initialize();
