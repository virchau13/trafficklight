from flask import Flask, request
import uuid, hashlib
app = Flask(__name__)

users = {
    "template": {
        "password": hashlib.sha256("password123").hexdigest(),
        "timeleft": 50
    }
}

@app.route('/')
def root():
    return '', 418

@app.route('/refresh')
def refresh():
    if request.args.get("type") == "dead":
        uid = request.args.get("uid")
        pw = request.args.get("pw")
        if uid in users:
            if users[uid]["password"] == pw:
                users[uid]["time"] = (172800 if request.args.get("status") == "inside" else 86400)
            else:
                return 'Wrong Password', 401
        else:
            return 'Invalid UID', 400


app.run()