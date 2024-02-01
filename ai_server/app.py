from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from inference_rank import get_data
import os
from datetime import datetime

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
                return jsonify(result), 200


        except Exception as e:
            return jsonify({'error': str(e)}), 500
        
@app.route('/searches/download')
def download_file():
    # 서버에서 다운로드할 파일의 경로
    file_path = 'answer.xlsx'
    return send_file(file_path, as_attachment=True)


@app.route('/searches/upload', methods=['POST'])
def upload_and_replace_file():
    # 업로드된 파일 확인
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    # 파일 확장자 확인 (.xlsx 여부)
    if file.filename == '' or not file.filename.endswith('.xlsx'):
        return jsonify({"error": "'xlsx' 확장자만 업로드 할 수 있습니다."}), 400

    # 업로드된 파일을 저장할 경로
    upload_dir = os.path.join(app.root_path, '')
    os.makedirs(upload_dir, exist_ok=True)

    # 현재 날짜와 현재 시간을 이용한 파일 이름 생성
    today_date = datetime.now().strftime("%Y%m%d_%H%M%S")
    new_filename = f"answer_{today_date}.xlsx"

    # 기존의 answer.xlsx 파일을 오늘 날짜와 현재 시간을 이용하여 새로운 이름으로 저장
    original_file_path = os.path.join(upload_dir, 'answer.xlsx')
    if os.path.exists(original_file_path):
        os.rename(original_file_path, os.path.join(upload_dir, f"answer_{today_date}.xlsx"))

    # 업로드한 파일을 answer.xlsx로 저장
    file_path = os.path.join(upload_dir, 'answer.xlsx')
    file.save(file_path)

    return jsonify({"message": '파일 업로드를 성공하였습니다.'}), 200
        

if __name__ == '__main__':
    app.run(debug=True)
