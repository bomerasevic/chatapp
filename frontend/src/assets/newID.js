let firstId = 150;

export default function(prefix = "User_") {
  firstId++;
  return `${prefix}${firstId}`;
}
