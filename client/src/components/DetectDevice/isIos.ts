const isIos = /iphone|ipad|ipod|macintosh/i.test(
  navigator.userAgent.toLowerCase()
);

export default isIos;
