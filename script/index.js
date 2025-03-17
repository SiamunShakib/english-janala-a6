// nav button link with section



// login btn (get start)
document.getElementById("login-btn").addEventListener("click",function(event){
    event.preventDefault();
    const Name = document.getElementById('input-name').value
    const pin = document.getElementById('input-pin').value;
    convertedPin = parseInt(pin);

   if(Name){
    if(convertedPin === 123){
        document.getElementById('nav').classList.remove("hidden");
        document.getElementById('learn').classList.remove("hidden");
        document.getElementById('faq').classList.remove("hidden");
        document.getElementById('banner').classList.add("hidden");

    }
    else{
        alert("Enter valid pin (123456)")
    }
   }
   else{
    alert('Enter your name please')
   }
    
});


// logout btn
document.getElementById("logout-btn").addEventListener("click",function(){
    document.getElementById("banner").classList.remove("hidden");
    document.getElementById("learn").classList.add("hidden");
    document.getElementById('nav').classList.add("hidden");
    document.getElementById('faq').classList.add("hidden");
})


// remove active class
const removeActiveClass = () =>{
    const activeBtn = document.getElementsByClassName("active");
    for(let btn of activeBtn){
        btn.classList.remove("active")
    }
    // console.log(activeBtn);
}


// load levels (lesson)
const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then(data=>{
        displayCategory(data.data);
    })
}




// get words by levels
const loadCard = (id) => {
const url = `https://openapi.programming-hero.com/api/level/${id}
`;
console.log(url);

fetch(url)
.then(res=>res.json())
.then(data=>{
    removeActiveClass();
    const clickeBtn = document.getElementById(`btn-${id}`);
    clickeBtn.classList.add("active");
    displayCards(data.data);
});
}



// load word details
const loadWordDetails = (detailsid) => {
console.log(detailsid);
fetch(`https://openapi.programming-hero.com/api/word/${detailsid}`)
.then(res=>res.json())
.then(data =>{
    displayWordDetails(data.data)
})
}


// display word details
const displayWordDetails = (details) =>{
console.log(details)

document.getElementById("word_details").showModal();
const detailsContainer = document.getElementById("details-container");
detailsContainer.innerHTML=`
<h2 class="text-2xl">${details.word} (<i class="fa-solid fa-microphone"></i> :${details.pronunciation})</h2>
<h3 class="font-bold mt-4">Meaning</h3>
<h3>${details.meaning ?? "অর্থ পাওয়া যায়নি"}</h3>
<h3 class="font-bold mt-4">Example</h3>
<h3>${details.sentence}</h3>
<h3 class="font-bold mt-4">সমার্থক শব্দ গুলো</h3>
<div >
            ${details.synonyms.length > 0 ? `<button class="btn bg-[#EDF7FF]">${details.synonyms[0] ?? "শব্দ নেই"}</button>
                <button class="btn bg-[#EDF7FF]">${details.synonyms[1] ?? "শব্দ নেই"}</button>
                <button class="btn bg-[#EDF7FF]">${details.synonyms[2] ?? "শব্দ নেই"}</button>` : ''}                
           
            </div>

`
}




// display words
const displayCards = (cards) =>{
    const cardContainer = document.getElementById("card-container");
 
    cardContainer.innerHTML="";

    if(cards.length ==0){
         cardContainer.innerHTML=`
         <div class="text-center col-span-full">
            <img class="mx-auto" src="assets/alert-error.png" alt="">
            <p >এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-3xl mt-3">নেক্সট Lesson এ যান</h2>
        </div>
         `
        return;
    }

    cards.forEach(card => {

        const cardDiv = document.createElement("div");

        cardDiv.innerHTML=`
        <div class="p-10 text-center bg-white rounded-md">
            <h2 class="text-xl font-bold mb-3">${card.word}</h2>
            <p>Meaning/Pronounciation</p>
            <h2 class="text-lg mt-3">
                ${card.meaning ?? "অর্থ নেই"}/${card.pronunciation}
            </h2>
                          
            <div class="card-actions justify-between mt-5">
                <button onclick="loadWordDetails(${card.id})">
                    <i class="bg-slate-200 p-2 rounded-sm fa-solid fa-circle-info"></i>
                </button>
                <button>
                    <i class="bg-slate-200 p-2 rounded-sm fa-solid fa-volume-high"></i>
                </button>
                
                
            </div>
        </div>
        `;

        cardContainer.appendChild(cardDiv);

    });
    
}



// display levels
const displayCategory = (categories) =>{
    
    const categoryContainer = document.getElementById('category-container');
    for(let category of categories){
        const categoryDiv = document.createElement('Div');
        categoryDiv.innerHTML=`
        <button id="btn-${category.level_no}" onclick="loadCard(${category.level_no})" class="mt-10 py-6 w-full btn rounded-md border border-[#422ad5] bg-transparent  hover:bg-[#422ad5] text-[#422ad5] hover:text-white text-xm font-bold">
        <i class="fa-solid fa-book-open"></i>
        ${category.lessonName}
        
        </button>
        `;

        categoryContainer.appendChild(categoryDiv);
    }
}


loadCategories();




