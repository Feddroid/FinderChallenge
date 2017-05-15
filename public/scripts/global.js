/*
  constants and global functions
*/

var JSON_FILE = '/books-schema.json';

/*
 @method loadJSON
 source: https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
*/
var loadJSON = function(url, callback){
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", url, true);
    xobj.onreadystatechange = function(responseText){
        if(xobj.readyState == 4 && xobj.status == "200"){
            var content = JSON.parse(xobj.responseText);
            callback.call(this, content);
        }
    };
    xobj.send(null);
};

loadJSON(JSON_FILE, function(response) {

    console.log(response);
    
    //saved
    var savedList = document.getElementById('saved');

    for (var i = 0; i < response.entities.saved.length; i++)
    {
        savedList.innerHTML += "<li><a href="+response.entities.saved[i].url+">"+response.entities.saved[i].label+"</a></li>"; 
    } 

    //categories
    var categoriesList = document.getElementById('categories');
    var categoriesRepeat = response.entities.categories[0];

    for (var i = 0; i < response.entities.categories.length; i++)
    {        
       categoriesList.innerHTML += "<li><a href='#/horror'>"+categoriesRepeat.horror.label+"</a></li>"; 
       categoriesList.innerHTML += "<li><a href='#/comedy'>"+categoriesRepeat.comedy.label+"</a></li>";
       categoriesList.innerHTML += "<li><a href='#/drama'>"+categoriesRepeat.drama.label+"</a></li>"; 
    } 

    //lang
    var langList = document.getElementById('lang');
    var langRepeat = response.entities.lang[0];

    for (var i = 0; i < response.entities.lang.length; i++)
    {        
       langList.innerHTML += "<li id="+langRepeat.ENG.id+"><a href=''>"+langRepeat.ENG.label+"</a></li>"; 
       langList.innerHTML += "<li id="+langRepeat.ESP.id+"><a href=''>"+langRepeat.ESP.label+"</a></li>";
       langList.innerHTML += "<li id="+langRepeat.PRT.id+"><a href=''>"+langRepeat.PRT.label+"</a></li>"; 
    } 

    //edition
    var editionList = document.getElementById('edition');
    var editionRepeat = response.entities.edition[0];

    for (var i = 0; i < response.entities.edition.length; i++)
    {        
       editionList.innerHTML += "<li id="+editionRepeat.print.id+"><a href=''>"+editionRepeat.print.label+"</a></li>"; 
       editionList.innerHTML += "<li id="+editionRepeat.digital.id+"><a href=''>"+editionRepeat.digital.label+"</a></li>";
       editionList.innerHTML += "<li id="+editionRepeat.both.id+"><a href=''>"+editionRepeat.both.label+"</a></li>"; 
    } 

    //data    
    var dataList = document.getElementById('contentData');
    var dataRepeat = response.data;
    var pageLimit = 9;    
    
    for (var i = 0; i < response.data.length; i++)
    {        
       dataList.innerHTML += "<li class='pure-u-1-3 "+dataRepeat[i].categories[0]+"'>\
                                <img src="+dataRepeat[i].image+" alt='' width='' height=''>\
                                <h3>"+dataRepeat[i].title+"</h3>\
                                <p>"+dataRepeat[i].teaser+"</p>\
                              </li>"; 
    }    

}); 

$(document).ready(function() {
    //filters
    $("#categories li a").click(function(event) {
        var url = $(this).attr('href').split("/")[1];

        $("#contentData li").each(function(){
            if( $(this).hasClass(url) ){
                $(this).show();                
            }else{
                $(this).hide();
            }
        });

    });
});

