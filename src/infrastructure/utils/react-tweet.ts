import { getTweet } from "react-tweet/api";

interface Tweet {
  content: string;
  replyTo: string;
}

interface TweetThread {
  content: string;
  tweets: Record<string, Tweet>;
  firstTweetId: string;
  lastTweetId: string;
  tweetCount: number;
}

export async function buildTweetThread(lastTweetId: string): Promise<TweetThread> {
  // Initialize thread object with strong typing
  const thread: TweetThread = {
    content: "",
    tweets: {},
    firstTweetId: lastTweetId, // Will be updated when we find the first tweet
    lastTweetId,
    tweetCount: 0,
  };

  let currentTweetId: string | undefined = lastTweetId;
  let tweetsFetched = 0;

  try {
    while (currentTweetId) {
      // Fetch the current tweet
      const tweet = await getTweet(currentTweetId);
      if (!tweet) throw new Error(`Failed to fetch tweet with ID: ${currentTweetId}`);

      // Store tweet data
      thread.tweets[tweet.id_str] = {
        content: tweet.text,
        replyTo: tweet.in_reply_to_status_id_str ?? "thread_start",
      };

      // Prepend tweet content (since we're going backwards)
      thread.content = tweet.text + "\n\n" + thread.content;

      // Update counters and track first tweet
      tweetsFetched++;
      if (!tweet.in_reply_to_status_id_str) {
        thread.firstTweetId = tweet.id_str;
      }

      // Move to the previous tweet in the thread
      currentTweetId = tweet.in_reply_to_status_id_str;
    }

    // Update final tweet count
    thread.tweetCount = tweetsFetched;

    // Trim any extra whitespace from the combined content
    thread.content = thread.content.trim();

    return thread;
  } catch (error) {
    // Add context to any errors that occur
    throw new Error(
      `Failed to build tweet thread: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
