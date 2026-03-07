from complete import classify_log
import pandas as pd
from fastapi import FastAPI
from fastapi import UploadFile,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
app_log=FastAPI()

app_log.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app_log.post("/classify/")
async def classify(file:UploadFile):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="File must be a CSV.")
    try:
        df=pd.read_csv(file.file)
        if "source" not in df.columns or "log_message" not in df.columns:
            raise HTTPException(status_code=400, detail="CSV must contain 'source' and 'log_message' columns.")
        df["target_label"] = classify_log(list(zip(df["source"], df["log_message"])))

        print("Dataframe:",df.to_dict())
        output_file = "output.csv"
        df.to_csv(output_file, index=False)
        print("File saved to output.csv")
        return FileResponse(output_file, media_type='text/csv')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        file.file.close()
