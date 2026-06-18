import Link from "next/link";
import type { AppRosterPlayer } from "@/lib/models/team";
import { Section } from "@/components/common/Section";

interface RosterTableProps {
  roster: AppRosterPlayer[];
  teamName: string;
}

function batThrowLabel(bat: string, throw_: string): string {
  const b = bat === "S" ? "양타" : bat === "L" ? "좌타" : "우타";
  const t = throw_ === "L" ? "좌투" : "우투";
  return `${b}/${t}`;
}

export function RosterTable({ roster, teamName }: RosterTableProps) {
  const sorted = [...roster].sort((a, b) => {
    const order = ["C","1B","2B","3B","SS","LF","CF","RF","DH","OF","IF","P"];
    return order.indexOf(a.position) - order.indexOf(b.position);
  });

  return (
    <Section title="로스터">
      <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
        <table className="text-sm w-full min-w-[320px]" aria-label={`${teamName} 로스터`}>
          <thead>
            <tr className="bg-gray-50 text-gray-400 border-b border-gray-100 text-xs">
              <th scope="col" className="py-2 px-3 text-center font-medium w-10">#</th>
              <th scope="col" className="py-2 px-3 text-left font-medium">이름</th>
              <th scope="col" className="py-2 px-2 text-center font-medium w-12">포지션</th>
              <th scope="col" className="py-2 px-2 text-center font-medium">투타</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sorted.map((player) => (
              <tr key={player.playerId} className="hover:bg-gray-50 transition-colors">
                <td className="py-2.5 px-3 text-center text-gray-400 tabular-nums text-xs font-medium">
                  {player.jerseyNumber}
                </td>
                <th scope="row" className="py-2.5 px-3 text-left font-normal">
                  <Link
                    href={`/players/${player.playerId}`}
                    className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                    aria-label={`${player.fullName} 선수 상세 보기`}
                  >
                    {player.fullName}
                  </Link>
                </th>
                <td className="py-2.5 px-2 text-center">
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold rounded px-1.5 py-0.5">
                    {player.position}
                  </span>
                </td>
                <td className="py-2.5 px-2 text-center text-xs text-gray-500">
                  {batThrowLabel(player.batHand, player.throwHand)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
