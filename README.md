# Repeatly

A complex process management system

## Frontend (React + Vite + Typescript)

To install packges to run project. Simply run

```
cd frontend && npm i
```

Run project

```
npm run dev
```

## Backend (Flask + PostgreSQL)

Install python 3.12.2 from https://www.python.org/downloads/release/python-3122/
During installation, select the open to include into PATH

Create virtual environment and install necessary packages.
Ensure path is in backend else run `cd backend`

If using python and pip:

```
python -m venv .venv
```

Activate environment and install packages using pip
On windows:

```
.venv\Scripts\activate
```

On Mac\Linux:

```
source .venv/bin/activate
```

Install packges from requirements.txt

```
pip install -r requirements.txt
```

Run migrations to ensure tables are created:

```
python main.py db init
python main.py db migrate
python main.py db upgrade
```

To get backend up simply run

```
python main.py
```
