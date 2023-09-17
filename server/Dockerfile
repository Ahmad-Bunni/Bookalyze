FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file into the container at /app
COPY requirements.txt /app/

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Download the en-core-web-md model for spaCy
RUN python -m spacy download en_core_web_md

# Copy the current directory contents into the container at /app
COPY . /app/

# Expose port 5000 for Flask to listen on (you can change this as needed)
EXPOSE 5000

# Define the command to run your Flask application
CMD ["python", "app.py"]
