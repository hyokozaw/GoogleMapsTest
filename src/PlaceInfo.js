import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import Amplify, { DataStore } from "aws-amplify";

export default function PlaceInfo() {
  const places = [
    {
      info: "YSKe-com (Main Office)",
      location: { lat: 35.64860429083234, lng: 138.57693376912908 }
    },
    {
      info: "YSKe-com (Do-Kasuga)",
      location: { lat: 35.658687875856664, lng: 138.56954332425778 }
    },
    {
      info: "YSKe-com (Do-ChuoV)",
      location: { lat: 35.66014231235642, lng: 138.57494260883726 }
    }
  ];
  async function fetchPlaces() {
    const gplaces = await DataStore.query(places);
    console.log(gplaces);
  }

  const [selected, setSelected] = useState(null);

  return (
    <>
      {places.map((marker) => (
        <Marker
          key={`${marker.location.lat * marker.location.lng}`}
          position={{
            lat: marker.location.lat,
            lng: marker.location.lng
          }}
          onMouseOver={() => {
            setSelected(marker);
            // マウスオーバーで<InfoWindow>が描画されます。
          }}
          // icon={{
          //   url: "url of icon",
          //   origin: new window.google.maps.Point(0, 0),
          //   anchor: new window.google.maps.Point(15, 15),
          //   scaledSize: new window.google.maps.Size(30, 30)
          //   // ここでアイコン表示の設定ができます。
          // }}
        />
      ))}

      {selected ? (
        // MarkerにマウスオーバーされたときにInfoWindowが表示されます。
        <InfoWindow
          position={{
            lat: selected.location.lat,
            lng: selected.location.lng
          }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>{selected.info}</div>
        </InfoWindow>
      ) : null}
    </>
  );
}
