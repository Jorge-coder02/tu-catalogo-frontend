export function randomString(length = 8) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

export function randomEmail() {
  return `user${randomString(6)}@example.com`;
}
