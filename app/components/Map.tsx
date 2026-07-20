"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

type Asset = {
  id: string;
  asset_name: string;
  asset_number: string;
  latitude?: number;
  longitude?: number;
};

export default function Map({
  assets,
}: {
  assets: Asset[];
}) {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mapboxgl.accessToken =
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-104.9903, 39.7392],
      zoom: 13,
    });
console.log(assets);
    assets.forEach((asset) => {
      if (!asset.longitude || !asset.latitude) return;

      new mapboxgl.Marker()
        .setLngLat([
          asset.longitude,
          asset.latitude,
        ])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `
            <h3>${asset.asset_name}</h3>
            <p>${asset.asset_number}</p>
          `
          )
        )
        .addTo(map);
    });

    return () => map.remove();
  }, [assets]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "500px",
      }}
    />
  );
}