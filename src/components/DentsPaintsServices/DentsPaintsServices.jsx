"use client";
// import { useEffect, useRef } from "react";
// import "./DentsPaintsServices.css"
// const processes = [
//   {
//     number: "01",
//     title: "DAMAGE ASSESSMENT & ESTIMATE",
//     allTitles: [
//       "DAMAGE ASSESSMENT & ESTIMATE",
//       "DENT REPAIR & BODYWORK",
//       "SURFACE PREPARATION & SANDING",
//       "PAINTING & COLOR MATCHING",
//       "POLISHING & FINAL DETAILING",
//     ],
//     description:
//       "We thoroughly assess all dents, scratches, and paint damage on your vehicle, providing a transparent estimate before any work begins.",
//     image:
//       "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&fit=crop",
//     bg: "#ffffff",
//     accent: "#111111",
//   },
//   {
//     number: "02",
//     title: "DENT REPAIR & BODYWORK",
//     allTitles: [
//       "DAMAGE ASSESSMENT & ESTIMATE",
//       "DENT REPAIR & BODYWORK",
//       "SURFACE PREPARATION & SANDING",
//       "PAINTING & COLOR MATCHING",
//       "POLISHING & FINAL DETAILING",
//     ],
//     description:
//       "Our skilled technicians use advanced techniques like paintless dent repair and traditional bodywork to restore your vehicle's original shape.",
//     image:
//       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&fit=crop",
//     bg: "#ffffff",
//     accent: "#111111",
//   },
//   {
//     number: "03",
//     title: "SURFACE PREPARATION & SANDING",
//     allTitles: [
//       "DAMAGE ASSESSMENT & ESTIMATE",
//       "DENT REPAIR & BODYWORK",
//       "SURFACE PREPARATION & SANDING",
//       "PAINTING & COLOR MATCHING",
//       "POLISHING & FINAL DETAILING",
//     ],
//     description:
//       "We meticulously prepare all surfaces by sanding, priming, and smoothing to ensure perfect paint adhesion and a flawless finish.",
//     image:
//       "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&q=80&fit=crop",
//     bg: "#ffffff",
//     accent: "#111111",
//   },
//   {
//     number: "04",
//     title: "PAINTING & COLOR MATCHING",
//     allTitles: [
//       "DAMAGE ASSESSMENT & ESTIMATE",
//       "DENT REPAIR & BODYWORK",
//       "SURFACE PREPARATION & SANDING",
//       "PAINTING & COLOR MATCHING",
//       "POLISHING & FINAL DETAILING",
//     ],
//     description:
//       "Using premium paints and computer-matched color technology, we seamlessly blend repairs to match your vehicle's exact factory finish.",
//     image:
//       "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&q=80&fit=crop",
//     bg: "#ffffff",
//     accent: "#111111",
//   },
//   {
//     number: "05",
//     title: "POLISHING & FINAL DETAILING",
//     allTitles: [
//       "DAMAGE ASSESSMENT & ESTIMATE",
//       "DENT REPAIR & BODYWORK",
//       "SURFACE PREPARATION & SANDING",
//       "PAINTING & COLOR MATCHING",
//       "POLISHING & FINAL DETAILING",
//     ],
//     description:
//       "We finish with expert polishing, buffing, and detailing to deliver a showroom-quality shine that makes your car look brand new.",
//     image:
//       "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=900&q=80&fit=crop",
//     bg: "#ffffff",
//     accent: "#111111",
//   },
// ];

// export default function DentsPaints() {
//   const containerRef = useRef(null);
//   const sectionsRef = useRef([]);

//   useEffect(() => {
//     const sections = sectionsRef.current;
//     let ticking = false;

//     const handleScroll = () => {
//       if (!ticking) {
//         requestAnimationFrame(() => {
//           const container = containerRef.current;
//           if (!container) return;

//           const containerTop = container.getBoundingClientRect().top;
//           // scrolled distance inside the stacking container
//           const scrolled = -containerTop;
//           const vh = window.innerHeight;

//           sections.forEach((section, i) => {
//             if (!section) return;
//             section.style.zIndex = i + 2;

//             if (i === 0) {
//               section.style.transform = "translateY(0%)";
//               section.style.opacity = "1";
//               return;
//             }

//             // each subsequent panel slides in over the previous one
//             // panel i starts entering when scrolled reaches i * vh
//             const sectionStart = i * vh;
//             const progress = (scrolled - sectionStart) / vh;

//             if (progress <= 0) {
//               section.style.transform = "translateY(100%)";
//               section.style.opacity = "0";
//             } else if (progress >= 1) {
//               section.style.transform = "translateY(0%)";
//               section.style.opacity = "1";
//             } else {
//               const ease = 1 - Math.pow(1 - progress, 3);
//               section.style.transform = `translateY(${(1 - ease) * 100}%)`;
//               section.style.opacity = `${Math.min(1, ease * 1.6)}`;
//             }
//           });

//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     // Run once on mount so initial state is correct
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="wrapper">

//       {/* ── Page header — scrolls normally before stacking begins ── */}
//       <div className="seo-process-heading"
//         style={{
//           padding: "72px 94px 56px",
//         }}
//       >

//         <h2 className="sec-title">Our Dents & Paints Services
//         </h2>
//         <p
//           style={{
//             fontSize: "15px",
//             color: "#fff",
//             lineHeight: 1.75,
//             maxWidth: "500px",
//             marginTop: "10px",
//           }}
//         >
//           We restore your vehicle to perfection with expert dent repair and professional paint services that deliver a flawless, long-lasting finish.
//         </p>
//       </div>

//       {/* ── Stacking panels ── */}
//       {/*
//         Total height = N panels × 100vh
//         Panel i starts sliding in when the container has been scrolled by i × 100vh.
//         The last panel (i=4) therefore fully reveals at 4×100vh of container scroll,
//         which equals 4×100vh + header scroll = fully visible before the container ends.
//       */}
//       <div
//         ref={containerRef}
//         style={{ height: `${processes.length * 100 + 100}vh`, position: "relative" }}
//       >
//         {processes.map((proc, i) => {
//           const isDark = proc.bg === "#111111" || proc.bg === "#0a0a0a";
//           const textColor = isDark ? "#ffffff" : "#111111";
//           const mutedColor = isDark
//             ? "rgba(255,255,255,0.32)"
//             : "rgba(0,0,0,0.32)";
//           const borderColor = isDark
//             ? "rgba(255,255,255,0.07)"
//             : "rgba(0,0,0,0.07)";

//           return (
//             <div
//               key={i}
//               ref={(el) => (sectionsRef.current[i] = el)}
//               style={{
//                 position: "sticky",
//                 top: "18px",
//                 height: "100vh",
//                 width: "90%",
//                 margin: "auto",
//                 backgroundColor: proc.bg,
//                 zIndex: i + 2,
//                 overflow: "hidden",
//                 /* initial state: first visible, rest hidden below */
//                 transform: i === 0 ? "translateY(0%)" : "translateY(100%)",
//                 opacity: i === 0 ? 1 : 0,
//                 willChange: "transform, opacity",
//               }}
//             >
//               {/* ─ Responsive inner wrapper ─ */}
//               <div className="seo-panel-inner">

//                 {/* LEFT SIDEBAR */}
//                 <div
//                   className="seo-sidebar"
//                   style={{ borderRight: `1px solid ${borderColor}` }}
//                 >
//                   <div
//                     style={{
//                       fontSize: "clamp(52px, 6vw, 84px)",
//                       fontWeight: "600",
//                       color: "var(--theme-color)",
//                       lineHeight: 1,
//                       letterSpacing: "-3px",
//                       marginBottom: "28px",
//                     }}
//                   >
//                     {proc.number}
//                   </div>
//                   <nav className="seo-nav">
//                     {proc.allTitles.map((t, j) => (
//                       <span
//                         key={j}
//                         style={{
//                           fontSize: "9px",
//                           fontWeight: j === i ? "800" : "400",
//                           letterSpacing: "0.14em",
//                           color: j === i ? textColor : mutedColor,
//                           textTransform: "uppercase",
//                           lineHeight: 1.4,
//                           cursor: "default",
//                           display: "block",
//                         }}
//                       >
//                         {t}
//                       </span>
//                     ))}
//                   </nav>
//                 </div>

//                 {/* RIGHT CONTENT */}
//                 <div className="seo-content ">
//                   <h1 className="process-title"
//                     style={{
//                       fontSize: "40px",
//                       fontWeight: "600",
//                       color: textColor,
//                       letterSpacing: "-2px",
//                       lineHeight: 1,
//                       margin: "0 0 22px",
//                       textTransform: "uppercase",
//                     }}
//                   >
//                     {proc.title}
//                   </h1>

//                   <p
//                     style={{
//                       fontSize: "13px",
//                       color: isDark
//                         ? "rgba(255,255,255,0.65)"
//                         : "rgba(0,0,0,0.58)",
//                       lineHeight: 1.85,
//                       maxWidth: "520px",
//                       margin: "0 0 32px",
//                     }}
//                   >
//                     {proc.description}
//                   </p>

//                   {/* Image card */}
//                   <div
//                     className="seo-image-card"
//                     style={{
//                       boxShadow: isDark
//                         ? "0 24px 60px rgba(0,0,0,0.65)"
//                         : "0 24px 60px rgba(0,0,0,0.09)",
//                     }}
//                   >
//                     <img
//                       src={proc.image}
//                       alt={proc.title}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                         display: "block",
//                       }}
//                     />
//                     {/* Badge */}
//                     <div
//                       style={{
//                         position: "absolute",
//                         bottom: "16px",
//                         right: "16px",
//                         width: "42px",
//                         height: "42px",
//                         backgroundColor: proc.accent,
//                         borderRadius: "50%",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontSize: "10px",
//                         fontWeight: "800",
//                         letterSpacing: "0.05em",
//                         color:
//                           proc.accent === "#ffffff" || proc.accent === "#e0ff4f"
//                             ? "#111"
//                             : "#fff",
//                       }}
//                     >
//                       {proc.number}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Dot progress indicator */}
//               <div
//                 style={{
//                   position: "absolute",
//                   right: "18px",
//                   top: "50%",
//                   transform: "translateY(-50%)",
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "7px",
//                   zIndex: 20,
//                 }}
//               >
//                 {processes.map((_, dot) => (
//                   <div
//                     key={dot}
//                     style={{
//                       width: dot === i ? "7px" : "4px",
//                       height: dot === i ? "7px" : "4px",
//                       borderRadius: "50%",
//                       backgroundColor: dot === i ? textColor : mutedColor,
//                       transition: "all 0.25s",
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* ── Scoped styles ── */}
    
//     </div>
//   );
// }