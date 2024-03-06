FROM python:3.11 as core
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /backend

RUN pip3 install --upgrade pip

COPY . .

RUN pip3 install -r requirements.txt