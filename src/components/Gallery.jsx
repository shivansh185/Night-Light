import { useEffect, useState } from "react";
import { overviewPlot, pipelineImage, sitePlot } from "../api";

function Figure({ src, title, note, onOpen }) {
  const [state, setState] = useState("loading");
  useEffect(() => setState("loading"), [src]);
  return (
    <figure>
      <div className="frame">
        {state === "error" ? (
          <p className="empty">{note}</p>
        ) : (
          <img
            src={src}
            alt={title}
            onLoad={() => setState("ok")}
            onError={() => setState("error")}
            onClick={() => onOpen({ src, title })}
          />
        )}
        {state === "loading" && <span className="loading">Loading</span>}
      </div>
      <figcaption>{title}</figcaption>
    </figure>
  );
}

export default function Gallery({ point }) {
  const [open, setOpen] = useState(null);
  const missing = "Image not found. Run run_pipeline.py first.";

  return (
    <div className="gallery">
      <Figure src={overviewPlot()} title="All labelled sites (matplotlib)" note="Plot unavailable. Is label_api.py running?" onOpen={setOpen} />
      <Figure src={pipelineImage("change_maps.png")} title="Change maps (pipeline output)" note={missing} onOpen={setOpen} />
      <Figure src={pipelineImage("sites_map.png")} title="Detected sites (pipeline output)" note={missing} onOpen={setOpen} />
      {point ? (
        <Figure
          src={sitePlot(point.lat, point.lon)}
          title="Selected point: radiance and location (matplotlib, drawn on request)"
          note="Plot unavailable. Is label_api.py running on port 5001?"
          onOpen={setOpen}
        />
      ) : (
        <figure>
          <div className="frame"><p className="empty">Pick a location to draw its plot.</p></div>
          <figcaption>Radiance for the selected point</figcaption>
        </figure>
      )}

      {open && (
        <div className="lightbox" onClick={() => setOpen(null)} role="dialog" aria-label={open.title}>
          <img src={open.src} alt={open.title} />
          <button onClick={() => setOpen(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
