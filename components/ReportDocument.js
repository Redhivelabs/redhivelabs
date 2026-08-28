import path from "path";
import fs from "fs";
import { Document, Page, Text as RawText, View, StyleSheet, Link, Font, Image } from "@react-pdf/renderer";

// @react-pdf/image resolves string `src` paths by first trying
// `new URL(src, "file:")`. On Windows that throws for a raw drive-letter
// path like "C:\...", and the library's fallback regex then misreads the
// drive letter ("C:") as if it were a URI scheme — so it treats the local
// file as a remote URL and tries to `fetch()` it, which fails silently and
// drops the image with no visible error. Passing a pre-read Buffer instead
// of a path string skips that broken resolution path entirely (Buffers are
// handled directly, no URL parsing involved), so images actually embed.
//
// These read the *-pdf.png variants (128px / 300px), not the full-size
// source assets (up to 4096px) used elsewhere on the site — react-pdf embeds
// an Image at its full source resolution regardless of display size, so
// embedding the 4096px original at a 14px header icon on every page bloated
// a single report to 60+ MB. The small variants are pre-generated once via
// sharp; regenerate them if the source badge/icon art changes.
const WOLF_ICON_BUFFER = fs.readFileSync(path.join(process.cwd(), "public/brand/wolf-icon-pdf.png"));
const LOGO_BADGE_BUFFER = fs.readFileSync(path.join(process.cwd(), "public/brand/wolf-badge-icon-pdf.png"));

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
  teal: "#FF6A1A",
  paper: "#E9ECF0",
  ochre: "#8F5D0C",
  clay: "#98302A",
  white: "#FFFFFF",
  mint: "#FF8A42",
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
    backgroundColor: "#0D0E10",
    color: COLORS.white,
    justifyContent: "center",
  },
  coverIcon: {
    width: 72,
    height: 72,
    marginBottom: 20,
  },
  headerIcon: {
    width: 14,
    height: 14,
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
    marginBottom: 24,
    padding: 18,
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
  descriptionText: {
    fontFamily: "Source Serif 4",
    fontSize: 8.5,
    color: COLORS.inkMuted,
    marginTop: 2,
    maxWidth: 340,
  },
  scoreBox: {
    alignItems: "flex-end",
  },
  scoreNumber: {
    fontFamily: "Archivo",
    fontWeight: 800,
    fontSize: 18,
  },
  scoreMeterTrack: {
    width: 52,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.paper,
    marginTop: 4,
    marginBottom: 4,
    overflow: "hidden",
  },
  scoreMeterFill: {
    height: 4,
    borderRadius: 2,
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
    marginBottom: 10,
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
    backgroundColor: "#FF6A1A1A",
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
    padding: 10,
    borderRadius: 4,
    marginBottom: 12,
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
    marginTop: 4,
    marginBottom: 12,
  },
  questionRow: {
    flexDirection: "row",
    marginBottom: 6,
    gap: 6,
    alignItems: "flex-start",
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
  questionMeta: {
    fontFamily: "Source Serif 4",
    fontSize: 7.5,
    color: COLORS.inkMuted,
    width: 70,
    textAlign: "right",
  },
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 2,
    marginBottom: 14,
    gap: 10,
  },
  statBox: {
    width: 96,
    paddingVertical: 8,
    paddingRight: 8,
    paddingLeft: 9,
    backgroundColor: COLORS.paper,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.teal,
  },
  statValue: {
    fontFamily: "Archivo",
    fontWeight: 800,
    fontSize: 13,
    color: COLORS.ink,
  },
  statLabel: {
    fontFamily: "Archivo",
    fontWeight: 700,
    fontSize: 6.5,
    color: COLORS.inkMuted,
    textTransform: "uppercase",
    marginTop: 2,
  },
  subSectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
    marginBottom: 7,
  },
  subSectionAccent: {
    width: 14,
    height: 2,
    borderRadius: 1,
    backgroundColor: COLORS.teal,
  },
  subSectionLabel: {
    fontFamily: "Archivo",
    fontWeight: 700,
    fontSize: 8,
    color: COLORS.inkMuted,
    textTransform: "uppercase",
  },
  inlineDetailText: {
    fontFamily: "Source Serif 4",
    fontSize: 8.5,
    color: COLORS.inkMuted,
    marginBottom: 5,
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
  coverFooter: {
    position: "absolute",
    bottom: 32,
    left: 60,
    right: 60,
    fontFamily: "Source Serif 4",
    fontSize: 8,
    color: "rgba(255,255,255,0.4)",
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
    backgroundColor: "#FF6A1A0D",
    borderWidth: 1,
    borderColor: "#FF6A1A1A",
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
  readmeBox: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: COLORS.paper,
    marginBottom: 20,
  },
  readmeTitle: {
    fontFamily: "Archivo",
    fontWeight: 800,
    fontSize: 9,
    color: COLORS.ink,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  readmeText: {
    fontFamily: "Source Serif 4",
    fontSize: 8.5,
    lineHeight: 1.5,
    color: COLORS.inkMuted,
    marginBottom: 4,
  },
});

function PageHeader({ keyword }) {
  return (
    <View style={styles.header} fixed>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <Image src={WOLF_ICON_BUFFER} style={styles.headerIcon} />
        <Text style={styles.headerWordmark}>Wolf of Reddit</Text>
      </View>
      <Text style={styles.headerKeyword}>&quot;{keyword}&quot;</Text>
    </View>
  );
}

function PageFooter() {
  return (
    <Text
      style={styles.footer}
      fixed
      render={function (props) {
        return "Wolf of Reddit — wolfofreddit.com   ·   Page " + props.pageNumber + " of " + props.totalPages;
      }}
    />
  );
}

function CoverPageFooter() {
  return (
    <Text
      style={styles.coverFooter}
      fixed
      render={function (props) {
        return "Page " + props.pageNumber + " of " + props.totalPages;
      }}
    />
  );
}

function verdictStyle(verdict) {
  if (verdict === "post") return { backgroundColor: "#FF6A1A1A", color: COLORS.teal };
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

// Works around a known @react-pdf/renderer issue: our embedded fonts define
// ligature glyphs (ff, fi, fl, ffi, ffl, and \u2014 per Source Serif 4's
// historical-ligature set \u2014 ft) that sometimes fail to embed/subset
// correctly and silently drop the character(s) after "f" from the rendered
// PDF (e.g. "flagged" -> "fagged", "craft" -> "craf", "effort" -> "efort").
// A zero-width non-joiner is the standard Unicode signal to a text-shaping
// engine to not ligate the surrounding characters, so inserting one right
// after every "f" that precedes another ligature-prone letter blocks the
// substitution before it can happen, with no visible effect on the text.
// Case-insensitive so it also covers a capitalized "F" starting a sentence
// or label (e.g. "Flair").
function dl(text) {
  if (text == null) return text;
  return String(text).replace(/f(?=[filt])/gi, function (m) {
    return m + "\u200C";
  });
}

// Strips emoji and related pictographic/modifier characters from text before
// it's rendered into the PDF. Subreddit descriptions come straight from
// Reddit and our embedded fonts (Archivo, Source Serif 4) don't include
// emoji glyphs, so unstripped emoji render as garbled/mojibake characters.
function stripEmoji(text) {
  if (text == null) return text;
  return String(text)
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/[\u{1F3FB}-\u{1F3FF}]/gu, "") // skin tone modifiers
    .replace(/[\u{1F1E6}-\u{1F1FF}]/gu, "") // regional indicators (flag emoji)
    .replace(/\u200D/g, "") // zero-width joiner (compound emoji sequences)
    .replace(/\uFE0F/g, "") // variation selector-16 (emoji presentation)
    .replace(/[ \t]+([,.!?;:])/g, "$1") // stray space left where an emoji sat before punctuation
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

// Local wrapper around react-pdf's Text that automatically runs dl() over
// any string children. Ligature breakage was happening in some places (e.g.
// the "Top flairs" label, page-header keyword) simply because a call site
// forgot to wrap its text manually \u2014 shadowing the Text import means every
// <Text> in this file is protected by default, so that class of bug can't
// recur. stripEmoji() is deliberately NOT applied here since it's specific
// to Reddit-sourced description text, not a general rendering fix.
function Text({ children, ...rest }) {
  if (children == null) {
    return <RawText {...rest} />;
  }
  const safeChildren = Array.isArray(children)
    ? children.map(function (child) {
        return typeof child === "string" ? dl(child) : child;
      })
    : typeof children === "string"
    ? dl(children)
    : children;
  return <RawText {...rest}>{safeChildren}</RawText>;
}

function formatAge(ageDays) {
  if (ageDays == null) return null;
  const years = Math.floor(ageDays / 365);
  if (years >= 1) return years + (years === 1 ? " year old" : " years old");
  const months = Math.floor(ageDays / 30);
  if (months >= 1) return months + (months === 1 ? " month old" : " months old");
  return ageDays + (ageDays === 1 ? " day old" : " days old");
}

// Small labeled section heading with a short orange accent rule, used to
// visually separate subsections within a subreddit detail card.
function SubSectionHeading({ children }) {
  return (
    <View style={styles.subSectionHeaderRow}>
      <View style={styles.subSectionAccent} />
      <Text style={styles.subSectionLabel}>{children}</Text>
    </View>
  );
}

// Small stat tile used in the Traction grid — value + label stacked.
function StatBox({ value, label }) {
  if (value === null || value === undefined) return null;
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// Extra rule-gate flags beyond the top-line karma/account-age badges
// already shown in the main badge row.
function extraGateBadges(rawGates) {
  const detected = rawGates && rawGates.detected ? rawGates.detected : {};
  const badges = [];
  if (detected.mentionsSelfPromoRestriction) badges.push("Self-promo restricted");
  if (detected.mentionsModApproval) badges.push("Mod approval needed");
  if (detected.mentionsFlairRequired) badges.push("Flair required");
  if (detected.mentionsLinkRestriction) badges.push("Link restrictions");
  return badges;
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
        <Image src={LOGO_BADGE_BUFFER} style={styles.coverIcon} />
        <Text style={styles.coverBadge}>Reddit Intel Report</Text>
        <Text style={styles.coverTitle}>Wolf of Reddit</Text>
        <Text style={styles.coverKeyword}>&quot;{keyword}&quot;</Text>
        <View style={styles.coverDivider} />
        <Text style={styles.coverMeta}>Generated {dateStr}</Text>
        <Text style={styles.coverMeta}>{ranked.length} curated subreddits</Text>
        <CoverPageFooter />
      </Page>

      <Page size="A4" style={styles.page}>
        <PageHeader keyword={keyword} />
        <Text style={styles.sectionTitle}>Strategy</Text>
        <Text style={styles.sectionSubtitle}>Your at-a-glance game plan</Text>

        <View style={styles.readmeBox}>
          <Text style={styles.readmeTitle}>How to read this report</Text>
          <Text style={styles.readmeText}>
            The Opportunity Score (0–100) is calculated from removal risk, posting
            activity, Google visibility, and how often this keyword comes up in the
            subreddit — higher means a better opportunity.
          </Text>
          <Text style={styles.readmeText}>
            <Text style={{ fontFamily: "Archivo", fontWeight: 800, color: COLORS.teal }}>POST </Text>
            means it's safe to post now.{"  "}
            <Text style={{ fontFamily: "Archivo", fontWeight: 800, color: COLORS.ochre }}>WARM UP FIRST </Text>
            means build some karma and post history before posting.{"  "}
            <Text style={{ fontFamily: "Archivo", fontWeight: 800, color: COLORS.clay }}>AVOID </Text>
            means high risk — don't post without significant prep.
          </Text>
        </View>

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
        const t = r.traction || {};
        const ageText = formatAge(r.ageDays);
        const gateBadges = extraGateBadges(r.rawGates);
        const formatBreakdown = r.format && r.format.breakdown ? r.format.breakdown : null;
        const topFlairs = (r.flair || []).slice(0, 3);
        const bestWindows = r.timing && r.timing.bestWindows ? r.timing.bestWindows : [];

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
                  <Text style={styles.subscriberText}>
                    {r.subscribers ? r.subscribers.toLocaleString() + " subscribers" : null}
                    {r.subscribers && ageText ? "  \u2014  " : ""}
                    {ageText}
                  </Text>
                  {r.description ? (
                    <Text style={styles.descriptionText}>{stripEmoji(r.description)}</Text>
                  ) : null}
                </View>
                <View style={styles.scoreBox}>
                  <Text style={[styles.scoreNumber, { color: scoreColor(r.opportunityScore) }]}>
                    {r.opportunityScore}
                  </Text>
                  <View style={styles.scoreMeterTrack}>
                    <View
                      style={[
                        styles.scoreMeterFill,
                        {
                          width: Math.max(2, Math.round((r.opportunityScore / 100) * 52)),
                          backgroundColor: scoreColor(r.opportunityScore),
                        },
                      ]}
                    />
                  </View>
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
                {gateBadges.map(function (label) {
                  return (
                    <Text key={label} style={[styles.badge, styles.badgeOchre]}>
                      {label}
                    </Text>
                  );
                })}
              </View>

              {r.verdict ? (
                <View style={[styles.verdictBox, vStyle]}>
                  <Text style={styles.verdictText}>
                    <Text style={styles.verdictLabel}>{r.verdict.verdict.toUpperCase()}: </Text>
                    {r.verdict.reasoning}
                  </Text>
                </View>
              ) : null}

              {/* Traction stats grid */}
              {r.traction ? (
                <View>
                  <SubSectionHeading>Traction (last 90 days)</SubSectionHeading>
                  <View style={styles.statGrid}>
                    <StatBox value={t.medianScore} label="Median score" />
                    <StatBox value={t.medianComments} label="Median comments" />
                    <StatBox value={t.p90Score} label="Top 10% score" />
                    <StatBox
                      value={t.avgUpvoteRatio != null ? Math.round(t.avgUpvoteRatio * 100) + "%" : null}
                      label="Avg upvote ratio"
                    />
                    <StatBox
                      value={t.deadPostRatePercent != null ? t.deadPostRatePercent + "%" : null}
                      label="Dead-post rate"
                    />
                    <StatBox
                      value={r.removalRatePercent != null ? r.removalRatePercent + "%" : null}
                      label="Removal rate"
                    />
                  </View>
                </View>
              ) : null}

              {/* Format + flair + timing, shown compactly as text lines */}
              {formatBreakdown ? (
                <Text style={styles.inlineDetailText}>
                  <Text style={{ fontFamily: "Archivo", fontWeight: 700 }}>Format mix: </Text>
                  {formatBreakdown.text || 0} text, {formatBreakdown.link || 0} link,{" "}
                  {formatBreakdown.image || 0} image, {formatBreakdown.video || 0} video
                  {r.format && r.format.avgWinningTitleLength
                    ? "  \u2014  avg winning title length: " + r.format.avgWinningTitleLength + " chars"
                    : ""}
                </Text>
              ) : null}

              {topFlairs.length > 0 ? (
                <Text style={styles.inlineDetailText}>
                  <Text style={{ fontFamily: "Archivo", fontWeight: 700 }}>Top flairs: </Text>
                  {topFlairs
                    .map(function (f) {
                      return stripEmoji(f.flair) + " (avg score " + f.avgScore + ")";
                    })
                    .join("  \u2022  ")}
                </Text>
              ) : null}

              {bestWindows.length > 0 ? (
                <Text style={styles.inlineDetailText}>
                  <Text style={{ fontFamily: "Archivo", fontWeight: 700 }}>Best times to post: </Text>
                  {bestWindows.join("  \u2022  ")}
                </Text>
              ) : null}

              {r.suggestedAngle ? (
                <Text style={styles.angleText}>&quot;{r.suggestedAngle}&quot;</Text>
              ) : null}

              {r.questions && r.questions.length > 0 ? (
                <View>
                  <SubSectionHeading>Real questions from this subreddit</SubSectionHeading>
                  {r.questions.map(function (q, qi) {
                    return (
                      <View key={qi} style={styles.questionRow}>
                        <Text style={[styles.questionIntent, intentStyle(q.intent)]}>
                          {q.intent}
                        </Text>
                        <Link src={q.url} style={styles.questionTitle}>
                          {dl(stripEmoji(q.title))}
                        </Link>
                        <Text style={styles.questionMeta}>
                          {q.score != null ? q.score + " pts" : ""}
                          {q.score != null && q.comments != null ? "  \u00b7  " : ""}
                          {q.comments != null ? q.comments + " comments" : ""}
                        </Text>
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
        <Image src={WOLF_ICON_BUFFER} style={{ width: 32, height: 32, marginBottom: 8 }} />
        <Text style={styles.closingTitle}>What&apos;s next</Text>
        <Text style={styles.closingText}>
          You now know exactly where your audience is talking, what gets removed,
          and what kind of post actually lands. The next step is putting that to
          work — whether that's posting it yourself, or letting us handle it.
        </Text>

        <View style={styles.upsellBox}>
          <Text style={styles.upsellTitle}>We can place it for you</Text>
          <Text style={styles.upsellText}>
            Our SCOUT, PACK, and PRESENCE placement packages put your content
            live through established, aged accounts — chosen from live risk-and-
            opportunity data, not throwaways that get flagged on sight.
            Starting at $129. See wolfofreddit.com/services to get started.
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
