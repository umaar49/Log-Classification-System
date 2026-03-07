from dotenv import load_dotenv
from google import genai
import os


load_dotenv()
google_api_key = os.environ.get("GEMINI_API_KEY")


client=genai.Client(api_key=google_api_key)

def LLM_function(log_text):
    prompt = f"""
    classify the log message into one of these categories
    (1) WorkFlow Error, (2) Deprecation Warning.
    if you can not figure it out the category just return "Unclassifiy".
    only return the category name. No preamble.
    Log message: {log_text}
    """
    response=client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    return response.text.strip()

