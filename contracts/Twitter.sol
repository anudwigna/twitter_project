// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Twitter {
  address public owner;
  uint256 private counter; // To represent the ID of a Tweet

  constructor() {
    owner = msg.sender;
    counter = 0;
  }

  struct tweet {
    address tweeter;
    uint256 id;
    string tweetText;
    string tweetImg;
    bool isDeleted;
    bool Edited;
    uint256 timestamp;
  }

  struct user {
    string name;
    string bio;
    string profileImg;
    string profileBanner;
  }

  mapping(uint256 => tweet) Tweets; // ID changes to Tweet Struct
  mapping(address => user) Users; // Address Changes to a User Struct
  mapping(uint256 => address) tweetToOwner;

  event tweetCreated(
    address tweeter,
    uint256 id,
    string tweetText,
    string tweetImg,
    bool isDeleted,
    bool Edited,
    uint256 timestamp
  );

  event TweetDeleted(uint256 id, bool isDeleted);

  event TweetEdited(uint256 id, bool isEdited);

  /**
   * @dev A function that creates a new Zombie
   * @param tweetText The Text of the Tweet
   * @param tweetImg The Image of the Tweet
   */
  function addTweet(
    string memory tweetText,
    string memory tweetImg
  ) public payable {
    require(
      msg.value == (0.01 ether),
      'Please submit 0.01 Ether to upload your Tweet'
    );
    tweet storage newTweet = Tweets[counter];
    newTweet.tweetText = tweetText;
    newTweet.tweetImg = tweetImg;
    newTweet.tweeter = msg.sender;
    newTweet.id = counter;
    newTweet.isDeleted = false;
    newTweet.Edited = true;
    newTweet.timestamp = block.timestamp;
    emit tweetCreated(
      msg.sender,
      counter,
      tweetText,
      tweetImg,
      false,
      true,
      block.timestamp
    );
    counter++;
    payable(owner).transfer(msg.value);
  }

  /**
   * @dev A function that gets all the tweets
   */
  function getAllTweets() public view returns (tweet[] memory) {
    tweet[] memory temporary = new tweet[](counter);
    uint countTweets = 0;

    for (uint i = 0; i < counter; i++) {
      if (Tweets[i].isDeleted == false) {
        temporary[countTweets] = Tweets[i];
        countTweets++;
      }
    }
    tweet[] memory result = new tweet[](countTweets);
    for (uint i = 0; i < countTweets; i++) {
      result[i] = temporary[i];
    }

    return result;
  }

  /**
   * @dev A function that gets the tweet of a particular User
   */
  function getMyTweets() external view returns (tweet[] memory) {
    tweet[] memory temporary = new tweet[](counter);
    uint countMyTweets = 0;

    for (uint i = 0; i < counter; i++) {
      if (Tweets[i].tweeter == msg.sender && Tweets[i].isDeleted == false) {
        temporary[countMyTweets] = Tweets[i];
        countMyTweets++;
      }
    }

    tweet[] memory result = new tweet[](countMyTweets);
    for (uint i = 0; i < countMyTweets; i++) {
      result[i] = temporary[i];
    }
    return result;
  }

  /**
   * @dev A function that gets the details of the tweet
   * @param id The Id of the Tweet
   */
  function getTweet(
    uint256 id
  ) public view returns (string memory, string memory, address) {
    require(id < counter, 'No such Tweet');
    tweet storage t = Tweets[id];
    require(t.isDeleted == false, 'Tweet is deleted');
    return (t.tweetText, t.tweetImg, t.tweeter);
  }

  /**
   * @dev A function that deletes the Tweet
   * @param tweetId The id of the Tweet
   * @param isDeleted The Boolean value to mark the tweet deleted
   */
  function deleteTweet(uint tweetId, bool isDeleted) external {
    require(
      Tweets[tweetId].tweeter == msg.sender,
      'You can only delete your own tweet'
    );
    Tweets[tweetId].isDeleted = isDeleted;
    emit TweetDeleted(tweetId, isDeleted);
  }

  /**
   * @dev A function that updates a Tweet
   * @param tweetId The Id of the Tweet to update
   * @param textMessage The Updated Mesasge of the Tweet
   * @param isEdited The boolean value to mark the tweet as Edited
   */
  function updateTweet(
    uint256 tweetId,
    string memory textMessage,
    bool isEdited
  ) public {
    require(
      Tweets[tweetId].tweeter == msg.sender,
      'You can only edit your own tweet'
    );
    Tweets[tweetId].Edited = isEdited;
    Tweets[tweetId].tweetText = textMessage;
    emit TweetDeleted(tweetId, true);
  }

  /**
   * @dev A function that updates a User
   * @param newName The name of the User
   * @param newBio The Bio of the User
   * @param newProfileImg The New Profile Image Selected
   * @param newProfileBanner The New Profile Banner Selected
   */
  function updateUser(
    string memory newName,
    string memory newBio,
    string memory newProfileImg,
    string memory newProfileBanner
  ) public {
    user storage userData = Users[msg.sender];
    userData.name = newName;
    userData.bio = newBio;
    userData.profileImg = newProfileImg;
    userData.profileBanner = newProfileBanner;
  }

  /**
   * @dev A function that gets the detail of the User
   * @param userAddress The address of the User
   */
  function getUser(address userAddress) public view returns (user memory) {
    return Users[userAddress];
  }
}
