const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Twitter', function () {
  let twitter;

  const TOTAL_TWEETS = 4;
  const MY_TWEETS = 2;

  beforeEach(async function () {
    let TwitterFactory;
    let twitterFactory;

    this.beforeEach(async () => {
      TwitterFactory = await ethers.getContractFactory('Twitter');
      twitterFactory = await TwitterFactory.deploy();
    });
  });

  describe('Add Tweet', function () {
    it('should add a tweet', async function () {
      const initialTweetCount = (await twitterFactory.getAllTweets()).length;
      expect(initialTweetCount).to.equal(0);
      await twitterFactory.addTweet('Johnny Depp', 'the_link_to_image');

      const twitterCount = (await twitterFactory.getTweets()).length;
      expect(twitterCount).to.equal(1);
    });
  });

  describe('Update Tweet', function () {
    it('should update a tweet', async function () {
      const TWEET_ID = 1;
      const TWEET_MESSAGE = 'Updated Tweet';

      await twitterFactory.updateTweet(TWEET_ID, TWEET_MESSAGE);

      let _updatedTweetMessage = (await twitterFactory.getTweet(TWEET_ID))
        .tweetText;
      expect(TWEET_MESSAGE).to.equal(_updatedTweetMessage);
    });
  });

  describe('Get All Tweets', function () {
    it('should return the number of total tweets', async function () {
      const _theTweets = await twitter.getAllTweets();
      expect(_theTweets.length).to.equal(TOTAL_TWEETS + MY_TWEETS);
    });

    it('should return the number of all my tweets', async function () {
      const _myTweets = await twitter.getMyTweets();
      expect(_myTweets.length).to.equal(NUM_TOTAL_MY_TWEETS);
    });
  });

  describe('Delete Tweet', function () {
    it('should delete the tweet event', async function () {
      await expect(twitter.connect(addr1).deleteTweet(1, true)).withArgs(
        1,
        true,
      );
    });
  });
});
