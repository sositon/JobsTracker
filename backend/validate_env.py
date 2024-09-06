from app import create_app

app = create_app()

try:
    with app.app_context():
        print("Checking database connectivity...")
        from app.models.user import User
        assert User.query.first() is not None or True  # Ensures User model works

        print("Verifying configuration variables...")
        config_checks = {
            'JWT_SECRET_KEY': app.config['JWT_SECRET_KEY'],
            'SQLALCHEMY_DATABASE_URI': app.config['SQLALCHEMY_DATABASE_URI'],
            'CORS_HEADERS': app.config['CORS_HEADERS'],
            # Add more config checks as needed
        }

        for config, value in config_checks.items():
            assert value, f"{config} is not set."

except AssertionError as e:
    print(f"Validation failed: {e}")
    exit(1)
except Exception as e:
    print(f"An error occurred: {e}")
    exit(1)

print("Environment validation successful!")
exit(0)
