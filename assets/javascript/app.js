$(document).ready(function() {
  var heroArray = ["Thor", "Green Lantern", "The Flash", "Batman"];

  function displayHero() {
    var hero = $(this).attr("data-name");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      hero +
      "&api_key=G91ywVKl5sMotDMcwf8dBLNwtldkmzpm&limit=5";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response.data);

      var heroData = response.data;

      for (var i = 0; i < heroData.length; i++) {
        var gifContainer = $("<div>").addClass("hero-img");

        var rating = heroData[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var heroImg = $("<img>");
        heroImg.attr("src", heroData[i].images.fixed_height.url);

        gifContainer.prepend(p);
        gifContainer.prepend(heroImg);

        $("#hero-view").prepend(gifContainer);
      }
    });
  }

  function createButtons() {
    $("#hero-btn-view").empty();

    for (var i = 0; i < heroArray.length; i++) {
      var btn = $("<button>");

      btn.addClass("hero-btn");
      btn.attr("data-name", heroArray[i]);
      btn.text(heroArray[i]);

      $("#hero-btn-view").append(btn);
    }
    console.log(heroArray);
  }

  $("#add-hero").on("click", function(event) {
    event.preventDefault();

    var hero = $("#hero-input")
      .val()
      .trim();

    heroArray.push(hero);

    createButtons();
  });

  $(document).on("click", ".hero-btn", displayHero);

  createButtons();
});
