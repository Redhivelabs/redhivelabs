import HomeClient from "../components/HomeClient.js";

export const metadata = {
  title: "Wolf of Reddit — Find the Subreddits Where Your Buyers Are Talking",
  description:
    "One search. Every subreddit that matters, ranked by opportunity, removal risk, and buyer intent. Free Reddit scan — see where your buyers are already talking, before you post.",
};

export default function Home() {
  return <HomeClient />;
}
