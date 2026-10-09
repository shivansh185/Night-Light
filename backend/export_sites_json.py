"""Regenerate src/data/sites.json from data/label_sheet.csv (run after editing the sheet)."""
import json
from pathlib import Path
import pandas as pd

here = Path(__file__).parent
df = pd.read_csv(here / "data" / "label_sheet.csv", dtype={"site_id": str})
df["label"] = df["label"].fillna("unlabelled").str.strip().str.lower()
df["notes"] = df["notes"].fillna("")
rows = []
for _, r in df.iterrows():
    rows.append({
        "id": r["site_id"], "type": r["candidate"],
        "lat": r["lat"], "lon": r["lon"], "label": r["label"], "notes": r["notes"],
        "first": None if pd.isna(r["first_radiance"]) else r["first_radiance"],
        "last": None if pd.isna(r["last_radiance"]) else r["last_radiance"],
    })
out = here.parent / "src" / "data" / "sites.json"
out.write_text(json.dumps(rows, indent=1))
print(f"wrote {len(rows)} sites -> {out}")
