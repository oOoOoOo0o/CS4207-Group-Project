function getVals(){
    return Array.from(document.querySelectorAll('#test input')).reduce((acc, input) => ({ ...acc, [input.id]:input.value }), {});
}