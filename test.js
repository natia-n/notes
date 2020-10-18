localStorage.setItem('myCat', 'Tom');

let cat = localStorage.getItem('myCat'); // ერთის მოშლა

localStorage.clear(); // ყველას მოშლა

console.log(localStorage.setItem.maCat);

let x = "gamarjoba vakho"
undefined
x.includes("ba");
true


search.addEventListener('keyup', () => { //ღილაკზე ხელის აღების დროს მოხდეს მოსმენა
    const filtered = notes.filter(note => note.text.includes(search.value)); //notes-ში გამიფილტრე ისეთი note-ები, რომლის ტექსტიც შეიცავს სერჩის ველიუს
    noteSaveUl.textContent = "";
    displayNotes(filtered);
});



search.addEventListener('keyup', () => { //ღილაკზე ხელის აღების დროს მოხდეს მოსმენა 
    const filtered = notes.filter (note => note.text.includes (search.Value)); //includes: ტექსტში ეძებს ტექსტს
    //სიმარვლის სახით შემინახოს: notes-ში გამიფილტრე ისეთი note-ები, რომლის ტექსტიც შეიცავს სერჩის ველიუს
    noteSaveUl.textContent = ""; //Ul გაცარიელდეს (ყველა li მოიშალოს)
    displayNotes(filtered); // ძებნის დროს li-ში  შემინახოს ახალი მასივი (რომლის ძებნის ტექსტიც ემთხვევა)
});

// firstLine = theString.split('\n')[0];