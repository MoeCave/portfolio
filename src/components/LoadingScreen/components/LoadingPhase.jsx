import { MESSAGES } from "../constants";
import { ASCII_TITLE } from "../constants";

export default function LoadingPhase({ S, showPct, msgCount }) {
  const visibleMessages = MESSAGES.slice(0, msgCount);

  return (
    <div style={S.loadingWrap}>
      <div>
        <pre style={S.ascii}>{ASCII_TITLE}</pre>
        <span style={S.subtitle}>portfolio&nbsp;v1.0</span>
      </div>

      <div style={S.divider} />

      <div style={S.console}>
        {visibleMessages.map((msg, i) => {
          const isLast = i === visibleMessages.length - 1;
          return (
            <div key={i} style={{ ...S.msgBase, ...(isLast ? S.msgLast : {}) }}>
              {msg}
              {isLast && showPct < 100 && <span style={S.cursor} />}
            </div>
          );
        })}
      </div>

      <div style={S.progressWrap}>
        <div style={S.progressMeta}>
          <span>System initialization</span>
          <span style={S.progressPct}>{showPct}%</span>
        </div>
        <div style={S.track}>
          <div style={S.fill} />
        </div>
      </div>
    </div>
  );
}