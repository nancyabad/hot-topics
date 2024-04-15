// Get the references to active parts of HTML
let lis = document.querySelectorAll("nav li a");
let dc = document.querySelector(".dynamic-content");

// have the location of the data saved in a variable
let url = "partials/partial-1.html";

// use the function fetch to trigger http request
function handleAjax(dataLocation) {
  fetch(dataLocation)
    .then(function (rsp) {
      if (rsp.ok) {
        return rsp.text();
      }
      throw new Error(rsp.statusText);
    })
    .then(function (data) {
      // pass the html-content (data) to <div class="dynamic-content"></div>
      dc.innerHTML = data;
    })
    .catch(function (err) {
      // print the error message in console
      console.error("Error:", err.message);
    });
}
function pickPartial(ev) {
  // prevent the default behaviour of the link
  ev.preventDefault();

  // get the currently clicked item - reference from event-object
  let currentItem = ev.target;

  // create the path to the current content using the value from data attribute and then reassign the variable url with the updated path
  url = currentItem.href;
  // call the function handleAjax with the updated url (assign the parameter dataLocation with url)
  handleAjax(url);
}

for (let li of lis) {
  li.addEventListener("click", pickPartial);
}

handleAjax(url);
