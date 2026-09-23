import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

const GlobalReach = () => {
  const globeRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 340, height: 340 });
  const [ready, setReady] = useState(false);
  const [globeLoaded, setGlobeLoaded] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // -----------------------------------------------------------
  // Detect dark mode live
  // -----------------------------------------------------------
  useEffect(() => {
    const checkDark = () =>
      setIsDark(document.documentElement.classList.contains("dark"));

    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // -----------------------------------------------------------
  // Configure globe
  // -----------------------------------------------------------
  useEffect(() => {
    if (!globeRef.current || ready) return;
    const globe = globeRef.current;

    // 🎥 Camera — slightly pulled back for smaller globe
    globe.pointOfView({ lat: 15, lng: -60, altitude: 2.0 }, 0);

    // 🎮 Controls
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.55;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    // ☀️ Soft lighting
    const scene = globe.scene();
    const ambient = scene.children.find((c) => c.type === "AmbientLight");
    if (ambient) ambient.intensity = isDark ? 0.55 : 1.0;

    const directional = scene.children.find(
      (c) => c.type === "DirectionalLight"
    );
    if (directional) {
      directional.intensity = isDark ? 0.8 : 1.5;
      directional.position.set(-2, 1, 3);
      directional.color.setHex(0xffffff);
    }

    // 🎨 Renderer
    const renderer = globe.renderer();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMappingExposure = isDark ? 1.0 : 1.15;

    setReady(true);
  }, [ready, isDark]);

  // -----------------------------------------------------------
  // Responsive size — slightly smaller canvas
  // -----------------------------------------------------------
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      const size = Math.min(w, h) + 20;
      setDimensions({ width: size, height: size });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    const t = setTimeout(updateSize, 100);
    return () => {
      window.removeEventListener("resize", updateSize);
      clearTimeout(t);
    };
  }, []);

  // -----------------------------------------------------------
  // Arc + point data
  // -----------------------------------------------------------
  const arcsData = [
    {
      startLat: 40.7128,
      startLng: -74.006,
      endLat: 51.5074,
      endLng: -0.1278,
    },
    {
      startLat: 40.7128,
      startLng: -74.006,
      endLat: -23.5505,
      endLng: -46.6333,
    },
  ];

  const pointsData = [
    { lat: 40.7128, lng: -74.006, size: 0.5 },
    { lat: 51.5074, lng: -0.1278, size: 0.4 },
    { lat: -23.5505, lng: -46.6333, size: 0.4 },
  ];

  return (
    <div
      className={`
        relative h-full min-h-[365px] overflow-hidden rounded-2xl border p-5
        transition-colors duration-500
        ${
          isDark
            ? "border-white/[0.06] bg-[#0a0c10]"
            : "border-black/[0.06] bg-white"
        }
      `}
    >
      {/* Header */}
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            Global Reach
          </h3>
          <p className="mt-1 text-xs text-zinc-500">Active regions</p>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-cyan-500 dark:text-cyan-400">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          Live
        </div>
      </div>

      {/* Globe container */}
      <div
        ref={containerRef}
        className="absolute inset-x-0 bottom-0 top-[62px] flex items-center justify-center"
      >
        {/* Cyan atmosphere glow (dark mode only) */}
        {isDark && (
          <div className="pointer-events-none absolute h-[260px] w-[260px] rounded-full bg-cyan-500/[0.08] blur-[70px]" />
        )}

        <div
          style={{
            width: dimensions.width,
            height: dimensions.height,
            opacity: ready && globeLoaded ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl={
              isDark
                ? "//unpkg.com/three-globe/example/img/earth-night.jpg"
                : "//unpkg.com/three-globe/example/img/earth-day.jpg"
            }
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            showAtmosphere={true}
            atmosphereColor={isDark ? "#22d3ee" : "#a8d8ff"}
            atmosphereAltitude={isDark ? 0.16 : 0.12}
            arcsData={arcsData}
            arcColor={() =>
              isDark
                ? ["rgba(34,211,238,0.2)", "rgba(34,211,238,0.95)"]
                : ["rgba(14,165,233,0.15)", "rgba(14,165,233,0.7)"]
            }
            arcDashLength={0.5}
            arcDashGap={0.2}
            arcDashAnimateTime={2800}
            arcStroke={0.5}
            arcsTransitionDuration={0}
            pointsData={pointsData}
            pointColor={() => "#22d3ee"}
            pointAltitude={0.008}
            pointRadius={0.3}
            pointsMerge={true}
            animateIn={true}
            onGlobeReady={() => setGlobeLoaded(true)}
          />
        </div>

        {!globeLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-32 animate-pulse rounded-full bg-cyan-500/10 blur-2xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalReach;