import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Noorrix Motors",
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "60px 20px",
        background: "var(--background-color, #fffdf5)",
        color: "#1a1a1a",
      }}
    >
      <h1 style={{ fontSize: "64px", fontWeight: 800, color: "var(--theme-color, #ac1c7a)" }}>
        404
      </h1>
      <p style={{ fontSize: "20px", margin: "12px 0 24px" }}>
        Sorry, we couldn&apos;t find the page you were looking for.
      </p>
      <Link
        href="/"
        style={{
          background: "var(--theme-color, #ac1c7a)",
          color: "#fff",
          padding: "12px 28px",
          borderRadius: "8px",
          fontWeight: 600,
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
