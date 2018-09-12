var topics = "";

$("button").on("click", function(){

    var topic = $(this).attr("data-gif");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=yclRDkhD2ryDIwMSuuNXooyAONuSchaS&limit=10";

$.ajax({
    url: queryURL,
    method: "GET"
})

.then(function(response){
    var results = response.data;
   
    for (var i = 0; i < results.length; i++){
    
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var gifImage = $("<img>");

            var gifImage = $("<img>").attr("src", results[i].images.fixed_height_still.url);
            gifImage.addClass("card-img-top gif");
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-state", "still")

            
            gifDiv.append(p);
            gifDiv.append(gifImage);

            $("#gifs-appear-here").prepend(gifImage, gifDiv);
    }
});
});

$(document).on( "click", ".gif", function () {

        var state = $(this).data("state");

        if (state === "still") {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).data('state', 'animate');
        } else {
          $(this).attr('src', $(this).attr('data-still'));
        $(this).data('state', 'still');
        };

    });

