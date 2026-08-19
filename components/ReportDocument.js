import path from "path";
import { Document, Page, Text, View, StyleSheet, Link, Font, Svg, Polygon, Rect } from "@react-pdf/renderer";

Font.register({
  family: "Archivo",
  fonts: [
    { src: path.join(process.cwd(), "public/fonts/Archivo-Bold.ttf"), fontWeight: 700 },
    { src: path.join(process.cwd(), "public/fonts/Archivo-ExtraBold.ttf"), fontWeight: 800 },
  ],
});

Font.register({
  family: "Source Serif 4",
  fonts: [
    { src: path.join(process.cwd(), "public/fonts/SourceSerif4-Regular.ttf"), fontWeight: 400 },
    { src: path.join(process.cwd(), "public/fonts/SourceSerif4-Italic.ttf"), fontWeight: 400, fontStyle: "italic" },
  ],
});

const COLORS = {
  ink: "#12171D",
  inkMuted: "#4A555F",
  teal: "#0B6E62",
  paper: "#E9ECF0",
  ochre: "#8F5D0C",
  clay: "#98302A",
  white: "#FFFFFF",
  mint: "#1FBFA8",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 56,
    paddingBottom: 48,
    paddingHorizontal: 40,
    fontFamily: "Source Serif 4",
    fontSize: 10,
    color: COLORS.ink,
  },
  coverPage: {
    padding: 60,
    backgroundColor: COLORS.ink,
    color: COLORS.white,
    justifyContent: "center",
  },
  coverBadge: {
    fontFamily: "Archivo",
    fontWeight: 700,
    fontSize: 10,
    color: COLORS.teal,
    marginBottom: 20,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  coverTitle: {
    fontFamily: "Archivo",
    fontWeight: 800,
    fontSize: 36,
    marginTop: 20,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  coverKeyword: {
    fontFamily: "Archivo",
    fontWeight: 700,
    fontSize: 22,
    color: COLORS.mint,
    marginBottom: 28,
  },
  coverMeta: {
    fontFamily: "Source Serif 4",
    fontSize: 11,
    color: "#B8C0C8",
  },
  coverDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 24,
    width: 120,
  },
  header: {
    position: "absolute",
    top: 24,
    left: 40,
    right: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerWordmark: {
    fontFamily: "Archivo",
    fontWeight: 800,
    fontSize: 10,
    color: COLORS.ink,
  },
  headerKeyword: {
    fontFamily: "Source Serif 4",
    fontSize: 9,
    color: COLORS.inkMuted,
  },
  sectionTitle: {
    fontFamily: "Archivo",
    fontWeight: 800,
    fontSize: 18,
    color: COLORS.ink,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontFamily: "Source Serif 4",
    fontSize: 10,
    color: COLORS.inkMuted,
    marginBottom: 16,
  },
  strategyText: {
    fontFamily: "Source Serif 4",
    fontSize: 11,
    lineHeight: 1.7,
    color: COLORS.inkMuted,
  },
  summaryTable: {
    marginTop: 8,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECF0",
  },
  summaryHeaderRow: {
    flexDirection: "row",
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.ink,
  },
  summaryHeaderText: {
    fontFamily: "Archivo",
    fontWeight: 700,
    fontSize: 8,
    color: COLORS.inkMuted,
    textTransform: "uppercase",
  },
  summaryRank: { width: 24, fontFamily: "Archivo", fontWeight: 700, fontSize: 10 },
  summaryName: { flex: 1, fontFamily: "Archivo", fontWeight: 700, fontSize: 10, color: COLORS.ink },
  summaryScore: { width: 60, fontFamily: "Archivo", fontWeight: 800, fontSize: 11, textAlign: "center" },
  summaryVerdict: { width: 90, fontFamily: "Source Serif 4", fontSize: 9, textTransform: "capitalize" },
  subredditCard: {
    marginBottom: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0E4E8",
    borderRadius: 6,
  },
  subredditHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  subredditName: {
    fontFamily: "Archivo",
    fontWeight: 800,
    fontSize: 14,
    color: COLORS.ink,
  },
  subscriberText: {
    fontFamily: "Source Serif 4",
    fontSize: 9,
    color: COLORS.inkMuted,
    marginTop: 2,
  },
  scoreBox: {
    alignItems: "flex-end",
  },
  scoreNumber: {
    fontFamily: "Archivo",
    fontWeight: 800,
    fontSize: 18,
  },
  scoreLabel: {
    fontFamily: "Archivo",
    fontWeight: 700,
    fontSize: 7,
    color: COLORS.inkMuted,
    textTransform: "uppercase",
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 8,
  },
  badge: {
    fontFamily: "Archivo",
    fontWeight: 700,
    fontSize: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: COLORS.paper,
    color: COLORS.inkMuted,
  },
  badgeTeal: {
    backgroundColor: "#0B6E621A",
    color: COLORS.teal,
  },
  badgeOchre: {
    backgroundColor: "#8F5D0C1A",
    color: COLORS.ochre,
  },
  badgeClay: {
    backgroundColor: "#98302A1A",
    color: COLORS.clay,
  },
  verdictBox: {
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  verdictText: {
    fontFamily: "Source Serif 4",
    fontSize: 9,
    color: COLORS.inkMuted,
  },
  verdictLabel: {
    fontFamily: "Archivo",
    fontWeight: 800,
  },
  angleText: {
    fontFamily: "Source Serif 4",
    fontStyle: "italic",
    fontSize: 9,
    color: COLORS.inkMuted,
    marginBottom: 8,
  },
  questionLabel: {
    fontFamily: "Archivo",
    fontWeight: 700,
    fontSize: 8,
    color: COLORS.inkMuted,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  questionRow: {
    flexDirection: "row",
    marginBottom: 4,
    gap: 6,
  },
  questionIntent: {
    fontFamily: "Archivo",
    fontWeight: 700,
    fontSize: 7,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 8,
    textTransform: "uppercase",
  },
  questionTitle: {
    fontFamily: "Source Serif 4",
    fontSize: 8.5,
    color: COLORS.ink,
    flex: 1,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    fontFamily: "Source Serif 4",
    fontSize: 7,
    color: "#B8C0C8",
    textAlign: "center",
  },
  closingPage: {
    padding: 60,
    justifyContent: "center",
  },
  closingTitle: {
    fontFamily: "Archivo",
    fontWeight: 800,
    fontSize: 24,
    color: COLORS.ink,
    marginBottom: 16,
  },
  closingText: {
    fontFamily: "Source Serif 4",
    fontSize: 11,
    lineHeight: 1.6,
    color: COLORS.inkMuted,
    marginBottom: 24,
  },
  upsellBox: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: "#0B6E620D",
    borderWidth: 1,
    borderColor: "#0B6E621A",
  },
  upsellTitle: {
    fontFamily: "Archivo",
    fontWeight: 800,
    fontSize: 14,
    color: COLORS.ink,
    marginBottom: 6,
  },
  upsellText: {
    fontFamily: "Source Serif 4",
    fontSize: 10,
    color: COLORS.inkMuted,
    lineHeight: 1.5,
  },
});

function HexMark({ size = 18, light = false }) {
  const stroke = light ? COLORS.white : COLORS.ink;
  const barColor = light ? "rgba(255,255,255,0.55)" : "rgba(18,23,29,0.55)";
  return (
    <Svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
      <Polygon
        points="84.64,70.00 50.00,90.00 15.36,70.00 15.36,30.00 50.00,10.00 84.64,30.00"
        stroke={stroke}
        strokeWidth={7}
        fill="none"
      />
      <Rect x="28" y="31" width="17" height="8" rx="1.5" fill={barColor} />
      <Rect x="28" y="41" width="29" height="8" rx="1.5" fill={barColor} />
      <Rect x="28" y="51" width="40" height="8" rx="1.5" fill={COLORS.mint} />
      <Rect x="28" y="61" width="23" height="8" rx="1.5" fill={barColor} />
    </Svg>
  );
}

function PageHeader({ keyword }) {
  return (
    <View style={styles.header} fixed>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <HexMark size={14} />
        <Text style={styles.headerWordmark}>RedHiveLabs</Text>
      </View>
      <Text style={styles.headerKeyword}>&quot;{keyword}&quot;</Text>
    </View>
  );
}

function PageFooter() {
  return (
    <Text style={styles.footer} fixed>
      RedHiveLabs — redhivelabs.com
    </Text>
  );
}

function verdictStyle(verdict) {
  if (verdict === "post") return { backgroundColor: "#0B6E621A", color: COLORS.teal };
  if (verdict === "warm up first") return { backgroundColor: "#8F5D0C1A", color: COLORS.ochre };
  return { backgroundColor: "#98302A1A", color: COLORS.clay };
}

function scoreColor(score) {
  if (score >= 70) return COLORS.teal;
  if (score >= 40) return COLORS.ochre;
  return COLORS.clay;
}

function intentStyle(intent) {
  if (intent === "BUYING") return styles.badgeTeal;
  if (intent === "DISCUSSION") return styles.badgeOchre;
  return {};
}

export default function ReportDocument({ keyword, generatedAt, strategy, subreddits }) {
  const dateStr = new Date(generatedAt || Date.now()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const ranked = [...(subreddits || [])].sort(function (a, b) {
    return b.opportunityScore - a.opportunityScore;
  });

  return (
    <Document>
      <Page size="A4" style={styles.coverPage}>
        <HexMark size={44} light />
        <Text style={styles.coverBadge}>Placement Report</Text>
        <Text style={styles.coverTitle}>RedHiveLabs</Text>
        <Text style={styles.coverKeyword}>&quot;{keyword}&quot;</Text>
        <View style={styles.coverDivider} />
        <Text style={styles.coverMeta}>Generated {dateStr}</Text>
        <Text style={styles.coverMeta}>{ranked.length} curated subreddits</Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <PageHeader keyword={keyword} />
        <Text style={styles.sectionTitle}>Strategy</Text>
        <Text style={styles.sectionSubtitle}>Your at-a-glance game plan</Text>
        <Text style={styles.strategyText}>
          {strategy && strategy.narrative ? strategy.narrative : "No narrative available."}
        </Text>

        <View style={{ marginTop: 28 }}>
          <Text style={styles.sectionTitle}>Ranked Overview</Text>
          <View style={styles.summaryTable}>
            <View style={styles.summaryHeaderRow}>
              <Text style={[styles.summaryHeaderText, { width: 24 }]}>#</Text>
              <Text style={[styles.summaryHeaderText, { flex: 1 }]}>Subreddit</Text>
              <Text style={[styles.summaryHeaderText, { width: 60, textAlign: "center" }]}>Score</Text>
              <Text style={[styles.summaryHeaderText, { width: 90 }]}>Verdict</Text>
            </View>
            {ranked.map(function (r, i) {
              return (
                <View key={r.subreddit} style={styles.summaryRow}>
                  <Text style={styles.summaryRank}>{i + 1}</Text>
                  <Text style={styles.summaryName}>r/{r.subreddit}</Text>
                  <Text style={[styles.summaryScore, { color: scoreColor(r.opportunityScore) }]}>
                    {r.opportunityScore}
                  </Text>
                  <Text style={styles.summaryVerdict}>
                    {r.verdict ? r.verdict.verdict : "\u2014"}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <PageFooter />
      </Page>

      {ranked.map(function (r, i) {
        const vStyle = r.verdict ? verdictStyle(r.verdict.verdict) : {};
        return (
          <Page key={r.subreddit} size="A4" style={styles.page} wrap>
            <PageHeader keyword={keyword} />
            {i === 0 && <Text style={styles.sectionTitle}>Subreddit Detail</Text>}
            {i === 0 && (
              <Text style={styles.sectionSubtitle}>Full breakdown, ranked by opportunity</Text>
            )}

            <View style={styles.subredditCard} wrap={false}>
              <View style={styles.subredditHeaderRow}>
                <View>
                  <Text style={styles.subredditName}>
                    #{i + 1} r/{r.subreddit}
                  </Text>
                  {r.subscribers ? (
                    <Text style={styles.subscriberText}>
                      {r.subscribers.toLocaleString()} subscribers
                    </Text>
                  ) : null}
                </View>
                <View style={styles.scoreBox}>
                  <Text style={[styles.scoreNumber, { color: scoreColor(r.opportunityScore) }]}>
                    {r.opportunityScore}
                  </Text>
                  <Text style={styles.scoreLabel}>Opportunity</Text>
                </View>
              </View>

              <View style={styles.badgeRow}>
                <Text style={styles.badge}>{r.activityLabel} activity</Text>
                <Text style={styles.badge}>{r.moderationLabel} moderation</Text>
                {r.googleRanking && r.googleRanking.ranking ? (
                  <Text style={[styles.badge, styles.badgeTeal]}>Ranks on Google</Text>
                ) : null}
                {r.competitorMentioned ? (
                  <Text style={[styles.badge, styles.badgeClay]}>Competitor mentioned</Text>
                ) : null}
                {r.karmaRequired ? (
                  <Text style={[styles.badge, styles.badgeOchre]}>Karma required</Text>
                ) : null}
                {r.accountAgeRequired ? (
                  <Text style={[styles.badge, styles.badgeOchre]}>Account age required</Text>
                ) : null}
              </View>

              {r.verdict ? (
                <View style={[styles.verdictBox, vStyle]}>
                  <Text style={styles.verdictText}>
                    <Text style={styles.verdictLabel}>{r.verdict.verdict.toUpperCase()}: </Text>
                    {r.verdict.reasoning}
                  </Text>
                </View>
              ) : null}

              {r.suggestedAngle ? (
                <Text style={styles.angleText}>&quot;{r.suggestedAngle}&quot;</Text>
              ) : null}

              {r.questions && r.questions.length > 0 ? (
                <View>
                  <Text style={styles.questionLabel}>Real questions from this subreddit</Text>
                  {r.questions.map(function (q, qi) {
                    return (
                      <View key={qi} style={styles.questionRow}>
                        <Text style={[styles.questionIntent, intentStyle(q.intent)]}>
                          {q.intent}
                        </Text>
                        <Link src={q.url} style={styles.questionTitle}>
                          {q.title}
                        </Link>
                      </View>
                    );
                  })}
                </View>
              ) : null}
            </View>

            <PageFooter />
          </Page>
        );
      })}

      <Page size="A4" style={[styles.page, styles.closingPage]}>
        <HexMark size={28} />
        <Text style={styles.closingTitle}>What&apos;s next</Text>
        <Text style={styles.closingText}>
          You now know exactly where your audience is talking, what gets removed,
          and what kind of post actually lands. The next step is putting that to
          work — whether that&apos;s posting it yourself, or letting us handle it.
        </Text>

        <View style={styles.upsellBox}>
          <Text style={styles.upsellTitle}>We can post it for you</Text>
          <Text style={styles.upsellText}>
            Our Sub Reddit Posts and Comments services put your content live
            through a network of real, aged, high-karma accounts — the kind
            mods trust, not throwaways that get flagged on sight. $30 per post,
            $15 per comment. Head to your dashboard to get started.
          </Text>
        </View>

        <Text style={[styles.closingText, { marginTop: 24, fontSize: 9 }]}>
          Questions about this report? Reach out any time.
        </Text>
        <PageFooter />
      </Page>
    </Document>
  );
}
