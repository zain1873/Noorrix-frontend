import "./AutoTraderBadge.css";

export default function AutoTraderBadge({ compact = false, showCarguru = false }) {
  return (
    <div className={`at-badge${compact ? " at-badge--compact" : ""}`}>
      <div className="at-badge-logos">
        <img src="/autoTraderLogo.svg" alt="AutoTrader" className="at-badge-logo" />
        {showCarguru && (
          <img src="/carguru-logo.png" alt="Carguru" className="carguru-logo" />
        )}
      </div>
      <span className="at-badge-label">Great Price</span>
    </div>
  );
}