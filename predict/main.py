from flask import Flask, request, jsonify
import model.model as Mo
import model.utils as Ut
import asyncio
import threading
app = Flask(__name__)


# data, labels, images, gps_compass = None, None, None, None

# def init_data():
#   global data, labels, images, gps_compass
#   data, labels, images, gps_compass = Ut.load_saved_delf_data()
#   print('init_data finish')
# t1 = threading.Thread(target=init_data)
# t1.start()
# t1.join()
#   data, labels, images, gps_compass = Ut.load_saved_delf_data()
  
@app.before_first_request
def before_first_request():
  # asyncio.run(prepare_model())
  global data, labels, images, gps_compass
  data, labels, images, gps_compass = Ut.load_saved_delf_data()
# database 연결
@app.route('/predict', methods=['POST'])
def predict_location():
  # global data, labels, images, gps_compass
  # data, labels, images, gps_compass = Ut.load_saved_delf_data()
  # [{log_id, img_src}, .....]
  print("d")
  # request_log_list = request.get_json(force=True) # 여기 문제
  request_log_list = [{"log_id":1, "img_src":""}]
  # print(request_log_list)
  predict_component = ["latitude", "longitude", "angle"]
  result = {}

  test_src = "https://upload.wikimedia.org/wikipedia/commons/2/28/Bridge_of_Sighs%2C_Oxford.jpg"
  print("dd")
  # data, labels, images, gps_compass = Ut.load_saved_delf_data()
  for request_log in request_log_list:
    img_loc_list = []
    # request_log : {log_id, img_src}를 통해 분석
    #pr_loc_data_list = [[0, 37.541, 126.986, 30],[0, 28, 25, 13]]
    pr_loc_data_list = Mo.run_model(url=test_src, data=data, labels=labels, images=images, gps_compass=gps_compass)

    if len(pr_loc_data_list) > 2:
      pr_loc_data_list = pr_loc_data_list[0:2]
    
    for pr_loc_data in pr_loc_data_list:
      converted_pr_data = {}
      converted_pr_data[predict_component[0]] = pr_loc_data[2]
      converted_pr_data[predict_component[1]] = pr_loc_data[3]
      converted_pr_data[predict_component[2]] = pr_loc_data[4]
      img_loc_list.append(converted_pr_data)
    if len(img_loc_list)!=0 :
      result[request_log["log_id"]]=img_loc_list
  # print("main data ", result)
  # 반환 값 : log_id : pre_dict[]인 dict
  # pre_dict : {위도:??, 경도:??, 각도:??, log_id:??}
  return jsonify({ 'result' : result }) # type 에러

if __name__ == "__main__":
  # global data, labels, images, gps_compass
  # data, labels, images, gps_compass = Ut.load_saved_delf_data()
  # print("startdd")
  app.run(host='0.0.0.0', port='3000', debug=True)