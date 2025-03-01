# logging_config.py
import os
import logging
from logging.handlers import RotatingFileHandler


def setup_logging():

    # Create folder if not exists
    log_dirs = "logs"
    os.makedirs(log_dirs, exist_ok=True)

    # Create a logger
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)

    # Create a file handler that logs debug and higher level messages
    file_handler = RotatingFileHandler(
        os.path.join(log_dirs, "app.log"), maxBytes=10000, backupCount=1
    )
    file_handler.setLevel(logging.DEBUG)

    # Create a formatter and set it for the file handler
    formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
    file_handler.setFormatter(formatter)

    # Add the file handler to the logger
    logger.addHandler(file_handler)

    # Also log to stderr
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.ERROR)  # Log errors to the console
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)
