import ScanResultsClient from "../../../components/ScanResultsClient.js";

export async function generateMetadata({ params }) {
  const { keyword: rawKeyword } = await params;
  const keyword = decodeURIComponent(rawKeyword);

  return {
    title: "Best Subreddits for " + keyword + " — Free Reddit Scan | RedHiveLabs",
    description:
      "See the top subreddits where people are already talking about " +
      keyword +
      " — ranked by opportunity, removal risk, and buyer intent. Free instant scan, no signup required.",
  };
}

export default async function ScanPage({ params }) {
  const { keyword: rawKeyword } = await params;
  const keyword = decodeURIComponent(rawKeyword);

  return <ScanResultsClient keyword={keyword} />;
}
