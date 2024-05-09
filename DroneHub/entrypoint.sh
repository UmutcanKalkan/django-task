#!/bin/bash

# Veritabanı bağlantısını bekler (Opsiyonel)
# while ! nc -z db 5432; do
#   sleep 0.1
# done
python manage.py makemigrations

# Migrasyonları uygula
python manage.py migrate

# Django sunucusunu başlat
gunicorn DroneHub.wsgi:application --bind 0.0.0.0:8000
