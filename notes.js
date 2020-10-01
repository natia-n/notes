const buuttonNewNote=document.getElementById("new-note");
const buttonDelete=document.getElementById("delete");
const newText=document.getElementById("text");
const buttonSave=document.getElementById("save");
const noteSaveUl=document.getElementById("save-note");
let date=document.getElementById("date");

let notes=[];  

buuttonNewNote.addEventListener('click', function(){
    console.log("create");
    newText.style.display = "block"; //css მქონდა დისპლეის დამალვა და ამით გამოვაჩინეთ   
});

buttonSave.addEventListener('click', function(){
    if (newText.value!=""){ 
        console.log("save");
        const words = newText.value.substring(0, 13); // სათაურად ვაჩვენებ პირველ 14 სიმბოლოს
        const li = document.createElement("li"); // htm-ში დაემატა ახალი ელემენტი li            
        li.textContent=words+"..."; // სათაურს დაემატოს ...
        noteSaveUl.appendChild(li); // Ul-ში დაამატოს შვილი li
        notes.push(li); // li ჩაფუშოს notes-ს მასივში
      
        newText.style.display = "none"; //შენახვის შემდეგ დისპლეი დაიმალოს  
        newText.value = ""; // დისპლეის ტექსტი განულდეს

        date.textContent = Date().substring(4, 25); // გამოჩნდეს შენახვის დრო 
    };    
    
    console.log(notes);
    console.log(date.textContent);
});       

