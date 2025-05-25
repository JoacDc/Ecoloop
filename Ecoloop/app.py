from flask import Flask, render_template

app = Flask(__name__)  # Usa 'templates/' y 'static/' por defecto

@app.route("/")
def mapa():
    return render_template("mapa.html")

if __name__ == "__main__":
    app.run(debug=True)



