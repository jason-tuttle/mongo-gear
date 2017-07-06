
function addInfo() {
  const props = document.querySelector(".properties");
  const addButton = document.getElementById('add')
  let newProp = document.createElement("input");
  let br = document.createElement("br");
  newProp.setAttribute("type", "input");
  newProp.setAttribute("name", "property");
  newProp.setAttribute("placeholder", "add info...");
  props.insertBefore(br, addButton);
  props.insertBefore(newProp, addButton);
  newProp.focus();
}


(function() {
  const addForm = document.querySelector("form");

  addForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var request = new XMLHttpRequest();
    request.open("POST", "/add");
    request.send(new FormData(addForm));
  });
})();
