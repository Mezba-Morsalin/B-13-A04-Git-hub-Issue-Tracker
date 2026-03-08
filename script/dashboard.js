const cardContainer = document.getElementById("card-container");
const issueCount = document.querySelector("h3");

let allIssues = [];

const allCards = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => {
        allIssues = data.data;
        issueCount.innerText = `${allIssues.length} Issues`;
        displayAllCards(allIssues);
    })
}

const displayAllCards = (cards) => {
    cardContainer.innerHTML = "";

    cards.forEach(card => {
        let borderClass = "border-green-600";

        if(card.priority === "low"){
            borderClass = "border-purple-600";
        }
        let priorityClass = "";

        if (card.priority === "high") {
            priorityClass = "bg-base-300 text-red-500 text-[18px] font-semibold";
        } else if (card.priority === "medium") {
            priorityClass = "bg-base-300 text-orange-400 text-[18px] font-semibold";
        } else if (card.priority === "low") {
            priorityClass = "bg-base-300 text-green-500 text-[18px font-semibold";
        }
        const labelsHTML = card.labels.map(label => {

            let labelClass = "bg-green-100 text-green-500 text-[18px] p-4";

            if(label === "bug"){
                labelClass = "bg-red-100 text-red-500 text-[18px] p-4";
            }
            else if(label === "help wanted"){
                labelClass = "bg-yellow-100 text-orange-400 text-[18px] p-4";
            }

            return `
            <button class="${labelClass} rounded-full px-3 py-1 text-sm">${label}</button>
            `
        }).join("")

        const newElement = document.createElement("div");

        newElement.innerHTML = `
        <div class="issue-cards bg-white p-4 shadow rounded-xl space-y-4 h-full border-t-4 border-green-600 ${borderClass}">
        <div class="flex justify-between items-center">
          <div>
            <img src="./assets/Open-Status.png" alt="">
          </div>
          <div>
              <p class="${priorityClass} rounded-full w-24 text-center">${card.priority}</p>
          </div>
        </div>
        <h3 class="text-xl font-semibold text-[#1F2937]">${card.title}</h3>
        <p class="text-base leading-6 text-[#64748B] line-clamp-2">${card.description}</p>
        <div class="flex gap-2 flex-wrap">${labelsHTML}</div>
        <p class="text-base leading-6 text-[#64748B]">${card.assignee}</p>
        <p class="text-base leading-6 text-[#64748B]">${new Date(card.createdAt).toLocaleString("en-US")}</p>
        </div>
        `
        cardContainer.append(newElement)

    })
}

const showAll = () => {
    issueCount.innerText = `${allIssues.length} Issues`;
    displayAllCards(allIssues);
    ActiveButton('all');
}

const showOpen = () => {
    const openIssues = allIssues.filter(issue => 
        issue.priority === "high" || issue.priority === "medium"
    );
    issueCount.innerText = `${openIssues.length} Issues`;
    displayAllCards(openIssues);
    ActiveButton('open');
}

const showClosed = () => {
    const closedIssues = allIssues.filter(issue => 
        issue.priority === "low"
    );
    issueCount.innerText = `${closedIssues.length} Issues`;
    displayAllCards(closedIssues);
    ActiveButton('closed');
}

// Function to set active btn
const ActiveButton = (activeBtn) => {

    const buttons = document.querySelectorAll("#btn-container button");

    buttons.forEach(btn => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline");
    });

    if(activeBtn === "all"){

        const allBtn = document.getElementById("all-btn");

        allBtn.classList.add("btn-primary");
        allBtn.classList.remove("btn-outline");
    }

    else if(activeBtn === "open"){

        const openBtn = document.getElementById("open-btn");

        openBtn.classList.add("btn-primary");
        openBtn.classList.remove("btn-outline");
    }

    else if(activeBtn === "closed"){

        const closedBtn = document.getElementById("closed-btn");

        closedBtn.classList.add("btn-primary");
        closedBtn.classList.remove("btn-outline");
    }

}

allCards();

document.getElementById("log-out").addEventListener("click", () => {
    window.location.href ="index.html"
})