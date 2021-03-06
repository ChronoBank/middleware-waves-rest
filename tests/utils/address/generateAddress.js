/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 * @author Kirill Sergeev <cloudkserg11@gmail.com>
 */
module.exports = function () {
  let name = (Math.random()*100000000000000000).toString(36).substring(0, 20)
  return name.concat('z'.repeat(35-name.length)).toUpperCase();
};
