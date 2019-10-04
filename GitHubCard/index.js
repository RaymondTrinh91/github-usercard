/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/
//My Profile
axios
.get("https://api.github.com/users/RaymondTrinh91")
  .then(response => {
    console.log(response)
    const profile1 = response.data;
    let myProfile = createFollower(profile1);
    cardContain.appendChild(myProfile);
    return response.data.followers_url;
  })
  .catch(error =>{
    console.log("Error:", error);
  });

//Dynamic Followers
axios.get("https://api.github.com/users/RaymondTrinh91/followers")
  .then(response =>{
    console.log(response);
    response.data.forEach(object =>{
      axios.get(`https://api.github.com/users/${object.login}`)
        .then(responseFollowers =>{
          const followerProfile = createFollower(responseFollowers.data);
          cardContain.appendChild(followerProfile);
        })
      })
  })  
.catch(error =>{
  console.log("Error:", error);
});

//Static Followers
const followersArray = ["tetondan", "dustinmyers", "justsml", "luishrd", "bigknell"];
followersArray.forEach(follower =>{
  axios.get(`https://api.github.com/users/${follower}`)
    .then(response =>{
      const profile1 = response.data;
      const followerProfile = createFollower(profile1);
      cardContain.appendChild(followerProfile);
    });
});

//Container Selector
const cardContain = document.querySelector(".cards");


//Profile Card Creator
function createFollower(object){
  //Elements
  const
  card = document.createElement("div"),
  proPic = document.createElement("img"),
  cardInfo = document.createElement("div"),
  name = document.createElement("h3"),
  userName = document.createElement("p"),
  location = document.createElement("p"),
  gitProfile = document.createElement("p"),
  gitLink = document.createElement("a"),
  followerCount = document.createElement("p"),
  following = document.createElement("p"),
  bio = document.createElement("p");
  
  //Cuz it don't work otherwise
  //Profile text
  gitProfile.textContent = `Profile: `;

  //Structure
  card.appendChild(proPic);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(gitProfile);
  cardInfo.appendChild(followerCount);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);
  gitProfile.appendChild(gitLink);

  //Class Assignments
  card.classList.add("card");
  cardInfo.classList.add("card-info");
  name.classList.add("name");
  userName.classList.add("username");

  //Content
  proPic.src = object.avatar_url;
  name.textContent = object.name;
  userName.textContent = object.login;
  location.textContent = object.location;
  gitLink.href = object.html_url;
  gitLink.textContent = object.html_url;
  followerCount.textContent = `Followers: ${object.followers}`;
  following.textContent = `Following: ${object.following}`;
  bio.textContent = `Bio: ${object.bio}`;

  return card;
}
/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
