const submitCSV = document.getElementById('subcsv')
const submitStudent = document.getElementById('stdnt')


document.addEventListener('DOMContentLoaded', function () {
    const submitCSVButton = document.getElementById('submitStudentCsv');
    const fileInput = document.getElementById('studentCsv');

    if (!submitCSVButton || !fileInput) {
        console.error("Element not found.");
        return;
    }

    submitCSVButton.addEventListener('click', function (event) {
        event.preventDefault();
        loadStudentsFromCSV();
    });

    console.log("Event listener added for Student CSV submission.");
});

submitCSV.addEventListener('click', () => {
    alert("File submitted!")
    //TODO: Load inputs into main JS
})

submitStudent.addEventListener('click', () => {
    alert("File submitted!")
    //TODO: Load inputs into main JS
})

function getVals(){
    return Array.from(document.querySelectorAll('#test input')).reduce((acc, input) => ({ ...acc, [input.id]:input.value }), {});
}