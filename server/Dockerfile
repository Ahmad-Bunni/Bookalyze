FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

RUN python -m spacy download en_core_web_sm

COPY . /app/

EXPOSE 5000

CMD ["python", "app.py"]
