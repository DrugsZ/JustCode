import $call from './call';

import $apply from './apply';

import $bind from './bind';

Function.prototype._call = $call;
Function.prototype._apply = $apply;
Function.prototype._bind = $bind;


export default {
  $call,
  $apply,
  $bind,
};
