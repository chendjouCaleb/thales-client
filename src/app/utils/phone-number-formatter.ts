export function formatPhoneNumber(phoneNumber: string) {
  if(!phoneNumber) return ''
  const formatter = [1, 2, 2, 2, 2];
  const valueGroups = [];

  let index = 0;
  formatter.forEach((group) => {
    valueGroups.push(phoneNumber.substring(index, index + group));
    index += group;
  });

  return valueGroups.join(' ')
}
