# error_handlers.py
from flask import jsonify


def register_error_handlers(app):
    @app.errorhandler(404)
    def not_found_error(error):
        app.logger.error(f"404 Error: {str(error)}")
        return jsonify({"status": "error", "message": error.description}), 404

    @app.errorhandler(500)
    def internal_error(error):
        print("printing error statement", str(error))
        app.logger.error(f"500 Error: {str(error)}")
        return (jsonify({"status": "error", "message": error.description})), 500

    @app.errorhandler(409)
    def conflict_error(error):
        app.logger.error(f"409 Error: {str(error)}")
        return (jsonify({"status": "error", "message": error.description})), 409

    @app.errorhandler(400)
    def bad_request_error(error):
        app.logger.error(f"400 Error: {str(error)}")
        return (jsonify({"status": "error", "message": error.description})), 400

    @app.errorhandler(401)
    def unauthorized_error(error):
        app.logger.error(f"401 Error: {str(error)}")
        return (jsonify({"status": "error", "message": error.description})), 401

    @app.errorhandler(Exception)
    def handle_exception(e):
        app.logger.error(f"An unexpected error occurred: {str(e)}")
        return (
            jsonify({"status": "error", "message": "An unexpected error occurred."})
        ), 500
