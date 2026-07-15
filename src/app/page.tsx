"use client";

import { useState } from "react";

const courseCards = [
  {
    level: "HARDCORE",
    levelClass: "text-primary-container",
    title: "Autonomous Systems",
    desc: "LiDAR integration, SLAM algorithms, and edge computing for mobile robotics.",
    duration: "12 Weeks",
    price: "$1,299",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8rU-AuFg-E3xxCpg-65018qlDDpkG86vxs7oF6a2oQ99Eg1VQAHd_p9wqOriPJKOf3Y2NbewK05IgAO79_pdH6FpM7bmowyL4wkbMgnJT2MkzYzN7xMLJiylGfQ0TwzNA-YUUC6yNe3Y7W71GgPB1V2mode40Ifz2bWEdXDiUcDr_oXsWKZWR03VfRf0aWW2XT4HqA3JIHWH0fAWwWDY3QlUnc5uufYAIf4sRxrrUaktDCcw-DwsyKw",
  },
  {
    level: "EXPERT",
    levelClass: "text-primary-container",
    title: "Neural Networks",
    desc: "Deep learning for computer vision and reactive robot control architectures.",
    duration: "8 Weeks",
    price: "$950",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjjX2xYVg2JEG8D4ABhKHwlmPTVT-u4QBUFASemqKzL4uRbdC_XElarJiz_fm9iWkl1hFwKkLRCHpSu1TkrJdstHHqSdp2sLpcxqml1E3b8fwWxVVR3sG8KuIsa2emk8-xtx1X-aUQTJsgRVUT2brSI4wqsxPXTH9fTgEK4LX6-ytJr8C-LszZ-NnDfOt8VV1ST3oV7BoVgCWxUWCW2LLjc9xE1szSht2zs9NJ5zaQpZKmmnwa6Z91Dw",
  },
  {
    level: "INTERMEDIATE",
    levelClass: "text-primary-container",
    title: "Embedded IoT",
    desc: "Custom PCB design, MQTT protocols, and low-latency sensor networks.",
    duration: "10 Weeks",
    price: "$800",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3hYdlv0eLw27hXCwYMFf9-_ck5XUIlzaRKxLw7k94CDjmrYYYVyUxhnxf5a0MX5PSvBKCSgCaIm7ohBKoOjYUoQRWc-aI9kvRiJDR-y7sTS67-9IX_1yFDs4kdxdSmpmDTO1UL9JEkX8EGbn-6bp2LanxjSDBShafAiwVluRdzZBAim7ozAm8bE3s3LXpR_nCVhgG8YW2xg5iS-3bZxej-pdqW9fv_RW_vKpBFCPrZPpciViq0VlPCA",
  },
  {
    level: "INDUSTRY",
    levelClass: "text-primary-container",
    title: "Industrial Automation",
    desc: "PLC programming, SCADA integration, and factory floor orchestration.",
    duration: "14 Weeks",
    price: "$1,500",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLAH0NJuVPLTVglGCTXv3Jp_J92mKtDa0LOnQdsLNeWzYr3-ytNX1RxpFN5HoJ5fkG5ZjDkpJwI4omdYpZbRZMQDsHKpX8I9aX-mijNdtjEJIbYYEXJa7zSkMhIwO586lIPVv-aeDJQ9nL78QODDC-GrMBFTD68BP6sAa0iWHmQzuItrfxOh0vprD3uHIuZ85I9T8b-DLTDi4JT0U8leHfMQUPViCGMSUQIQ1C6C3KjZA0pmIKnjIHVA",
  },
];

const galleryImages = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPbD_X_Bm-8cJZjL1MlTDXs0peYK3CimzfuMuHyRHd-31CaX9lZ1a8wOiuopb0C8gwhTlRresu8J29joC3nch9uz8QTciPffhfpVTOGFZ0BP8bD0I7NUwDPLu5iygOrhFgzIU9UCnBYYhFRNSdlHlUAQQ3RQ2cJjQ7r3dR3Rcthen4SZd8jsvCGjOPLw5Ydl70nV_GkTWJSonxFFYw_KZ_Qg1wzPUcJC5Gz7yglNnnP_r2Kwc659rV0w",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoVHt9TIvGjYDoOa3VXZ-GTvZjJ21qnmVZrtex-9L74-MuUuEMG7bq4aY7-EPSs3zYHjxkVWwytMOGVEl7zbsDagooIbScJvTtJHfe_rLBHoPMJqXW_RscAGH4xs28QtXsWVjU2yf-ZBabhIiA8vDMZo__iuLOMOo8v0wwJ1cEHt6N_QAkMUHnuMvPXW_hWRFSRe4P26os8mpBl5er-djppKX611AI-BPQl0RaWF4XApTMLyT1d1eXGQ",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBkgFspeoxK2scXQKK04pPHI2vbLSMzIAwWK74UA_kPwXkKibfULygThNf1llmZj9AA-fF81WPr7Vvq31ZT2Z35fdyenZG2Ymo5PXBD2rx70IAPP1yKg7ye86y9Mwo1ICH6xltdVrq9qiFGa1k5nQu062JRmIcKAr8EtSZk_050JyP6p34mwEiGn85OFvxB2Ihsd4GHnugI8_xhkLEq_TTbI4KryOnAMcbKV29mLA9faLRsqdZPo0zjw",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCf51tsk00yx5QqqP8WRXJ9ulJs4oR4-lUJaeGC7yXsjtb735DCH533uNR2OtTZGCJKjBOJ33xgaLlpZf211XTTNFPxirV16lEWcY559drKQ9tk9FMaYeXVp1EEMydjaMyKZ_hyqoekBpZTr7afiqfYWDLnIKbFy0FB1fps6bakSRiYVQ_isIjOu_d9qFrITOIHl-S-GUaXud43bAnNJHZnOQJ39pzWgn9FpdOb1rJuf1SVx7b-AvxspQ",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3zEBVP9JL6D_7rXHhrWEX_9SvEfUYbUsSMcDVk8QU_mNq-6FN4d8MftoeEvS65TJjeG1IZAIRVNyIuyCnaetQgeAvxWRgIHOtfJo8uFSosp3uINmZRWQ34BYghiGRhJkOgzAqrz-dDwgfQgGbJv75kl4BT1jcqmpWfq_UUetZv5_gBC4B0gTqPaV6wgT8foJfQ2FiOkm1Y4tGnsRqLWPX9QfIyVTz0vxGRN-2aS4wLz0UQH1Zp_snsA",
  },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes logo-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.03); }
        }
        @keyframes float-up {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-down {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(15px, -10px) rotate(5deg); }
        }
        .animate-logo-float { animation: logo-float 4s ease-in-out infinite; }
        .animate-float-up { animation: float-up 6s ease-in-out infinite; }
        .animate-float-down { animation: float-down 7s ease-in-out infinite; }
        .animate-drift { animation: drift 8s ease-in-out infinite; }
      `}</style>

      <div className="min-h-screen flex flex-col bg-background">
        {/* TopNavBar */}
        <header className="fixed top-0 left-0 w-full z-50 bg-surface/95 backdrop-blur-sm border-b border-outline-variant">
          <div className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-10 h-20">
            <a className="flex items-center gap-2 font-headline-md text-headline-md font-extrabold tracking-tight text-primary" href="#">
              <img alt="Delta Robotics Logo" className="h-8 w-8 object-contain" src="/logo-32.png" />
              <span>Delta Robotics</span>
            </a>
            <nav className="hidden md:flex gap-6 items-center">
              <a className="text-primary font-bold border-b-2 border-primary pb-1 font-label-sm text-label-sm" href="#about">About</a>
              <a className="text-on-secondary-container hover:text-primary transition-colors font-label-sm text-label-sm hover:bg-primary-container/10 rounded-lg px-2 py-1" href="#courses">Courses</a>
              <a className="text-on-secondary-container hover:text-primary transition-colors font-label-sm text-label-sm hover:bg-primary-container/10 rounded-lg px-2 py-1" href="#workshops">Workshops</a>
              <a className="text-on-secondary-container hover:text-primary transition-colors font-label-sm text-label-sm hover:bg-primary-container/10 rounded-lg px-2 py-1" href="#gallery">Gallery</a>
              <a className="text-on-secondary-container hover:text-primary transition-colors font-label-sm text-label-sm hover:bg-primary-container/10 rounded-lg px-2 py-1" href="#contact">Contact</a>
            </nav>
            <div className="flex items-center gap-3">
              <a href="/login">
                <button className="hidden md:block scale-95 active:scale-90 transition-transform duration-150 bg-primary-container text-white px-6 py-3 rounded-lg font-label-sm text-label-sm font-bold uppercase tracking-wider hover:bg-primary transition-colors cursor-pointer">
                  Login
                </button>
              </a>
              <button
                className="md:hidden text-primary cursor-pointer"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden bg-surface border-t border-outline-variant px-4 py-4 flex flex-col gap-3">
              <a className="text-primary font-bold font-label-sm text-label-sm" href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a className="text-on-secondary-container font-label-sm text-label-sm" href="#courses" onClick={() => setMobileMenuOpen(false)}>Courses</a>
              <a className="text-on-secondary-container font-label-sm text-label-sm" href="#workshops" onClick={() => setMobileMenuOpen(false)}>Workshops</a>
              <a className="text-on-secondary-container font-label-sm text-label-sm" href="#gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
              <a className="text-on-secondary-container font-label-sm text-label-sm" href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              <a href="/login" className="bg-primary-container text-white text-center py-2 rounded-lg font-label-sm font-bold uppercase tracking-wider">Login</a>
            </div>
          )}
        </header>

        <main className="flex-grow pt-20">
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-4 md:px-10 py-20 md:py-[120px] grid md:grid-cols-2 gap-6 items-center relative">
            <div className="flex flex-col gap-6 relative z-20">
              <div className="bg-surface-variant/50 w-fit px-2 py-1 rounded text-xs font-bold text-on-surface-variant flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-primary-container rounded-sm"></span>SYSTEM ONLINE: V4.0.2
              </div>
              <h1 className="text-[28px] leading-9 md:text-[56px] md:leading-[64px] font-extrabold text-on-surface md:tracking-tight">
                Building the <span className="text-primary-container">Next<br/>Generation</span> of Robotics<br/>Engineers.
              </h1>
              <p className="text-lg leading-7 text-on-surface-variant max-w-lg">
                Bridging the gap between theory and hardware. Master autonomous systems, neural computation, and industrial IoT through our elite certification programs.
              </p>
              <div className="flex flex-wrap gap-3 pt-3">
                <a href="/login">
                  <button className="bg-primary-container text-white px-12 py-4 rounded font-label-sm text-label-sm font-bold uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-2 cursor-pointer">
                    EXPLORE COURSES <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </a>
                <button className="border border-primary-container text-primary-container px-12 py-4 rounded font-label-sm text-label-sm font-bold uppercase tracking-widest hover:bg-primary-container/10 transition-all flex items-center gap-2 cursor-pointer">
                  JOIN WORKSHOP <span className="material-symbols-outlined text-[18px]">precision_manufacturing</span>
                </button>
              </div>
            </div>

            <div className="relative w-full aspect-square min-h-[500px] md:min-h-[650px] flex flex-col items-center justify-center overflow-visible z-10">
              <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center z-0">
                <div className="absolute w-full h-full max-w-[500px] max-h-[500px] flex items-center justify-center relative">
                  <div className="absolute w-[80%] h-[80%] animate-float-up">
                    <svg className="w-full h-full text-surface-variant opacity-60" viewBox="0 0 100 100" style={{ transform: "rotate(15deg) translateY(-16px)" }}>
                      <polygon fill="currentColor" points="50,0 0,100 100,100" />
                    </svg>
                  </div>
                  <div className="absolute w-[70%] h-[70%] animate-float-down">
                    <svg className="w-full h-full text-surface-dim opacity-70" viewBox="0 0 100 100" style={{ transform: "rotate(-10deg) translate(32px, 32px)" }}>
                      <polygon fill="currentColor" points="50,0 0,100 100,100" />
                    </svg>
                  </div>
                  <div className="absolute w-[90%] h-[90%] animate-drift">
                    <svg className="w-full h-full text-outline opacity-40" viewBox="0 0 100 100" style={{ transform: "rotate(30deg) translateY(16px)" }}>
                      <polygon fill="none" points="50,0 0,100 100,100" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>
                  <div className="absolute top-[10%] left-[10%] w-10 h-10 animate-float-up" style={{ animationDelay: "-2s" }}>
                    <svg className="w-full h-full text-tertiary opacity-60" viewBox="0 0 100 100">
                      <polygon fill="currentColor" points="50,0 0,100 100,100" />
                    </svg>
                  </div>
                  <div className="absolute top-[20%] right-[15%] w-8 h-8 border-t-2 border-r-2 border-outline-variant opacity-70 animate-drift" style={{ animationDelay: "-3s" }}></div>
                  <div className="absolute bottom-[20%] left-[15%] w-8 h-8 border-b-2 border-l-2 border-outline-variant opacity-70 animate-drift" style={{ animationDelay: "-5s" }}></div>
                  <div className="absolute top-[45%] left-0 w-16 h-[2px] bg-outline-variant opacity-60 animate-float-down" style={{ animationDelay: "-1s" }}></div>
                  <div className="absolute bottom-[10%] right-[10%] w-20 h-[2px] bg-outline-variant opacity-60 animate-float-up" style={{ animationDelay: "-4s" }}></div>
                  <div className="absolute top-[15%] right-[25%] w-6 h-6 animate-logo-float" style={{ animationDelay: "-1.5s" }}>
                    <svg className="w-full h-full text-primary-container opacity-80" viewBox="0 0 100 100">
                      <polygon fill="currentColor" points="50,0 0,100 100,100" />
                    </svg>
                  </div>
                  <div className="absolute bottom-[30%] right-[20%] w-2 h-2 bg-outline-variant rounded-full opacity-60 animate-logo-float" style={{ animationDelay: "-2.5s" }}></div>
                  <div className="absolute top-[40%] left-[20%] w-3 h-3 bg-primary-container rounded-full opacity-70 animate-logo-float" style={{ animationDelay: "-0.5s" }}></div>
                  <div className="absolute top-[60%] right-[15%] w-[1px] h-16 bg-outline-variant opacity-40 animate-logo-float" style={{ animationDelay: "-3.5s" }}></div>
                  <div className="absolute bottom-[15%] left-[25%] w-4 h-4 border border-primary-container opacity-60 rotate-45 animate-logo-float" style={{ animationDelay: "-4.5s" }}></div>
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full z-10 pointer-events-none flex items-center justify-center">
                <img alt="Delta Robotics Logo" className="w-64 h-64 md:w-80 md:h-80 object-contain animate-logo-float relative z-10" src="/logo.png" />
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="bg-surface-container-low py-20" id="about">
            <div className="max-w-7xl mx-auto px-4 md:px-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="flex flex-col gap-6">
                  <h2 className="font-headline-md text-headline-md md:font-headline-lg md:text-headline-lg text-primary">About Delta Robotics</h2>
                  <p className="text-lg leading-7 text-on-surface-variant">
                    We believe that the best way to learn is by doing. Our mission is to provide accessible, high-quality robotics education that inspires creativity and technical excellence. Through practical workshops and rigorous coursework, we prepare students for the challenges of tomorrow&apos;s technological landscape.
                  </p>
                </div>
                <div className="rounded-xl overflow-hidden shadow-sm">
                  <img alt="Professional robotics workshop for students" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTUu2waGaho9fWiAitO88NecArR37-EspqPeSWl-3eCRfoRU3SxDYpeiGkJE6SK3vH4tRVT22IeTaEw36X2Wh7cB_VAT0_H9aq1hUySzGaOxMPzCLbCOEcn6KL9RtCX256q8HE_jgbzxm73X845JKIAwbJEzepkh9Yf-fb892AroVvLnHAy0dx_TLjTkc0KdmB-TDA-9lqXrBpW-rwotYtsmeEuHQNaIhiitoiU1cptX5oVgZfELFGHg" />
                </div>
              </div>
            </div>
          </section>

          {/* Courses Section */}
          <section className="max-w-7xl mx-auto px-4 md:px-10 py-20" id="courses">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-end">
                <h2 className="font-headline-md text-headline-md md:font-headline-lg md:text-headline-lg text-on-surface">Featured Courses</h2>
                <a className="hidden md:flex items-center gap-1 text-primary-container font-label-sm text-label-sm hover:text-primary transition-colors" href="/login">
                  View all <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {courseCards.map((card) => (
                  <div key={card.title} className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
                    <div className="h-48 bg-surface-container relative">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-primary-container z-10" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}></div>
                      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${card.img}")` }}></div>
                    </div>
                    <div className="p-6 flex flex-col gap-3 flex-grow">
                      <span className={`${card.levelClass} font-label-sm text-[10px] font-bold uppercase tracking-widest`}>{card.level}</span>
                      <h3 className="font-headline-sm text-headline-md font-bold text-on-surface">{card.title}</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant flex-grow">{card.desc}</p>
                      <div className="flex justify-between items-center mt-auto pt-3">
                        <span className="text-on-surface-variant text-xs font-label-sm">{card.duration}</span>
                        <span className="text-on-surface font-bold font-headline-sm text-headline-sm">{card.price}</span>
                      </div>
                      <button className="w-full bg-secondary text-white py-3 rounded font-label-sm text-label-sm font-bold uppercase tracking-widest hover:bg-on-surface transition-colors mt-3 cursor-pointer">
                        ENROLL NOW
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Workshops Section */}
          <section className="bg-surface-container-low border-y border-outline-variant py-20" id="workshops">
            <div className="max-w-7xl mx-auto px-4 md:px-10 grid md:grid-cols-2 gap-6 items-center">
              <div className="order-2 md:order-1 relative h-64 md:h-full min-h-[300px] rounded-xl overflow-hidden border border-outline-variant">
                <div className="w-full h-full bg-cover bg-center absolute inset-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCLAH0NJuVPLTVglGCTXv3Jp_J92mKtDa0LOnQdsLNeWzYr3-ytNX1RxpFN5HoJ5fkG5ZjDkpJwI4omdYpZbRZMQDsHKpX8I9aX-mijNdtjEJIbYYEXJa7zSkMhIwO586lIPVv-aeDJQ9nL78QODDC-GrMBFTD68BP6sAa0iWHmQzuItrfxOh0vprD3uHIuZ85I9T8b-DLTDi4JT0U8leHfMQUPViCGMSUQIQ1C6C3KjZA0pmIKnjIHVA')" }}></div>
              </div>
              <div className="order-1 md:order-2 flex flex-col gap-6">
                <span className="text-primary-container font-label-sm text-label-sm font-bold tracking-widest uppercase">Hands-On Learning</span>
                <h2 className="font-headline-md text-headline-md md:font-headline-lg md:text-headline-lg text-on-surface">Weekend Bootcamps &amp; Build Sessions</h2>
                <p className="text-lg leading-7 text-on-surface-variant">
                  Take theory into reality. Our intensive weekend workshops provide guided, hands-on experience building functional robots from scratch. Work with industry-standard tools and collaborate with peers under the guidance of expert instructors.
                </p>
                <ul className="flex flex-col gap-3 mt-3">
                  <li className="flex items-center gap-3 text-on-surface">
                    <span className="material-symbols-outlined text-primary-container">check_circle</span>
                    <span>All materials and tools provided</span>
                  </li>
                  <li className="flex items-center gap-3 text-on-surface">
                    <span className="material-symbols-outlined text-primary-container">check_circle</span>
                    <span>Small group sizes for personalized attention</span>
                  </li>
                  <li className="flex items-center gap-3 text-on-surface">
                    <span className="material-symbols-outlined text-primary-container">check_circle</span>
                    <span>Take home your completed project</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button className="bg-secondary text-white px-12 py-4 rounded-lg font-label-sm text-label-sm font-bold uppercase tracking-wider hover:bg-on-surface transition-colors cursor-pointer">
                    Explore Schedule
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section className="max-w-7xl mx-auto px-4 md:px-10 py-20 flex flex-col gap-6" id="gallery">
            <div className="text-center">
              <h2 className="font-headline-md text-headline-md md:font-headline-lg md:text-headline-lg text-on-surface">Student Gallery</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-2xl mx-auto">A glimpse into the innovation happening in our labs.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {galleryImages.map((img, i) => (
                <div key={i} className={`${img.span || ""} rounded-xl overflow-hidden border border-outline-variant ${i === 0 ? "h-64 md:h-auto" : "h-32 md:h-48"}`}>
                  <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" src={img.src} alt="" />
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-surface-container-low border-t border-outline-variant py-20" id="contact">
            <div className="max-w-7xl mx-auto px-4 md:px-10 grid md:grid-cols-2 gap-20">
              <div className="flex flex-col gap-6">
                <h2 className="font-headline-md text-headline-md md:font-headline-lg md:text-headline-lg text-on-surface">Get in Touch</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Have questions about our programs or want to partner with us? Send us a message.</p>
                <div className="flex flex-col gap-3 mt-6">
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <span className="font-body-md text-body-md text-on-surface">hello@deltarobotics.edu</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container">
                      <span className="material-symbols-outlined">location_on</span>
                    </div>
                    <span className="font-body-md text-body-md text-on-surface">Innovation District, Tech City</span>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm">
                <form className="flex flex-col gap-6">
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface mb-1">Name</label>
                    <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-6 py-3 focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors font-body-md text-body-md" placeholder="Your name" type="text" />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface mb-1">Email</label>
                    <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-6 py-3 focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors font-body-md text-body-md" placeholder="you@example.com" type="email" />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface mb-1">Message</label>
                    <textarea className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-6 py-3 focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors font-body-md text-body-md resize-none" placeholder="How can we help?" rows={4}></textarea>
                  </div>
                  <button className="bg-primary-container text-white px-12 py-4 rounded-lg font-label-sm text-label-sm font-bold uppercase tracking-wider hover:bg-primary transition-colors mt-3 cursor-pointer" type="button">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="w-full bg-surface-container-low border-t border-outline-variant">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto px-10 py-20">
            <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
              <span className="font-headline-md text-headline-md font-bold text-primary mb-4 block">Delta Robotics</span>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                Pioneering the next generation of engineers through hands-on robotics education.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant mt-auto pt-6 opacity-80 hover:opacity-100 transition-opacity">
                &copy; 2024 Delta Robotics. Pioneering the next generation of engineers through hands-on robotics education.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-headline-sm text-headline-sm text-primary mb-2">Navigation</h4>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 duration-200 block w-fit" href="#about">About</a>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 duration-200 block w-fit" href="#courses">Courses</a>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 duration-200 block w-fit" href="#workshops">Workshops</a>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 duration-200 block w-fit" href="#gallery">Gallery</a>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 duration-200 block w-fit" href="#contact">Contact</a>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-headline-sm text-headline-sm text-primary mb-2">Legal</h4>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 duration-200 block w-fit" href="#">Privacy Policy</a>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 duration-200 block w-fit" href="#">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
