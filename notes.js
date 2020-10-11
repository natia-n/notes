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
let date=document.getElementById("date");
let notes=[];  
let myNote = null; // null შევინახეთ ცვლადში


date.textContent=Date().substring(4, 25);
    setInterval(() => {
        date.textContent=Date().substring(4, 25); // გამოჩნდეს გახსნის დრო
    }, 1000);

buuttonNewNote.addEventListener('click', function(){
    console.log("create");
    newText.style.display = "block"; //css მქონდა დისპლეის დამალვა და ამით გამოვაჩინეთ 
});


buttonSave.addEventListener('click', function(){
    if(myNote !== null){ //თუ აქტიური Note არ აის null
        document.getElementById(myNote.id).remove(); //მოშალოს ეს Note html-ში
        let x=myNote.id;
        console.log(x);
        for (let i=0; i<notes.length; i++){ // მოშალოს ეს Note js-ში
            if(notes[i].id==x){
                notes[i]=notes[notes.length-1];
                notes.pop();
                console.log(notes);
            }
        }
    }
    console.log("save");
    const li = document.createElement("li"); // htm-ში დაემატა ახალი ელემენტი li     
    const words = newText.value.substring(0, 13); // სათაურად ვაჩვენებ პირველ 14 სიმბოლოს               
    li.textContent= (words == "" ? "ცარიელი " : words+"...  ") + Date().substring(15, 25); 
    // თუ ცარიელია, დაწეროს "ცალიელი", თუ არა: მისი ტექსტი და სათაურს დაემატოს ...და შენახვის დრო
    noteSaveUl.appendChild(li); // Ul-ში დაამატოს შვილი li
    const id = Date.now(); // მილიწამები ავიღოთ id (არასდროს არ გამეორდება)
    notes.push({id: id, text: newText.value}); // li ჩაფუშოს notes-ს მასივში
    li.id = id;                 

    newText.style.display = "none"; //შენახვის შემდეგ დისპლეი დაიმალოს  
    newText.value = ""; // დისპლეის ტექსტი განულდეს   
    
    li.addEventListener("click", editNote); // აქედან გაეშვას li (ამ ფუნქციაში არის შექმნილი li)
    console.log('edit');   
    myNote = null;  // შენახვის შემდეგ Note ტექსტი გაცარიელდეს
})   


function editNote(){
    newText.style.display = "block";     // ვაჩენთ ახალ დისპლეის
    let x=this.id;                       //ვინახავთ აქტიური notes აიდს
    myNote = notes.find(function(n){
       return n.id == x;
    });
    console.log(myNote, notes, x);

    newText.value=myNote.text; // ახალ დისპლეიში ვსვავთ შენახული li-ს ტექსტს 
    console.log(newText.value);    
};

buttonDelete.addEventListener('click', function(){
    // prompt(title, default);
    if(confirm()){
        if(myNote !== null){ //თუ აქტიური Note არ აის null
            document.getElementById(myNote.id).remove(); //მოშალოს ეს Note
            newText.style.display = "none"; //მოშლის შემდეგ დისპლეი დაიმალოს  
            newText.value = ""; // დისპლეის ტექსტი განულდეს
    
            let x=myNote.id;
            console.log(x);
            for (let i=0; i<notes.length; i++){
                if(notes[i].id==x){
                    notes[i]=notes[notes.length-1];
                    notes.pop();
                    console.log(notes);
                    myNote = null; // მოშლის შემდეგ Note ტექსტი გაცარიელდეს
                }
            }
        }
    }
    
})