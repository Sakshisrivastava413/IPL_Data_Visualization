function convertToJSON(csv) {
  const json = [];
  const rows = csv.split(/\n|\r\n/);
  const colTitle = rows.splice(0, 1)[0].split(',');

  for (let i = 0; i < rows.length; i++) {
    const obj = {};
    const cols = rows[i].match(/("([^"]*)"|[^,]*)(,|$)/g);
    if (!cols) continue;

    colTitle.forEach((header, j) => {
      if (!cols[j]) return;
      if (header[0] == '"' || header[header.length - 1] == `"`)
        header = header.slice(1, header.length - 1);
      let lastIndex = cols[j][cols[j].length - 1] == ',' ? cols[j].length - 1 : cols[j].length;
      obj[header] = cols[j] == ' ,' ? undefined : cols[j].slice(0, lastIndex);
    });
    json.push(obj);
  }

  delete json[json.length - 1];

  return json;
}

module.exports = {
  convertToJSON,
};
