"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { site } from "@/lib/site";

const CARTO_KEY = process.env.NEXT_PUBLIC_CARTO_KEY;
const HOME_ZOOM = 14;

// Leaflet + CARTO Voyager tiles (OpenStreetMap if no key), warmed with a CSS
// filter (see .map in globals.css) so the map sits in the cream palette.
export function OfficeMap() {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !el.current) return;
      const { lat, lng } = site.geo;

      map = L.map(el.current, {
        center: [lat, lng],
        zoom: HOME_ZOOM,
        scrollWheelZoom: false, // don't hijack page scrolling
        attributionControl: true,
        zoomControl: true,
      });

      const osm = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>';
      if (CARTO_KEY) {
        L.tileLayer(`https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${CARTO_KEY}`, {
          maxZoom: 19,
          attribution: `${osm} &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>`,
        }).addTo(map);
      } else {
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: osm }).addTo(map);
      }

      const pin = L.divIcon({
        className: "map-pin",
        html: '<span class="map-pin-pulse"></span><span class="map-pin-dot"></span>',
        iconSize: [56, 56],
        iconAnchor: [28, 28],
      });
      L.marker([lat, lng], { icon: pin, keyboard: false, title: site.name }).addTo(map);
      map.attributionControl.setPrefix(false);

      // "Back to office" button under the zoom controls. It turns terracotta
      // once the map has been panned or zoomed away from the office.
      const Recenter = L.Control.extend({
        onAdd(m: import("leaflet").Map) {
          const btn = L.DomUtil.create("button", "map-recenter");
          btn.type = "button";
          btn.title = "Back to our office";
          btn.setAttribute("aria-label", "Back to our office");
          btn.innerHTML =
            '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><line x1="2" x2="5" y1="12" y2="12"/><line x1="19" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="5"/><line x1="12" x2="12" y1="19" y2="22"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/></svg>';
          L.DomEvent.disableClickPropagation(btn);
          L.DomEvent.on(btn, "click", () => m.flyTo([lat, lng], HOME_ZOOM, { duration: 0.8 }));

          const sync = () => {
            const away = m.getZoom() !== HOME_ZOOM || m.distance(m.getCenter(), [lat, lng]) > 25;
            btn.classList.toggle("is-away", away);
          };
          m.on("moveend zoomend", sync);
          return btn;
        },
      });
      new Recenter({ position: "topleft" }).addTo(map);
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return <div className={`map ${CARTO_KEY ? "map-carto" : "map-osm"}`} ref={el} role="region" aria-label={`Map showing ${site.address}`} />;
}
