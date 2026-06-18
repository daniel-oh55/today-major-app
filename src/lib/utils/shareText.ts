import type { AppPlayerDetail } from "../models/player";
import type { AppTeamDetail } from "../models/team";
import type { AppGameCenter, AppGame } from "../models/game";
import type { AppSharePayload } from "../models/share";

const DIVIDER = "─────────────";
const FOOTER  = "※ 비공식 팬앱 · 더미 데이터 기준";

function pctStr(pct: number): string {
  // 0.600 → ".600"
  return pct >= 1 ? pct.toFixed(3) : pct.toFixed(3).slice(1);
}

export function buildPlayerShareText(player: AppPlayerDetail): AppSharePayload {
  const h = player.hitterStats;
  const p = player.pitcherStats;
  const name   = player.koreanName ?? player.fullName;
  const season = h?.season ?? p?.season ?? new Date().getFullYear();

  const lines: string[] = [
    `⚾ ${name} ${season} 시즌`,
    `${player.teamName} | ${player.position}`,
    DIVIDER,
  ];

  if (p) {
    lines.push(`ERA ${p.era} | WHIP ${p.whip}`);
    lines.push(`${p.wins}승 ${p.losses}패 | 탈삼진 ${p.strikeouts}`);
  } else if (h) {
    lines.push(`타율 ${h.avg} | OPS ${h.ops}`);
    lines.push(`홈런 ${h.homeRuns} | 타점 ${h.rbi} | 득점 ${h.runs}`);
  } else {
    lines.push(`포지션: ${player.position}`);
  }

  lines.push(DIVIDER, FOOTER);

  return {
    title: `${name} 시즌 기록`,
    text:  lines.join("\n"),
  };
}

export function buildTeamShareText(team: AppTeamDetail): AppSharePayload {
  const r = team.record;
  const s = team.seasonStats;

  const lines: string[] = [
    `⚾ ${team.name}`,
    `${team.league} ${team.division} | ${r.wins}승 ${r.losses}패 (${pctStr(r.pct)})`,
    DIVIDER,
  ];

  if (s) {
    lines.push(`타율 ${s.teamAvg} | OPS ${s.teamOps}`);
    lines.push(`득점 ${s.runs} | 홈런 ${s.homeRuns}`);
    lines.push(`ERA ${s.teamEra} | WHIP ${s.teamWhip} | 실점 ${s.runsAllowed}`);
  }

  if (team.recentGames && team.recentGames.length > 0) {
    lines.push(DIVIDER, "최근 경기");
    team.recentGames.slice(0, 3).forEach((g) => {
      const my  = g.isHome ? g.homeScore : g.awayScore;
      const opp = g.isHome ? g.awayScore : g.homeScore;
      lines.push(`${g.result === "W" ? "승" : "패"} vs ${g.opponent}  ${team.abbreviation}${my}-${opp}`);
    });
  }

  lines.push(DIVIDER, FOOTER);

  return {
    title: `${team.name} 팀 정보`,
    text:  lines.join("\n"),
  };
}

export function buildGameShareText(center: AppGameCenter): AppSharePayload {
  const { game, events } = center;

  const statusLabel: Record<string, string> = {
    live:      "진행 중",
    final:     "종료",
    scheduled: "예정",
    pre_game:  "경기 전",
    delayed:   "지연",
    postponed: "연기",
    cancelled: "취소",
    suspended: "중단",
  };
  const status = statusLabel[game.status] ?? game.status;
  const inning = game.status === "live"
    ? ` · ${game.inningHalf === "top" ? "초" : "말"}${game.inning}회`
    : "";

  const lines: string[] = [
    `⚾ ${game.awayTeam.abbreviation} vs ${game.homeTeam.abbreviation}`,
    `${status}${inning}`,
    `${game.awayTeam.abbreviation} ${game.awayScore} - ${game.homeScore} ${game.homeTeam.abbreviation}`,
    DIVIDER,
  ];

  const notable = events
    .filter((e) => e.eventType === "homerun" || e.eventType === "hit")
    .slice(-3);

  if (notable.length > 0) {
    lines.push("주요 기록");
    notable.forEach((e) => lines.push(`• ${e.description}`));
    lines.push(DIVIDER);
  }

  lines.push(FOOTER);

  return {
    title: `${game.awayTeam.abbreviation} vs ${game.homeTeam.abbreviation} 경기 정보`,
    text:  lines.join("\n"),
  };
}

export function buildTodayGamesShareText(games: AppGame[]): AppSharePayload {
  if (games.length === 0) {
    return { title: "오늘의 MLB 경기", text: `⚾ 오늘 예정된 경기가 없습니다.\n${FOOTER}` };
  }

  const date = games[0].gameDate.replace(/-/g, ".");
  const lines: string[] = [`⚾ 오늘의 MLB 경기 (${date})`, DIVIDER];

  games.slice(0, 5).forEach((g) => {
    const s = g.status === "final" ? `종료 ${g.awayScore}-${g.homeScore}` :
              g.status === "live"  ? `진행 ${g.awayScore}-${g.homeScore}` :
              g.gameTimeKst;
    lines.push(`${g.awayTeam.abbreviation} vs ${g.homeTeam.abbreviation}  (${s})`);
  });

  if (games.length > 5) lines.push(`외 ${games.length - 5}경기`);
  lines.push(DIVIDER, FOOTER);

  return {
    title: "오늘의 MLB 경기",
    text:  lines.join("\n"),
  };
}
