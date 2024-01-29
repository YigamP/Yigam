from flask import Flask, jsonify, request
from flask_cors import CORS
from inference_rank import get_data

app = Flask(__name__)
CORS(app)

# 예시 API 엔드포인트
@app.route('/searches', methods=['GET', 'POST'])
def api_data():
    if request.method == 'GET':
        # GET 요청에 대한 처리
        data = {'message': '성공'}
        return jsonify(data)

    elif request.method == 'POST':
        try:
            data = request.get_json()

            content = data.get('content')

            if(content):
               result = get_data(content)

        except Exception as e:
            return jsonify({'error': str(e)}), 500
        
    return jsonify(result), 200

if __name__ == '__main__':
    app.run(debug=True)
