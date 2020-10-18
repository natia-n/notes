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
//ზევითა შუა ნაწილში ახლანდელი დრო რომ ჩანს, თუ მოვნიშნავთ რომელიმე ნოუთს მისი შექმნის დრო გამოჩნდეს, თუ ახალს ვქნით, მაშინ ახლანდელი დრო
//შენახული ნოუთის სათაური იყოს მისი პირველი სტრიქონი. გამოიყენეთ ჯავასკრიპტის split ფუნქცია. 
//(css-ის საშუალებით შეგიძლიათ ერთ ხაზში დაწეროთ ეგ სათაური ისე, რომ თუ არ დაეტევა მრავალწერტილი დაეწეროს გვერდით) 
//დაამატეთ search (ძებნის) ფუნქციონალი. როცა დავიწყებ ძებნის ველში წერას ავტომატურად მხოლოდ ისეთი ნოუთები დამიტოვოს სიაში, 
//რომლებშიც მეორდება ის ფრაზა რაც საძიებო ველში მიწერია 
//შეინახეთ შეყვანილი ნოუთები localStorage -ში js-ში
//მისი საშუალებით როცა გვერდს დაარეფრეშებთ ან ახლიდან ჩართავთ ბრაუზერს, ძველი შენახული ნოუთები არ დაიკარგება. 

const buuttonNewNote=document.getElementById("new-note");
const buttonDelete=document.getElementById("delete");
const newText=document.getElementById("text");
const buttonSave=document.getElementById("save");
const noteSaveUl=document.getElementById("save-note");
const date=document.getElementById("date");
const search=document.getElementById("search");
let myNote = null; // null შევინახეთ ცვლადში
let taimer; // setInterval უნდა შევინახო
let notes = JSON.parse(localStorage.getItem("notes")) ?? []; //ცვლადში ვინახავ ბრაუზერში შენახულ მასივს ან ცარიელ მასივს

//ბრაუზერის გაშვებისას li-ში გადმოიტანოს შენახული ნოუთები ან მექნება ცარიელი სიმრავლე:
function displayNotes(notes){ // გამოიყენება ბრაუზერის გაშვების დროს და მოძებნის დროს
    for(let i = 0; i < notes.length; i++) {
        const li = document.createElement("li"); // htm-ში დაემატა ახალი ელემენტი li     
        const words = notes[i].text.split('\n')[0]; // სათაურად ვაჩვენებ პირველ 14 სიმბოლოს  
        const title = document.createElement("p");     
        const time = document.createElement("span");        
        title.textContent= (words == "" ? "ცარიელი " : words);
        time.textContent = notes[i].dateSatauri;
        li.appendChild(title);
        li.appendChild(time);          
        const id = notes[i].id; // მილიწამები ავიღოთ id (არასდროს არ გამეორდება)
        li.id = id;
        noteSaveUl.appendChild(li); // Ul-ში დაამატოს შვილი li
        li.addEventListener("click", editNote); // აქედან გაეშვას li (ამ ფუნქციაში არის შექმნილი li)
    };
};

displayNotes(notes);

function taimerInterval (){
    date.textContent=Date().substring(4, 25);
    taimer = setInterval(() => {
        date.textContent=Date().substring(4, 25); // გამოჩნდეს გახსნის დრო
    }, 1000);
};

taimerInterval(); //ბრაუშერის გაშვების დროს თაიმერი ჩაირთოს
    
buuttonNewNote.addEventListener('click', function(){
    if(!taimer) {
        taimerInterval(); // ტაიმერი ჩაირთოს მხოლოდ მაშინ, როცა აქტიური ტაიმერი არ არის
    };    
    console.log("create");
    newText.style.display = "block"; //css მქონდა დისპლეის დამალვა და ამით გამოვაჩინეთ 
    newText.value = ""; // დისპლეის ტექსტი განულდეს  
    myNote = null;
});

function deleteNote(){
    if(myNote !== null){ //თუ აქტიური Note არ აის null
        document.getElementById(myNote.id).remove(); //მოშალოს ეს Note html-ში
        let x=myNote.id;
        console.log(x);
        for (let i=0; i<notes.length; i++){ // მოშალოს ეს Note js-ში
            if(notes[i].id==x){
                notes[i]=notes[notes.length-1];
                notes.pop();
                console.log(notes);               
            };
        };
    };
};

buttonSave.addEventListener('click', function(){
    deleteNote(); //შენახვის დროს ძველს შლის და ახალად ამატებს
    console.log("save");
    const li = document.createElement("li"); // htm-ში დაემატა ახალი ელემენტი li
    const title = document.createElement("p"); // შევინახო ტექსტი    
    const time = document.createElement("span"); // შევინახო დრო     
    const words = newText.value.split('\n')[0]; // ტექსტა დაშლის აბზაცებად და შეინახავს სიმრავლის სახით, ვღებულობთ 0 ინდექს               
    title.textContent= (words == "" ? "ცარიელი " : words); // თუ ცარიელია, დაწეროს "ცალიელი", თუ არა: მისი ტექსტი
    time.textContent = Date().substring(15, 21); //შეინახოს შენახვის დრო
    li.appendChild(title); // li-ში დაემატოს P ტექსტი
    li.appendChild(time); // li-ში დაემატოს span დრო    
    const id = Date.now(); // მილიწამები ავიღოთ id (არასდროს არ გამეორდება)
    li.id = id;
    noteSaveUl.prepend(li); // Ul-ში დაამატოს შვილი li-ს დასაწყისში
    notes.unshift({id: id, text: newText.value, date: Date().substring(4, 21), dateSatauri: Date().substring(15, 21)}); 
    // li ჩაფუშოს notes-ს მასივში დასაწყისში
    localStorage.setItem("notes", JSON.stringify(notes)); // შევინახე ბრაუზერში notes მასივის სახით
    newText.style.display = "none"; //შენახვის შემდეგ დისპლეი დაიმალოს  
    newText.value = ""; // დისპლეის ტექსტი განულდეს  
    myNote = null;  // შენახვის შემდეგ Note ტექსტი გაცარიელდეს
    taimerInterval(); // ახალი დრო ჩაირთოს

    li.addEventListener("click", editNote); // აქედან გაეშვას li (ამ ფუნქციაში არის შექმნილი li)
    console.log('edit');      
}); 

function editNote(){
    newText.style.display = "block"; // ვაჩენთ ახალ დისპლეის
    let x=this.id; //ვინახავთ აქტიური notes აიდს
    myNote = notes.find(function(n){  //notes-ში მოძებნოს ისეთი ობიექტი, რომლის id არის x
       return n.id == x;
    });
    console.log(myNote, notes, x);
    newText.value=myNote.text; // ახალ დისპლეიში ვსვავთ შენახული li-ს ტექსტს 
    clearInterval(taimer); // ტაიმერი გავთიშედ
    date.textContent=myNote.date; // დავაფიქსირეთ შენახვის დრო  
    console.log(newText.value);
    search.value = ""; //ძებნის შემდეგ ველიუ გაცარიელდეს
    filterArray(""); // აქ გადავცემს სტრინგს, რადგან ძებნისას li-ის არჩევის შემდეგ li-ბი გამოჩნდეს
};

buttonDelete.addEventListener('click', function(){
    if(confirm()){ //გაფრთხილების ღილაკი (მოიშალოს თუ არა)
        deleteNote();
        localStorage.setItem("notes", JSON.stringify(notes)); // სმრავლე შევინახო ბრაუზერში (მოშლის შემდეგ ბოლო ვარიანტი)                  
        myNote = null; // მოშლის შემდეგ Note ტექსტი გაცარიელდეს        
        taimerInterval(); // ჩაირთოს ახალი დრო
        newText.style.display = "none"; //მოშლის შემდეგ დისპლეი დაიმალოს  
        newText.value = ""; // დისპლეის ტექსტი განულდეს 
    };   
});

function filterArray(text){
    const filtered = notes.filter(note => note.text.includes(text)); //includes: ტექსტში ეძებს ტექსტს
    //სიმარვლის სახით შემინახოს: notes-ში გამიფილტრე ისეთი note-ების ტექტი, რომლიც შეიცავს სერჩის ველიუს
    noteSaveUl.textContent = ""; //Ul გაცარიელდეს (ყველა li მოიშალოს)
    displayNotes(filtered); // ძებნის დროს li-ში  შემინახოს ახალი მასივი (რომლის ძებნის ტექსტიც ემთხვევა)
}

search.addEventListener('keyup', () => { //ღილაკზე ხელის აღების დროს მოხდეს მოსმენა 
    filterArray(search.value); // ამ ფუნქციას გადავცედ სერჩის ტექსტი
});