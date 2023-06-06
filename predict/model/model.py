from absl import logging

import matplotlib.pyplot as plt
import numpy as np
from scipy.spatial import cKDTree
from skimage.feature import plot_matches
from skimage.measure import ransac
from skimage.transform import AffineTransform
from six import BytesIO

import tensorflow as tf

import tensorflow_hub as hub
from six.moves.urllib.request import urlopen
import scipy.io
from time import time
from model.utils import getImage_and_resize, load_saved_delf_data

delf = hub.load('https://tfhub.dev/google/delf/1').signatures['default']

def run_delf(np_image):
  # np_image = np.array(image)
  float_image = tf.image.convert_image_dtype(np_image, tf.float32)

  return delf(
      image=float_image,
      score_threshold=tf.constant(100.0),
      image_scales=tf.constant([0.25, 0.3536, 0.5, 0.7071, 1.0, 1.4142, 2.0]),
      max_feature_num=tf.constant(1000))



def change_data_range(min_latitude=None, min_longitude=None, max_latitude=None, max_longitude=None):
  pass

#@title TensorFlow is not needed for this post-processing and visualization
def match_images(result1, result2, gps, label, image1=None, image2=None):
  distance_threshold = 0.8
  
  inliers_num=0
  # Read features.
  num_features_1 = result1['locations'].shape[0]
  # print("Loaded image 1's %d features" % num_features_1)
  
  num_features_2 = result2['locations'].shape[0]
  # print("Loaded image 2's %d features" % num_features_2)

  # Find nearest-neighbor matches using a KD tree. # 여기서 시간 줄일 수 있으려나
  d1_tree = cKDTree(result1['descriptors'])
  _, indices = d1_tree.query(
      result2['descriptors'],
      distance_upper_bound=distance_threshold)
  # print(indices)
  # Select feature locations for putative matches.
  locations_2_to_use = result2['locations'].numpy()[np.where(indices != num_features_1)]     
  
  # locations_2_to_use = np.array([
  #     result2['locations'][i,]
  #     for i in range(num_features_2)
  #     if indices[i] != num_features_1
  # ])

  locations_1_to_use = result1['locations'].numpy()[np.where(indices != num_features_1)]     

  # locations_1_to_use = np.array([
  #     result1['locations'][indices[i],]
  #     for i in range(num_features_2)
  #     if indices[i] != num_features_1
  # ])
  
  # Perform geometric verification using RANSAC.
  try:
    start=time()
    _, inliers = ransac(
        (locations_1_to_use, locations_2_to_use),
        AffineTransform,
        min_samples=3,
        residual_threshold=20,
        max_trials=100,
        stop_probability=0.99)
    end=time()
    # print(end-start)
    inliers_num=sum(inliers)
    #print(type(inliers))
    #print(inliers)
    print('Found %d inliers' % inliers_num)
    
  except:
    # print('None')
    pass
  
  # Visualize correspondences.
  # _, ax = plt.subplots()
  # inlier_idxs = np.nonzero(inliers)[0]
  # plot_matches(
  #     ax,
  #     image1,
  #     image2,
  #     locations_1_to_use,
  #     locations_2_to_use,
  #     np.column_stack((inlier_idxs, inlier_idxs)),
  #     matches_color='b')
  # ax.axis('off')
  # ax.set_title('DELF correspondences')

  # plt.show()

  return [inliers_num, label] + list(gps)
  
def run_model(url, data, labels, images, gps_compass):
  url = url
  data = data
  labels = labels
  images = images
  gps_compass = gps_compass
  print('start')
  img_path = tf.keras.utils.get_file(url.split('/')[-1], url)
  
  input_data_image, input_data_array = getImage_and_resize(img_path)
  print('start1')
  input_data = run_delf(input_data_array)
  print('start2')
  compare_data = data[:10]

  start = time()

  inliers=[]

  for i in range(0,len(compare_data),5):
      inliers.append(match_images(result1=input_data, 
                                  result2=compare_data[i], 
                                  gps=gps_compass[labels[i]], 
                                  label=labels[i], 
                                  image1=input_data_array.astype(dtype='uint8'), 
                                  image2=images[i].astype(dtype='uint8')))
  end = time()

  inliers_sorted = sorted(inliers, key=lambda x: x[0], reverse=True)

  print('run time: ', end-start)
  # print("model data", inliers_sorted[0])
  return inliers_sorted

# if __name__ == '__main__':
#     data, labels, images, gps_compass = load_saved_delf_data() # main server 실행 시 미리 실행 필요

#     # gps = scipy.io.loadmat('Dataset/GPS_Long_Lat_Compass.mat')
#     # gps_compass = gps['GPS_Compass']
#     # florida_idx=np.where(gps_compass[:,0]<=32.5)[0]

#     # # gps_florida = gps_compass[florida_idx]
#     test_src = 'https://upload.wikimedia.org/wikipedia/commons/2/28/Bridge_of_Sighs%2C_Oxford.jpg'
#     # input_data_path = tf.keras.utils.get_file(url.split('/')[-1], url)
    
#     # input_data_image, input_data_array = getImage_and_resize(input_data_path)
    
#     # input_data = run_delf(input_data_array)
    
#     # compare_data = data[:]

#     # start = time()

#     # inliers=[]

#     # for i in range(0,len(compare_data),5):
#     #     inliers.append(match_images(result1=input_data, 
#     #                                 result2=compare_data[i], 
#     #                                 gps=gps_compass[labels[i]], 
#     #                                 label=labels[i], 
#     #                                 image1=input_data_array.astype(dtype='uint8'),
#     #                                 image2=images[i].astype(dtype='uint8')))
#     # end = time()

#     # inliers_sorted = sorted(inliers, key=lambda x: x[0], reverse=True)
#     pr_loc_data_list = run_model(test_src, data=data, labels=labels, images=images, gps_compass=gps_compass)

#     print('run time: ', end-start)

#     # print(inliers_sorted)