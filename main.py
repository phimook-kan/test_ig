from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from instagram_url_direct import InstagramMedia

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"])

@app.get("/")
def root():
    return {"status": "ok"}

@app.get("/get-image")
def get_image(url: str):
    try:
        media = InstagramMedia(url)
        urls = media.urls
        if not urls:
            return {"success": False, "error": "ไม่พบรูป"}
        return {"success": True, "urls": urls}
    except Exception as e:
        return {"success": False, "error": str(e)}