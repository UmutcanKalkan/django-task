# Django Dockerfile
FROM python:3.11

# Çalışma dizinini ayarla
WORKDIR /app

# Bağımlılıkları yükle
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Projeyi kopyala
COPY . /app/

# entrypoint.sh'yi kopyala ve çalıştırılabilir yap
COPY entrypoint.sh /app/
RUN chmod +x /app/entrypoint.sh

# Gunicorn ile Django'yu başlat
CMD ["/app/entrypoint.sh"]

# Gunicorn'u kur
RUN pip install gunicorn

# Portu aç
EXPOSE 8000

# Gunicorn ile Django'yu başlat
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "DroneHub.wsgi:application"]
