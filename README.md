# Night-Light: labels + coordinates frontend

## Run it (two terminals)

**Terminal 1: backend (Python)**

    cd backend
    pip install -r requirements.txt
    python label_api.py          # http://localhost:5001

**Terminal 2: frontend (Node 18+)**

    npm install
    npm run dev                  # open http://localhost:5173

Vite proxies every `/api/*` call to port 5001, so nothing else to configure.

## What it does

- Type or paste coordinates (`23.64751, 85.28968`), or click a row in **Saved coordinates**.
  The sidebar shows the label from `label_sheet.csv` (exact match within 0.5 km,
  otherwise the nearest site within 5 km, otherwise "no labelled site nearby").
- **Saved coordinates** tab: all 85 coordinates from the sheet, with a Copy button per row,
  Copy all, and a label filter. Paste into the search box and press Analyse.
- **Matplotlib images** tab: all drawn by the backend with matplotlib on request:
  `/api/plot/site.png` (radiance ~2013 vs ~2024 + location map for your point),
  `/api/plot/overview.png` (all labelled sites), plus your `change_maps.png` and `sites_map.png`.

## Changing the data

Edit `backend/data/label_sheet.csv`, restart `label_api.py`, then run
`python backend/export_sites_json.py` to refresh the saved list in the frontend.

## Optional: your full api.py

The model analysis, 10-year timeline and the 271-site overlay need your original
`api.py`. `label_api.py` runs alone on port 5001; to combine them, add to api.py:

    from backend.label_api import labels_bp
    app.register_blueprint(labels_bp)
