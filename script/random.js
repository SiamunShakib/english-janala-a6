
const loadCard = () =>{
    document.querySelector(`#btn-${categories.level_no}`).classList.add('active');
    fetch(`https://openapi.programming-hero.com/api/level/${level_no}`)
    .then(res=>res.json())
    .then(data=>{
        displayCards(data.data);
    })
}


const displayCards = (cards) =>{
    const cardContainer = document.getElementById("card-container");
 
    cards.forEach(card => {

        const cardDiv = document.createElement("div");

        cardDiv.innerHTML=`
        <div class="p-10 text-center bg-white rounded-md">
            <h2 class="text-xl font-bold mb-3">${card.word}</h2>
            <p>Meaning/Pronounciation</p>
            <h2 class="text-lg mt-3">
                "${card.meaning}/${card.pronunciation}"
            </h2>
                          
            <div class="card-actions justify-between mt-5">
                <i class="bg-slate-200 p-2 rounded-sm fa-solid fa-circle-info"></i>
                <i class="bg-slate-200 p-2 rounded-sm fa-solid fa-volume-high"></i>
            </div>
        </div>
        `;

        cardContainer.appendChild(cardDiv);

    });
    
}

