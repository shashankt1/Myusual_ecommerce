# Use the official Python image as a base image
FROM python:3.11-slim

# Set environment variables to prevent Python from buffering stdout/stderr
ENV PYTHONUNBUFFERED=1

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt file to the working directory
COPY requirements.txt /app/

# Install the dependencies from the requirements.txt file
RUN pip install --no-cache-dir -r requirements.txt


COPY . /app/


EXPOSE 5001


CMD ["python", "app.py"]
