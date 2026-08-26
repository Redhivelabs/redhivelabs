export default function sitemap() {
  const baseUrl = "https://wolfofreddit.com";

  const routes = [
    { path: "", priority: 1.0 },
    { path: "/reddit-intel-report", priority: 0.9 },
    { path: "/services/posts", priority: 0.8 },
    { path: "/services/comments", priority: 0.8 },
    { path: "/about", priority: 0.6 },
    { path: "/terms", priority: 0.3 },
    { path: "/privacy", priority: 0.3 },
  ];

  return routes.map(function (route) {
    return {
      url: baseUrl + route.path,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route.priority,
    };
  });
}
