const submitCSV = document.getElementById('subcsv')
const submitStudent = document.getElementById('stdnt')

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