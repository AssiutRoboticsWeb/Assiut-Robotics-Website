// Use global API_BASE_URL defined in config/server-config.js
const mainURL = API_BASE_URL;

async function fetchCommittees() {
    try {
        // Fetch the data from the API
        const response = await fetch(`${mainURL}/members/getAllMembers`);

        // Parse the response as JSON
        const data = await response.json();

        // Check if the response status is "success" and extract members
        if (data.status === "success" && data.data && data.data.members) {
            const members = data.data.members;
            console.log("Members:", members);
            return members;
        } else {
            console.error("Failed to get members:", data.message);
            return [];
        }
    } catch (error) {
        console.error("Error fetching members:", error);
        return [];
    }
}

function renderTabs(committees) {
    const tabs = document.getElementById('tabs');

    // Get committee names from the keys of the object
    const committeeNames = Object.keys(committees);

    committeeNames.forEach((committee, index) => {
        const tab = document.createElement('div');
        tab.className = `tab ${index === 0 ? 'active' : ''}`;
        tab.textContent = committee; // Set the tab's text to the committee name
        tab.onclick = () => switchTab(index); // Add a click handler
        tabs.appendChild(tab); // Append the tab to the parent container
    });
}


function renderContainers(committees) {
    const containers = document.getElementById('containers');

    // Clear existing content to avoid duplicate rendering
    containers.innerHTML = '';

    console.log(committees);

    // Get committee names from the keys of the object
    const committeeNames = Object.keys(committees);

    committeeNames.forEach((committeeName, index) => {
        const container = document.createElement('div');
        container.className = `container ${index === 0 ? 'active' : ''}`;

        // Add committee name
        const committeeHeading = document.createElement('h2');
        committeeHeading.textContent = committeeName;
        container.appendChild(committeeHeading);

        const committee = committees[committeeName]

        console.log(committee);

        // Add "Members" section
        const membersHeading = document.createElement('h3');
        membersHeading.textContent = 'Members';
        container.appendChild(membersHeading);

        if (committee && committee.length > 0) {
            const order = { head: 1, vice: 2, member: 3, "not accepted" : 4 };
            // Sort by custom order
            committee.sort((a, b) => order[a.role] - order[b.role]);
            console.log(committee);
            
            committee.forEach(member => {
                const memberCard = document.createElement('div');
                memberCard.className = 'card';

                if (member.role !== "not accepted" && member.committee != "manager") {
                    memberCard.innerHTML = `
                        <p>${member.name} (${member.role})</p>
                        <button onclick="approveMember('${member.name}','${member.email}', 'false')">Remove</button>
                        ${member.role !== 'head'
                            ? `<button onclick="setHead('${member._id}')">Set Head</button>`
                            : ''
                        }
                        ${member.role !== 'vice' ? `<button onclick="setVice('${member._id}')">Set Vice</button>` : ''}
                        <button onclick="showMemberInfo(${JSON.stringify(member).replace(/"/g, '&quot;')})">Show Info</button>
                    `;
                } else if(  member.committee != "manager") {
                    memberCard.innerHTML = `
                        <p>${member.name} (${member.role})</p>
                        <button onclick="approveMember('${member.name}','${member.email}', 'true')">Accept</button>
                        <button onclick="approveMember('${member.name}','${member.email}', 'false')">Remove</button>
                        <button onclick="showMemberInfo(${JSON.stringify(member).replace(/"/g, '&quot;')})">Show Info</button>
                    `;
                }
                else{
                      memberCard.innerHTML = `
                        <p>${member.name} (${member.role})</p>
                        <button onclick="showMemberInfo(${JSON.stringify(member).replace(/"/g, '&quot;')})">Show Info</button>
                    `;
                }
                container.appendChild(memberCard);
            });
        } else {
            const noMembersMessage = document.createElement('p');
            noMembersMessage.textContent = 'No members available.';
            container.appendChild(noMembersMessage);
        }

        // Add "Pending" section
        // const pendingHeading = document.createElement('h3');
        // pendingHeading.textContent = 'Pending';
        // container.appendChild(pendingHeading);

        // if (committee.pending && committee.pending.length > 0) {
        //     committee.pending.forEach(pending => {
        //         const pendingCard = document.createElement('div');
        //         pendingCard.className = 'card pending';

        //         pendingCard.innerHTML = `
        //             <p>${pending.name}</p>
        //             <button onclick="approveMember(${committee.id}, '${pending._id}')">Approve</button>
        //         `;
        //         container.appendChild(pendingCard);
        //     });
        //     renderMember(member, memberContainer)
        // } else {
        //     const noPendingMessage = document.createElement('p');
        //     noPendingMessage.textContent = 'No pending members.';
        //     container.appendChild(noPendingMessage);
        // }

        // Append the container to the parent element
        containers.appendChild(container);
    });
}

function showMemberInfo(member) {
    console.log(member);
    
    const infoContainer = document.getElementById('member-info');
    console.log(infoContainer);
    infoContainer.style.display = 'block'; // Show the info container
    infoContainer.innerHTML = `
            <div  class = "close" > <button onclick = "closeInfo()"> X </button> </div>

        <div class="info-card">
            <img src="${member.avatar}" alt="${member.name}" class="avatar" />
            <h2>${member.name}</h2>
            <p><strong>Email:</strong> ${member.email}</p>
            <p><strong>Committee:</strong> ${member.committee}</p>
            <p><strong>Gender:</strong> ${member.gender}</p>
            <p><strong>Phone Number:</strong> ${member.phoneNumber}</p>
            <p><strong>Role:</strong> ${member.role}</p>
            <p><strong>Verified:</strong> ${member.verified ? 'Yes' : 'No'}</p>
        </div>
    `;
}
function closeInfo(){
    document.getElementById('member-info').style.display = 'none';
}
function categorizeMembersByCommittee(members) {
    // Initialize an empty object to hold categorized members
    console.log("categorizeMembersByCommittee");
    
    const categorizedMembers = {};

    members.forEach(member => {
        const committee = member.committee;

        // If the committee doesn't exist in the object, create an array for it
        if (!categorizedMembers[committee]) {
            categorizedMembers[committee] = [];
        }

        // Push the member into the corresponding committee array
        categorizedMembers[committee].push(member);
    });
    console.log("Catigorized members",categorizedMembers);
    
    return categorizedMembers;
}

function renderMember(member, memberContainer) {

    // Clear existing content
    memberContainer.innerHTML = '';

    // Create the member card
    const card = document.createElement('div');
    card.className = 'card';

    // Add member content
    card.innerHTML = `
        <img src="${member.avatar}" alt="${member.name}" class="avatar">
        <h2>${member.name}</h2>
        <p><strong>Email:</strong> ${member.email}</p>
        <p><strong>Committee:</strong> ${member.committee}</p>
        <p><strong>Gender:</strong> ${member.gender}</p>
        <p><strong>Phone:</strong> ${member.phoneNumber}</p>
        <p><strong>Role:</strong> ${member.role}</p>
        <p><strong>Verified:</strong> ${member.verified ? 'Yes' : 'No'}</p>
        <p><strong>Secret Key:</strong> ${member.secretKey}</p>
    `;

    // Append the card to the container
    memberContainer.appendChild(card);
}


function switchTab(index) {
    document.querySelectorAll('.tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });

    document.querySelectorAll('.container').forEach((container, i) => {
        container.classList.toggle('active', i === index);
    });
}

async function removeMember(committeeId, memberId) {
    await fetch(`${mainURL}api/committees/${committeeId}/members/${memberId}`, { method: 'DELETE' });
    location.reload();
}

async function approveMember(name,email, accepted) {
    var answer =window.prompt(`are sure you want to ${accepted ? "accept" : "remove"} ${name} `, "N")
    if(answer == 'N'){return}
    if (answer === null) {
        // User pressed Cancel
        return;
    }
    try {
        
        console.log(email,accepted);
        
    const token=window.localStorage.getItem('token')
    const res=await fetch(`${mainURL}/members/confirm`, {
        method: 'POST',
        headers: {
             'Content-Type': 'application/json',
             'authorization':`Bearer ${token}`
            
            },
        body: JSON.stringify({email,accepted})
    });
    const response=await res.json();
    if(response.message == "jwt expired")
    {
        window.location.href = "../login/login.html"
    }
    alert(response.message)
    console.log(response);
    
    // location.reload();
} catch (error) {
       window.alert(error.message) 
       console.log(error);
       
}
}

async function setHead(memberId) {
    const token=window.localStorage.getItem('token')

    try{
    const res=await fetch(`${mainURL}/members/changeHead`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization':`Bearer ${token}`
           
           },
        body: JSON.stringify({ memberId })
    });
    const response=await res.json();
    alert(response.message)
    console.log(response);
    
    location.reload();
} catch (error) {
       window.alert(error.message) 
}
}
async function setVice(memberId) {
    const token=window.localStorage.getItem('token')

    try{
    const res=await fetch(`${mainURL}/members/changeVice`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization':`Bearer ${token}`
           
           },
        body: JSON.stringify({ memberId })
    });
    const response=await res.json();
    alert(response.message)
    console.log(response);
    
    location.reload();
} catch (error) {
       window.alert(error.message) 
}
}


async function startPage() {
    const members = await fetchCommittees();
    console.log("Leaders Page: Committees");
    console.log(members);
    const committees = categorizeMembersByCommittee(members);
    console.log(committees);
    renderTabs(committees);
    renderContainers(committees);
}

window.onload = function (e) {
    console.log("Leaders Page: window.onload");
    startPage();
}
