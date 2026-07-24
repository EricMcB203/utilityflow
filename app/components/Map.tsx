"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

type Asset = {
  id: string;
  asset_name: string;
  asset_number: string;
  asset_type?: string;
  status?: string;
  latitude?: number;
  longitude?: number;
};

export default function Map({
  assets,
  onSelectAsset,
}: {
  assets: Asset[];
  onSelectAsset: (asset: Asset) => void;
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
      zoom: 12,
    });

    assets.forEach((asset) => {
      if (
        asset.latitude == null ||
        asset.longitude == null
      ) {
        return;
      }

      const marker = new mapboxgl.Marker()
        .setLngLat([
          asset.longitude,
          asset.latitude,
        ])
        .addTo(map);

      marker
        .getElement()
        .addEventListener("click", () => {
          onSelectAsset(asset);
        });
    });

    return () => map.remove();
  }, [assets, onSelectAsset]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "700px",
        borderRadius: "12px",
      }}
    />
  );
}