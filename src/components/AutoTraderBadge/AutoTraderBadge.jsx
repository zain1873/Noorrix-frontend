import "./AutoTraderBadge.css";

export default function AutoTraderBadge({ compact = false }) {
  return (
    <div className={`at-badge${compact ? " at-badge--compact" : ""}`}>
      <img src="/autoTraderLogo.svg" alt="AutoTrader" className="at-badge-logo" />
      <span className="at-badge-label">Great Price</span>
    </div>
  );
}
