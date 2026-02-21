import { ASCII_TITLE } from "../constants";
import { cardStyle, cardIcon, cardLabel, cardHint } from "../styles";

export default function ChoosePhase({ S, hovered, setHovered, handleChoose }) {
  return (
    <div style={S.chooseWrap}>

      <div style={S.chooseHeader}>
        <pre style={{ ...S.ascii, textAlign: "center" }}>{ASCII_TITLE}</pre>
        <span style={S.subtitle}>portfolio&nbsp;v1.0</span>
        <div style={{ ...S.divider, width: "100%", marginTop: "0.5rem" }} />
        <p style={S.choosePrompt}>
          Select interface
          <span style={{ ...S.cursor, marginLeft: "6px" }} />
        </p>
        <p style={S.chooseSub}>Choose your preferred experience</p>
      </div>

      <div style={S.options}>

        {/* ── Terminal ── */}
        <div
          style={cardStyle(hovered, "terminal")}
          onMouseEnter={() => setHovered("terminal")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleChoose("Cli")}
        >
          <span style={cardIcon(hovered, "terminal")}>⌨</span>
          <span style={cardLabel(hovered, "terminal")}>Terminal</span>
          <span style={cardHint}>Text-based<br />keyboard driven</span>
        </div>

        {/* ── GUI ── */}
        <div
          style={cardStyle(hovered, "gui")}
          onMouseEnter={() => setHovered("gui")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleChoose("Gui")}
        >
          <span style={cardIcon(hovered, "gui")}>⬡</span>
          <span style={cardLabel(hovered, "gui")}>GUI</span>
          <span style={cardHint}>Visual interface<br />mouse friendly</span>
        </div>

      </div>

      <p style={S.footer}>You can switch anytime</p>

    </div>
  );
}