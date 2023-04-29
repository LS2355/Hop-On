const { getProfileFromUserName,  exchangeCodeForAccessToken, exchangeNpssoForCode, getUserFriendsAccountIds, getProfileFromAccountId} = require('psn-api') ;


const FriendsList= ["ran to early"];
let i = 0;


//this is going to be changing until i set the refresh token
const myNpsso = "ANORsyzpSdb09GRfO6uIfoDbD7JR0Gm7WTZvuuKlH79w1oYI0h24Nlhzd2ttnyjP";

async function run () {

const accessCode = await exchangeNpssoForCode(myNpsso);
const authorization = await exchangeCodeForAccessToken(accessCode);


// const response = await getProfileFromUserName(authorization, "me");//type in user id ur searching for 
// //console.log(response);
//  const userProfile = await buildProfileObj (response);
  
  



// get friends list acountIds
  const FullfriendsList = await getUserFriendsAccountIds(authorization, "me");

  // all we need from the JSON is the friend ids 
  let friendsAccountIDs = FullfriendsList.friends
    console.log("list of all friends" , friendsAccountIDs.length);
  
for (let i = 0; i <friendsAccountIDs.length; i++){
  // get profile From Account Id
  //all we are getting from this is there online ID/ username
    //we have to do it like this because doing just an acccountID search does not return with their online status;
  const GetfriendOnlineID = await getProfileFromAccountId(authorization, friendsAccountIDs[i]);
  let friendOnlineID = GetfriendOnlineID.onlineId;
  //will return friends data   
  const friendJSON = await searchFriend(authorization ,friendOnlineID);

  //will extract only what is necessary from friends data (the json file that we just got) and make it a object  
  await buildProfileObj(friendJSON);
  
}
  // sort through list


}



//gets profile data
async function searchFriend (authorization ,onlineId){
  const friendJSON = await getProfileFromUserName(authorization, onlineId);
  return friendJSON;
}


//builds the profile Objects to use on the friends list and user profile
async function buildProfileObj (response) {

  const status = response.profile.primaryOnlineStatus;
  const onlineId = response.profile.onlineId;
  const PSPlus = response.profile.plus;
  const Avatar = response.profile.avatarUrls[0].avatarUrl;
  const id = i++;
  
  // if there is a profile picture available then use grab that url if not then leave PFP as null
  var PFP = null;
  // if (response.profile.personalDetailSharing == 'shared'){
  //   PFP = response.profile.personalDetail.profilePictureUrls[0].profilePictureUrl;
  // };
  
  // make into one obj
  const Profile = {onlineId, PFP, Avatar, PSPlus, status, id}
  FriendsList.push(Profile)
}



run();
// export default FriendsList;

console.log(FriendsList)

module.exports = FriendsList;







