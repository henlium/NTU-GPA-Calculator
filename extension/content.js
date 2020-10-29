const gradePoints = {
  "A+": 4.3,
  "A": 4,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2,
  "C-": 1.7,
  "F": 0,
};

function getGPA() {
  let totalWeightedGradePoint = 0;
  let totalCredit = 0;
  let tables = document.querySelectorAll("table.style2");
  for (const t of tables) {
    if (t.rows[0].cells[0].innerHTML !== "課別") {
      continue;
    }
    let rows = t.querySelectorAll("tr");
    for (const row of rows) {
      if (row.cells.length < 9) continue;
      let credit = Number(row.cells[6].innerHTML);
      let grade = row.cells[7].innerHTML.replace(/\(|\)|\ /gi, "");
      if (!(grade in gradePoints)) continue;
      totalCredit += credit;
      totalWeightedGradePoint += gradePoints[grade] * credit;
    }
  }
  totalWeightedGradePoint = Math.round(totalWeightedGradePoint * 10) / 10;
  let gpa = calcGradePoint(totalWeightedGradePoint, totalCredit);
  return {gpa: gpa, credit: totalCredit};
}

function calcGradePoint(weightedGradePoint, credit) {
  return Math.round((weightedGradePoint / credit) * 100) / 100;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.method === "getGPA") {
    sendResponse({
      method: "getGPA",
      ...getGPA(),
    });
  }
});
