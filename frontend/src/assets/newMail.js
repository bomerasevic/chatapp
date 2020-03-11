let firstId = 1;

export default function(prefix = "user", sufix = "@gmail.com") {
  firstId++;
  return `${prefix}${firstId}${sufix}`;
}
