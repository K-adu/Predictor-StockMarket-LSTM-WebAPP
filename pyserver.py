import base64
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from lstm import machinelearningcode
import os
import time
app = Flask(__name__)
CORS(app)

# modify the run() function to return the data as a dictionary instead of a list
def run(prediction):
    final = machinelearningcode(prediction)
    return final

@app.route('/predict', methods=['POST'])
def handle_predict():
    data = request.json
    prediction = data.get('prediction')
    print("Prediction received:", prediction)

    # if not prediction:
    #     return jsonify({'error': 'Invalid prediction value'})
    
    filename = f"{prediction}.png"
    if os.path.exists(filename):
        with open(filename, 'rb') as img_file:
            img_data = img_file.read()
            plot_string = base64.b64encode(img_data).decode('utf-8')
        return jsonify({'plot_data': plot_string})

    else:
        run(prediction)
        while not os.path.exists(filename):
            time.sleep(1) 
        with open(filename,'rb') as img_file:
            img_data = img_file.read()
            plot_string = base64.b64encode(img_data).decode('utf-8')
        return jsonify({'plot_data': plot_string})

if __name__ == '__main__':
    app.run(port=5000)
