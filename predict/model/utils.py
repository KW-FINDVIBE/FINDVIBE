import numpy as np
import tensorflow as tf
from keras.preprocessing import image
import scipy.io

def getImage_and_resize(path, new_width=224, new_height=224):
  input_data_image = tf.keras.utils.load_img(path, target_size=(224,224))
  input_data_array = tf.keras.utils.img_to_array(input_data_image)

  return input_data_image, input_data_array

def load_saved_delf_data():
  delf_ds = np.load(f'/home/hyoungseok710/FINDVIBE/predict/model/Dataset/delf_demo.npy', allow_pickle=True)
  labels = np.load(f'/home/hyoungseok710/FINDVIBE/predict/model/Dataset/delf_demo_labels.npy', allow_pickle=True)
  images = np.load(f'/home/hyoungseok710/FINDVIBE/predict/model/Dataset/image.npz')
  gps = scipy.io.loadmat('/home/hyoungseok710/FINDVIBE/predict/model/Dataset/GPS_Long_Lat_Compass.mat')
  
  
  # delf_ds = np.load(f'Dataset/delf_demo.npy', allow_pickle=True)
  # labels = np.load(f'Dataset/delf_demo_labels.npy', allow_pickle=True)
  # images = np.load(f'Dataset/image.npz')
  # gps = scipy.io.loadmat('Dataset/GPS_Long_Lat_Compass.mat')
  gps_compass = gps['GPS_Compass']
  
  return delf_ds, labels, images['image'], gps_compass