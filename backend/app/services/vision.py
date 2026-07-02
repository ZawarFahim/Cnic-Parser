import os
from google.cloud import vision
from app.config.settings import settings

def extract_text(image_bytes: bytes) -> str:
    creds_path = settings.GOOGLE_APPLICATION_CREDENTIALS
    if creds_path:
        if not os.path.isabs(creds_path) and not os.path.exists(creds_path):
            current_dir = os.path.dirname(os.path.abspath(__file__))
            backend_root = os.path.abspath(os.path.join(current_dir, "..", ".."))
            possible_path = os.path.join(backend_root, creds_path)
            if os.path.exists(possible_path):
                creds_path = possible_path
            else:
                workspace_root = os.path.abspath(os.path.join(backend_root, ".."))
                possible_path2 = os.path.join(workspace_root, creds_path)
                if os.path.exists(possible_path2):
                    creds_path = possible_path2

        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = creds_path

    client = vision.ImageAnnotatorClient()
    image = vision.Image(content=image_bytes)
    response = client.text_detection(image=image)

    if response.error.message:
        raise Exception(f"Google Cloud Vision API error: {response.error.message}")

    texts = response.text_annotations
    if not texts:
        return ""

    return texts[0].description
