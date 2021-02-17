import fetch from "node-fetch";

const mapStories = {
  top: "news",
  new: "newest",
  show: "show",
  ask: "ask",
  job: "jobs",
};

const cache = {};

const get = (path, official) =>
  cache[path] ||
  (cache[path] = fetch(official ? `https://hacker-news.firebaseio.com/v0/${path}.json` :`https://node-hnapi.herokuapp.com/${path}`, {
    headers: {"User-Agent": "chrome"}
  }).then((r) => r.json()));

export function getStory(id) {
  return get(`item/${id}`);
}
export function getUser(id) {
  return get(`user/${id}`, true);
}
export function getStories(type, page) {
  const l = mapStories[type];
  if (!l) return [];
  return get(`${l}?page=${page}`);
}
