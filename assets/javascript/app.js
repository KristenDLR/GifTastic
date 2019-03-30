var show = [
  "Arrested Developmemt",
  "BroadCity",
  "Happy Endings",
  "Parks and Rec",
  "MTV Cribs",
  "Umbrella Academy",
  "The Office",
  "All That",
  "Saturday Night Live"
];

function renderButtons() {
  // Deletes the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();
  // Loops through the array of movies
  for (var i = 0; i < show.length; i++) {
    // Then dynamicaly generates buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds a class of movie to our button
    a.addClass("show");
    // Added a data-attribute
    a.attr("data-name", show[i]);
    // Provided the initial button text
    a.text(show[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

$(document).on("click", ".show", function() {
  var tvShow = $(this).attr("data-name");
  console.log(tvShow);
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    tvShow +
    "&api_key=yYQeSXggE0mxGrPblaK4MpgQb38UjkRg&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    for (var i = 0; i < response.data.length; i++) {
      var tv_div = $("<div>");
      var p = $("<p>").text("Rating: " + response.data[i].rating);
      var gifs = $("<img>");
      gifs.attr("src", response.data[i].images.downsized_still.url);
      gifs.attr("data-still", response.data[i].images.downsized_still.url);
      gifs.attr("data-animate", response.data[i].images.downsized.url);
      gifs.attr("data-state", "still");
      gifs.addClass("gif-class");
      tv_div.append(p, gifs);
      $("#tv-view").prepend(tv_div);
    }
  });
  //fix api connection
});

renderButtons();

$(document).on("click", ".gif-class", function() {
  var state = $(this).attr("data-state");
  if (state == "animate") {
    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-state", "still");
  } else {
    $(this).attr("src", $(this).data("animate"));
    $(this).attr("data-state", "animate");
  }
});

$("#add-tv").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var tv = $("#tv-input")
    .val()
    .trim();

  // Adding movie from the textbox to our array
  show.push(tv);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});
