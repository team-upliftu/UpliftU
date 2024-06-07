rm db.sqlite3
python manage.py migrate
python manage.py loaddata app/fixtures/initial_data.json
python manage.py runserver
