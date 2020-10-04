//დავალება:  შექმენით ნოუთების აპლიკაცია. სადაც მომხარებელს შეეძლება ნოუთების (ჩანაწერების) დამატება, წაშლა, ედიტირება და ნახვა. 
//დავალება შედგება ორინაწილისგან:
//ერთ მხარეს უნდა იყოს შექმნილი ნოთების სია
//მეორე მხარეს თვითონ ნოუთის ტექსტი. 
//სიის ელემენტის სახელი არის ნოუთის პირველი ხაზი და იქვე უნდა ეწეროს ნოუთის შექმნის ან ბოლო რედაქტირების დრო. 
//თუ ნოუთში არაფერი წერია მაშინ დაეწეროს "უსათაურო".
//არსებულ ნოუთზე დაკლიკების შემთხვევაში შემეძლოს მისი ნახვაც და შეცვლაც. დაგვჭირდება ნოუთის შექმნის ღილაკი და წაშლის ღილაკი.
//HTML: button, textarea, ul
//JAVASRIPT: Events (click, change), Date, 
//document-ზე მოქმედებებისთვის (ელემენტის შექმნა, ჩამატება, რედაქტირება, წაშლა) 

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

    date.textContent=Date().substring(4, 25);
    setInterval(() => {
        date.textContent=Date().substring(4, 25); // გამოჩნდეს გახსნის დრო
    }, 1000);      
});


buttonSave.addEventListener('click', function(){
    if (newText.value!=""){ 
        console.log("save");
        const words = newText.value.substring(0, 13); // სათაურად ვაჩვენებ პირველ 14 სიმბოლოს
        const li = document.createElement("li"); // htm-ში დაემატა ახალი ელემენტი li            
        li.textContent=words+"...  "+ Date().substring(15, 25); // სათაურს დაემატოს ...და შენახვის დრო
        noteSaveUl.appendChild(li); // Ul-ში დაამატოს შვილი li
        const id = Date.now(); // მილიწამები ავიღოთ id, არასდროს არ გამეორდება
        notes.push({id: id, text: newText.value}); // li ჩაფუშოს notes-ს მასივში
        li.id = id;

        li.addEventListener("click", editNote);
        console.log('edit');          

        newText.style.display = "none"; //შენახვის შემდეგ დისპლეი დაიმალოს  
        newText.value = ""; // დისპლეის ტექსტი განულდეს    

    }else{
        const li = document.createElement("li"); // htm-ში დაემატა ახალი ელემენტი li               
        li.textContent="ცარიელი "+ Date().substring(15, 25); // სათაურს დაემატოს ...და შენახვის დრო
        noteSaveUl.appendChild(li); // Ul-ში დაამატოს შვილი li
        const id = Date.now(); // მილიწამები ავიღოთ id, არასდროს არ გამეორდება
        notes.push({id: id, text: newText.value}); // li ჩაფუშოს notes-ს მასივში
        li.id = id;

        li.addEventListener("click", editNote);
        console.log('edit');        

        newText.style.display = "none"; //შენახვის შემდეგ დისპლეი დაიმალოს 
    }
})   


function editNote(){
    newText.style.display = "block";     // ვაჩენთ ახალ დისპლეის
    let x=this.id;                       //ვინახავთ აქტიური notes აიდს
    for(let i=0; i<notes.length; i++){
        if(notes[i].id==x){              //ვეძებთ li-ში ამ აიდს
            newText.value=notes[i].text; // ახალ დისპლეიში ვსვავთ შენახული li-ს ტექსტს 
            console.log(newText.value);
            notes[i].text=newText.value; // li-ში ვინახავთ ბოლო დაკორექტირებულ ტექსტს
        };   
    };
};

// li.addEventListener("click", deleteNote); //სად ჩავსვა ??????????
// console.log('edit');


function deleteNote(){
    alert('კარგად დაფიქრდი :(');

    newText.style.display = "block";     // ვაჩენთ ახალ დისპლეის
    let x=this.id;  //ვინახავთ აქტიური notes აიდს
    console.log(x);
    for(let i=0; i<notes.length; i++){
        if(notes[i].id==x){   //ვეძებთ li-ში ამ აიდს
            newText.value=notes[i].text; // ახალ დისპლეიში ვსვავთ შენახული li-ს ტექსტს
               
            notes[i]=notes[notes.length-1]; // მასივის ბოლო ელემენტს ვინახავთ აქტიურ i ელემენტში
            notes.pop();
            // removeChild(this.li); // არ იშლება ??????????
        };    
    };      
};

// შენახვა ხდება მხოლოდ ახალ notes-ში (სადაც ედიტირება ხდება იქ არა)
// მოშვლის ღილაკი არ მუშაობს
