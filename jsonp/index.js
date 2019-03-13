function noop() {}
/**
 *
 * @param {Object} data 将要序列化的对象
 */
const formatParams = (data) => {
  const params = [];
  const keys = Object.keys(data);
  keys.forEach((key) => {
    params.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
  });

  return params.join('&');
};

/**
 * @param {String} url 请求地址
 * @param {Object|Function} params params | callback
 * @param {Function?} callback callback
 */

function jsonp(url, params, callback) {
  let $params;
  let $callback;
  const target = document.querySelector('head');
  const script = document.createElement('script');
  let $url = '';
  const timeout = params.timeout || 60000;
  const { debug } = params;
  let timer;


  if (!callback) {
    $callback = params;
    $params = {};
  } else {
    $callback = callback;
    $params = params;
  }

  const name = callback.name ? callback.name : 'callback';
  const id = `json_${name}`;

  const cleanup = () => {
    if (timer)clearTimeout(timer);
    if (script.parentNode)script.parentNode.removeChild(script);
    window[id] = noop;
  };

  timer = setTimeout(() => {
    cleanup();
    if (callback)callback(new Error('Timeout'));
  }, timeout);

  const cancel = () => {
    cleanup();
  };

  window[id] = (data) => {
    if (debug)debug(data);
    $callback(data);
    cleanup();
  };


  $url = url.includes('?') ? `${url}&` : `${url}?`;
  $url += formatParams($params);
  $url += `&${name}=${encodeURIComponent(id)}`;
  $url.replace('?&', '?');

  script.src = $url;
  target.appendChild(script);

  return cancel;
}

export default {
  jsonp,
};
