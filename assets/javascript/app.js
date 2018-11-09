$("#add").on("click", function(){
    event.preventDefault();

    var search = $("#search").val();
    var button = $('<button class="btn btn-info" style="margin:2px">');

    button.val(search);
    button.addClass("animal");

    var completeButton = button.append(search);
    $(".hold").append(completeButton);

    $("#search").val("");
})

$(document).on("click", ".animal", function(){
    $(".gifs").empty();
    var animal = $(this).val();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response){
            
            var results = response.data;
            console.log(results);
            var staticArray = [];
            var animatedArray = [];
            for(var i = 0; i< results.length; i++){
                var gifDiv = $(`<div style = "float:left; margin:0 1em 1em 0">`);             
                var rating = results[i].rating;
                var p = $("<p class='text-center font-weight-bold'>").text("Rating: " + rating);
                var img = $(`<img value=${i} data-state="static">`);
                var staticGif = results[i].images.fixed_height_still.url;
                var animatedGif = results[i].images.fixed_height.url;
                img.attr("src", staticGif);
                img.attr("data-static", staticGif);
                img.attr("data-animated", animatedGif);
                gifDiv.append(p);
                gifDiv.append(img);                
                $(".gifs").append(gifDiv);
                staticArray.push(staticGif);
                animatedArray.push(animatedGif);
            }
            console.log(animatedArray);
        });

});

$(document).on("click", "img", function(){
    
    var state = $(this).attr("data-state");
    console.log(state);
    if(state === "static"){
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animated")
    }
    else{
        $(this).attr("src", $(this).attr("data-static"));
        $(this).attr("data-state", "static") 
    }
});


