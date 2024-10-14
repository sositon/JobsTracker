from app import create_app, db
from app.models.user import User
import os

app = create_app()

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User}

if __name__ == '__main__':
    app.run(host=os.getenv('HOST', '0.0.0.0'), port=os.getenv('PORT', 5000), debug=os.getenv('DEBUG', False))
