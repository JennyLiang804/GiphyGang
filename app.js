var results = "";

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
            gifImage.addClass("gif");
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

    function renderButtons() {

        // Deletes the Topics prior to adding new Topic
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Loops through the array of movies
        for (var i = 0; i < results.length; i++) {

          // Then dynamicaly generates buttons for each topic in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of topic to our button
          a.addClass("topic btn btn-outline-success");
          // Added a data-attribute
          a.attr("data-name", results[i]);
          // Provided the initial button text
          a.text(results[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where the add topic button is clicked
      $("#add-topic").on("click", function(event) {
          console.log("add topic button clicked");
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var topic = $("#topic-input").val().trim();

        // The topic from the textbox is then added to our array
        $(results).push(topic);

        // Calling renderButtons which handles the processing of our topic array
        renderButtons();
      });

      // Calling the renderButtons function to display the intial buttons
      renderButtons();