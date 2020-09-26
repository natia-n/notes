const not=document.getElementById("new-note");
// const del=document.getElementById("delete");
const newText=document.getElementById("text");
const save=document.getElementById("save");
let noteSave=document.getElementById("1");

not.addEventListener('click', function(){
    console.log("create");
    newText.style.display = "block"; //css მქონდა დისპლეის დამალვა და ამით გამოვაჩინეთ
});

save.addEventListener('click', function(){
    const words = newText.value.substring(0, 13);
    
    noteSave.textContent=words+"...";
    console.log(words);
});

