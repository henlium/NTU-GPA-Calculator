function calculate() {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {method: "getGPA"}, function (
      response
    ) {
      console.log(response, response.data);
      if (response.method === "getGPA") {
        let gpa = response.gpa;
        let credit = response.credit;
        let gpaText = document.querySelector("p#gpa-p");
        gpaText.innerHTML = "GPA: " + gpa;
        makeVisible(gpaText);
        let creditText = document.querySelector("p#credit-p");
        creditText.innerHTML = "credit: " + credit;
        makeVisible(creditText);
        toggleVisibility(document.querySelector("p#waiting"));
      } else {
        alert("Uh oh...");
      }
    });
  });
}

function makeVisible(element) {
  element.setAttribute("style", "visibility: visible;");
}

function toggleVisibility(element) {
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

window.onload = () => {
  calculate();
};
